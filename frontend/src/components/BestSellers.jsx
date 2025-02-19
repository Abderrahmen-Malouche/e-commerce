import React from 'react'
import SubTitle from './SubTitle'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItem from './ProductItem'
import {useState,useEffect} from 'react'
const BestSellers = () => {
    const {products}=useContext(ShopContext)
    const [bestSellers,setBestSellers]=useState([])

    useEffect(()=>{
        setBestSellers(products.filter((product)=>product.bestSeller===true).slice(0,5))
    },[products])
    
  return (
    <div>
      <div className='text-3xl  my-10 py-2 flex justify-center'>

        <SubTitle text1="BEST" text2="SELLERS"/>
      </div>
        <div className='grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 '>
                {bestSellers.map((product,index)=>(
                    <ProductItem id={product._id} key={index} image={product.image[0]} title={product.name} price={product.price}/>
                ))}
            </div>
    </div>
  )
}

export default BestSellers