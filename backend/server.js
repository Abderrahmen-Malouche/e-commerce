import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app=express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors(
    {
        origin:"https://forever-frontend-eight-wheat-vercel.app",
        methods:"GET,POST,PUT,DELETE",
        credentials:true
    }
));

//api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})

app.listen(PORT,()=>{console.log("Server is running on port",PORT)});



