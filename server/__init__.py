# server/__init__.py
from flask import Flask
from server.config import Config
from server.extensions import db, ma, jwt, migrate
from server.routes.auth_routes import auth_bp
from server.routes.product_routes import product_bp
from server.routes.order_routes import order_bp

def create_app(): 
    app = Flask(__name__) 

    # Config
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-secret-key'

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # Register routes
    app.register_blueprint(auth_bp)
    app.register_blueprint(product_bp)
    app.register_blueprint(order_bp, url_prefix='/orders')
 
    @app.route('/')
    def home():
        return 'Welcome to Fashion Hub Backend API!'
  
    return app
  