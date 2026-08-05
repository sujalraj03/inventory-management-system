import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Inventory from "./pages/Inventory";
import Users from "./pages/Users";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";

import UpdateStock from "./pages/UpdateStock";

import EditUser from "./pages/EditUser";

import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Routes>

            {/* Login */}
            <Route path="/" element={<Login />} />

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/products/add"
                    element={<AddProduct />}
                />

                <Route
                    path="/products/edit/:id"
                    element={<EditProduct />}
                />

                {/* Categories */}
                <Route
                    path="/categories"
                    element={<Categories />}
                />

                <Route
                    path="/categories/add"
                    element={<AddCategory />}
                />

                <Route
                    path="/categories/edit/:id"
                    element={<EditCategory />}
                />

                {/* Inventory */}
                <Route
                    path="/inventory"
                    element={<Inventory />}
                />

                <Route
                    path="/inventory/update/:id"
                    element={<UpdateStock />}
                />

                {/* Users */}
                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/users/edit/:id"
                    element={<EditUser />}
                />
            </Route>

            {/* 404 */}
            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default App;
