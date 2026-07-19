
import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { AuthContext } from '../auth.context' 
import Spinner from '../../../shared/ui/Spinner'
import { notify } from '../../../shared/utils/toast'
import GoogleButton from '../conponents/GoogleButton'

const Login = () => {
  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email,setEmail ]= useState("")
  const [password,setPassword ]= useState("")
  // const [error,setError] = useState("")
  
 const handleSubmit = async (e) => {
        e.preventDefault()
        // setError("")
        try{
          await handleLogin({email,password})
        notify.success("Welcome back!");
        navigate("/");
        }catch(err){
            // setError(err.response?.data?.message || "Invalid email or password")
            notify.error(err.response?.data?.message || "Invalid email or password")
        }
        
    }

    if(loading){
      return( 
        <Spinner
           size='lg'
           fullScreen
           text='Loading ....'
        />
      )
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

          <button type='submit' className='rounded-full bg-red-500 h-[50px] text-white font-semibold active:scale-x-105 ease-in-out'>Login</button>
          {/* {error && <p className='text-sm text-red-500'>{error}</p>} */}
       </form>
       <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-700"></div>

            <span className="mx-4 text-sm text-gray-400">
                OR
            </span>

            <div className="flex-1 border-t border-gray-700"></div>
        </div>

           <GoogleButton />
       <p className='mt-4 text-sm text-gray-600'>Don't have an account? <Link to={"/register"} className='text-red-500' >Register</Link> </p>
    </div>

   </main>
  )
}

export default Login
