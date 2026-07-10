import { useAuth } from "../hooks/useAuth";
import AccountCard from "../conponents/AccountCard";
import ChangePasswordCard from "../conponents/ChangePasswordCard";

const Settings = () => {

    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-[#111827] text-white">

            <div className="max-w-5xl mx-auto px-6 py-10">

                <h1 className="text-4xl font-bold mb-8">
                    Settings
                </h1>

                <AccountCard user={user} />
                
                <ChangePasswordCard/>

            </div>

        </div>
    );
};

export default Settings;