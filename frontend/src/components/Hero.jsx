import React from 'react'
import {assets} from "../assets/assets"
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center gap-6 border-gray-400 border-[1px] '>
        <div className='flex flex-1 flex-col justify-center items-center py-8 sm:py-0' >
            <div className='items-center flex flex-col sm:items-start justify-center gap-2'>

                <div className='flex gap-4 items-center justify-center'>
                    <div className='w-10 h-[2px] bg-gray-700 '></div>
                    <p className='text-md  text-gray-700 font-medium'>OUR BESTSELLERS</p>
                </div>
                <h1 className='text-5xl text-gray-700 prata-regular'>Latest Arrivals</h1>
                <div className='flex gap-4 items-center justify-center'>
                    <p className='text-base  text-gray-700 font-semibold'>SHOP NOW</p>
                    <div className='w-10 h-[1px] bg-gray-700'></div>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <img src={assets.hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero