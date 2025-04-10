import express from 'express';
const router = express.Router();
import { getProducts, getProductById , getCount ,createProduct,deleteProduct } from '../controllers/productController.js';
import { upload,uploadToCloudinary } from "../utils/multerConfig.js";

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/totalproductscount',getCount);
router.post('/create',upload.array("image", 5),uploadToCloudinary,createProduct)
router.delete('/delete/:id',deleteProduct)



export default router;