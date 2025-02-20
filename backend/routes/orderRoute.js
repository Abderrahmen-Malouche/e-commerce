import express from 'express';
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus} from '../controllers/orderController.js';
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";


const orderRouter = express.Router();

//User Feature
orderRouter.get('/userorders',authUser,userOrders);



//Admin Features
orderRouter.get('/list',adminAuth,allOrders);
orderRouter.put('/status',adminAuth,updateStatus);

//Payment Features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/place-stripe',authUser,placeOrderStripe);




export default orderRouter;