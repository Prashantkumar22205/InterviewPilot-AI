import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { notify } from "../../../shared/utils/toast";

const GoogleButton = () => {
    const { handleGoogleLogin } = useAuth();
    const navigate = useNavigate();

    const onSuccess = async (credentialResponse) => {
        try {
            await handleGoogleLogin(credentialResponse.credential);
            navigate("/");

        } catch (err) {
            // handleGoogleLogin already shows the error toast
            console.error(err);
        }
    };

    return (
       <GoogleLogin
            onSuccess={onSuccess}
            onError={() => {
                console.error("Google login failed");
            }}
            theme="filled_black"
            shape="pill"
            size="large"
            width="370"
            useOneTap={false}
/>
    );
};

export default GoogleButton;