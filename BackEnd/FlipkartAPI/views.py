from re import I
import razorpay
from flask.helpers import url_for
from . import db
from .models import Delivery, Items, User, wishlist
from flask_login import login_user, login_required,  current_user
from flask import Blueprint, request, jsonify
from sqlalchemy import func
from . import db, ALLOWED_EXTENSIONS_IMAGE, UPLOAD_FOLDER_PRODUCT_IMAGE
from werkzeug.utils import secure_filename
import os

views = Blueprint('views', __name__)

# category id for items
# 1 for mobiles
# 2 for shoes
# 3 for fashion
# 4. for food
# 5. for sports
# 6. for electronic
# 7. for home
# 8. for appliances

amount = ""


@views.route('/', methods=['GET'])
def home():
    i = 1
    item_length_list = []
    item_length = Items.query.filter(Items.item_status == "active").order_by(
        Items.item_category_id.desc()).first()
    while i <= int(item_length.item_category_id):
        item_length_list.append(i)
        i += 1
    All_item_details = []
    for x in item_length_list:
        All_items = Items.query.filter(
            # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
            Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.desc()).all()[:1]
        # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
        # Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.desc()).all()[:# yha vo number aaega jitna hume data chaie jese 4, 5 mtlb jese jo data aa rha h flipkart me ki 4-5 item aa rhe hai har row me vesa aa jaenge isse ]
        for All_items in All_items:
            data_in_dict = ({
                'item_id': All_items.id,
                'item_name': All_items.item_name,
                'item_price': All_items.item_price,
                'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
                'item_rating_star': All_items.item_rating_star,
                'item_public_rating_count': All_items.item_public_rating_count,
                'item_public_reviews_count': All_items.item_public_reviews_count,
                'item_one_features': All_items.item_one_features,
                'item_two_features': All_items.item_two_features,
                'item_three_features': All_items.item_three_features,
                'item_four_features': All_items.item_four_features,
                'item_five_features': All_items.item_five_features,
                'item_six_features': All_items.item_six_features,
                'item_category_id': All_items.item_category_id,
                'item_category_name': All_items.item_category_name,
                'item_status': All_items.item_status
            })
            All_item_details.append(data_in_dict)
    return jsonify(All_item_details)


@views.route('/all_items', methods=['GET'])
def all_items():
    All_item_details = []
    All_items = Items.query.filter(Items.item_status == "active").all()
    for All_items in All_items:
        data_in_dict = ({
            'item_id': All_items.id,
            'item_name': All_items.item_name,
            'item_price': All_items.item_price,
            'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
            'item_rating_star': All_items.item_rating_star,
            'item_public_rating_count': All_items.item_public_rating_count,
            'item_public_reviews_count': All_items.item_public_reviews_count,
            'item_one_features': All_items.item_one_features,
            'item_two_features': All_items.item_two_features,
            'item_three_features': All_items.item_three_features,
            'item_four_features': All_items.item_four_features,
            'item_five_features': All_items.item_five_features,
            'item_six_features': All_items.item_six_features,
            'item_category_id': All_items.item_category_id,
            'item_category_name': All_items.item_category_name,
            'item_status': All_items.item_status
        })
        All_item_details.append(data_in_dict)
    return jsonify(All_item_details)


@views.route('/item/id:<int:item_id>', methods=['GET'])
def single_item(item_id):
    single_item_details = []
    single_items = db.session.query(Items).filter(
        Items.id == item_id, Items.item_status == "active").first()
    data_in_dict = ({
        'item_id': single_items.id,
        'item_name': single_items.item_name,
        'item_price': single_items.item_price,
        'item_image_url': "http://127.0.0.1:5000/static/product_image/"+single_items.item_image_url,
        'item_rating_star': single_items.item_rating_star,
        'item_public_rating_count': single_items.item_public_rating_count,
        'item_public_reviews_count': single_items.item_public_reviews_count,
        'item_one_features': single_items.item_one_features,
        'item_two_features': single_items.item_two_features,
        'item_three_features': single_items.item_three_features,
        'item_four_features': single_items.item_four_features,
        'item_five_features': single_items.item_five_features,
        'item_six_features': single_items.item_six_features,
        'item_category_id': single_items.item_category_id,
        'item_category_name': single_items.item_category_name,
        'item_status': single_items.item_status
    })
    single_item_details.append(data_in_dict)
    return jsonify(single_item_details)


