import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import SubTitle from "../components/SubTitle";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { NavLink } from "react-router";
const Cart = () => {
  const { products, currency, cartItems, updateQuantity, deliveryCost } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  useEffect(() => {
    let tempCartData = [];
    for (let productId in cartItems) {
      for (let item in cartItems[productId]) {
        tempCartData.push({
          id: productId,
          size: item,
          quantity: cartItems[productId][item],
        });
      }
    }
    setCartData(tempCartData);
  }, [cartItems]);
  return (
    <div className="border-t-[1px] border-gray-200 mt-6 p-10">
      <div className="flex justify-left items-center gap-6 text-2xl mb-10">
        <SubTitle text1="YOUR" text2="CART" />
      </div>
      <div className="flex flex-col items-left">
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => item.id === product._id
          );
          return (
            <div
              key={index}
              className=" gap-12 py-4 border-y-[1px] border-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] items-center md:grid-cols-[4fr_2fr_0.5frE]"
            >
              <div className="items-start flex gap-6">
                <img
                  src={productData.image[0]}
                  alt=""
                  className=" w-24 object-cover"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-800 font-semibold">
                    {productData.name}
                  </p>
                  <div className="flex gap-4 items-center">
                    <p className=" text-gray-700">
                      {currency}
                      {productData.price}
                    </p>
                    <div className="py-2 px-4 text-md text-gray-700 bg-gray-100 border-[1px] border-gray-300">
                      {item.size}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 flex justify-between gap-28 items-center">
                <input
                  type="number"
                  value={item.quantity}
                  className="py-[1px] px-2 text-lg outline-gray-200 border-[1px] border-gray-300 w-16"
                  min={1}
                  onChange={(e) =>
                    updateQuantity(item.id, item.size, parseInt(e.target.value))
                  }
                />

                <img
                  src={assets.bin_icon}
                  alt=""
                  className="w-5 cursor-pointer"
                  onClick={() => updateQuantity(item.id, item.size, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full md:w-[460px]">
          <CartTotal />
          <div className="flex justify-end gap-6 ">
            <NavLink to="/place_order">
              <button className="text-white py-3 px-6 bg-black cursor-pointer mt-10">
                PROCEED TO CHECKOUT
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
