const Product = require("../models/Product");
const Category = require("../models/Category");

const createProduct = async (req, res) => {
    console.log(req.file);
    console.log(req.body);
  try {
console.log("req.body:", req.body);
console.log("req.file:", req.file);
    const {
      name,
      description,
      price,
      quantity,
      sku,
      category
    } = req.body;

    // Check category exists
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    const image=req.file
    ? req.file.filename
    : "";

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      sku,
      category,
      image,
      createdBy: req.user.id
    });


    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category;

    const filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      filter.category = category;
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      data: products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProductById = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id)
            .populate("category", "name description")
            .populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const updateProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            quantity,
            sku,
            category
        } = req.body;

        const updateData = {
            name,
            description,
            price,
            quantity,
            sku,
            category
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const product = await Product.findByIdAndUpdate(

            req.params.id,

            updateData,

            {
                new: true,
                runValidators: true
            }

        );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({

            success: true,
            message: "Product updated successfully",
            data: product

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }

        res.status(200).json({

            success: true,
            message: "Product deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};
const updateStock = async (req, res) => {
    try {
        const { quantity } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.quantity = quantity;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock
};