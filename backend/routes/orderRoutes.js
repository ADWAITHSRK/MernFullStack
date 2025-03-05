import express from 'express';
import { addOrderitems,getOrders, updateOrderToDelivered,getTotalOrdersCount ,getOrderById} from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/',authMiddleware,addOrderitems);
router.patch('/updateorder/:id',authMiddleware,updateOrderToDelivered);
router.get('/getallorders',authMiddleware,getOrders);
router.get('/gettotalorders',getTotalOrdersCount);
router.get('/getorder',authMiddleware,getOrderById);




export default router;