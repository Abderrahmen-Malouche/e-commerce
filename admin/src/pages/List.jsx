import React from 'react'
import {useState,useEffect} from 'react';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
const List = ({token}) => {
  const [list,setList] = useState([]);
  useEffect(()=>{
    fetchList();
  },[]);
  const fetchList = async() => {
    try{

      const response = await axios.get(backendUrl+"/api/product/list");
      if(response.data.success){
        setList(response.data.products);
      }
      else{
        toast.error(response.data.message);
      }
    }catch(error){
      toast.error(error);
    }
  }
  const removeItem = async (id)=>{
    try{
      const response =await  axios.post(backendUrl+"/api/product/remove",{id},{headers:{token}});
      if(response.data.success){
        await fetchList();
        toast.success(response.data.message);
      }
      else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      toast.error(error);
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-gray-600 mb-2'>All Products list</h1>
      <div className='hidden md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center px-2 py-1 border-[2px] border-gray-200 bg-gray-100 text-gray-700 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
      </div>
      <div className='flex flex-col gap-2'>
        {
          list.map((product,index)=>(
            <div key={product._id} className='grid grid-cols-[1fr_2fr_1fr_1fr_1fr]  md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-2 items-center px-2 py-2 border-[2px] border-gray-200 bg-gray-100 text-gray-600 text-sm'>
                  <img src={product.image[0]} width={50} alt="" />
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{product.price}</p>
                  <p className='text-center text-xl cursor-pointer' onClick={()=>removeItem(product._id)}>X</p>
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default List