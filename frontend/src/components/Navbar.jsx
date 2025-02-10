import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import { links } from "../constants/index";
import { NavLink } from "react-router";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch ,getCartTotal} = useContext(ShopContext);
  const [changePath, setChangePath] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const navigate=useNavigate();
  useEffect(() => {
    if (!path.includes("collections")) {
      setChangePath(true);
    } else {
      setChangePath(false);
    }
  }, [path]);
  const toggleSearch=()=>{
    setShowSearch(true);
    if(changePath){
      navigate("/collections")
    }
  }
  return (
    <header className="flex items-center justify-between py-6">
      <NavLink to="/">
        <img src={assets.logo} width={150} alt="" />
      </NavLink>
      <ul className="hidden md:flex items-center gap-6">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.path} className="">
              {({ isActive }) => (
                <div className="items-center flex flex-col gap-1">
                  <p
                    className={` text-lg font-normal ${
                      isActive ? "text-[#c586a5]" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                  </p>
                  <hr
                    className={`${
                      isActive ? "block border-[#c586a5]" : "hidden bg-gray-800"
                    } w-2/4 border-1`}
                  ></hr>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-6">
    
            <img
              src={assets.search_icon}
              width={20}
              alt=""
              className="cursor-pointer"
              onClick={() => toggleSearch() 
                
                }
            />
          
        <div className="group relative">
          <img
            src={assets.profile_icon}
            width={20}
            alt=""
            className="cursor-pointer"
          />
          <div className="absolute dropdown-menu right-0 bg-gray-100 p-4 hidden group-hover:block w-40">
            <p className="cursor-pointer hover:text-black hover:underline text-lg font-normal">
              My Profile
            </p>
            <p className="cursor-pointer hover:text-black hover:underline text-lg font-normal">
              Orders
            </p>
            <p className="cursor-pointer hover:text-black hover:underline text-lg font-normal">
              Logout
            </p>
          </div>
        </div>
        <NavLink to="/cart">
        <div className="relative ">
          <img
            src={assets.cart_icon}
            width={20}
            alt=""
            className="cursor-pointer"
          />
          <p className="text-xs bg-black text-white absolute -bottom-1 -right-1 rounded-full px-[2px]">
          {getCartTotal()}
          </p>
        </div>
        </NavLink>
        <img
          src={assets.menu_icon}
          width={20}
          alt=""
          className="block cursor-pointer md:hidden"
          onClick={() => setVisible(true)}
        />
      </div>
      <div
        className={` ${
          visible ? "flex" : "hidden"
        } absolute top-0 left-0 w-full h-full bg-gray-200  z-10  flex-col  gap-4 py-6 px-4 transform transition-transform duration-300 ease-in-out translate-x-0`}
      >
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => setVisible(false)}
        >
          <img
            src={assets.dropdown_icon}
            width={20}
            alt=""
            className="cursor-pointer self-end rotate-180"
          />
          <p className="text-gray-400 text-xl font-semibold">Back</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          {links.map((link, index) => (
            <NavLink
              to={link.path}
              className=""
              onClick={() => setVisible(false)}
            >
              {({ isActive }) => (
                <div className="items-center flex flex-col gap-1">
                  <p
                    className={` text-xl font-medium ${
                      isActive ? "text-[#c586a5]" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                  </p>
                  <hr
                    className={`${
                      isActive ? "block border-[#c586a5]" : "hidden bg-gray-800"
                    } w-2/4 border-2`}
                  ></hr>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
