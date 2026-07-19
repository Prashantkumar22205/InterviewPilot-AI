import { createBrowserRouter } from "react-router";
import Login from "./feature/auth/pages/Login"
import Register from "./feature/auth/pages/Register";
import Home from "./feature/interview/pages/Home";
import Interview from "./feature/interview/pages/interview"
import  Protected  from "./feature/auth/conponents/Protected";
import Settings from "./feature/auth/pages/Settings";
import ProtectedLayout from "./shared/layout/ProtectedLayout";


export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        element: <ProtectedLayout />,

        children: [

            {
                path: "/",
                element: <Home />
            },

            {
                path: "/settings",
                element: <Settings />
            },

            {
                path: "/interview/:interviewId",
                element: <Interview />
            }

        ]
    }
])