import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";



 const  Protected =  ({children})=>{
       const {loading,user}=useAuth()

       if(loading){
           return( <main className="flex min-h-screen flex-col items-center justify-center bg-[#161616]">
                           <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          
                            <h1 className="mt-4 text-xl font-semibold text-gray-700 animate-pulse">
                               Loading...
                             </h1>
                         </main>)
       }

       if(!user){
          return <Navigate to={"/login"}/>
       }
       
       return children
}

export default Protected