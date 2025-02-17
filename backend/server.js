import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoutes.js";

const app=express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();
//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.get("/",(req,res)=>{
    res.send("Welcome to the server");
})

app.listen(PORT,()=>{console.log("Server is running on port",PORT)});



