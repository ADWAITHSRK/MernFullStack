import express from 'express';
const router = express.Router();
import { getProducts, getProductById , getCount } from '../controllers/productController.js';

// Routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/totalproductscount',getCount);


export default router;