import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    getUserById,
    updateUser,
} from "../services/userService";

const EditUser = () => {
const { id } = useParams();

const navigate = useNavigate();

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const fetchUser = async () => {

    try {

        const response = await getUserById(id);

        const user = response.data;

       setFormData({
    name: user.name,
    email: user.email,
    role: user.role,
});

    } catch (error) {

        console.log(error);

    }

};
useEffect(() => {

    fetchUser();

}, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

       await updateUser(id, formData);

toast.success("User updated successfully!");

navigate("/users");

           

        } catch (error) {

            console.log(error);

            toast.error("Failed to update user");

        }

    };

    return (

        <div>

  
            <form onSubmit={handleSubmit}>

                <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
/>

<input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
/>

<select
    name="role"
    value={formData.role}
    onChange={handleChange}
>
    <option value="admin">Admin</option>
    <option value="manager">Manager</option>
    <option value="employee">Employee</option>
</select>
          

                <br /><br />
                          <button type="submit">
    Update User
</button>


         

            </form>

        </div>

    );

};

export default EditUser;