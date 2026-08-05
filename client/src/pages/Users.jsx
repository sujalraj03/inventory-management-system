import { useEffect, useState } from "react";
import { getUsers,deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";
import { toast } from "react-toastify";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

const usersPerPage = 5;
    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();
const indexOfLastUser = currentPage * usersPerPage;

const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = filteredUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
);

const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
);
    const fetchUsers = async () => {

        try {
            setLoading(true);

            const response = await getUsers();

            setUsers(response.data);
           
  

        } catch (error) {

            console.log(error);

        }finally {

        setLoading(false);

    }

    };
     const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await deleteUser(id);

            fetchUsers();

            toast.success("User deleted successfully!");

        } catch (error) {

    console.log(error);

    toast.error(
        error.response?.data?.message || "Failed to delete user"
    );

}

    };


    useEffect(() => {

        fetchUsers();

    }, []);
    useEffect(() => {

    setCurrentPage(1);

}, [search]);
if (loading) {

    return <h2>Loading...</h2>;

}


    return (

        <div>

            <h1>Users</h1>
            <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

            <div className="table-container">

    <table className="custom-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>
                        {currentUsers.length === 0 ? (

        <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
            </td>
        </tr>

    ) : (


                    currentUsers.map((user) => (

                        <tr key={user._id}>

                            <td>{user.name}</td>

                            <td>{user.email}</td>

                           <td>
    <span
        style={{
            background:
                user.role === "admin"
                    ? "#ef4444"
                    : user.role === "manager"
                    ? "#f59e0b"
                    : "#22c55e",
            color: "white",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "14px",
        }}
    >
        {user.role}
    </span>
</td>
                              <td>
<button
    style={{
        marginRight: "10px",
        padding: "6px 12px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }}
    onClick={() => navigate(`/users/edit/${user._id}`)}
>
    Edit
</button>

<button
    style={{
        padding: "6px 12px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    }}
    onClick={() => handleDelete(user._id)}
>
    Delete
</button>
 

    

            </td>

                        </tr>

                    ))
                )}

                </tbody>

            </table>
            </div>
<div>

    {Array.from({ length: totalPages }, (_, index) => (

        <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
        >
            {index + 1}
        </button>

    ))}

</div>
        </div>

    );

};

export default Users;