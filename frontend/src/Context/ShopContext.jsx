
import {products} from '../assets/assets';
import { createContext } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
export const ShopContext = createContext();

const ShopContextProvider = ({children})=>{
 
        const currency="$";
        const deliveryCost=10;
        const [search , setSearch]=useState('');
        const [showSearch,setShowSearch]=useState(true);
        const [cartItems,setCartItems]=useState({});
        
        const addToCart=async(productId,size)=>{
            if(!size){
                toast.error("Please select a size");
                return;
            }
            if(cartItems[productId]){
                if(cartItems[productId][size]){
                    cartItems[productId][size]+=1;
                }
                else{
                    cartItems[productId][size]=1;
                }
            }
            else{
                cartItems[productId]={};
                cartItems[productId][size]=1;
            }
            setCartItems({...cartItems});
            
        }
        const getCartTotal= ()=>{
            let total=0;
            for(let productId in cartItems){
                for(let size in cartItems[productId]){
                    total+=cartItems[productId][size];
                }
            }
            return total;
        }

        const updateQuantity=(productId,size,quantity)=>{
            setCartItems((prevCart) => {
                if (!prevCart[productId]) return prevCart; // Ensure the product exists
            
                const updatedCart = { ...prevCart };
                
                if (quantity === 0) {
                  delete updatedCart[productId][size]; // Remove the specific size
                  if (Object.keys(updatedCart[productId]).length === 0) {
                    delete updatedCart[productId]; // Remove product if no sizes left
                  }
                } else {
                  updatedCart[productId] = {
                    ...updatedCart[productId],
                    [size]: quantity,
                  };
                }
            
                return updatedCart;
              });

        }
        const getTotalCost =()=>{
            let totalAmount=0;
            for (const items in cartItems){
                for(const size in cartItems[items]){
                    const product=products.find((product)=>product._id===items);
                    totalAmount+=cartItems[items][size]*product.price;
                }
            }
            return totalAmount;
        }        
        const value={
            currency,
            deliveryCost,
            products,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartItems,
            addToCart,
            getCartTotal,
            updateQuantity,
            getTotalCost
        }
        return(
            <ShopContext.Provider value={value}>
                {children}
            </ShopContext.Provider>
        )

}

export default ShopContextProvider;