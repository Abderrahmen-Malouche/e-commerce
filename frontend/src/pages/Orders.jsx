import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import SubTitle from "../components/SubTitle";
const Orders = () => {
  const { products, currency } = useContext(ShopContext);
  return (
    <div className="border-t-[1px] border-gray-200 mt-6 p-10">
      <div className="flex justify-left items-center gap-6 text-2xl mb-10">
        <SubTitle text1="YOUR" text2="CART" />
      </div>
      <div className="flex flex-col items-left">
        {products.slice(1, 4).map((product, index) => {
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
                    <p>Size: M</p>
                    <p>Quantity: 1</p>
                  </div>
                  <p className="text-gray-400">
                    <span className="text-gray-700">Date: </span>
                    25, July,2024
                  </p>
                </div>
              </div>
              <div className="  flex  justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className={`min-w-2 h-2 rounded-full bg-green-400`}></p>
                  <p>Ready to Ship</p>
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
