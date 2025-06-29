#  Fashion Hub

Fashion Hub is a full-stack web application for managing and browsing fashion products. It includes user authentication, product listings, and order management, built using **Flask** for the backend and **React** for the frontend.

---

##  Project Structure

Fashion-Hub/
│
├── server/ 
│ ├── models/ 
│ ├── routes/ 
│ ├── schemas/ 
│ ├── extensions.py 
│ ├── config.py 
│ ├── seed.py 
│ └── init.py 
│
├── src/ 
│ └──
│
├── instance/db.sqlite3 
├── migrations/ r
├── requirements.txt 
├── package.json 
└── README.md 

##  Features

-  **User Authentication** (JWT-based)
-  **Products API**: CRUD operations for fashion items
-  **Orders API**: Link users to their purchases
-  **Schema Validation** using Marshmallow
-  **CORS** setup for frontend-backend communication
-  **Database Seeding** with Faker

### Backend Setup(Flask)

```bash
# Create Virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
flask db init
flask db migrate -m "Initial"
flask db upgrade

# Seed database
python3 -m server.seed

# Run server
PYTHONPATH=. python3 server/run.py

#Frontend Setup
cd src
npm install
npm start

## Authentication
Authentication is handled via JWT:
-Login/Register to recieve a JWT token
-Protected routes: /orders/,product POST/PUT/DELETE
-Use Authorization: Bearer <token> in protected routes

## Contribution
- Backend handled by Emmanuel 
- Frontend handles by Brigid






