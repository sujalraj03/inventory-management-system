const express = require("express");

const router = express.Router();
const authorize = require("../middleware/roleMiddleware");
const {protect} = require("../middleware/authMiddleware");

const {
    createInventoryTransaction,
    getInventoryTransactions
} = require("../controllers/inventoryController");

router.post("/", protect,authorize("admin", "manager"), createInventoryTransaction);
router.get("/", protect, getInventoryTransactions);

module.exports = router;