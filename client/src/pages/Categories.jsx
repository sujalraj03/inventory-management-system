import { useEffect, useState } from "react";
import {
    getCategories,
    deleteCategory
} from "../services/categoryService";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";
import { toast } from "react-toastify";
const Categories = () => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const fetchCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchCategories();

    }, []);
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {

        await deleteCategory(id);

        toast.success("Category Deleted Successfully!");

        fetchCategories();

    } catch (error) {

        console.log(error);

        toast.error("Failed to delete category");

    }

};

    return (

        <div>

            <h1>Categories</h1>

           <button
    onClick={() => navigate("/categories/add")}
>
    Add Category
</button>

           <div className="table-container">

    <table className="custom-table">

                <thead>

                    <tr>

                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {categories.map((category) => (

                        <tr key={category._id}>

                            <td>{category.name}</td>

                            <td>{category.description}</td>

                            <td>

                               <button
    onClick={() => navigate(`/categories/edit/${category._id}`)}
>
    Edit
</button>

                                <button
    onClick={() => handleDelete(category._id)}
>
    Delete
</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </div>

        </div>

    );

};

export default Categories;