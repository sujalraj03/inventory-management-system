const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const upload=require("../middleware/uploadMiddleware");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock
} = require("../controllers/productController");


router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.post(
    "/",
    protect,
    authorize("admin","manager"),
    upload.single("image"),
    createProduct
);
router.put(
    "/:id",
    protect,
    authorize("admin","manager"),
    upload.single("image"),
    updateProduct
);
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteProduct
);
router.put("/:id/stock", protect, authorize("admin", "manager"), updateStock);
module.exports = router;