from app.models import db
from sqlalchemy.dialects.postgresql import ARRAY

class Article(db.Model):
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    topic = db.Column(db.String(400), nullable=False)
    title = db.Column(db.String(400), nullable=False)
    introduction = db.Column(ARRAY(db.Text), nullable=True)
    formulas = db.Column(ARRAY(db.Text), nullable=True)
    examples = db.Column(ARRAY(db.Text), nullable=True)
    def __repr__(self):
        return f"<Article id={self.id}, title='{self.title}'>"