import React from "react";
import { useContext } from "react";
import CartTotal from "../components/CartTotal";
import SubTitle from "../components/SubTitle";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const {backendUrl,token,cartItems,setCartItems,getTotalCost,deliveryCost,products}=useContext(ShopContext)
  const [method,setMethod]=useState('cod');
  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })
  const onChangeHandler=(e)=>{
    const name =e.target.name;;
    const value=e.target.value;
    setFormData(data=>({...data,[name]:value}))
  }
  const navigate=useNavigate();
  const onSubmitHandler= async (e)=>{
    e.preventDefault();
   try{
    let orderItems=[];
    for(const  items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
          const itemInfo= structuredClone(products.find(product=>product._id===items));
          if(itemInfo){
            itemInfo.size= item;
            itemInfo.quantity=cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
        }
      }
      let orderData = {
        address : formData,
        items: orderItems,
        amount: deliveryCost + getTotalCost()
      }

      switch (method) {

        case "cod":
          try {
            const response = await axios.post(backendUrl + "/api/order/place", orderData, {
              headers: { token },
            });
            console.log(response.data);
            if (response.data.success) {  
              setCartItems({});
              navigate("/orders");
              toast.success("Order placed successfully.");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            console.error("Order placement failed:", error);
            toast.error("Something went wrong while placing the order.");
          }
          break;
        
        default:
          console.warn("Unhandled payment method:", method);
          toast.error("Invalid payment method selected.");
      }
    }

   catch(error){
     console.log(error);
   }
  }
  return (
    <form id="delivery_form" onSubmit={onSubmitHandler} className="border-t-[1px] border-gray-200 mt-6 flex flex-col md:flex-row justify-between items-start gap-20 py-20 px-4 ">
      <div  className="w-full md:w-1/3 flex flex-col  mb-6 gap-2" >
        <div className="text-xl pb-6">
          <SubTitle text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg "
            placeholder="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="Last name"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Email address"
          required
        />

        <input
          type="text"
          name="street"
          onChange={onChangeHandler}
          value={formData.street}
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Street"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="State"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            name="zipCode"
            onChange={onChangeHandler}
            value={formData.zipCode}
            className=" p-2 border-[1px] border-gray-300 text-black  rounded-lg"
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            name="country"
            onChange={onChangeHandler}
            value={formData.country}
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          name="phone"
          onChange={onChangeHandler}  
          value={formData.phone}
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Phone"
          required
        />
      </div>
      <div className="w-full md:w-1/3 text-center md:text-left flex flex-col gap-6 pt-12">
        <CartTotal/>
        <div>
          <div className="text-lg mb-6">
            <SubTitle text1="PAYMENT" text2="METHOD" />
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
              <div  onClick={()=>setMethod('stripe')} className="flex items-center gap-2 border  px-4 cursor-pointer">
                  <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==="stripe"?"bg-green-400":""}`}></p>
                  <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-2 border px-4 cursor-pointer">
                  <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==="razorpay"?"bg-green-400":""}`}></p>
                  <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
              </div>
              <div onClick={()=>setMethod('cod')} className="flex items-center gap-2 border px-4 py-1 cursor-pointer">
                  <p  className={`min-w-3.5 h-3.5 border rounded-full ${method==="cod"?"bg-green-400":""}`}></p>
                  <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
          </div>
          <div className="flex justify-end gap-6 ">      
              <button className="text-white py-2 px-12 bg-black cursor-pointer mt-10"  type="submit">
                PLACE ORDER
              </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
