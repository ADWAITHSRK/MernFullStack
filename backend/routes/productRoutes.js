import express from 'express';
const router = express.Router();
import { getProducts, getProductById , getTotalProductsCount } from '../controllers/productController.js';

// Routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/getcount',getTotalProductsCount);


export default router;