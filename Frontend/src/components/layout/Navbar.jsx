import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../feature/auth/hooks/useAuth";

const Navbar = () => {

    const navigate = useNavigate();

    const { handleLogout } = useAuth();

    const logout = async()=>{
        try{
           await handleLogout()
            navigate("/login")
        }catch(err){
            console.log(err)
        }
    }
    return (

        <header className="w-full border-b border-[#2a3348] bg-[#0d1117]">

            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold text-white cursor-pointer"
                >
                    InterviewPilot AI
                </h1>

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => navigate("/settings")}
                        className="px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#1f2635]"
                    >
                        <Settings size={18}/>
                    </button>

                    <button
                        onClick={logout}
                        className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600"
                    >
                        <LogOut size={18}/>
                    </button>

                </div>

            </div>

        </header>

    );
};

export default Navbar;