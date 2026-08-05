import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Navbar />

            <div
                style={{
                    display: "flex"
                }}
            >
                <Sidebar />

                <div
                    style={{
                        flex: 1,
                        padding: "20px"
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;