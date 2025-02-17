import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();// we need to add dotenv.config() to access the environment variables in the .env file.
const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
};

export default connectCloudinary;