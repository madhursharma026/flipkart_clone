import os
from os import path
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message

db = SQLAlchemy()
DB_NAME = "flipkart_clone_api.db"


UPLOAD_FOLDER_PRODUCT_IMAGE = os.path.join(os.getcwd(), 'C:/Users/Ram Sharma/Desktop/python/FlipkartAPI/static/product_image')
ALLOWED_EXTENSIONS_IMAGE = {'png', 'jpg', 'jpeg'}


mail = Mail()
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:''@localhost/flipkart_clone_api'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["MAIL_SERVER"] = 'smtp.gmail.com'
    app.config["MAIL_PORT"] = 465
    app.config['MAIL_USERNAME'] = 'jigarsharma220055@gmail.com'
    app.config['MAIL_PASSWORD'] = 'SSHIVRAMM'
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = True
    CORS(app)
    db.init_app(app)
    mail.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User

    create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'views.home'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    return app


def create_database(app):
    if not path.exists('flipkart_clone_api/' + DB_NAME):
        db.create_all(app=app)
        print('Created Database!')


        