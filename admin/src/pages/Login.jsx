import React from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { useState } from 'react'
import { toast ,Bounce} from 'react-toastify'
const Login = ({setToken}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const submitHandler = async (e) => {
        try{

            e.preventDefault()
            const response = await axios.post(backendUrl+'/api/user/adminlogin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(err){
            console.log(err);
            toast.error(error);
        }
    }
  return (
    <div className='flex justify-center items-center h-screen bg-gray-50'>
        <div className='bg-white p-10 rounded-lg shadow-lg w-[350px]'>
            <h2 className='text-2xl font-bold text-black'>
                Admin Panel
            </h2>
            <form  onSubmit={submitHandler} className='w-full mt-2 flex flex-col gap-2'>
                <label htmlFor="email" className='text-gray-700'>Email Address</label>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} id='email' type="email" className='border-[1px] border-gray-400 rounded-lg p-2' placeholder='Email Address' required />
                <label htmlFor="password" className='text-gray-700'>Password</label>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} id='password' type="password" className='border-[1px] border-gray-400 rounded-lg  p-2' placeholder='Password' required/>
                <button className='bg-black text-white py-2 rounded-lg mt-4' type="submit">Login</button>


            </form>
        
        </div>

    </div>
  )
}

export default Login