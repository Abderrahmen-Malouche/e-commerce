import React from 'react'
import { Link } from 'react-router'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
const ProductItem = ({id,image,title,price}) => {
    const {currency}=useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className='group flex flex-col items-start justify-between gap-2'>
            <div className='overflow-hidden'>
            <img src={image} alt="" className='hover:scale-110 transition ease-in-out'/>
            </div>
            <p className='text-sm text-gray-800'>{title}</p>
            <p className='text-sm  text-gray-800'>{currency} {price}</p>
    </Link>
  )
}

export default ProductItem