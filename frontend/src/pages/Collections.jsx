import React from 'react'
import {assets} from "../assets/assets"
import { useState ,useEffect} from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import SubTitle from '../components/SubTitle'
import ProductItem from '../components/ProductItem'
const Collections = () => {
  const [visibleFilters,setVisibleFilters] = useState(false)
  const {products,search,showSearch} = useContext(ShopContext);
  const [filterProducts,setFilterProducts]=useState(products)
  const [category,setCategory]=useState([])
  const [subCategory,setSubCategory]=useState([])
  const [sortType,setSortType]=useState("relavent")
  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setCategory((prev)=>prev.filter((item)=>item!==e.target.value)) 
    }
    else{
      setCategory((prev)=>[...prev,e.target.value])
    }
  }
  const toggleSubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory((prev)=>prev.filter((item)=>item!==e.target.value))
    }
    else{
      setSubCategory((prev)=>[...prev,e.target.value])
    }
  }
  const applyFilters=()=>{
    let productCopy=products.slice();

    if( search && showSearch){
      productCopy=productCopy.filter((product)=>product.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productCopy=productCopy.filter((product)=>category.includes(product.category))
    }
    if(subCategory.length>0){
      productCopy=productCopy.filter((product)=>subCategory.includes(product.subCategory))
    }
    setFilterProducts(productCopy)
  }
  const applySorting=()=>{
    let fpCopy=filterProducts.slice();
    switch(sortType){
      case "lowtohigh":
        fpCopy.sort((a,b)=>a.price-b.price)
        break;
      case "hightolow":
        fpCopy.sort((a,b)=>b.price-a.price)
        break;
      default:
        fpCopy = products.slice()
        applyFilters();
        break;
      }
      setFilterProducts(fpCopy)
  }
    useEffect(()=>{ 
      applyFilters()
    },[category,subCategory,search,showSearch])
    useEffect(()=>{
      applySorting()
  },[sortType])
  
  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 border-t border-gray-300 pt-10 px-4 sm:px-0'>
        {/* Filters  */}
      <div className='min-w-60 flex flex-col gap-6 sm:gap-8'>
        <div className='flex items-center  gap-2 ' onClick={()=>setVisibleFilters(!visibleFilters)}>
        <p className='text-gray-900 font-medium  text-xl'>FILTERS
        </p>
        <img src={assets.dropdown_icon} className={`sm:hidden w-2 ${visibleFilters?"rotate-90 ":""}`} alt="" />
        </div>
        <div className={` flex-col gap-4 ${visibleFilters?"flex":"hidden"} sm:flex `}>

        <div className='border-[1px] border-gray-300 px-8 py-4  flex flex-col gap-3'>
          
              <p className=' text-gray-900 font-semibold text-sm '>CATEGORIES</p>
            <div className='flex flex-col gap-4'>
              <p className='flex gap-2 text-gray-500 text-xs'><input type="checkbox" value={"Men"} onChange={toggleCategory}/>Men</p>
              <p className='flex gap-2 2 text-gray-500 text-xs'><input type="checkbox" value={"Women"} onChange={toggleCategory}/>Women</p>
              <p className='flex gap-2 2 text-gray-500 text-xs'><input type="checkbox" value={"Kids"} onChange={toggleCategory}/>Kids</p>
            </div>

        </div>
        <div className='border-[1px] border-gray-300 px-8 py-4 flex flex-col gap-3'>
          
              <p className=' text-gray-900 font-semibold text-sm '>TYPE</p>
            <div className='flex flex-col gap-4'>
              <p className='flex gap-2 text-gray-500 text-xs'><input type="checkbox" value={"Topwear"} onChange={toggleSubCategory}/>Topwear</p>
              <p className='flex gap-2 2 text-gray-500 text-xs'><input type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory}/>Bottomwear</p>
              <p className='flex gap-2 2 text-gray-500 text-xs'><input type="checkbox" value={"Winterwear"} onChange={toggleSubCategory}/>Winterwear</p>
            </div>

        </div>
        </div>

        
      </div>
        {/* Products */}
      <div className='flex flex-col gap-6 sm:gap-8 w-full'>
        <div className='flex justify-between items-center gap-4'>
        <div className='text-lg lg:text-3xl font-medium '>
        <SubTitle text1="ALL" text2="COLLECTIONS"/>
          </div>
          <select name="sorting" id="sorting" className='border-2 border-gray-400 px-4 py-3 text-sm rounded-md' onChange={(e)=>setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="lowtohigh">Sort by: Low to High</option>
            <option value="hightolow">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 '>
          {filterProducts.map((product,index)=>(
              <ProductItem id={product._id} key={index} image={product.image[0]} title={product.name} price={product.price}/>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collections