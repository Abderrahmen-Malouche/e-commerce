import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();// we need to add dotenv.config() to access the environment variables in the .env file.
const connectDB = async ()=>{
    mongoose.connection.on('connected', () => {
        console.log('DB connected!!!');
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectDB