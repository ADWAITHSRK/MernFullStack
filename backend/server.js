import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './Config/Db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 7000; 
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], 
  credentials: true,
  optionsSuccessStatus: 200
};

connectDB();

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

// Serve the frontend index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});