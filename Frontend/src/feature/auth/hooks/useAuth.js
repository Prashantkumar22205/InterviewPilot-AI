import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
// import { login,register,logout,getMe,changePassword } from "../services/auth.api";



export const useAuth = ()=>{
    const context = useContext(AuthContext)
    // const {user,setUser,loading,setLoading,handleLogin ,handleRegister,handleLogout,handleChangePassword}= context

      if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;

    // const handleLogin = async ({email,password}) => {
    //     setLoading(true)
    //     try {
    //         const data = await login({email,password})
    //         setUser(data.user)
    //         // return data.user
    //     } catch (err) {
    //         console.error(err.response?.data || err.message)
    //         throw err
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    // const handleRegister = async({username,email,password})=>{
    //      setLoading(true)
    //     try {
    //         const data = await register({ username, email, password })
    //         setUser(data.user)
    //     } catch (err) {
    //          throw err
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const handleLogout = async () => {
    //     setLoading(true)
    //     try {
    //         const data = await logout()
    //         setUser(null)
    //     } catch (err) {

    //     } finally {
    //         setLoading(false)
    //     }
    // }

//     const handleChangePassword = async({currentPassword, newPassword }) => {

//     setLoading(true);

//     try {
//         const data = await changePassword({
//             currentPassword,
//             newPassword
//         });

//         return data;

//     } catch (err) {
//         throw err;
//     } finally {
//         setLoading(false);
//     }
// };





    // return {user,loading, handleLogin,handleLogout,handleRegister,handleChangePassword}

}