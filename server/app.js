const express = require("express");
const cors = require("cors");
const path=require("path");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const inventoryRoutes=require("./routes/inventoryRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/inventory",inventoryRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API is Running...");
});

module.exports = app;