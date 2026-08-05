import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import {
    getProductById,
    updateProduct
} from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
    const { id } = useParams();
     const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        sku: "",
        category: ""
    });
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
    fetchCategories();
      fetchProduct();
}, []);
    const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
 
};
   const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

const fetchCategories = async () => {

    try {

        const response = await getCategories();

        setCategories(response.data);

    } catch (error) {

        console.log(error);

    }

};
const fetchProduct = async () => {

    try {

        const response = await getProductById(id);

        const product = response.data;

        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            sku: product.sku,
            category: product.category._id
        });

    } catch (error) {

        console.log(error);

    }

};
const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const productData = new FormData();

        productData.append("name", formData.name);
        productData.append("description", formData.description);
        productData.append("price", formData.price);
        productData.append("quantity", formData.quantity);
        productData.append("sku", formData.sku);
        productData.append("category", formData.category);

        if (image) {
            productData.append("image", image);
        }

        await updateProduct(id, productData);

        toast.success("Product Updated Successfully!");

        navigate("/products");

    } catch (error) {

        console.log(error);

        toast.error("Failed to update product");

    }

};
    return (
        <div style={{ maxWidth: "600px" }}>

            <h1>Edit Product</h1>

           <form onSubmit={handleSubmit}>

                <div>
                    <label>Product Name</label><br />
                   <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleChange}
/>
                </div>

                <br />

                <div>
                    <label>Description</label><br />
                    <textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
/>
                </div>

                <br />

                <div>
                    <label>Price</label><br />
                    <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleChange}
/>
                </div>

                <br />

                <div>
                    <label>Quantity</label><br />
                  <input
    type="number"
    name="quantity"
    value={formData.quantity}
    onChange={handleChange}
/>
                </div>

                <br />

                <div>
                    <label>SKU</label><br />
                    <input
    type="text"
    name="sku"
    value={formData.sku}
    onChange={handleChange}
/>
                </div>

                <br />

                <div>
                    <label>Category</label><br />
                  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
>
    <option value="">Select Category</option>
     {categories.map((category) => (
        <option
            key={category._id}
            value={category._id}
        >
            {category.name}
        </option>
    ))}
</select>
                </div>

                <br />

                <div>
                    <label>Product Image</label><br />
                    <input
    type="file"
    onChange={handleImageChange}
/>
                </div>

                <br />

                <button type="submit">
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default AddProduct;
