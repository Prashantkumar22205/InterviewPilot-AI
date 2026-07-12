import axios from "axios"
import api from "../../../shared/api/axios";


export async function register({username,email,password}) {
    try{
         const responce = await api.post("/api/auth/register",{
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
        const response = await api.post("/api/auth/login", {
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
        const responce = await api.get("/api/auth/logout")

        return responce.data
     }
     catch(err){
        console.log(err)
     }
}


export async function getMe() {
    try {
        const responce = await api.get("/api/auth/get-me")
        return responce.data
    } catch (err) {
        // console.log(err)
    }
}

export async function changePassword({currentPassword ,newPassword}){
    try{
        const responce = await api.patch("/api/auth/change-password",{
            currentPassword ,newPassword
        })
        return responce.data

    }catch(err){
        console.error(err.response?.data || err.message);
        throw err; 
    }
}