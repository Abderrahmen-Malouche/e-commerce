import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const navigate=useNavigate();
  const [currentState, setCurrentState] = useState("login");
  const {setToken,token,backendUrl,getUserCart}=useContext(ShopContext);
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const onSubmitHandler= async (e)=>{
    e.preventDefault();
    try{
      if(currentState =='signup'){
        const response = await axios.post(backendUrl + "/api/user/register",{name,email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
          
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + "/api/user/login",{email,password})
        if(response.data.success){
          localStorage.setItem("token",response.data.token)
          setToken(response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    }
    catch(error){
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/'),
      getUserCart(token)
    }
  },[token])
  return (
    <div className="border-t-[1px] border-gray-200 mt-6 py-20 flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex justify-center items-center gap-2 text-3xl  text-black">
        <p className="prata-regular">
          {currentState == "login" ? "Login" : "Sign Up"}
        </p>
        <hr className="h-[3px] w-8 bg-black" />
      </div>
      <form  onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full md:w-[400px] items-center">
        {currentState=="signup"&&<input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className=" text-black text-lg border-[1px] border-black px-4 py-2 w-full"
          placeholder="Name"
          required
        />}
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="email"
          className=" text-black text-lg border-[1px] border-black px-4 py-2 w-full"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          className=" text-black text-lg border-[1px] border-black px-4 py-2 w-full"
          placeholder="Password"
          required
        />
        <div className="flex justify-between items-center  text-sm w-full mb-6">
          <h1 className="cursor-pointer">Forgot your password?</h1>
          {currentState=="login"?
          <h1 className="cursor-pointer" onClick={()=>setCurrentState("signup")}>Create Account</h1>:
          <h1 className="cursor-pointer" onClick={()=>setCurrentState("login")}>Already have an account?</h1>}
        </div>

        <button type="submit" className="flex items-center justify-center text-white bg-black text-lg   px-8 py-2 rounded-sm">
          {currentState == "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
