import React from "react";

const variants = {
    primary:
        "bg-pink-600 hover:bg-pink-700 text-white",

    secondary:
        "bg-[#161b22] border border-[#2a3348] hover:border-pink-500 hover:bg-pink-500/10 text-white",

    danger:
        "bg-red-600 hover:bg-red-700 text-white",

    success:
        "bg-green-600 hover:bg-green-700 text-white",
};

const Button = ({
    children,
    variant = "primary",
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={`
                px-5
                py-3
                rounded-xl
                font-semibold
                transition-all
                duration-200
                active:scale-95
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${variants[variant]}
                ${className}
            `}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};

export default Button;