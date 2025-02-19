import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import axios from "axios";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(backendUrl + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while fetching orders");
    }
  };
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.put(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured while updating status");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [token]);
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-gray-600 mb-2">All Products list</h1>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span>{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {" "}
                        {item.name} x {item.quantity} <span>{item.size}</span> ,{" "}
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    " " +
                    order.address.country +
                    " " +
                    order.address.zipCode +
                    " "}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold border-[2px] border-gray-400 "
            >
              <option value="OrderPlaced">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
