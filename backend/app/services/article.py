import os 
from flask import jsonify

import requests
from sqlalchemy.sql import text

from app.models import Artical
from app.utils.manipulate_database import save_to_db, delete

class ArticalService:
    @staticmethod
    def save_articles(articles):
        """Saving articles
        Returns:
            object: response, msg
        """
        if not len(articles): return 
        image_uuid = annotations["image_uuid"]
        annotation = annotations["annotation"]
        bboxs = []
        for bbox in annotation:
            bb = Artical(
                    image_uuid=image_uuid,
                    annotation_class=str(bbox["annotation_class"]),
                    x=bbox["x"],
                    y=bbox["y"],
                    width=bbox["width"],
                    height=bbox["height"],
                    probability=bbox["probability"],
                    method=method
                )
            bboxs.append(bb)
        message, status_code = save_to_db(bboxs)
            
        response = jsonify({"message": message})
        return response, status_code