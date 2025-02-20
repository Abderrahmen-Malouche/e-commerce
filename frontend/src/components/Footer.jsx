import React from 'react'
import {assets} from "../assets/assets"
const Footer = () => {
  return (
    <footer>
    <div className='flex flex-col mb-6  justify-center gap-14 sm:grid-cols-[3fr_1fr_1fr] sm:grid mt-36 px-10 sm:px-0'>
        <div className='flex flex-col gap-5'>
            <img src={assets.logo} width={120} alt="" />
            <p className='text-gray-600 w-full sm:w-2/3'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
</p>
        </div>
        <div className='flex flex-col gap-8'>
            <h1 className='font-semibold text-xl'>COMPANY</h1>
            <ul className='flex flex-col gap-2 text-gray-600 text-sm cursor-pointer'>
                <li>Home</li>
                <li>About us</li>
                <li>Delviery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='flex flex-col gap-8'>
            <h1 className='font-semibold text-xl'>GET IN TOUCH</h1>
            <ul className='flex flex-col gap-2 text-gray-600 text-sm cursor-pointer'>
                <li>+36705703460</li>
                <li>abderrahmenmalouchework@gmail.com</li>
                <li>Instagram</li>
            </ul>
        </div>
    </div>
        <div>

        <hr className='h-[1px] bg-gray-200'/>
        <p className='text-center font-medium text-sm py-8 '>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer