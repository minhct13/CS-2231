from os import environ


def convert_list_object_from_string(string):
    """Convert a string to a list of objects"""
    return [] if not string else \
        list(map(lambda x: x.strip(), string.split(",")))


class Config():
    APP_API_PREFIX = environ.get("APP_API_PREFIX")
    SECRET_KEY = environ.get("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI  = environ.get("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    POSTGRES_USER = environ.get("POSTGRES_USER")
    POSTGRES_PASSWORD = environ.get("POSTGRES_PASSWORD")
    POSTGRES_DB = environ.get("POSTGRES_DB")
    POSTGRES_NAME = environ.get("POSTGRES_NAME")