@views.route('/search_item_realtime/search_data:<string:data>', methods=['GET'])
def search_item_realtime(data):
    category_item = []
    search_value = data
    search = "%{}%".format(search_value)
    All_items = Items.query.filter(Items.item_name.like(
        search) | Items.item_category_name.like(search), Items.item_status == "active").all()
    for All_items in All_items:
        data_in_dict = ({
            'item_id': All_items.id,
            'item_name': All_items.item_name,
            'item_price': All_items.item_price,
            'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
            'item_rating_star': All_items.item_rating_star,
            'item_public_rating_count': All_items.item_public_rating_count,
            'item_public_reviews_count': All_items.item_public_reviews_count,
            'item_one_features': All_items.item_one_features,
            'item_two_features': All_items.item_two_features,
            'item_three_features': All_items.item_three_features,
            'item_four_features': All_items.item_four_features,
            'item_five_features': All_items.item_five_features,
            'item_six_features': All_items.item_six_features,
            'item_category_id': All_items.item_category_id,
            'item_category_name': All_items.item_category_name,
            'item_status': All_items.item_status
        })
        category_item.append(data_in_dict)
    if All_items == []:
        response = jsonify({
            "message": "Search word is not found"
        })
        return response
    return jsonify(category_item)


@views.route('/category/id:<int:category_id>/sort=asc', methods=['GET'])
def catg_wise_item_asc_sort(category_id):
    category_item = []
    All_items = db.session.query(Items).filter(
        Items.item_category_id == category_id).order_by(Items.item_price.asc()).all()
    for All_items in All_items:
        data_in_dict = ({
            'item_id': All_items.id,
            'item_name': All_items.item_name,
            'item_price': All_items.item_price,
            'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
            'item_rating_star': All_items.item_rating_star,
            'item_public_rating_count': All_items.item_public_rating_count,
            'item_public_reviews_count': All_items.item_public_reviews_count,
            'item_one_features': All_items.item_one_features,
            'item_two_features': All_items.item_two_features,
            'item_three_features': All_items.item_three_features,
            'item_four_features': All_items.item_four_features,
            'item_five_features': All_items.item_five_features,
            'item_six_features': All_items.item_six_features,
            'item_category_id': All_items.item_category_id,
            'item_category_name': All_items.item_category_name,
            'item_status': All_items.item_status
        })
        category_item.append(data_in_dict)
    return jsonify(category_item)


@views.route('/category/id:<int:category_id>', methods=['GET'])
def catg_wise_item(category_id):
    category_item = []
    All_items = db.session.query(Items).filter(
        Items.item_category_id == category_id, Items.item_status == "active").order_by(Items.item_price.desc()).all()
    for All_items in All_items:
        data_in_dict = ({
            'item_id': All_items.id,
            'item_name': All_items.item_name,
            'item_price': All_items.item_price,
            'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
            'item_rating_star': All_items.item_rating_star,
            'item_public_rating_count': All_items.item_public_rating_count,
            'item_public_reviews_count': All_items.item_public_reviews_count,
            'item_one_features': All_items.item_one_features,
            'item_two_features': All_items.item_two_features,
            'item_three_features': All_items.item_three_features,
            'item_four_features': All_items.item_four_features,
            'item_five_features': All_items.item_five_features,
            'item_six_features': All_items.item_six_features,
            'item_category_id': All_items.item_category_id,
            'item_category_name': All_items.item_category_name,
            'item_status': All_items.item_status
        })
        category_item.append(data_in_dict)
    return jsonify(category_item)


@views.route('/all_category/sort=acs', methods=['GET'])
def all_catg_item_asc_sort():
    i = 1
    item_length_list = []
    item_length = Items.query.filter(Items.item_status == "active").order_by(
        Items.item_category_id.desc()).first()
    while i <= int(item_length.item_category_id):
        item_length_list.append(i)
        i += 1
    All_item_details = []
    for x in item_length_list:
        All_items = Items.query.filter(
            # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
            Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.asc()).all()[:1]
        # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
        # Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.asc()).all()[:# yha vo number aaega jitna hume data chaie jese 4, 5 mtlb jese jo data aa rha h flipkart me ki 4-5 item aa rhe hai har row me vesa aa jaenge isse ]
        for All_items in All_items:
            data_in_dict = ({
                'item_id': All_items.id,
                'item_name': All_items.item_name,
                'item_price': All_items.item_price,
                'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
                'item_rating_star': All_items.item_rating_star,
                'item_public_rating_count': All_items.item_public_rating_count,
                'item_public_reviews_count': All_items.item_public_reviews_count,
                'item_one_features': All_items.item_one_features,
                'item_two_features': All_items.item_two_features,
                'item_three_features': All_items.item_three_features,
                'item_four_features': All_items.item_four_features,
                'item_five_features': All_items.item_five_features,
                'item_six_features': All_items.item_six_features,
                'item_category_id': All_items.item_category_id,
                'item_category_name': All_items.item_category_name,
                'item_status': All_items.item_status
            })
            All_item_details.append(data_in_dict)
    return jsonify(All_item_details)


