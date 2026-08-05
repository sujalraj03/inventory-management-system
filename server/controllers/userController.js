const User = require("../models/User");

const getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
const getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
const updateUser = async (req, res) => {

    try {

        const { name, email, role } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                role,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
           if (req.user.id === req.params.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account",
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    getUsers,
    getUserById,
     updateUser,
      deleteUser,
};