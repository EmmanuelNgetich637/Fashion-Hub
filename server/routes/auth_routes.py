from flask import Blueprint, jsonify, request
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)

from server.extensions import db
from server.models.user import User
from server.schemas.user_schema import user_schema
from server.utils.security import hash_password, verify_password

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate input using Marshmallow
    errors = user_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    # Check for existing user
    if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
        return jsonify({"error": "Username or email already exists"}), 400
    
    print("Incoming registration data:", data)
    print("Validation errors:", user_schema.validate(data))


    # Hash password
    hashed_pw = hash_password(data['password'])

    # Create user
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_pw
    )

    db.session.add(user)
    db.session.commit()

    # Generate token (string id)
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "User registered successfully!",
        "token": access_token,
        "user": user_schema.dump(user)
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not verify_password(password, user.password_hash):
        return jsonify({"error": "Invalid credentials"}), 401
 
    token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful!",
        "token": token,
        "user": user_schema.dump(user)
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "message": "You are authorized!",
        "user": user_schema.dump(user)
    })
