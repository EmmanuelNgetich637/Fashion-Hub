from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from server.extensions import db
from server.models.order import Order
from server.models.product import Product
from server.schemas.order_schema import order_schema, orders_schema

order_bp = Blueprint('order', __name__, url_prefix='/orders')

@order_bp.route('/',  methods=['post'])
@jwt_required()
def create_order():
    data = request.get_json()
    user_id = get_jwt_identity()

    product = Product.query.get(data.get('product_id'))
    if not product:
        return jsonify({"error": "Product not found"}),404
    
    if product.stock <data.get('quantity', 1):
        return jsonify({"error": "Not enough sock"}),400
    
    order = Order(
            user_id=user_id,
            product_id=data['product_id'],
            quantity=data['quantity']
    )
    product.stock -= data['quantity']

    db.session.add(order)
    db.session.commit()

    return order_schema.jsonify(order), 201

# GET USER ORDERS
@order_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    user_id = get_jwt_identity()
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify(orders_schema.dump(orders)), 200