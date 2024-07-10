from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

from api.config import Config
from api.config import App_config
from api.log import Log

def create_app():
    """Creates the Flask app"""
    app = Flask(__name__)
    app_config = App_config()
    app.config.from_object(Config())

    # Configure CORS to allow requests from your frontend
    CORS(app, resources={r"/*": {"origins": os.environ.get('NEXT_FRONTEND_URL')}})

    # Creating log instance
    app_log = Log(app_config)

    from api.routes import routes_bp

    app.register_blueprint(routes_bp)

    return app
