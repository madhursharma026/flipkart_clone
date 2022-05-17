from flask import Blueprint, app, request, jsonify, redirect, url_for, render_template
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user
from flask_mail import Mail, Message
from . import mail
from flask_mail import Message, Mail
import random


auth = Blueprint('auth', __name__)

email = ''
name = ''
username = ''
password1 = ''
password2 = ''
otp = random.randint(00000, 99999)
forget_email = ''


@auth.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(email=request.json['LoginEmail']).first()
    if user and check_password_hash(user.password, request.json['LoginPassword']):
        login_user(user, remember=True)
        response = jsonify({"id": current_user.id, "email": current_user.email, "name": current_user.name, "user_status" : current_user.user_status,
                            "username": current_user.username, "password": request.json['LoginPassword'], "address": current_user.address, "balance": current_user.balance})
    else:
        response = jsonify({"id": "none"})
    return response


@auth.route('/otp_validate/otp=<int:user_otp>', methods=['GET'])
def otp_validate(user_otp):
    global email, name, username, password1, password2
    if user_otp == otp:
        new_user = User(email=email, name=name, username=username, password=generate_password_hash(
            password1, method='sha256'))
        db.session.add(new_user)
        db.session.commit()
        return redirect('http://localhost:3000/login')
    return ''


@auth.route('/signup', methods=['POST'])
def sign_up():
    global email, name, username, password1, password2, otp
    email = request.json['email']
    name = request.json['name']
    username = request.json['username']
    password1 = request.json['password1']
    password2 = request.json['password2']
    user = User.query.filter_by(email=email).first()
    if user:
        response = jsonify({
            "message": "Email already exists."
        })
    else:
        msg = Message(subject='Confirm Email',
                      sender="jigarsharma220055@gmail.com", recipients=[email])
        msg.body = str("Click this http://127.0.0.1:5000/otp_validate/otp=" +
                       str(otp) + " to register" + ". Regards, Jigar Team.")
        mail.send(msg)
        response = jsonify({
            "message": "Check Your Inbox"
        })
    return response


@auth.route('/forget_password', methods=['POST'])
def forget_password():
    global forget_email
    email = request.json['ForgetEmail']
    user = User.query.filter(User.email == email).first()
    if user:
        forget_email = email
        msg = Message(
            subject='Confirm Email', sender="jigarsharma220055@gmail.com", recipients=[email])
        msg.body = str("http://localhost:3000/reset_password")
        mail.send(msg)
        response = jsonify({"id": user.id, "email": user.email, "name": user.name, "user_status" : user.user_status,
                            "username": user.username, "address": user.address, "balance": user.balance})
    else:
        response = jsonify({"id": "none"})
    return response


@auth.route('/reset_password', methods=['POST'])
def reset_password():
    global forget_email
    password = request.json['newpassword']
    user = User.query.filter(User.email == forget_email).first()
    if user:
        hashed_password = generate_password_hash(password, method='sha256')
        user.password = hashed_password
        db.session.commit()
        response = jsonify({"id": user.id, "email": user.email, "name": user.name, "user_status" : user.user_status,
                            "username": user.username, "password": password, "address": user.address, "balance": user.balance})
    else:
        response = jsonify({
            "id": "none"
        })
    return response


@auth.route('/change_password', methods=['POST'])
def change_password():
    email = request.json['user_email']
    password = request.json['newpassword']
    user = User.query.filter(User.email == email).first()
    if user:
        hashed_password = generate_password_hash(password, method='sha256')
        user.password = hashed_password
        db.session.commit()
        response = jsonify({"id": user.id, "email": user.email, "name": user.name, "user_status" : user.user_status,
                            "username": user.username, "password": password, "address": user.address, "balance": user.balance})
    else:
        response = jsonify({
            "id": "none"
        })
    return response


@auth.route('/edit_profile', methods=['POST'])
def edit_profile():
    user = User.query.filter(User.id == request.json['current_user_id']).first()
    if user:
        user.name = request.json['name']
        user.username = request.json['username']
        user.address = request.json['address']
        db.session.commit()
        user_update = User.query.filter(User.id == request.json['current_user_id']).first()
        response = jsonify({"id": user_update.id, "email": user_update.email, "name": user_update.name, "user_status" : user_update.user_status,
                            "username": user_update.username, "password": user_update.password, "address": user_update.address})
    else:
        response = jsonify({
            "id": "none"
        })
    return response
