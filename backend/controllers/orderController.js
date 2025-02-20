import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";

const currency="USD";
const deliveryCharges=10;
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing orders using COD method 
const placeOrder = async (req,res)=>{
    try{

        const {userId,items,amount,address}=req.body;
        const orderData={
            userId,
            items,
            amount,
            address,
            payment:false,
            paymentMethod:"COD",
            date:Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true,message:"Order Placed Successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }

}

//placing orders using Stripe Method
const placeOrderStripe = async (req,res)=>{
        try{
            const {userId,items,amount,address}=req.body;
            const {origin}=req.headers;
            const line_items= items.map((item)=>({
                price_data:{
                    currency:currency,
                    product_data: {
                        name:item.name,
                        
                    },
                    unit_amount:item.price*100,
                },
                quantity:item.quantity
            }))
            line_items.push({
                price_data:{
                    currency:currency,
                    product_data: {
                        name:"Delivery Charges",
                        
                    },
                    unit_amount:deliveryCharges*100,
                },
                quantity:1
            })
            const session = await stripe.checkout.sessions.create({
                success_url:`${origin}/orders`,
                cancel_url:`${origin}/cart`,

                line_items,
                mode:"payment",
            })
            res.json({success:true,session_url:session.url});
        }
        catch(error){
            console.log(error);
            return res.status(500).json({success:false,message:error.message});
        }

}

//Placing orders using Razorpay Method 

const placeOrderRazorpay= async (req,res)=>{

}

//All Orders data for admin Panel 
const allOrders = async (req,res)=>{
    try{
        const orders=await orderModel.find({});
        if(orders){
            return res.json({success:true,orders});
        }
        else{
            return res.json({success:false,message:"No orders found"});
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}

//User Order data for frontend
const userOrders = async (req,res)=>{
    try{
        const {userId}=req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}

// Update order Status from Admin Panel 
const updateStatus = async (req,res)=>{
    try{
        const {orderId,status}=req.body;
        await orderModel.findByIdAndUpdate(orderId,{status});
        res.json({success:true,message:"Status Updated"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus}