import React from 'react'

function SubTitle({text1,text2}) {
  return (
    
    <div className='flex items-center  gap-2 text-center'>
        <p className='text-gray-500 '>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='w-4 sm:w-10 h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default SubTitle