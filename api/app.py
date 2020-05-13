import smtplib
import sqlite3 as sql
from shutil import copyfile
from textwrap import dedent

from flask import Flask, request
from flask_mail import Mail, Message
from jsonschema import validate
from jsonschema.exceptions import ValidationError

app = Flask(__name__)
try:
    app.config.from_pyfile("config.py")
except FileNotFoundError:
    app.logger.warning("Didn't find a config.py. Copied the template to config.py")
    copyfile("./config.py.tpl", "./config.py")
    app.config.from_pyfile("config.py")

mail = Mail(app)

standard_pattern = r"^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$"
standard_pattern_no_number = r"^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$"
domain_regex = r"^[a-zA-Z0-9\-\.]+$"

services = ["evoting", "audio", "video", "saml"]

order_schema = {
    "type": "object",
    "properties": {
        "package": {"type": "string", "enum": ["meeting", "conference", "congress"]},
        "domain": {"type": "string", "pattern": domain_regex},
        "services": {
            "type": "object",
            "properties": {service: {"type": "boolean"} for service in services},
        },
        "event_name": {"type": "string", "pattern": standard_pattern},
        "event_location": {"type": "string", "pattern": standard_pattern},
        "event_date": {"type": "string", "format": "date"},
        "expected_users": {"type": "integer", "min": 0},
        "contact_person": {
            "type": "object",
            "properties": {
                "organisation": {"type": "string", "pattern": standard_pattern},
                "name": {"type": "string", "pattern": standard_pattern_no_number},
                "email": {"type": "string", "format": "email"},
                "phone": {
                    "type": "string",
                    "pattern": r"^(0|\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42"
                    + r"\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|"
                    + r"4[987654310]|3[9643210]|2[70]|7|1))\d{1,14}$",
                },
            },
            "required": ["name", "email", "phone"],
        },
        "billing_address": {"type": "string", "pattern": standard_pattern},
        "comment": {"type": "string"},
    },
    "required": [
        "package",
        "domain",
        "event_name",
        "event_location",
        "event_date",
        "expected_users",
        "contact_person",
        "billing_address",
    ],
}
mail_schema = {
    "type": "object",
    "properties": {"mail_address": {"type": "string", "format": "email"}},
    "required": ["mail_address"],
}

DB_PATH = app.config.get("DB_PATH", "database.sqlite3")


@app.before_first_request
def create_db_schema():
    with sql.connect(DB_PATH) as con:
        cur = con.cursor()
        cur.execute(
            "CREATE TABLE IF NOT EXISTS mail_addresses(mail_address text PRIMARY KEY NOT NULL, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP);"
        )
        con.commit()


class ViewError(Exception):
    def __init__(self, message, status_code=400):
        super().__init__(self)
        self.message = message
        self.status_code = status_code


@app.errorhandler(ViewError)
def handle_view_error(error):
    return {"error": error.message}, error.status_code


@app.errorhandler(ValidationError)
def handle_validation_error(error):
    return {"error": error.message}, 400


@app.route("/api/order", methods=["POST"])
@app.route("/order", methods=["POST"])
def order():
    data = request.json
    validate(data, order_schema)

    contact_person = data.pop("contact_person")
    request_str = dedent(
        """\
        Paket: {package}
        Wunschdomain: {domain}

        Services: {services_str}

        Veranstaltungsname: {event_name}
        Veranstaltungsort: {event_location}
        Veranstaltungszeitraum: {event_date}
        Erwartete Teilnehmeranzahl: {expected_users}

        Ansprechpartner:
        {contact_person_str}

        Rechnungsadresse:
        {billing_address}
    """
    ).format(
        contact_person_str=dedent(
            """\
                Veranstalter: {organisation}
                Name: {name}
                E-Mail: {email}
                Telefon: {phone}
            """
        ).format(**contact_person),
        services_str=", ".join(
            service for service, status in data["services"].items() if status
        ),
        **data
    )

    if not app.config.get("ORDER_MAIL_RECIPIENTS"):
        raise ViewError("Configuration error: No order mail recipients")

    # admin message
    msg = Message("OpenSlides-Anfrage", recipients=app.config["ORDER_MAIL_RECIPIENTS"])
    msg.body = request_str
    try_send_mail(msg)

    # customer message
    msg = Message("Ihre Anfrage bei OpenSlides", recipients=[contact_person["email"]])
    msg.body = dedent(
        """\
        Sehr geehrte/r {},

        vielen Dank für ihre Hosting-Anfrage bei OpenSlides! Wir werden Ihre Nachricht schnellstmöglich bearbeiten.

        Unten stehend finden Sie noch einmal Ihre Angaben. Sollten Ihnen Fehler auffallen oder Sie noch Änderungswünsche haben, \
        antworten Sie einfach mit den Ergänzungen/Korrekturen auf diese Email.

        Sollten Sie diese Anfrage nicht gesendet haben, melden Sie sich bitte bei uns, um die Anfrage zu stornieren.

        Viele Grüße,
        Ihr OpenSlides-Team


        Ihre Angaben:
        {}
    """
    ).format(contact_person["name"], request_str)
    try_send_mail(msg)

    return {}


def try_send_mail(msg):
    try:
        mail.send(msg)
    except smtplib.SMTPServerDisconnected:
        raise ViewError("Please configure the server correctly")
    except smtplib.SMTPRecipientsRefused as e:
        messages = [
            "{}: {} {}".format(r, errno, msg.decode())
            for r, (errno, msg) in e.recipients.items()
        ]
        raise ViewError("Could not send email to: " + ", ".join(messages))


@app.route("/api/add_newsletter", methods=["POST"])
@app.route("/add_newsletter", methods=["POST"])
def add_newsletter():
    data = request.json
    try:
        validate(data, mail_schema)
    except ValidationError:
        raise ViewError("The email is not valid")

    try:
        with sql.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO mail_addresses (mail_address) VALUES (:mail_address)", data
            )
            con.commit()
    except sql.IntegrityError:
        con.rollback()
        raise ViewError("Address already exists")
    except Exception as e:
        con.rollback()
        raise ViewError(e.message)
    finally:
        con.close()
    return {}


if __name__ == "__main__":
    app.run()
