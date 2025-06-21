import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center mt-10   '>
        <h1 className='text-2xl font-semibold text-gray-800'>Subscribe now & get 20% off</h1>
        <p className='text-gray-400 mt-3 text-lg'>Put your email down below , to get all the recent updates </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type="email" placeholder='Enter your email address' className='w-full sm:flex-1 outline-none' required />
            <button type="submit" className='bg-black text-white   px-10 py-4'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsLetterBox
