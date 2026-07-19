import { useState } from "react";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router";
import { useAuth } from "../../feature/auth/hooks/useAuth";
import { notify } from "../utils/toast";

const UserMenu = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const logout = async () => {
        try {
            await handleLogout();
            notify.success("Logged out successfully");
            navigate("/login");
        } catch (err) {
            notify.error("Logout failed");
        }
    };

    return (
        <div className="relative">

            {/* Button */}

            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-xl border border-[#2a3348] bg-[#161b22] px-4 py-2 hover:border-pink-500 transition"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600 text-white font-bold">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="text-left">
                    <p className="text-sm font-semibold">
                        {user?.username}
                    </p>
                </div>

                <ChevronDown size={18} />
            </button>

            {/* Dropdown */}

            {open && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-[#2a3348] bg-[#161b22] shadow-xl">

                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/settings");
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#21262d]"
                    >
                        <Settings size={18} />
                        Settings
                    </button>

                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#21262d]"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>

                </div>
            )}

        </div>
    );
};

export default UserMenu;