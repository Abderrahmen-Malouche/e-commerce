import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cartData:{type:Object, default:{}},
},{minimize:false}); // We add this minimize false because when we create a new model with mongoose if there is an empty property it will be neglected. We want to keep the empty object in the cartData property. so we do this.


const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;