
import { createContext } from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryCost = 10;
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [token,setToken]=useState('')

    useEffect(()=>{
        getProducts()
    },[])

    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }
    },[token]
  )
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
      }
      catch(error){
        console.log(error)
        toast.error('An error occured')
      }
    }
  };
  const getCartTotal = () => {
    let total = 0;
    for (let productId in cartItems) {
      for (let size in cartItems[productId]) {
        total += cartItems[productId][size];
      }
    }
    return total;
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success){
        setProducts(response.data.products)
      }
      else{
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
     let cartData = structuredClone(cartItems);
     cartData[itemId][size] = quantity;
     setCartItems(cartData);
     if(token){
       try{
        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
       }
       catch(error){
        console.log(error);
        toast.error('An error occured')
       }
     }
  };

  const getUserCart = async (token)=>{
    try{
      const response=await axios.get(backendUrl+'/api/cart/get',{headers:{token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
      else{
        console.log(response.data.message)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  const getTotalCost = () => {
    let totalAmount = 0;
    let cartData = structuredClone(cartItems);
    for (const items in cartData) {
      for (const size in cartData[items]) {
        const product = products.find((product) => product._id === items);
        totalAmount += cartData[items][size] * product.price;
      }
    }
    return totalAmount;

  };
  const value = {
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
    getTotalCost,
    backendUrl,
    token,setToken,
    setCartItems,
    getUserCart
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
