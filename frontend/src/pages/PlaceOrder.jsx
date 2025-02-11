import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import CartTotal from "../components/CartTotal";
import SubTitle from "../components/SubTitle";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router";

const PlaceOrder = () => {
  const { getTotalCost } = useContext(ShopContext);
  const [method,setMethod]=useState('cod');
  const navigate=useNavigate();
  return (
    <div className="border-t-[1px] border-gray-200 mt-6 flex flex-col md:flex-row justify-between items-start gap-20 py-20 px-4 ">
      <form id="delivery_form" className="w-full md:w-1/3 flex flex-col  mb-6 gap-2">
        <div className="text-xl pb-6">
          <SubTitle text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg "
            placeholder="First name"
            required
          />
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="Last name"
            required
          />
        </div>

        <input
          type="email"
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Email address"
          required
        />

        <input
          type="text"
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Street"
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="City"
            required
          />
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="State"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black  rounded-lg"
            placeholder="Zip code"
            required
          />
          <input
            type="text"
            className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
            placeholder="Country"
            required
          />
        </div>
        <input
          type="text"
          className=" p-2 border-[1px] border-gray-300 text-black rounded-lg"
          placeholder="Phone"
          required
        />
      </form>
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
              <button className="text-white py-2 px-12 bg-black cursor-pointer mt-10" onClick={()=>navigate('/orders')}>
                PLACE ORDER
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
