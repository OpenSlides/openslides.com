import math
import re
import smtplib
import sqlite3 as sql
from shutil import copyfile

from flask import Flask, render_template, request
from flask_babel import Babel
from flask_babel import gettext as _
from flask_babel import refresh
from flask_mail import Mail, Message
from jsonschema import Draft7Validator, draft7_format_checker
from jsonschema.exceptions import ValidationError

VAT_PERCENTAGE = 0.16

app = Flask(__name__)
try:
    app.config.from_pyfile("config.py")
except FileNotFoundError:
    app.logger.warning("Didn't find a config.py. Copied the template to config.py")
    copyfile("./config.py.tpl", "./config.py")
    app.config.from_pyfile("config.py")

mail = Mail(app)

babel = Babel(app)
BABEL_FORCE_DEFAULT_LANGUAGE = False


@babel.localeselector
def get_locale():
    global BABEL_FORCE_DEFAULT_LANGUAGE
    # for admin view: always use default language
    if BABEL_FORCE_DEFAULT_LANGUAGE or not request.referrer:
        return
    # try and get language from referrer url since that's what the user selected
    m = re.search("https?://[^/]+/([a-z]{2})", request.referrer)
    return m.group(1) if m else None


standard_pattern = r"^[A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z0-9\u00C0-\u00FF][A-Za-z0-9\u00C0-\u00FF\'\-\.\,\#]+)*$"
standard_pattern_no_number = r"^[A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+([\ A-Za-z\u00C0-\u00FF][A-Za-z\u00C0-\u00FF\'\-\.\,\#]+)*$"
domain_regex = r"^[a-zA-Z0-9\-\.]+$"


packages = {
    "meeting": {"name": _("Sitzung"), "max_users": 50, "price": 50},
    "conference": {"name": _("Tagung"), "max_users": 500, "price": 100},
    "congress": {"name": _("Kongress"), "max_users": 1000, "price": 200},
}


def default_price_function(months, users):
    return months * 50


services = {
    "evoting": {
        "name": _("eVoting"),
        "base_price": 50,
        "price_func": default_price_function,
        "monthly": True,
    },
    "audio": {
        "name": _("Audiokonferenz via Jitsi"),
        "base_price": 50,
        "price_func": default_price_function,
        "monthly": True,
    },
    "video": {
        "name": _("Video-Livestream"),
        "price_func": lambda months, users: math.ceil(users / 250) * 750,
    },
    "saml": {
        "name": _("Single Sign-On via SAML"),
        "base_price": 50,
        "price_func": default_price_function,
        "monthly": True,
    },
}

order_schema = Draft7Validator(
    {
        "type": "object",
        "properties": {
            "package": {"type": "string", "enum": list(packages.keys())},
            "running_time": {
                "type": ["string", "integer"],
                "enum": ["unlimited"] + [i + 3 for i in range(10)],
            },
            "domain": {"type": "string", "pattern": domain_regex},
            "services": {
                "type": "object",
                "properties": {
                    service: {"type": "boolean"} for service in services.keys()
                },
                "required": list(services.keys()),
            },
            "event_name": {"type": "string", "pattern": standard_pattern},
            "event_location": {"type": "string", "pattern": standard_pattern},
            "event_date": {"type": "string", "pattern": standard_pattern},
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
                        + r"4[987654310]|3[9643210]|2[70]|7|1))[\d\-/ ]{1,20}$",
                    },
                },
                "required": ["name", "email", "phone"],
            },
            "billing_address": {"type": "string"},
            "comment": {"type": "string"},
        },
        "required": [
            "package",
            "running_time",
            "domain",
            "event_name",
            "event_location",
            "event_date",
            "expected_users",
            "contact_person",
            "billing_address",
        ],
    },
    format_checker=draft7_format_checker,
)
mail_schema = Draft7Validator(
    {
        "type": "object",
        "properties": {"mail_address": {"type": "string", "format": "email"}},
        "required": ["mail_address"],
    },
    format_checker=draft7_format_checker,
)

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
    global BABEL_FORCE_DEFAULT_LANGUAGE

    data = request.json
    order_schema.validate(data)

    if not app.config.get("ORDER_MAIL_RECIPIENTS"):
        raise ViewError(_("Konfigurationsfehler: Keine E-Mail-Empfänger"))

    confirmation_mail = render_template(
        "confirmation-email.jinja", name=data["contact_person"]["name"]
    )
    price_overview = get_prices_overview_str(data)
    data_customer = render_template("order-summary.jinja", **get_summary_data(data))

    # since the user might have another language selected, but the admin mail should be in german,
    # we have to hack it like this to enforce the language we want
    with UseDefaultLanguageContext():
        summary = render_template("order-summary.jinja", **get_summary_data(data))
        metadata = render_template(
            "metadata.jinja",
            package_size=packages[data["package"]]["max_users"],
            raw_services_str=",".join(
                service for service, status in data["services"].items() if status
            ),
        )
        admin_mail = join_mail_bodies(summary, metadata)

    # admin message, always in german
    msg = Message("OpenSlides-Anfrage", recipients=app.config["ORDER_MAIL_RECIPIENTS"])
    msg.body = admin_mail
    try_send_mail(msg)

    # customer message
    msg = Message(
        _("Ihre Anfrage bei OpenSlides"), recipients=[data["contact_person"]["email"]]
    )
    msg.body = join_mail_bodies(
        confirmation_mail, price_overview, _("\nIhre Angaben:"), data_customer
    )
    try_send_mail(msg)

    return {}


