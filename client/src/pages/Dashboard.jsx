import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboardService";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import {
    FaBoxOpen,
    FaTags,
    FaUsers,
    FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await getDashboardStats();
            console.log(data);
            setStats(data);
        } catch (error) {
            console.log(error);
        }
    };

    if (!stats) return <h2>Loading...</h2>;

    const pieData = [
        {
            name: "In Stock",
            value: stats.inStockProducts,
        },
        {
            name: "Low Stock",
            value: stats.lowStockProducts,
        },
        {
            name: "Out of Stock",
            value: stats.outOfStockProducts,
        },
    ];

    const barData = stats.productsByCategory;

    const COLORS = [
        "#4CAF50",
        "#FFC107",
        "#F44336",
    ];

    return (
        <>
            <h1 style={{ marginBottom: "30px" }}>
                Dashboard
            </h1>

            {/* Dashboard Cards */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "40px",
                }}
            >
               <Card
    title="Products"
    value={stats.totalProducts}
    color="#4CAF50"
    icon={<FaBoxOpen size={35} />}
/>

<Card
    title="Categories"
    value={stats.totalCategories}
    color="#2196F3"
    icon={<FaTags size={35} />}
/>

<Card
    title="Users"
    value={stats.totalUsers}
    color="#FF9800"
    icon={<FaUsers size={35} />}
/>

<Card
    title="Low Stock"
    value={stats.lowStockProducts}
    color="#F44336"
    icon={<FaExclamationTriangle size={35} />}
/>

        
            </div>

            {/* Charts Section */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px",
                }}
            >
                {/* Pie Chart */}

                <div
                    style={{
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                        padding: "20px",
                        height: "420px",
                    }}
                >
                    <h2 style={{ marginBottom: "15px" }}>
                        Inventory Status
                    </h2>

                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label={({ name, value }) =>
                                    `${name}: ${value}`
                                }
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}

                <div
                    style={{
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                        padding: "20px",
                        height: "420px",
                    }}
                >
                    <h2 style={{ marginBottom: "15px" }}>
                        Products by Category
                    </h2>

                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="category" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="products"
                                fill="#2196F3"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

const Card = ({
    title,
    value,
    color,
    icon,
}) => {
    return (

<div
style={{
width:"240px",
height:"150px",
background:color,
color:"white",
borderRadius:"15px",
padding:"20px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
transition:"0.3s",
cursor:"pointer"
}}
>

<div>

<h3>{title}</h3>

<h1>{value}</h1>

</div>

<div>

{icon}

</div>

</div>

);
};

export default Dashboard;