@views.route('/all_category_items', methods=['GET'])
def all_category_items():
    i = 1
    item_length_list = []
    item_length = Items.query.order_by(
        Items.item_category_id.desc(), Items.item_status == "active").first()
    while i <= int(item_length.item_category_id):
        item_length_list.append(i)
        i += 1
    All_item_details = []
    for x in item_length_list:
        All_items = Items.query.filter(
            # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
            Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.desc()).all()[:1]
        # Ye data deal ke lie hai... mtlb jab ek ek data chaie hoga har category ka jab ye code lgega
        # Items.item_category_id == x, Items.item_status == "active").order_by(Items.item_price.asc()).all()[:# yha vo number aaega jitna hume data chaie jese 4, 5 mtlb jese jo data aa rha h flipkart me ki 4-5 item aa rhe hai har row me vesa aa jaenge isse ]
        for All_items in All_items:
            data_in_dict = ({
                'item_id': All_items.id,
                'item_name': All_items.item_name,
                'item_price': All_items.item_price,
                'item_image_url': "http://127.0.0.1:5000/static/product_image/"+All_items.item_image_url,
                'item_rating_star': All_items.item_rating_star,
                'item_public_rating_count': All_items.item_public_rating_count,
                'item_public_reviews_count': All_items.item_public_reviews_count,
                'item_one_features': All_items.item_one_features,
                'item_two_features': All_items.item_two_features,
                'item_three_features': All_items.item_three_features,
                'item_four_features': All_items.item_four_features,
                'item_five_features': All_items.item_five_features,
                'item_six_features': All_items.item_six_features,
                'item_category_id': All_items.item_category_id,
                'item_category_name': All_items.item_category_name,
                'item_status': All_items.item_status
            })
            All_item_details.append(data_in_dict)
    return jsonify(All_item_details)


@views.route('/add_item', methods=['POST'])
def add_items():
    last_item_id = Items.query.order_by(Items.id.desc()).first()
    item_name = request.form.get('ItemName')
    item_price = request.form.get('ItemPrice')
    item_image_url = request.files['ItemImageURL']
    item_one_features = request.form.get('ItemOneFeature')
    item_two_features = request.form.get('ItemTwoFeature')
    item_three_features = request.form.get('ItemThreeFeature')
    item_four_features = request.form.get('ItemFourFeature')
    item_six_features = request.form.get('ItemSixFeature')
    item_five_features = request.form.get('ItemFiveFeature')
    item_category_id = request.form.get('ItemCategoryId')
    item_category_name = request.form.get('ItemCategoryName')
    if item_image_url and '.' in item_image_url.filename and \
            item_image_url.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_IMAGE:
        product_image_filename = str(
            int(last_item_id.id)+1)+secure_filename(item_image_url.filename)
        item_image_url.save(os.path.join(
            UPLOAD_FOLDER_PRODUCT_IMAGE, product_image_filename))
        new_item = Items(item_name=item_name, item_price=item_price, item_image_url=product_image_filename, item_one_features=item_one_features, item_two_features=item_two_features, item_three_features=item_three_features,
                         item_four_features=item_four_features, item_five_features=item_five_features, item_six_features=item_six_features, item_category_id=item_category_id, item_category_name=item_category_name)
        db.session.add(new_item)
        db.session.commit()
        if new_item:
            response = jsonify({
                "result": "Insert Successfully"
            })
        else:
            response = jsonify({
                "message": "Execution Failed"
            })
    else:
        response = jsonify({
            "message": "Execution Failed"
        })
    return response


