import express from 'express';
const router = express.Router();
import { getProducts, getProductById , getCount ,createProduct,deleteProduct } from '../controllers/productController.js';

// Routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/totalproductscount',getCount);
router.post('/create',upload.single('image'),createdProduct)
router.delete('/delete/:id',deleteProduct)



export default router;