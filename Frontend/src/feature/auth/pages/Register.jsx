import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Register = () => {
     
     const {loading,handleRegister} = useAuth()

     const [username,setUsername] = useState("")
     const [email,setEmail ]= useState("")
      const [password,setPassword ]= useState("")
      const [error,setError] = useState("")
      const navigate = useNavigate()
     const handleSubmit = async (e) => {
            e.preventDefault()
            setError("")
            try{
                await handleRegister({username,email,password})
                navigate('/login')
            }
            catch(err){
                setError(err.response?.data?.message || "email is already exist ")
            }
        }
  return (
   
      <main className='min-h-screen w-full flex items-center  bg-[#0d1117]  justify-center text-white '>

     <div className='w-full max-w-md rounded-3xl  p-8 bg-[#161b22]  shadow-lg'>
       <h1 className='mb-6 text-center text-4xl font-semibold'>Registration</h1>
       <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

        <div className='flex flex-col gap-2'>
            <label htmlFor="username" className='text-[20px]'>Username</label>
            <input className='h-[40px] rounded-[10px] border outline-none border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400'
            onChange={(e)=>{setUsername(e.target.value)}}
            type="text" name='username' placeholder='Enter username'  required/>
        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-[20px]'>Email</label>
            <input className='h-[40px] rounded-[10px] border outline-none border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400'
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email" name='email' placeholder='Enter email address' required />
        </div>
        
        <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-[20px]'>Password</label>
            <input className='h-[40px] rounded-[10px] border outline-none border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400'
              onChange={(e)=>{setPassword(e.target.value)}}
            type="password" name='password' placeholder='Enter password' required/>
        </div> 

        <button className='rounded-full bg-red-500 h-[50px]  active:scale-x-105 ease-in-out'>Register</button>
        {error && <p className='text-sm text-red-500'>{error}</p>}

     </form>
       <p>Already have an account? <Link to={"/login"} className='text-red-500' >Login</Link> </p>
    </div>

   </main>
  
  )
}

export default Register
