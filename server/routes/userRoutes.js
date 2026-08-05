const express = require("express");

const router = express.Router();

const { getUsers,
     createUser,
     getUserById,
      updateUser,
        deleteUser,
 } = require("../controllers/userController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");
router.post(
    "/",
    protect,
    authorize("admin"),
    createUser
);
router.get(
    "/",
    protect,
    authorize("admin"),
    getUsers
);
router.get(
    "/:id",
    protect,
    authorize("admin"),
    getUserById
);
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateUser
);
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteUser
);
module.exports = router;