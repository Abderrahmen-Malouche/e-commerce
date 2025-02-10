import React from 'react'
import SubTitle from '../components/SubTitle'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div className='flex flex-col gap-4  border-gray-200 border-t-[1px] p-4'>
      <div className='text-2xl mt-4 mb-8 flex justify-center'>
      <SubTitle text1="ABOUT" text2="US"/>
      </div> 
      <div className='flex flex-col md:flex-row justify-between gap-8 items-center'>
          <div>
            <img src={assets.about_img} alt="" />
          </div>
          <div className='flex flex-col gap-6 text-gray-600 font-medium '>
            <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <h1 className='text-black font-semibold'>Our Mission</h1>
            <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
          </div>
      </div>
      <div className='text-2xl text-left mt-10 font-medium'>
      <SubTitle text1="WHY" text2="CHOOSE US"/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3  mt-8  p-4 text-sm '>
          <div className='flex flex-col  items-center sm:items-start gap-4 py-20 px-8 border-gray-200 border-[1px]'>
            <p className='text-black font-semibold'>Quality Assurance:</p>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='flex flex-col items-center sm:items-start   gap-4 py-20 px-8 border-gray-200 border-[1px]'>
            <p className='text-black font-semibold'>Quality Assurance:</p>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='flex flex-col  items-center sm:items-start  gap-4 py-20 px-8 border-gray-200 border-[1px]'>
            <p className='text-black font-semibold'>Quality Assurance:</p>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
      </div>
      <NewsLetterBox/>
    </div>  
  )
}

export default About