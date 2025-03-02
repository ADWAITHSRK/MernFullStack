import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://AdwaithDev:AdwaithDev@ecommerce-db.dsm7m.mongodb.net/Ecommerce-Full?retryWrites=true&w=majority&appName=Ecommerce-Db"
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;