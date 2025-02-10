import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useState } from 'react'
import ProductItem from './ProductItem'
import SubTitle from './SubTitle'
const RelatedProducts = ({subCategory,category}) => {
    const {products}=useContext(ShopContext);
    const [relatedProducts,setRelatedProducts]=useState([])
    useEffect(()=>{
        const productCopy=products.slice();
        setRelatedProducts(productCopy.filter((product)=>product.category===category && product.subCategory===subCategory).slice(1,6))

    },[products,category,subCategory])
  return (
    <div>
            <div className='text-3xl  my-20 py-2 flex justify-center'>
            <SubTitle text1="RELATED" text2="PRODUCTS"/>
            </div>
            <div className='grid grid-cols-2 sd:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 '>
                {relatedProducts.map((product,index)=>(
                    <ProductItem id={product._id} key={index} image={product.image[0]} title={product.name} price={product.price}/>
                ))}
            </div>
    </div>
  )
}

export default RelatedProducts