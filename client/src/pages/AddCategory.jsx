import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../services/categoryService";

const AddCategory = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createCategory(formData);

            toast.success("Category Added Successfully!");

            navigate("/categories");

        } catch (error) {

            console.log(error);

            toast.error("Failed to add category");

        }

    };

    return (

        <div>

            <h1>Add Category</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Add Category
                </button>

            </form>

        </div>

    );

};

export default AddCategory;