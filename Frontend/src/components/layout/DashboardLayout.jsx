import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {

    return (

        <div className="min-h-screen bg-[#0d1117]">

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10">

                {children}

            </main>

        </div>

    );

};

export default DashboardLayout;