import express from "express"
import {registerUser, loginUser, adminLogin} from "../controllers/userController.js";

const userRouter=express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.post("/adminlogin",adminLogin);
// For the above code , that means whenever we hit the /register endpoint with a POST request, the registerUser function from the userController.js file will be executed. Similarly, for the /login endpoint, the loginUser function will be executed, and for the /adminlogin endpoint, the adminLogin function will be executed.

export default userRouter;