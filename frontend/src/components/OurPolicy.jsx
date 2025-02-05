import React from 'react'
import {assets} from '../assets/assets';
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-around sm:gap-6 mt-28 mb-20 gap-12 text-center'>
            <div className='flex flex-col items-center justify-center  '>
                    <img src={assets.exchange_icon} alt="" className='pb-4' width={50} />
                    <p className='font-semibold text-lg text-gray-700'>Easy Exchange Policy</p>
                    <p className='text-gray-400 text-lg '>We offer hassle free exchange policy</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                    <img src={assets.quality_icon} alt="" className='pb-4' width={50} />
                    <p className='font-semibold text-lg text-gray-700'>7 Days Return Policy</p>
                    <p className='text-gray-400 text-lg '>We provide 7 days free return policy</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                    <img src={assets.support_img} alt="" className='pb-4'  width={50}/>
                    <p className='font-semibold text-lg text-gray-700'>Best customer support</p>
                    <p className='text-gray-400 text-lg '>we provide 24/7 customer support</p>
            </div>
    </div>
  )
}

export default OurPolicy