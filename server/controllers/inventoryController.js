const Inventory = require("../models/Inventory");
const Product = require("../models/Product");

const createInventoryTransaction = async (req, res) => {

    try {

        const {
            product,
            type,
            quantity,
            remarks
        } = req.body;

        const existingProduct = await Product.findById(product);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (type === "OUT" && existingProduct.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        const transaction = await Inventory.create({

            product,
            type,
            quantity,
            remarks,
            createdBy: req.user.id

        });

        if (type === "IN") {
            existingProduct.quantity += Number(quantity);
        } else {
            existingProduct.quantity -= Number(quantity);
        }

        await existingProduct.save();

        res.status(201).json({
            success: true,
            message: "Inventory updated successfully",
            data: transaction
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getInventoryTransactions = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalTransactions = await Inventory.countDocuments();

        const transactions = await Inventory.find()

            .populate("product", "name sku image")
            .populate("createdBy", "name email")

            .sort({ createdAt: -1 })

            .skip(skip)
            .limit(limit);

        res.status(200).json({

            success: true,

            page,

            totalPages: Math.ceil(totalTransactions / limit),

            totalTransactions,

            data: transactions

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    createInventoryTransaction,
    getInventoryTransactions
};