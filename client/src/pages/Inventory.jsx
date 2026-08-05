import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";


const Inventory = () => {
    const [search, setSearch] = useState("");
     const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 5;
   

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);
useEffect(() => {

    setCurrentPage(1);

}, [search, statusFilter]);

    const getStatus = (quantity) => {

        if (quantity === 0) return "Out of Stock";

        if (quantity <= 5) return "Low Stock";

        return "In Stock";

    };
    const totalProducts = products.length;

const inStock = products.filter(
    (product) => product.quantity > 5
).length;

const lowStock = products.filter(
    (product) => product.quantity > 0 && product.quantity <= 5
).length;

const outOfStock = products.filter(
    (product) => product.quantity === 0
).length;
const filteredProducts = products.filter((product) => {

    const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

    let matchesStatus = true;

    if (statusFilter === "In Stock") {
        matchesStatus = product.quantity > 5;
    }

    if (statusFilter === "Low Stock") {
        matchesStatus =
            product.quantity > 0 &&
            product.quantity <= 5;
    }

    if (statusFilter === "Out of Stock") {
        matchesStatus = product.quantity === 0;
    }

    return matchesSearch && matchesStatus;
});
const indexOfLastProduct = currentPage * productsPerPage;

const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
);

const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
);

    return (

        <div>

            <h1>Inventory</h1>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

    <div style={{ border: "1px solid black", padding: "15px" }}>
        <h3>Total Products</h3>
        <h2>{totalProducts}</h2>
    </div>

    <div style={{ border: "1px solid black", padding: "15px" }}>
        <h3>In Stock</h3>
        <h2>{inStock}</h2>
    </div>

    <div style={{ border: "1px solid black", padding: "15px" }}>
        <h3>Low Stock</h3>
        <h2>{lowStock}</h2>
    </div>

    <div style={{ border: "1px solid black", padding: "15px" }}>
        <h3>Out of Stock</h3>
        <h2>{outOfStock}</h2>
    </div>

</div>
<div
    style={{
        display: "flex",
        gap: "20px",
        marginBottom: "20px",
        alignItems: "center",
    }}
>

    <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
            padding: "8px",
            width: "300px",
        }}
    />

    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
            padding: "8px",
        }}
    >
        <option value="All">All</option>
        <option value="In Stock">In Stock</option>
        <option value="Low Stock">Low Stock</option>
        <option value="Out of Stock">Out of Stock</option>
    </select>

</div>

          <div className="table-container">

    <table className="custom-table">

                <thead>

                    <tr>

                        <th>Product</th>
                        <th>SKU</th>
                        <th>Quantity</th>
                        <th>Status</th>
                         <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {currentProducts.map((product) => (

                        <tr key={product._id}>

                            <td>{product.name}</td>

                            <td>{product.sku}</td>

                            <td>{product.quantity}</td>

                       <td
    style={{
        color:
            product.quantity === 0
                ? "red"
                : product.quantity <= 5
                ? "orange"
                : "green",
        fontWeight: "bold",
    }}
>
    {getStatus(product.quantity)}
</td>
  <td>
               <button
    onClick={() => navigate(`/inventory/update/${product._id}`)}
>
    Update Stock
</button>
            </td>
                        </tr>

                    ))}

                </tbody>

            </table>
            </div>
            <div
    style={{
        marginTop: "20px",
        display: "flex",
        gap: "10px",
    }}
>
    {Array.from({ length: totalPages }, (_, index) => (
        <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
                padding: "8px 12px",
                backgroundColor:
                    currentPage === index + 1
                        ? "#007bff"
                        : "#f0f0f0",
                color:
                    currentPage === index + 1
                        ? "white"
                        : "black",
                border: "1px solid gray",
                cursor: "pointer",
            }}
        >
            {index + 1}
        </button>
    ))}
</div>

        </div>

    );

};

export default Inventory;