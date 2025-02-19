import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import {toast} from "react-toastify"
const Add = ({token}) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault();
    try{

      const formData = new FormData();
      formData.append("name",productName);
      formData.append("description",productDescription);
      formData.append("category",productCategory);
      formData.append("subCategory",productSubCategory);
      formData.append("price",productPrice);
      formData.append("sizes",JSON.stringify(productSizes));
      formData.append("bestSeller",bestSeller);
      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);
      
      const response = await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}});
      toast.success("Product added successfully")
      console.log(response.data)
    }catch(error){
      console.log(error); 
    }
  };
  return (
    <div className="flex flex-col gap-4 w-1/2 ">
      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <h1 className="text-gray-600">Upload Image</h1>
        <div className="flex  gap-4">
          <label htmlFor="image1">
            <img src={image1?URL.createObjectURL(image1):assets.upload_area} alt="" width={100} />
            <input type="file" id="image1" hidden onChange={(e)=>setImage1(e.target.files[0])} />
          </label>
          <label htmlFor="image2">
            <img src={image2?URL.createObjectURL(image2):assets.upload_area} alt="" width={100} />
            <input type="file" id="image2" hidden onChange={(e)=>setImage2(e.target.files[0])}/>
          </label>
          <label htmlFor="image3">
            <img src={image3?URL.createObjectURL(image3):assets.upload_area} alt="" width={100} />
            <input type="file" id="image3" hidden onChange={(e)=>setImage3(e.target.files[0])}/>
          </label>
          <label htmlFor="image4">
            <img src={image4?URL.createObjectURL(image4):assets.upload_area} alt="" width={100} />
            <input type="file" id="image4" hidden onChange={(e)=>setImage4(e.target.files[0])}/>
          </label>
        </div>
        <h1 className="text-gray-500">Product Name</h1>
        <input type="text" placeholder="Type Here" className="px-4 py-2 border-[1px] rounded-lg border-gray-300" value={productName} onChange={(e)=>setProductName(e.target.value)} required/>
        <h1 className="text-gray-500">Product Description</h1>
        <textarea required placeholder="Write content here " value={productDescription} onChange={(e)=>setProductDescription(e.target.value)} className="px-4 py-2 border-[1px] rounded-lg border-gray-300" />
        <div className="flex items-start lg:items-center flex-col lg:flex-row  gap-4 ">
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500 text-sm sm:text-base">Product category</h2>
            <select required name="category" id="category" onChange={(e)=>setProductCategory(e.target.value)} className="px-4 py-2 border-[1px] rounded-lg border-gray-300">
            <option value="" disabled selected>Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Sub category</h2>
            <select  required name="subCategory" id="subCategory" onChange={(e)=>setProductSubCategory(e.target.value)} className="px-4 py-2 border-[1px] rounded-lg border-gray-300">
              <option value="" disabled selected>Select</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-gray-500">Product Price</h2>
            <input type="number" required className="px-2 py-2 border-[1px] rounded-lg border-gray-300 w-1/2" value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-gray-500">Product Sizes</h1>
          <div className="flex gap-4">
            <p className={`${productSizes.includes("S")?"bg-pink-200":"bg-gray-200"} px-4 py-2 text-lg` } onClick={()=>setProductSizes(prev=> prev.includes("S")? prev.filter(item=>item!=="S"):[...prev,"S"])}>S</p>
            <p className={`${productSizes.includes("M")?"bg-pink-200":"bg-gray-200"} px-4 py-2 text-lg` } onClick={()=>setProductSizes(prev=> prev.includes("M")? prev.filter(item=>item!=="M"):[...prev,"M"])}>M</p>
            <p className={`${productSizes.includes("L")?"bg-pink-200":"bg-gray-200"} px-4 py-2 text-lg` } onClick={()=>setProductSizes(prev=> prev.includes("L")? prev.filter(item=>item!=="L"):[...prev,"L"])} >L</p>
            <p className={`${productSizes.includes("XL")?"bg-pink-200":"bg-gray-200"} px-4 py-2 text-lg` } onClick={()=>setProductSizes(prev=> prev.includes("XL")? prev.filter(item=>item!=="XL"):[...prev,"XL"])}>XL</p>
            <p className={`${productSizes.includes("XXL")?"bg-pink-200":"bg-gray-200"} px-4 py-2 text-lg` } onClick={()=>setProductSizes(prev=> prev.includes("XXL")? prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>XXL</p>
          </div>
        </div>
        <div className="flex gap-4">
            <input type="checkbox" id="bestSeller" name="bestSeller" checked={bestSeller}  onChange={() => setBestSeller((prev) => !prev)}/>
            <label htmlFor="bestSeller">Add to bestseller</label>
        </div>
        <button type="submit" className="text-white bg-black text-lg px-4 py-2 w-[100px]">Add</button>
      </form>
    </div>
  );
};

export default Add;
