const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {

    try {

        const [
            totalProducts,
            totalCategories,
            totalUsers,
            lowStockProducts,
            outOfStockProducts,
            inStockProducts
        ] = await Promise.all([

            Product.countDocuments(),

            Category.countDocuments(),

            User.countDocuments(),

       // Out of stock
Product.countDocuments({
    quantity: 0
}),

// Low stock (1–9)
Product.countDocuments({
    quantity: { $gt: 0, $lt: 10 }
}),

// In stock (10 or more)
Product.countDocuments({
    quantity: { $gte: 10 }
})

        ]);
const productsByCategory = await Product.aggregate([
    {
        $group: {
            _id: "$category",
            count: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category"
        }
    },
    {
        $unwind: "$category"
    },
    {
        $project: {
            _id: 0,
            category: "$category.name",
            products: "$count"
        }
    }
]);
        res.status(200).json({

            success: true,

            data: {
                totalProducts,
                totalCategories,
                totalUsers,
                lowStockProducts,
                outOfStockProducts,
                   inStockProducts,
                   productsByCategory
                
            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {
    getDashboardStats
};