

//  const AILoading = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-slate-950">
//       <div className="relative flex h-32 w-32 items-center justify-center">

//         {/* Outer glow */}
//         <div className="absolute h-24 w-24 animate-ping rounded-full bg-violet-500/20" />

//         {/* Rotating ring */}
//         <div className="absolute h-28 w-28 animate-spin rounded-full border-2 border-transparent border-t-violet-500 border-r-cyan-400" />

//         {/* Inner rotating ring */}
//         <div className="absolute h-20 w-20 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-purple-400 border-l-cyan-400" />

//         {/* AI Core */}
//         <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_35px_rgba(139,92,246,0.8)]">

//           <div className="h-4 w-4 animate-pulse rounded-full bg-white shadow-[0_0_15px_white]" />

//         </div>

//         {/* Orbiting dots */}
//         <div className="absolute h-full w-full animate-spin">
//           <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
//         </div>

//         <div className="absolute h-full w-full animate-[spin_2s_linear_infinite_reverse]">
//           <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
//         </div>

//       </div>
//     </div>
//   );
// };



import { useEffect, useState } from "react";

const AILoading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0d0d0d]">

      <div className="relative h-64 w-64">

        {/* ========================================
            OUTER ORBIT 1
        ======================================== */}
        <div
          className="
            absolute inset-0
            animate-[spin_3s_linear_infinite]
          "
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 200 200"
            fill="none"
          >
            <defs>
              <linearGradient
                id="gradient1"
                x1="0"
                y1="0"
                x2="200"
                y2="200"
              >
                <stop offset="0%" stopColor="#ff4d5a" />
                <stop offset="50%" stopColor="#a83d91" />
                <stop offset="100%" stopColor="#6955ff" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="url(#gradient1)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="110 443"
            />
          </svg>
        </div>


        {/* ========================================
            OUTER ORBIT 2
        ======================================== */}
        <div
          className="
            absolute inset-0
            animate-[spin_2.2s_linear_infinite_reverse]
          "
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 200 200"
            fill="none"
          >
            <defs>
              <linearGradient
                id="gradient2"
                x1="200"
                y1="0"
                x2="0"
                y2="200"
              >
                <stop offset="0%" stopColor="#7254ff" />
                <stop offset="50%" stopColor="#9b45a5" />
                <stop offset="100%" stopColor="#ff5562" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r="75"
              stroke="url(#gradient2)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="75 400"
            />
          </svg>
        </div>


        {/* ========================================
            OUTER ORBIT 3
        ======================================== */}
        <div
          className="
            absolute inset-0
            animate-[spin_1.7s_linear_infinite]
          "
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 200 200"
            fill="none"
          >
            <defs>
              <linearGradient
                id="gradient3"
                x1="0"
                y1="200"
                x2="200"
                y2="0"
              >
                <stop offset="0%" stopColor="#ff5562" />
                <stop offset="50%" stopColor="#c0488e" />
                <stop offset="100%" stopColor="#7254ff" />
              </linearGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r="62"
              stroke="url(#gradient3)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="55 335"
            />
          </svg>
        </div>


        {/* ========================================
            CENTER PERCENTAGE
        ======================================== */}
        <div
          className="
            absolute inset-0
            flex items-center justify-center
          "
        >
          <span
            className="
              text-4xl
              font-light
              tracking-tight
              text-white
            "
          >
            {progress}%
          </span>
        </div>

      </div>

    </div>
  );
};


 export default AILoading;