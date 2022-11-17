from os import environ, path


class Config:

    SECRET_KEY = environ.get("SECRET_KEY")
    DEBUG = environ.get("DEBUG")
    DEVELOPMENT = environ.get("DEVELOPMENT")
    CSRF_ENABLED = True
