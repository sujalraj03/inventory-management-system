import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (
        <div
            style={{
                height: "70px",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 30px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
        >

            <div>
                <h2
                    style={{
                        margin: 0,
                        color: "#1e293b",
                    }}
                >
                    Inventory Dashboard
                </h2>

                <p
                    style={{
                        margin: 0,
                        color: "gray",
                        fontSize: "14px",
                    }}
                >
                    Welcome back 👋
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <FaUserCircle
                        size={30}
                        color="#2563eb"
                    />

                    <div>
                        <strong>Admin</strong>

                        <br />

                        <span
                            style={{
                                fontSize: "12px",
                                color: "gray",
                            }}
                        >
                            Administrator
                        </span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    <FaSignOutAlt />

                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;