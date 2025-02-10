    import React from 'react'
    import { useContext } from 'react'
    import { ShopContext } from '../Context/ShopContext'
    import SubTitle from './SubTitle'
    const CartTotal = () => {
        const {currency, cartItems, products,getTotalCost,deliveryCost} = useContext(ShopContext);
        
      return (
        <>
          <div className="flex justify-left items-center gap-6 text-2xl mb-10">
            <SubTitle text1="CART" text2="TOTAL"/>
          </div>
          <div className="flex flex-col gap-4 mt-2 text-sm">
              <div className="flex justify-between items-center gap-4 border-b-[1px] border-gray-200 w-full">
                <p >Subtotal</p>
                <p>{currency}{getTotalCost()||0}</p>
              </div>
              <div className="flex justify-between items-center gap-4 border-b-[1px] border-gray-200 w-full">
                <p >Shipping Fee</p>
                <p>{currency}{deliveryCost}</p>
              </div>
              <div className="flex justify-between items-center gap-4  w-full font-semibold">
                <p >Total</p>
                <p >{currency} {getTotalCost()==0?0:getTotalCost()+deliveryCost}</p>
              </div>
          </div>
          <div className="flex justify-end gap-6">

          <button className="text-white py-3 px-6 bg-black cursor-pointer mt-10">PROCEED TO CHECKOUT</button>
          </div>
      
        </>
      )
    }
    
    export default CartTotal