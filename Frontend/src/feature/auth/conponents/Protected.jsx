import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Spinner from "../../../shared/ui/Spinner";


 const  Protected =  ({children})=>{
       const {loading,user}=useAuth()

       if(loading){
           return( 
            <Spinner
                  fullScreen
                  size="lg"
                  text="Loading..."
            />
           )
       }

       if(!user){
          return <Navigate to={"/login"}/>
       }
       
       return children
}

export default Protected