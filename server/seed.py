from faker import Faker
from server.run import create_app
from server.extensions import db
from server.models.product import Product

import random

fake = Faker()
app = create_app()

# Curated fashion product names and corresponding Unsplash images
fashion_items = [
    {
        "name": "Graphic T-Shirt",
        "image_url": "https://images.unsplash.com/photo-1602810312037-3ae0c0119b8c"
    },
    {
        "name": "Denim Jacket",
        "image_url": "https://images.unsplash.com/photo-1521334884684-d80222895322"
    },
    {
        "name": "Leather Boots",
        "image_url": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
    },
    {
        "name": "Floral Dress",
        "image_url": "https://images.unsplash.com/photo-1629941205198-6e5e4e6a9130"
    },
    {
        "name": "Slim Fit Jeans",
        "image_url": "https://images.unsplash.com/photo-1629941213365-6aa20940ff9c"
    },
    {
        "name": "Hooded Sweatshirt",
        "image_url": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
    },
    {
        "name": "Wool Coat",
        "image_url": "https://unsplash.com/photos/a-red-jacket-hanging-on-a-clothes-line-L7MBmE1VbVg"
    },
    {
        "name": "Chino Pants",
        "image_url": "https://images.unsplash.com/photo-1542062703-174f5b1b7a32"
    },
    {
        "name": "Puffer Jacket",
        "image_url": "https://images.unsplash.com/photo-1605393071928-cab7e5b9bcbc"
    },
    {
        "name": "Linen Shirt",
        "image_url": "https://images.unsplash.com/photo-1602810312037-3ae0c0119b8c"
    },
]

with app.app_context():
    print("🔁 Seeding fashion products with realistic data...")

    # Drop and recreate Product table (manual migration-like behavior)
    db.drop_all()
    db.create_all()

    # Seed fashion products
    products = []
    for item in fashion_items:
        product = Product(
            name=item["name"],
            price=round(random.uniform(19.99, 129.99), 2),
            description=fake.sentence(nb_words=8),
            stock=random.randint(5, 100),
            image_url=item["image_url"] + "?w=300&h=300&fit=crop"
        )
        products.append(product)

    db.session.add_all(products) 
    db.session.commit()
    print("✅ Done seeding with fashion images and names!")
