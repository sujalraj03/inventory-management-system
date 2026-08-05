import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUser } from "../services/userService";

const AddUser = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "employee",
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createUser(formData);

            toast.success("User created successfully!");

            navigate("/users");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create user"
            );

        }

    };

    return (

        <div>

            <h2>Add User</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="employee">
                        Employee
                    </option>

                    <option value="manager">
                        Manager
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>

                <br /><br />

                <button type="submit">
                    Create User
                </button>

            </form>

        </div>

    );

};

export default AddUser;