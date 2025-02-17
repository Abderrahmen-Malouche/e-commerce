import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex justify-between px-4 md:px-16 items-center p-4 border-b-[1px] border-gray-300 text-white'>
        <img src={assets.logo} width={170} alt="" />
        <button onClick={()=>setToken('')} className='border-1 px-6 py-2 rounded-full bg-gray-600 text-white '>Logout</button>
    </div>
  )
}

export default Navbar