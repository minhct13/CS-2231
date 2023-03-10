from flask import Flask
from config import config
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from app.models import db


migrate = Migrate()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    db.init_app(app)
    migrate.init_app(app, db)

    api_prefix = app.config["APP_API_PREFIX"]
        


    CORS(
          app, resources={
            rf"{api_prefix}/*": {
              "origins": [
                "*"
              ],
              "supports_credentials": True,
            }
          }
        )
    # Import a module / component using its blueprint handler variable
    # app.register_blueprint(query_bp, url_prefix=api_prefix)
    # app.register_blueprint(feature_bp, url_prefix=api_prefix)
    
    return app
