🚀 Features
For Customers

Product Browsing: Browse through a wide range of products with search functionality and filters
Shopping Cart: Add, update, and remove items with real-time quantity updates and price calculations
User Authentication: Secure login and registration system with JWT authentication
Order Management: Place orders with cash on delivery option
Order Tracking: Track order status from pending to delivered
User Profiles: View order history and update personal information

For Admins

Admin Dashboard: Comprehensive dashboard to manage the entire platform
Product Management: Add, edit, and delete products including image uploads with Cloudinary
User Management: View and manage user accounts with role assignments
Order Processing: Update order status and view order details
Sales Analytics: Track sales performance and customer activity

🛠️ Technology Stack
Frontend

React: UI library for building interactive user interfaces
Redux Toolkit & RTK Query: State management with efficient API data fetching and caching
Tailwind CSS: Utility-first CSS framework for custom, responsive design
React Hook Form: Form validation and handling
React Toastify: Toast notifications for user feedback

Backend

Node.js & Express: Backend server framework
MongoDB & Mongoose: Database and ODM
JWT: Secure authentication system
Bcrypt: Password hashing for user security
Multer & Cloudinary: Image upload and storage

📋 Prerequisites

Node.js version 16.x or above
MongoDB Atlas account or local MongoDB installation
Cloudinary account for image storage

🔧 Installation

Clone the repository

bashgit clone https://github.com/ADWAITHSRK/MernFullStack.git
cd MernFullStack

Install dependencies for server and client

bashnpm install
cd frontend
npm install
cd ..

Create a .env file in the root directory and add the following variables

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Seed the database with sample data (optional)

bashnpm run data:import
🚀 Running the Application
Development Mode
bashnpm run dev
This runs both the backend server and frontend client concurrently.

Backend server: http://localhost:5000
Frontend client: http://localhost:5173

Production Mode
bashnpm run build
npm start
