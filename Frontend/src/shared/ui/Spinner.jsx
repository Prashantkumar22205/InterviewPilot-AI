const Spinner = ({
    size = "md",
    className = "",
    fullScreen = false,
    text = "",
}) => {

    const sizes = {
        sm: "h-5 w-5 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
    };

 

    const spinner = (
        <div
            className={`
                ${sizes[size]}
                animate-spin
                rounded-full
                border-blue-500
                border-t-transparent
                ${className}
            `}
        />
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d1117]">
                {spinner}

                {text && (
                    <p className="mt-4 text-gray-400 animate-pulse">
                        {text}
                    </p>
                )}
            </div>
        );
    }

    return spinner;
};

export default Spinner;