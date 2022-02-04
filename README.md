# Openslides

This is the repository of the official [OpenSlides website](https://www.openslides.com/).

The website is a single page web application made with Angular and Typescript.

## Prerequisites

 * (May need some memory and harddisk, tested in a VM with 2 GiByte RAM and 10 GiByte storage)
 * Install Node.js (e.g. from your GNU/Linux distribution `apt install nodejs npm` Debian Bullseye)
 * Install Nginx (e.g. `apt install nginx-light` Debian Bullseye)
 * Clone source
 * Fetch Javascript dependencies with `npm install`


## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

See [api/] for the server which is responsible for handling the orders.


## Uploading translations

 * Requirements for the extraction step are
   django-babel with jinja2 and GNU gettext.
   (e.g. `apt install python3-django-babel python3-jinja2 gettext`
   Debian Bullseye.)

For easier translation handling, you have to have the transifex client
installed. Make sure you exported your API token as described in https://docs.transifex.com/client/init#before-running-tx-init.

After you made some changes to the website, run `./scripts/extract-translations.sh` to update the `template-de.pot` file. Then, upload the file with `tx push --source`. You can now edit the translations as usual on transifex.

When you are finished, just run `tx pull --all` and then `./scripts/compile-translations.sh` to generate the JSON/MO files.
