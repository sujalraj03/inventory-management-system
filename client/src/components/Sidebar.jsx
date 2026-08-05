import { Link, useLocation } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaWarehouse,
    FaUsers,
} from "react-icons/fa";

const Sidebar = () => {

    const location = useLocation();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />,
        },
        {
            name: "Products",
            path: "/products",
            icon: <FaBoxOpen />,
        },
        {
            name: "Categories",
            path: "/categories",
            icon: <FaTags />,
        },
        {
            name: "Inventory",
            path: "/inventory",
            icon: <FaWarehouse />,
        },
        {
            name: "Users",
            path: "/users",
            icon: <FaUsers />,
        },
    ];

    return (
        <div
            style={{
                width: "240px",
                minHeight: "100vh",
                background: "#1e293b",
                color: "white",
                padding: "25px 15px",
                boxSizing: "border-box",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "35px",
                }}
            >
                📦 Inventory Pro
            </h2>

            {menuItems.map((item) => (

                <Link
                    key={item.path}
                    to={item.path}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textDecoration: "none",
                        color: "white",
                        padding: "12px 15px",
                        marginBottom: "10px",
                        borderRadius: "10px",
                        background:
                            location.pathname === item.path
                                ? "#2563eb"
                                : "transparent",
                        transition: "0.3s",
                    }}
                >
                    <span style={{ fontSize: "18px" }}>
                        {item.icon}
                    </span>

                    <span>{item.name}</span>

                </Link>

            ))}

        </div>
    );
};

export default Sidebar;