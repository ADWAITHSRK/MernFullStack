## 🚀 Live Demo

You can check out the live version of this project here with credential "email:dev@mail.com password:dev" :  
🔗 [Live Site - MERN Fullstack App](https://mernfullstack-client.onrender.com)

# 🛒 E-Commerce 

A RESTful API backend for an e-commerce application built with **Node.js**, **Express**, and **MongoDB**. This API supports user authentication, product management, and order processing.

---

## 🚀 Features

### 👤 User Management

* User registration and login
* JWT-based authentication
* Profile management
* Admin-level controls

### 📦 Product Management

* CRUD operations for products
* Product categorization
* Inventory tracking
* Image uploads via Cloudinary

### 🧾 Order Processing

* Shopping cart support
* Order creation and tracking
* Cash on Delivery (COD) payment support
* Order status updates

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Backend:** React.js, Redux.js ,Tailwind
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JWT, bcrypt.js
* **Image Storage:** Cloudinary
---

## 🔌 API Endpoints

### 🔐 User Routes

| Method | Endpoint                    | Description         | Auth Required |
| ------ | --------------------------- | ------------------- | ------------- |
| POST   | `/api/users/register`       | Register a new user | No            |
| POST   | `/api/users/login`          | Login a user        | No            |
| POST   | `/api/users/logout`         | Logout a user       | Yes           |
| GET    | `/api/users/profile`        | Get user profile    | Yes           |
| GET    | `/api/users/profile/update` | Update user profile | Yes           |
| DELETE | `/api/users/delete/:userId` | Delete a user       | Yes           |
| GET    | `/api/users/users`          | Get all users       | No            |

### 🛍️ Product Routes

| Method | Endpoint                           | Description             | Auth Required\* |
| ------ | ---------------------------------- | ----------------------- | --------------- |
| GET    | `/api/products/`                   | Get all products        | No              |
| GET    | `/api/products/:id`                | Get a specific product  | No              |
| POST   | `/api/products/totalproductscount` | Get total product count | No              |
| POST   | `/api/products/create`             | Create a new product    | Likely Yes      |
| DELETE | `/api/products/delete/:id`         | Delete a product        | Likely Yes      |

> \*Auth status for product creation and deletion assumed based on typical role-based access control.

### 📦 Order Routes

| Method | Endpoint                      | Description             | Auth Required |
| ------ | ----------------------------- | ----------------------- | ------------- |
| POST   | `/api/orders/`                | Create a new order      | Yes           |
| PATCH  | `/api/orders/updateorder/:id` | Mark order as delivered | Yes           |
| GET    | `/api/orders/getallorders`    | Get all orders          | Yes           |
| GET    | `/api/orders/gettotalorders`  | Get total order count   | No            |
| GET    | `/api/orders/getorder`        | Get a specific order    | Yes           |



## Installation

### Prerequisites

- Node.js (v24 or higher)
- MongoDB or MongoDB Atlas account
- Cloudinary account (for image uploads)

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/ADWAITHSRK/MernFullStack.git
cd MernFullStack
```


2. **Install dependencies for both frontend and backend**

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```


## Running the Application

### Development Mode

```bash
# Run frontend & backend concurrently
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

### Production Mode

```bash
# Build frontend
npm run build

# Start production server
npm start
```


