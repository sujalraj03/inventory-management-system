import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
    getCategoryById,
    updateCategory
} from "../services/categoryService";

const EditCategory = () => {
const { id } = useParams();

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
    const fetchCategory = async () => {

    try {

        const response = await getCategoryById(id);

        const category = response.data;

        setFormData({
            name: category.name,
            description: category.description
        });

    } catch (error) {

        console.log(error);

    }

};
useEffect(() => {

    fetchCategory();

}, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

         await updateCategory(id, formData);

        toast.success("Category Updated Successfully!");

navigate("/categories");

           

        } catch (error) {

            console.log(error);

            toast.error("Failed to update category");

        }

    };

    return (

        <div>

  
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
    Update Category
</button>


         

            </form>

        </div>

    );

};

export default EditCategory;