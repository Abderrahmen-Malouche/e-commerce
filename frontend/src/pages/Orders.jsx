import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import SubTitle from "../components/SubTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);
  const [orderData,setOrderData]=useState([]);
  const fetchOrderData=async()=>{
    try{
      if(!token) return null;
      const response = await axios.get(backendUrl+'/api/order/userorders',{headers:{token}})
      if(response.data.success){
        let allOrderItems=[];
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status;
            item['payment']=order.payment;
            item['date']=order.date;
            item['paymentMethod']=order.paymentMethod;
            allOrderItems.push(item);

          })
        })
        setOrderData(allOrderItems.reverse());
      }
      else{
        console.log(response.data.message)
      }
    } catch(error){
      console.log(error)
      toast.error('An error occured while fetching orders');
    }
  }
  useEffect(()=>{
    fetchOrderData();
  },[token])

  return (
    <div className="border-t-[1px] border-gray-200 mt-6 p-10">
      <div className="flex justify-left items-center gap-6 text-2xl mb-10">
        <SubTitle text1="YOUR" text2="CART" />
      </div>
      <div className="flex flex-col items-left">
        {orderData.map((product, index) => {
          return (
            <div
              key={index}
              className=" gap-12 py-4 border-y-[1px] flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div className="items-start flex gap-6 w-[40%]">
                <img src={product.image[0]} alt="" className=" w-16 md:w-20 " />
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-800 font-semibold">
                    {product.name}
                  </p>
                  <div className="flex gap-8 items-center text-gray-700">
                    <p className=" text-lg">
                      {currency}
                      {product.price}
                    </p>
                    <p>Size: {product.size}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                  <p className="text-gray-400">
                    <span className="text-gray-700">Date: </span>
                      {new Date(product.date).toDateString()}
                  </p>
                </div>
              </div>
              <div className="  flex  justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className={`min-w-2 h-2 rounded-full bg-green-400`}></p>
                  <p>{product.status}</p>
                </div>
                <button className="text-black border-[1px] font-medium border-black hover:text-white hover:bg-black px-6 py-2 rounded-sm">
                  Track Item
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
