from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .article import Article

__all__ = ["Article"]

