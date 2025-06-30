#  Fashion Hub

Fashion Hub is a full-stack web application built to showcase and sell fashion items using a modern tech stack. This project meets all the requirements for the SDFT14 Phase 4 MVP, including a single-page React client with protected routes and a Flask REST API backend with relational database models.

---

##  Features

### Frontend (React)

* **Single Page Application (SPA)** using **React**
* **8+ Routes** implemented:

  * `/` – Home
  * `/login` – User Login
  * `/register` – User Registration
  * `/shop` – View Fashion Items
  * `/product/:id` – Product Details
  * `/cart` – Shopping Cart
  * `/orders` – User Orders
  * `/dashboard` – Admin/User Dashboard
* **5 Protected Routes** (require authentication):

  * `/cart`, `/orders`, `/dashboard`, `/product/:id`, `/checkout`
* **Forgot Password** feature (email-based or token reset)

---

###  Backend (Flask REST API)

* Built with **Flask** and **Flask-RESTful**
* **8+ RESTful endpoints**, including:

  * `POST /register` – Register user
  * `POST /login` – Authenticate user
  * `GET /products` – List products
  * `GET /products/<id>` – Product details
  * `POST /orders` – Create order
  * `PUT /users/<id>` – Update user
  * `DELETE /cart/<id>` – Delete cart item
  * `PATCH /products/<id>` – Edit product
* **5+ Authenticated Endpoints**:

  * Requires JWT tokens for access (protected using Flask-JWT or Flask-JWT-Extended)

---

##  Database Schema

* **4+ Models**, each with 4+ fields:

  * `User`: id, name, email, password, is\_admin
  * `Product`: id, name, price, image, description, category
  * `Order`: id, user\_id, created\_at, status
  * `CartItem`: id, product\_id, user\_id, quantity

###  Relationships

* **Two One-to-Many**:

  * User → Orders
  * User → CartItems
* **One Many-to-Many**:

  * Orders ↔ Products (via `OrderItems` table)

---

##  Authentication & Security

* JWT-based auth for frontend-backend communication
* Password reset flow with secure token/email
* Protected API endpoints for authenticated users only

---

## Technologies Used

| Frontend     | Backend       | Database            |
| ------------ | ------------- | ------------------- |
| React (Vite) | Flask         | SQLite / PostgreSQL |
| React Router | Flask-JWT     | SQLAlchemy          |
| Tailwind CSS | Flask-Migrate | Alembic             |
| Context API  | Flask-RESTful |                     |

---

##  Image Integration

* Images dynamically fetched from **Unsplash API**
* Unsplash Access Key securely stored in environment variables

---

## Getting Started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

ENVIRONMENT VARIABLES

Frontend .env 

REACT\_UNSPLASH\_ACCESS\_KEY=your\_unsplash\_access\_key

REACT\_API\_URL=http\://localhost:5000

Backend .env 

DATABASE\_URI=sqlite:///db.sqlite3

JWT\_SECRET\_KEY=your\_jwt\_secret\_key

UNSPLASH\_ACCESS\_KEY=your\_unsplash\_access\_key

UNSPLASH\_SECRET\_KEY=your\_unsplash\_secret\_key

CONTRIBUTORS 

Brigid Syondie - Frontend 

Emmanuel Ngetich - Backend 
