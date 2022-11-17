from flask import Flask, session
from hcibackend.config import Config
from os import environ


def create_app(config_class=Config, **kwargs):

    app = Flask(__name__)
    app.config.from_object(Config)

    from hcibackend.main import main
    app.register_blueprint(main)

    return app

