# server/routes/api.py

from flask import Blueprint, jsonify
from server.models.product import Product

api = Blueprint('api', __name__)

@api.route('/api/fashion-images')
def fashion_images():
    products = Product.query.all()
    return jsonify([
        {
            "product_id": product.id,
            "url": product.image_url
        } for product in products if product.image_url
    ])
