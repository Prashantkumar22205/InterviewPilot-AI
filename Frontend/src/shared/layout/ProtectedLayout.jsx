import { Outlet } from "react-router";
import Protected from "../../feature/auth/conponents/Protected";
import Navbar from "./Navbar";

const ProtectedLayout = () => {
    return (
        <Protected>
            <div className="min-h-screen bg-[#0d1117] text-white">

                <Navbar />

                <main className="max-w-7xl mx-auto px-6 py-8">
                    <Outlet />
                </main>

            </div>
        </Protected>
    );
};

export default ProtectedLayout;