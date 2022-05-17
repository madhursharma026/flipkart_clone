import requests
from . import db
from datetime import date, datetime
from flask_login.mixins import UserMixin

IP_tracker_api = 'http://ip-api.com/json/?fields=61439'
IP_tracker_api_request = requests.get(IP_tracker_api)
IP_tracker_api_json = IP_tracker_api_request.json()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(32767), unique=True, nullable=False)
    name = db.Column(db.String(32767), unique=False, nullable=False)
    username = db.Column(db.String(10), unique=False, nullable=False)
    password = db.Column(db.String(32767), nullable=False)
    address = db.Column(db.String(32767), nullable=False, default=IP_tracker_api_json['regionName'] + ', ' + IP_tracker_api_json['country'])
    balance = db.Column(db.Integer, nullable=False, default="0")
    user_status = db.Column(db.String(32767), nullable=False, default='user')
    joined_date = db.Column(db.Date, nullable=False, default=date.today())
    wishlist_user_id = db.relationship('wishlist', backref='user_details', lazy=True)


class Items(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(32767), nullable=False)
    item_price = db.Column(db.String(32767), nullable=False)
    item_image_url = db.Column(db.String(32767), nullable=False)
    item_rating_star = db.Column(db.String(1), nullable=False, default="4")
    item_public_rating_count = db.Column(db.String(32767), nullable=False, default="1000")
    item_public_reviews_count = db.Column(db.String(32767), nullable=False, default="1000")
    item_one_features = db.Column(db.String(32767), nullable=False)
    item_two_features = db.Column(db.String(32767), nullable=False)
    item_three_features = db.Column(db.String(32767), nullable=False)
    item_four_features = db.Column(db.String(32767), nullable=False)
    item_five_features = db.Column(db.String(32767), nullable=False)
    item_six_features = db.Column(db.String(32767), nullable=False)
    item_category_id = db.Column(db.String(32767), nullable=False)
    item_category_name = db.Column(db.String(32767), nullable=False)
    item_status = db.Column(db.String(32767), nullable=False, default='active')


class wishlist(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    reaction = db.Column(db.Integer, unique=False, nullable=False)
    added_date = db.Column(db.Date, nullable=False, default=date.today())


class Delivery(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, nullable=False)
    delivery_status = db.Column(db.Integer, unique=False, nullable=False)
    added_date = db.Column(db.Date, nullable=False, default=datetime.now().strftime('%Y-%m-%d %H:%M:%S'))





