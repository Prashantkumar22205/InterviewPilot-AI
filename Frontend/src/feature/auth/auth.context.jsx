import { createContext,useState,useEffect } from "react";
import { getMe,login,register,logout,changePassword,googleLogin} from "./services/auth.api";
import { notify } from "../../shared/utils/toast";

export const AuthContext = createContext( )

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [loading , setLoading] = useState(true)


    const handleGetMe = async () => {
    try {
        const data = await getMe();
        setUser(data.user);
        return data.user;
    } catch (err) {
        setUser(null);
    } finally {
        setLoading(false);
    }
};

    const handleLogin = async ({email,password}) => {
        setLoading(true)
        try {
            const data = await login({email,password})
            setUser(data.user)
            // return data.user
        } catch (err) {
            console.error(err.response?.data || err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

       const handleRegister = async({username,email,password})=>{
         setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
        } catch (err) {
             throw err
        } finally {
            setLoading(false)
        }
    }

     const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    const handleChangePassword = async({currentPassword, newPassword }) => {

    setLoading(true);

    try {
        const data = await changePassword({
            currentPassword,
            newPassword
        });

        return data;

    } catch (err) {
        throw err;
    } finally {
        setLoading(false);
    }
};


    const handleGoogleLogin = async (credential) => {
    setLoading(true);

    try {
        const data = await googleLogin(credential);

        setUser(data.user);

        notify.success("Welcome back!");

        return data.user;

    } catch (err) {

        notify.error(
            err.response?.data?.message ||
            "Google login failed"
        );

        throw err;

    } finally {

        setLoading(false);

    }
};



    useEffect(() => {
      
    handleGetMe();
    }, []);

    

    return (
      < AuthContext.Provider value = {{user,loading,handleGetMe,handleLogin,handleRegister,handleLogout,handleChangePassword,handleGoogleLogin}}>
        {children}
      </AuthContext.Provider>

    )
}