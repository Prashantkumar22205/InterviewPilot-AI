import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../feature/auth/hooks/useAuth";
import Button from "../ui/Button";
import { notify } from "../utils/toast";
import UserMenu from "./UserMenu";

const Navbar = () => {

    const navigate = useNavigate();

    const { handleLogout } = useAuth();

    const logout = async()=>{
        try{
           await handleLogout()
            navigate("/login")
            notify.success("Logged out successfully.")
        }catch(err){
            console.log(err)
        }
    }
    return (

        <header className="w-full border-b border-[#2a3348] bg-[#0d1117]">

            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">

                <h1
                    onClick={() => navigate("/")}
                    className="text-2xl font-bold text-white cursor-pointer hover:color:pink-500"
                >
                    InterviewPilot AI
                </h1>

                {/* <div className="flex items-center gap-3">

                    <Button
                        onClick={() => navigate("/settings")}
                         variant='secondary'
                        className="px-4 py-2 rounded-xl bg-[#161b22] "
                    >
                        <Settings size={18}/>
                    </Button>

                    <Button
                        onClick={logout}
                        variant='secondary'
                        className="px-4 py-2 rounded-xl "
                    >
                        <LogOut size={18}/>
                        
                    </Button>

                </div> */}
                <UserMenu />

            </div>

        </header>

    );
};

export default Navbar;