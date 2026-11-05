import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../../shared/api/axios";

export default function VerifyEmail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasVerified = useRef(false);

    const [status, setStatus] = useState({
        loading: true,
        success: false,
        error: "",
    });

    useEffect(() => {
           if (hasVerified.current) return;

           hasVerified.current = true;

        const verifyEmail = async () => {
            const token = searchParams.get("token");

            if (!token) {
                setStatus({
                    loading: false,
                    success: false,
                    error: "Verification token is missing.",
                });
                return;
            }

            try {
                const res = await api.post("api/auth/verify-email", {
                    token,
                });

            

                setStatus({
                    loading: false,
                    success: true,
                    error: "",
                });
            } catch (err) {
               
                setStatus({
                    loading: false,
                    success: false,
                    error:
                        err.response?.data?.message ||
                        err.message ||
                        "Verification failed.",
                });
            }
        };

        verifyEmail();
    }, []);

    if (status.loading) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                    <div
                        className="spinner-border text-primary mb-3"
                        role="status"
                    />
                    <h4>Verifying your email...</h4>
                </div>
            </div>
        );
    }

    if (status.success) {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow p-4 text-center" style={{ maxWidth: 450 }}>
                    <h2 className="text-success mb-3">
                        ✅ Email Verified
                    </h2>

                    <p>
                        Your email has been verified successfully.
                    </p>

                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow p-4 text-center" style={{ maxWidth: 450 }}>
                <h2 className="text-danger mb-3">
                    ❌ Verification Failed
                </h2>

                <p>{status.error}</p>

                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}