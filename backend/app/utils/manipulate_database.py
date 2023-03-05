import requests

from app.models import db
from sqlalchemy.exc import SQLAlchemyError
from app.models import Annotation

def update():
    try:
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        return "Fail to update to Database", requests.codes.not_acceptable
    return "Success to update to DataBase", requests.codes.ok

def save_to_db(data):
    try:
        if isinstance(data,list):
            db.session.add_all(data)
        else:
            db.session.add(data)
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        print(e)
        return "Fail to update to Database, rolled back", requests.codes.not_acceptable
    return "Success to update to DataBase", requests.codes.ok

def delete(image_uuid):
    try:
        db.session.query(Annotation).filter(Annotation.image_uuid==image_uuid).delete()
        db.session.commit()
    except SQLAlchemyError as e:
        db.session.rollback()
        return "Fail to delete to Database", requests.codes.not_acceptable
    return "Success to delete to DataBase", requests.codes.ok