# server/routes/api.py

from flask import Blueprint, jsonify 
from server.models.product import Product

api = Blueprint("api", __name__)

@api.route("/fashion-images")
def get_fashion_images():
    products = Product.query.all()
    return jsonify([
        {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "image_url": product.image_url,
            "stock": product.stock
        } for product in products if product.image_url
    ])
