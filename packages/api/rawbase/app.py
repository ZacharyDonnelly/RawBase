import os
import sqlite3
from sqlite3 import Connection as SQLiteConnection
from sentry_sdk import init
from sentry_sdk.integrations.flask import FlaskIntegration
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sendgrid
from sendgrid.helpers.mail import *
from sqlalchemy import event
from sqlalchemy.engine import Engine
from rawbase.utils import register_blueprints, cors
from rawbase.config import config

# DB setup
db = SQLAlchemy()


@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    # configure SQLite3 to enforce foreign key contsraints
    if isinstance(dbapi_connection, SQLiteConnection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()


def create_app():
    # Initialize Sentry
    init(
        dsn=os.getenv('SENTRY_DSN'),
        integrations=[FlaskIntegration()],
        debug=True,
        release=os.getenv('SENTRY_RELEASE'),
        traces_sample_rate=1.0,
    )

    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(config['development'])

    config['development'].init_app(app)
    cors.init_app(app)
    db.init_app(app)
    db.row_factory = sqlite3.Row
    register_blueprints(app)

    # sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
    # from_email = Email("zachr.donnelly@gmail.com")
    # to_email = To("zdonnelly@icloud.com")
    # subject = "Sending with SendGrid is Fun"
    # content = Content(
    #     "text/plain", "and easy to do anywhere, even with Python")
    # mail = Mail(from_email, to_email, subject, content)
    # response = sg.client.mail.send.post(request_body=mail.get())
    # print(response.status_code)
    # print(response.body)
    # print(response.headers)

    return app