@views.route("/my_wishlist_item", methods=["POST"])
def my_wishlist_item():
    my_wishlist_list = []
    my_wishlist_item = wishlist.query.filter(
        wishlist.user_id == request.json['current_user_id'], wishlist.reaction == "1").all()
    if my_wishlist_item == []:
        response = jsonify({
            "message": "No Items Found"
        })
        return response
    else:
        for wishlist_item in my_wishlist_item:
            item_details = Items.query.filter(
                Items.id == wishlist_item.item_id, Items.item_status == "active").all()
            for item_details in item_details:
                item_data_in_dict = ({
                    'item_id': item_details.id,
                    'item_name': item_details.item_name,
                    'item_price': item_details.item_price,
                    'item_image_url': "http://127.0.0.1:5000/static/product_image/"+item_details.item_image_url,
                    'item_rating_star': item_details.item_rating_star,
                    'item_public_rating_count': item_details.item_public_rating_count,
                    'item_public_reviews_count': item_details.item_public_reviews_count,
                    'item_one_features': item_details.item_one_features,
                    'item_two_features': item_details.item_two_features,
                    'item_three_features': item_details.item_three_features,
                    'item_four_features': item_details.item_four_features,
                    'item_five_features': item_details.item_five_features,
                    'item_six_features': item_details.item_six_features,
                    'item_category_id': item_details.item_category_id,
                    'item_category_name': item_details.item_category_name,
                    'item_status': item_details.item_status
                })
                my_wishlist_list.append(item_data_in_dict)
        return jsonify({"message": my_wishlist_list})


@views.route("/wishlist_item", methods=["POST"])
def wishlist_item():
    addlike = wishlist(
        item_id=request.json['item_id'], user_id=request.json['current_user_id'], reaction="1")
    remove_like = wishlist.query.filter(wishlist.reaction == '1', wishlist.item_id ==
                                        request.json['item_id'], wishlist.user_id == request.json['current_user_id']).scalar()
    again_like = wishlist.query.filter(wishlist.reaction == '0', wishlist.item_id ==
                                       request.json['item_id'], wishlist.user_id == request.json['current_user_id']).scalar()
    if remove_like:
        remove_like.reaction = '0'
        db.session.commit()
        response = jsonify({
            "message": "item_removed"
        })
        return response
    elif again_like:
        again_like.reaction = '1'
        db.session.commit()
        response = jsonify({
            "message": "item_added_to_wishlist"
        })
        return response
    else:
        db.session.add(addlike)
        db.session.commit()
        response = jsonify({
            "message": "item_added_to_wishlist"
        })
        return response


@views.route("/getorderid", methods=["POST"])
def getorderid():
    user_details = User.query.filter(User.id == request.json['current_user_id']).first()
    keyid = 'rzp_test_eFLNBga803LVUY'
    keysecret = 'OjhovNmVtnpP22NmvuVfGItj'
    client = razorpay.Client(auth=(keyid, keysecret))
    if user_details.balance >= int(request.json['TotalPaymentPrice']):
        data = {
            'amount': int(request.json['TotalPaymentPrice'])*100,
            'currency': 'INR',
            'receipt': user_details.name
        }
        order = client.order.create(data=data)
        return jsonify({"message": order.get('id')})
    else:
        return jsonify({"message": ""})


@views.route("/delivery_data", methods=["POST"])
def delivery_data():
    for ids in request.json['listOfIds']: 
        add_delivery = Delivery(item_id=ids.get('id'), user_id=request.json['current_user_id'], delivery_status="1")
        db.session.add(add_delivery)
        db.session.commit()
    user_details = User.query.filter(User.id == request.json['current_user_id']).first()
    user_details.balance = (user_details.balance-int(request.json['TotalPrice']))
    db.session.commit()
    response = jsonify({
        "message": "item_added_to_delivery"
    })
    return response


@views.route("/my_order_item_not_delivery", methods=["POST"])
def my_order_item_not_delivery():
    my_order_list_not_delivery = []
    my_order_item_not_delivery = Delivery.query.filter(
        Delivery.user_id == request.json['current_user_id'], Delivery.delivery_status == "1").order_by(Delivery.added_date.desc()).all()
    if my_order_item_not_delivery == []:
        response = jsonify({
            "message": "No Items Found"
        })
        return response
    else:
        for order_item in my_order_item_not_delivery:
            item_details = Items.query.filter(
                Items.id == order_item.item_id, Items.item_status == "active").all()
            for item_details in item_details:
                item_data_in_dict = ({
                    'item_id': item_details.id,
                    'item_name': item_details.item_name,
                    'item_price': item_details.item_price,
                    'item_image_url': "http://127.0.0.1:5000/static/product_image/"+item_details.item_image_url,
                    'item_rating_star': item_details.item_rating_star,
                    'item_public_rating_count': item_details.item_public_rating_count,
                    'item_public_reviews_count': item_details.item_public_reviews_count,
                    'item_one_features': item_details.item_one_features,
                    'item_two_features': item_details.item_two_features,
                    'item_three_features': item_details.item_three_features,
                    'item_four_features': item_details.item_four_features,
                    'item_five_features': item_details.item_five_features,
                    'item_six_features': item_details.item_six_features,
                    'item_category_id': item_details.item_category_id,
                    'item_category_name': item_details.item_category_name,
                    'item_status': item_details.item_status
                })
                my_order_list_not_delivery.append(item_data_in_dict)
        return jsonify({"message": my_order_list_not_delivery})


