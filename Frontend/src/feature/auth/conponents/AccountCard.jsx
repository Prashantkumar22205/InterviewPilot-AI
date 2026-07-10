import React from "react";

const AccountCard = ({ user }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-semibold text-white mb-6">
                Account Information
            </h2>

            <div className="space-y-5">

                <div>
                    <label className="text-sm text-gray-400">
                        Username
                    </label>

                    <div className="mt-1 bg-zinc-800 rounded-lg px-4 py-3 text-white">
                        {user?.username || "Loading...."}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-gray-400">
                        Email Address
                    </label>

                    <div className="mt-1 bg-zinc-800 rounded-lg px-4 py-3 text-white">
                        {user?.email || "Loading...."}
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AccountCard;