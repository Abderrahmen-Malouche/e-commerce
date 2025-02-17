import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import List from "./pages/List";
import Login from "./pages/Login";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(()=>{
    localStorage.setItem("token",token);
  },[token])
  return (
    <div className="min-h-screen bg-gray-50">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
              </Routes>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
