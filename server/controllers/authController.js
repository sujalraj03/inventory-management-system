const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}
const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }
    const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);
const userData = user.toObject();
delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userData,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  registerUser,
  loginUser
};