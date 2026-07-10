import axios from "axios"
const API = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL:`${API}/api/auth`,
    // baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function register({username,email,password}) {
    try{
         const responce = await api.post("/register",{
            username,email,password
         })

         return responce.data
    }
    catch(err){
        console.log(err)
        throw err
    }
}


export async function login({email,password}) {
    try {
        const response = await api.post("/login", {
            email,
            password
        })
        return response.data
    } catch (err) {
        console.error(err.response?.data || err.message)
        throw err
    }

}


export async function logout(){
     try{
        const responce = await api.get("/logout")

        return responce.data
     }
     catch(err){
        console.log(err)
     }
}


export async function getMe() {
    try {
        const responce = await api.get("/get-me")
        return responce.data
    } catch (err) {
        // console.log(err)
    }
}

export async function changePassword({currentPassword ,newPassword}){
    try{
        const responce = await api.patch("/change-password",{
            currentPassword ,newPassword
        })
        return responce.data

    }catch(err){
        console.error(err.response?.data || err.message);
        throw err; 
    }
}