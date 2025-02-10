import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import SubTitle from './SubTitle'
import ProductItem from './ProductItem'
import {useState,useEffect} from 'react'
const LatestCollection = () => {
    const {products}=useContext(ShopContext)
    const [latest,setLatest]=useState([])
    useEffect(()=>{
        setLatest(products.slice(0,10))
    },[])
  return (
    <div>
            <div className='text-3xl  my-10 py-2 flex justify-center'>
            <SubTitle text1="LATEST" text2="COLLECTION"/>
            </div>
            <div className='grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 '>
                {latest.map((product,index)=>(
                    <ProductItem id={product._id} key={index} image={product.image[0]} title={product.name} price={product.price}/>
                ))}
            </div>
    </div>
  )
}

export default LatestCollection