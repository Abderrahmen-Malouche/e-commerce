import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour
};

// Route for user Login
const loginUser = async (req, res) => {
  const {email,password}=req.body;
  const exists=await userModel.findOne({email});
  try{
      if(!exists){
          return res.status(400).json({success:false,message:"User does not exist with this email"});
      }
      const passwordMatch=await bcrypt.compare(password,exists.password);
      if(!passwordMatch){
          return res.status(400).json({success:false,message:"Invalid password"});
      }
      const token=createToken(exists._id);
      return res.status(200).json({success:true,token});
  } 
  catch(error){
      console.log(error);
      return res.status(500).json({success:false,message:error.message});
  }
};

// Route for user Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    const user = await newUser.save();

    // Create a token for the user
    const token = createToken(user._id);

    // Send success response with token
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try{
    const {email,password} = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token=jwt.sign(email+password,process.env.JWT_SECRET);
      return res.status(200).json({success:true,token});
    }else{
      return res.status(400).json({success:false,message:"Invalid credentials"});
    }
  }
  catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:error.message});
  }
};

export { loginUser, registerUser, adminLogin };