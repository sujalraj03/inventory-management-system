import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleLogin = async () => {
        console.log(email);
console.log(password);

    try {
console.log("Sending request...");
        const response = await api.post("/auth/login", {
            email,
            password
        });
 console.log("Response:", response.data);
        localStorage.setItem("token", response.data.token);

       toast.success("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        toast.error(
    error.response?.data?.message || "Login Failed"
);

    }

};
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }}
        >
            <div
                style={{
                    width: "350px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px"
                }}
            >
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px"
                    }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px"
                    }}
                />

                <button
                 onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    Login
                </button>

            </div>
        </div>
    );
};

export default Login;