class UseDefaultLanguageContext:
    def __enter__(self):
        global BABEL_FORCE_DEFAULT_LANGUAGE
        BABEL_FORCE_DEFAULT_LANGUAGE = True
        refresh()

    def __exit__(self, *args):
        global BABEL_FORCE_DEFAULT_LANGUAGE
        BABEL_FORCE_DEFAULT_LANGUAGE = False
        refresh()


def try_send_mail(msg):
    try:
        mail.send(msg)
    except smtplib.SMTPServerDisconnected:
        raise ViewError(_("Der Server ist nicht korrekt konfiguriert"))
    except smtplib.SMTPRecipientsRefused as e:
        messages = [
            "{}: {} {}".format(r, errno, msg.decode())
            for r, (errno, msg) in e.recipients.items()
        ]
        raise ViewError(
            _("Konnte E-Mail nicht versenden an:") + " " + ", ".join(messages)
        )


def join_mail_bodies(*bodies):
    return "\n\n".join(bodies)


def get_summary_data(data):
    contact_person = data["contact_person"]
    package = data["package"]
    summary_data = {
        **data,
        **contact_person,
        "package_str": _(packages[package]["name"]),
        "services_str": ", ".join(
            _(services[service]["name"])
            for service, status in data["services"].items()
            if status
        ),
        "running_time_str": str(data["running_time"]) + " " + _("Monate")
        if data["running_time"] != "unlimited"
        else _("unbegrenzt"),
    }
    return summary_data


def get_prices_overview_str(data):
    overview_data = get_overview_data(data)
    return render_template(
        "prices-overview.jinja",
        **{
            "data": data,
            "overview_data": overview_data,
            "VAT_PERCENTAGE": VAT_PERCENTAGE,
        }
    )


def get_overview_data(data):
    package = packages[data["package"]]
    months = data["running_time"]
    isUnlimited = months == "unlimited"
    if isUnlimited:
        months = 12
    users = data["expected_users"]
    positions = [
        {
            "name": _("Hostingpaket") + " " + _(package["name"]),
            "base_price": package["price"],
            "monthly": True,
            "total": months * package["price"],
        }
    ]
    for service_key, service in services.items():
        if data["services"][service_key]:
            service_total = service["price_func"](months, users)
            positions.append(
                {
                    "name": _(service["name"]),
                    "base_price": service.get("base_price") or service_total,
                    "monthly": service.get("monthly") or False,
                    "total": service_total,
                }
            )

    total = 0
    for entry in positions:
        if entry["monthly"]:
            entry["multiplier"] = "x " + str(months) + " " + _("Monate")
        else:
            entry["multiplier"] = (
                "("
                + _("pro Veranstaltungstag")
                + ", "
                + _("zzgl. Techniksupport")
                + ")*"
            )
        total += entry["total"]
    return {
        "positions": positions,
        "total": total,
        "isUnlimited": isUnlimited,
    }


@app.template_filter()
def currency(value):
    return "{:,.2f} €".format(value)


@app.route("/api/add_newsletter", methods=["POST"])
@app.route("/add_newsletter", methods=["POST"])
def add_newsletter():
    data = request.json
    try:
        mail_schema.validate(data)
    except ValidationError:
        raise ViewError(_("Diese E-Mail-Adresse ist ungültig"))

    try:
        with sql.connect(DB_PATH) as con:
            cur = con.cursor()
            cur.execute(
                "INSERT INTO mail_addresses (mail_address) VALUES (:mail_address)", data
            )
            con.commit()
    except sql.IntegrityError:
        con.rollback()
        raise ViewError(_("Diese E-Mail-Adresse ist bereits registriert"))
    except Exception as e:
        con.rollback()
        raise ViewError(e.message)
    finally:
        con.close()
    return {}


if __name__ == "__main__":
    app.run()
