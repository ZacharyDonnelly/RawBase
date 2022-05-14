from os import getenv, environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))


class Config:
    FLASK_APP = getenv('FLASK_APP')
    SECRET_KEY = getenv('SECRET_KEY')
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_USERNAME = getenv('MAIL_USERNAME')
    MAIL_PASSWORD = getenv('MAIL_PASSWORD')
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    SQLALCHEMY_TRACK_MODIFICATIONS = 0
    SQLALCHEMY_COMMIT_ON_TEARDOWN = 1

    @staticmethod
    def init_app(app):
        pass


# Finish setup of config classes
class DevelopmentConfig(Config):
    FLASK_ENV = 'development'
    DEBUG = 1
    SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI') or \
        'sqlite:///' + path.join(basedir, 'rawbase.sqlite3')


class ProductionConfig(Config):
    FLASK_ENV = 'production'
    DEBUG = 0
    SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI') or \
        'sqlite:///' + path.join(basedir, 'rawbase.sqlite3')


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,

    'default': DevelopmentConfig
}