@views.route("/my_order_item_delivery", methods=["POST"])
def my_order_item_delivery():
    my_order_list_delivery = []
    my_order_item_delivery = Delivery.query.filter(
        Delivery.user_id == request.json['current_user_id'], Delivery.delivery_status == "0").order_by(Delivery.added_date.desc()).all()
    if my_order_item_delivery == []:
        response = jsonify({
            "message": "No Items Found"
        })
        return response
    else:
        for order_item in my_order_item_delivery:
            item_details = Items.query.filter(
                Items.id == order_item.item_id, Items.item_status == "active").all()
            for item_details in item_details:
                item_data_in_dict = ({
                    'item_id': item_details.id,
                    'item_name': item_details.item_name,
                    'item_price': item_details.item_price,
                    'item_image_url': "http://127.0.0.1:5000/static/product_image/"+item_details.item_image_url,
                    'item_rating_star': item_details.item_rating_star,
                    'item_public_rating_count': item_details.item_public_rating_count,
                    'item_public_reviews_count': item_details.item_public_reviews_count,
                    'item_one_features': item_details.item_one_features,
                    'item_two_features': item_details.item_two_features,
                    'item_three_features': item_details.item_three_features,
                    'item_four_features': item_details.item_four_features,
                    'item_five_features': item_details.item_five_features,
                    'item_six_features': item_details.item_six_features,
                    'item_category_id': item_details.item_category_id,
                    'item_category_name': item_details.item_category_name,
                    'item_status': item_details.item_status
                })
                my_order_list_delivery.append(item_data_in_dict)
        return jsonify({"message": my_order_list_delivery})


@views.route('/edit_item_details', methods=['PUT'])
def edit_item_details():
    Item_detail = Items.query.filter(Items.id == request.form.get(
        'ItemId'), Items.item_status == "active").first()
    Item_detail.item_name = request.form.get('ItemName')
    Item_detail.item_price = request.form.get('ItemPrice')
    if request.form.get('ItemImageURL') == "http://127.0.0.1:5000/static/product_image/"+Item_detail.item_image_url:
        Item_detail.item_image_url = Item_detail.item_image_url
    else:
        item_image_url = request.files['ItemImageURL']
        if item_image_url and '.' in item_image_url.filename and \
                item_image_url.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_IMAGE:
            product_image_filename = str(
                Item_detail.id)+secure_filename(item_image_url.filename)
            item_image_url.save(os.path.join(
                UPLOAD_FOLDER_PRODUCT_IMAGE, product_image_filename))
            Item_detail.item_image_url = product_image_filename
    Item_detail.item_one_features = request.form.get('ItemOneFeature')
    Item_detail.item_two_features = request.form.get('ItemTwoFeature')
    Item_detail.item_three_features = request.form.get('ItemThreeFeature')
    Item_detail.item_four_features = request.form.get('ItemFourFeature')
    Item_detail.item_six_features = request.form.get('ItemSixFeature')
    Item_detail.item_five_features = request.form.get('ItemFiveFeature')
    Item_detail.item_category_id = request.form.get('ItemCategoryId')
    Item_detail.item_category_name = request.form.get('ItemCategoryName')
    db.session.commit()
    response = jsonify({
        "result": "Update Successfully"
    })
    return response


@views.route('/delete_item', methods=['Delete'])
def delete_item():
    Item_detail = Items.query.filter(
        Items.id == request.json['ItemId'], Items.item_status == "active").first()
    Item_detail.item_status = "delete"
    db.session.commit()
    response = jsonify({
        "result": "Delete Successfully"
    })
    return response


