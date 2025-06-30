import React from 'react'
import NewsLetterBox from '../components/NewsLetterBox'
import SubTitle from '../components/SubTitle'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div className='flex flex-col gap-4  border-gray-200 border-t-[1px] p-4'>
      <div className='text-2xl mt-4 mb-8 flex justify-center'>
      <SubTitle text1="CONTACT" text2="US"/>
      </div> 
      <div className='flex flex-col md:flex-row justify-center gap-8 items-center mb-20'>
          <img src={assets.contact_img} width={500} alt="" />
          <div className=" flex flex-col gap-4 ">
              <p className='text-gray-600 font-semibold text-xl'>Our Store</p>
              <div>
                <p className='text-gray-500 font-medium'>1063 Sziv utca</p>
                <p className='text-gray-500 font-medium'>Budapest,Hungary</p>
              </div>
              <div>
                <p className='text-gray-500 font-medium'>Tel: (36)203521408</p>
                <p className='text-gray-500 font-medium'>Email: Louaybs@gmail.com</p>
              </div>
              <p className='text-gray-600 font-semibold text-xl'>Careers at Forever</p>
              <p className='text-gray-500 font-medium'>Learn more about our terms and job openings.</p>

              <button className='py-4 px-2 text-black border-[1px] border-black hover:text-white hover:bg-black cursor-pointer transition  ease-in-out'>Explore Jobs</button>
          </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact
