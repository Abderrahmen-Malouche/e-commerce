import React from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router";
import { useState , useEffect } from "react";

const SearchBar = () => {
  const { showSearch, setShowSearch, search, setSearch } = useContext(ShopContext);
  const [visible,setVisible]=useState(false)
  const location = useLocation();
  const path=location.pathname;
  useEffect(()=>{
    if(path.includes("collections")){
        setVisible(true)
    }
    else{
        setVisible(false)
    }
  },[path])
  
  return showSearch && visible? (
    <div className="text-center  border-t border-b bg-gray-50 py-2">
      <div className="inline-flex  items-center justify-center border border-gray-400 px-5 rounded-full py-2 mx-6 my-6 w-3/4 sm:w-1/2 ">
        <input
          type="text"
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          className="flex-1 outline-none  bg-inherit text-sm"
        />
        <img src={assets.search_icon} alt=" " className="w-4" />
      </div>
      <img src={assets.cross_icon} className="w-4 inline cursor-pointer"  alt="" onClick={()=>  setShowSearch(false)} />
    </div>
  ) : null;
};

export default SearchBar;