@views.route('/all_undelivered_items', methods=['GET'])
def all_undelivered_items():
    undelivered_item_details = []
    all_undelivered_items_list = []
    all_undelivered_items = Delivery.query.filter(
        Delivery.delivery_status == "1").all()
    for all_undelivered_items in all_undelivered_items:
        item_data_in_dict = ({
            'id': all_undelivered_items.id,
            'item_id': all_undelivered_items.item_id,
            'user_id': all_undelivered_items.user_id
        })
        all_undelivered_items_list.append(item_data_in_dict)
        single_items = db.session.query(Items).filter(
            Items.id == all_undelivered_items.item_id, Items.item_status == "active").first()
        single_items_user_detail = db.session.query(User).filter(
            User.id == all_undelivered_items.user_id).first()
        data_in_dict = ({
            'item_id': single_items.id,
            'item_name': single_items.item_name,
            'item_price': single_items.item_price,
            'item_image_url': "http://127.0.0.1:5000/static/product_image/"+single_items.item_image_url,
            'item_rating_star': single_items.item_rating_star,
            'item_public_rating_count': single_items.item_public_rating_count,
            'item_public_reviews_count': single_items.item_public_reviews_count,
            'item_one_features': single_items.item_one_features,
            'item_two_features': single_items.item_two_features,
            'item_three_features': single_items.item_three_features,
            'item_four_features': single_items.item_four_features,
            'item_five_features': single_items.item_five_features,
            'item_six_features': single_items.item_six_features,
            'item_category_id': single_items.item_category_id,
            'item_category_name': single_items.item_category_name,
            'item_status': single_items.item_status,
            'username': single_items_user_detail.username,
            'user_address': single_items_user_detail.address,
            'balance': single_items_user_detail.balance
        })
        undelivered_item_details.append(data_in_dict)
    return jsonify(undelivered_item_details)


@views.route('/convert_to_delivered_item', methods=['Delete'])
def convert_to_delivered_item():
    Item_detail = Delivery.query.filter(Delivery.item_id == request.json['ItemId']).first()
    Item_detail.delivery_status = "0"
    db.session.commit()
    response = jsonify({
        "result": "Delivery Successfully"
    })
    return response


@views.route('/my_balance/user_id:<current_user_id>', methods=['GET'])
def my_balance(current_user_id):
    User_balance = User.query.filter(User.id == current_user_id).first()
    response = jsonify({"result": User_balance.balance})
    return response


# @views.route("/getorderidforaddbalance", methods=["POST"])
# def getorderidforaddbalance():
#     user_details = User.query.filter(User.id == request.json['current_user_id']).first()
#     item_details = Items.query.filter(Items.id == request.json['item_id'], Items.item_status == "active").all()
#     for item_details in item_details:
#         get_item_details = ({
#             'item_id': item_details.id,
#             'item_name': item_details.item_name,
#             'item_price': item_details.item_price
#         })
#         keyid = 'rzp_test_eFLNBga803LVUY'
#         keysecret = 'OjhovNmVtnpP22NmvuVfGItj'
#         client = razorpay.Client(auth=(keyid, keysecret))
#         data = {
#             'amount': int(get_item_details['item_price'])*100-(user_details.balance),
#             'currency': 'INR',
#             'receipt': user_details.name,
#             'notes': {
#                 'item_name': get_item_details['item_name'],
#                 'item_id': str(get_item_details['item_id'])+get_item_details['item_name']
#             }
#         }
#         order = client.order.create(data=data)
#         return jsonify({"message": order.get('id')})


@views.route("/getorderidforaddbalance", methods=["POST"])
def getorderidforaddbalance():
    global amount
    user_details = User.query.filter(
        User.id == request.json['current_user_id']).first()
    keyid = 'rzp_test_eFLNBga803LVUY'
    keysecret = 'OjhovNmVtnpP22NmvuVfGItj'
    client = razorpay.Client(auth=(keyid, keysecret))
    data = {
        'amount': request.json['amount']*100,
        'currency': 'INR',
        'receipt': user_details.name
    }
    amount = request.json['amount']
    order = client.order.create(data=data)
    return jsonify({"message": order.get('id')})


@views.route("/increase_payment_to_database", methods=["POST"])
def increase_payment_to_database():
    global amount
    user_details = User.query.filter(
        User.id == request.json['current_user_id']).first()
    user_details.balance = int(amount)+user_details.balance
    db.session.commit()
    response = jsonify({
        "message": "payment_added"
    })
    return response


@views.route("/change_address", methods=["POST"])
def change_address():
    user_details = User.query.filter(
        User.id == request.json['current_user_id']).first()
    if user_details:
        user_details.address = request.json['new_address']
        db.session.commit()
        response = jsonify({"id": user_details.id, "email": user_details.email, "name": user_details.name, "user_status": user_details.user_status,
                            "username": user_details.username, "address": request.json['new_address'], "balance": user_details.balance})
        return response
    else:
        return ""
