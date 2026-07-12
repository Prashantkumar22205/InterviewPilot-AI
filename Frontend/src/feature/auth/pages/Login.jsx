
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import React,{useState} from 'react'
import { AuthContext } from '../auth.context' 

const Login = () => {
  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email,setEmail ]= useState("")
  const [password,setPassword ]= useState("")
  const [error,setError] = useState("")
  
 const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try{
          await handleLogin({email,password})
          navigate("/")
        }catch(err){
            setError(err.response?.data?.message || "Invalid email or password")
        }
        
    }

    if(loading){
      return( <main className="flex min-h-screen flex-col items-center justify-center bg-[#161616]">
                 <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>

                  <h1 className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
                     Loading...
                   </h1>
               </main>)
            }

  return (
   <main className='min-h-screen w-full flex items-center bg-[#0d1117]  justify-center text-white '>

     <div className='w-full max-w-md rounded-3xl  p-8 bg-[#161b22] shadow-lg'>

       <h1 className='mb-6 text-center text-4xl font-semibold'>Login</h1>

       <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-2'>
            <label htmlFor="email" className='text-[20px]'>Email</label>
            <input className='h-[40px] rounded-[10px] border outline-none border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400'
            onChange={(e)=>{ setEmail(e.target.value)}}
            type="email" name='email' placeholder='Enter email address' />
          </div>
        
          <div className='flex flex-col gap-2'>
            <label htmlFor="password" className='text-[20px]'>Password</label>
            <input className='h-[40px] rounded-[10px] border outline-none border-slate-300 bg-white px-3 text-slate-900 placeholder:text-slate-400'
             onChange={(e)=>{ setPassword(e.target.value)}}
            type="password" name='password' placeholder='Enter password' />
          </div> 

          <button className='rounded-full bg-red-500 h-[50px] text-white font-semibold active:scale-x-105 ease-in-out'>Login</button>
          {error && <p className='text-sm text-red-500'>{error}</p>}
       </form>
       <p className='mt-4 text-sm text-gray-600'>Don't have an account? <Link to={"/register"} className='text-red-500' >Register</Link> </p>
    </div>

   </main>
  )
}

export default Login
