import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateStock,
} from "../services/productService";

const UpdateStock = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [quantity, setQuantity] = useState("");

    const fetchProduct = async () => {

        try {

            const response = await getProductById(id);

            setProduct(response.data);

            setQuantity(response.data.quantity);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchProduct();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateStock(id, Number(quantity));

            toast.success("Stock updated successfully!");

            navigate("/inventory");

        } catch (error) {

            console.log(error);

            toast.error("Failed to update stock");
        }

    };

    if (!product) {

        return <h2>Loading...</h2>;

    }

    return (

        <div>

            <h1>Update Stock</h1>

            <h3>{product.name}</h3>

            <p>SKU : {product.sku}</p>

            <form onSubmit={handleSubmit}>

                <label>Quantity</label>

                <br />

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    Update Stock
                </button>

            </form>

        </div>

    );

};

export default UpdateStock;