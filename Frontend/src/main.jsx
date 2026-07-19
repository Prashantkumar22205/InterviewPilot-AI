import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./style.scss"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider
     clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}    >
    <App />
     <Toaster
      position="top-center"
      richColors
      closeButton
      duration={3000}
      theme="dark"
      
    />
    </GoogleOAuthProvider>
   </StrictMode>, 
)
