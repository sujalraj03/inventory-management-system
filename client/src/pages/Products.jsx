import { useEffect, useState } from "react";
import { getProducts,deleteProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";
import { toast } from "react-toastify";
const Products = () => {

    const [products, setProducts] = useState([]);
       const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };
    const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

        await deleteProduct(id);

        fetchProducts();

    } catch (error) {

        console.log(error);

        toast.error("Failed to delete product");

    }

};

    return (
        <div>

  <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}
        >
            <h1>Products</h1>

            <button onClick={() => navigate("/products/add")}>
                Add Product
            </button>
        </div>

            

         <table
    style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
    }}
>
    <thead>
        <tr
            style={{
                background: "#333",
                color: "white"
            }}
        >
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Category</th>
            <th style={{ padding: "12px" }}>Price</th>
            <th style={{ padding: "12px" }}>Quantity</th>
            <th style={{ padding: "12px" }}>Image</th>
            <th style={{ padding: "12px" }}>Actions</th>
        </tr>
    </thead>

    <tbody>
        {products.map((product) => (
            <tr key={product._id}>
                <td style={{ padding: "10px" }}>{product.name}</td>

                <td style={{ padding: "10px" }}>
                    {product.category.name}
                </td>

                <td style={{ padding: "10px" }}>
                    ₹{product.price}
                </td>

                <td style={{ padding: "10px" }}>
                    {product.quantity}
                </td>

               <td>
    {product.image ? (
        <img
            src={`http://localhost:5000/uploads/products/${product.image}`}
            alt={product.name}
            width="80"
            height="80"
            style={{ objectFit: "cover", borderRadius: "5px" }}
        />
    ) : (
        "No Image"
    )}
</td>

                <td style={{ padding: "10px" }}>
                    <button
    onClick={() => navigate(`/products/edit/${product._id}`)}
>
    Edit
</button>

                    <button
                        style={{
                            marginLeft: "10px"
                        }}
                        onClick={() => handleDelete(product._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

        </div>
    );
};

export default Products;