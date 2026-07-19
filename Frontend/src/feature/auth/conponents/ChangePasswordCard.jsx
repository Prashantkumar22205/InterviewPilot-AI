import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../../../shared/ui/Spinner";
import { notify } from "../../../shared/utils/toast";




const ChangePasswordCard = () => {

    const { handleChangePassword ,loading} = useAuth();

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
   

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

 
    const handleChange = (e) => {
     setForm(prev => ({
         ...prev,
        [e.target.name]: e.target.value
       }));

     setErrors(prev => ({
        ...prev,
       [e.target.name]: ""
     }));

    
};


    const validate = () => {
    const newErrors = {};

    if (!form.currentPassword.trim()) {
        newErrors.currentPassword = "Current password is required.";
    }

    if (!form.newPassword.trim()) {
        newErrors.newPassword = "New password is required.";
    } else {
        if (form.newPassword.length < 8) {
            newErrors.newPassword =
                "Password must be at least 8 characters.";
        }

        if (!/[A-Z]/.test(form.newPassword)) {
            newErrors.newPassword =
                "Password must contain an uppercase letter.";
        }

        if (!/[a-z]/.test(form.newPassword)) {
            newErrors.newPassword =
                "Password must contain a lowercase letter.";
        }

        if (!/\d/.test(form.newPassword)) {
            newErrors.newPassword =
                "Password must contain a number.";
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword)) {
            newErrors.newPassword =
                "Password must contain a special character.";
        }
    }

    if (form.confirmPassword !== form.newPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};



const handleSubmit = async (e) => {
    e.preventDefault();

  
    setErrors({});

    if (!validate()) {
        console.log("validation failed");
        return;
    }

    try {
        const data = await handleChangePassword({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
        });


        
    console.log("change password response:", data);
    const msg =
    data?.message || data?.data?.message || "Password changed successfully";
    
  
    notify.success(data.message)
       

        setForm({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    } catch (err) {
        setErrors({
            currentPassword:
                err.response?.data?.message ||
                "Unable to change password."
        });
    }
};

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">

            <div className="flex items-center gap-3 mb-6">

                <Lock className="text-blue-500"/>

                <h2 className="text-2xl font-semibold text-white">
                    Change Password
                </h2>


            </div>
                {/* {success && (
                 <div className="mb-5 rounded-lg bg-green-500/20 border border-green-500 text-green-300 px-4 py-3">
                {success}
                 </div>
                )}
       */}

            <form onSubmit={handleSubmit}>

            {/* Current Password */}

            <div className="mb-5">

                <label className="text-sm text-gray-400">
                    Current Password
                </label>

                <div className="relative mt-2">

                    <input
                        type={showCurrent ? "text" : "password"}
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white outline-none"
                    />
                   
                    <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-3"
                    >
                        {showCurrent ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>

                </div>
                 {errors.currentPassword && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.currentPassword}
                           </p>
                        )}

            </div>

            {/* New Password */}

            <div className="mb-5">

                <label className="text-sm text-gray-400">
                    New Password
                </label>

                <div className="relative mt-2">

                    <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white outline-none"
                    />

                    <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-4 top-3"
                    >
                        {showNew ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>

                </div>
                  {errors.newPassword && (
                     <p className="text-red-500 text-sm mt-2">
                    {errors.newPassword}
                        </p>
                     )}

            </div>

            {/* Confirm Password */}

            <div>

                <label className="text-sm text-gray-400">
                    Confirm Password
                </label>

                <div className="relative mt-2">

                    <input
                        type={showConfirm ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-zinc-800 rounded-lg px-4 py-3 text-white outline-none"
                    />
                     
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-3"
                    >
                        {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>

                </div>
                {errors.confirmPassword && (
                     <p className="text-red-500 text-sm mt-2">
                      {errors.confirmPassword}
                         </p>
                       )}
  
            </div>

            <button
             type="submit"
              disabled={loading}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition   disabled:opacity-50
                disabled:cursor-not-allowed"
            >
                 {loading ? <Spinner size="sm"/> : "Change Password"}
            </button>
            </form>
        </div>
    );
};

export default ChangePasswordCard;