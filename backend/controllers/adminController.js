const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/jwt");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminId = process.env.ADMIN_ID;

const adminLogin = asyncHandler(async (req, res) => {
  const admin = ({ email, password } = req.body);
  try {
    if (email === adminEmail && password === adminPassword) {
      const token = generateToken({
        userId: adminId,
        email: adminEmail,
        role: "admin",
      });

      res.json({
        message: "Login Seuccessful",
        token,
        user: {
          email: adminEmail,
          id: adminId,
        },
      });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const getUser = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const edituser = async (req, res) => {
  const { name, email, phone } = req.body;
  const user = { name, email, phone };
  const userId = req.params.id;
  console.log("hitted", user, "userId", userId);
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(404);
      return res.json({ message: "User not found" });
    }
    if (name) existingUser.name = name;
    if (email) existingUser.email = email;
    if (phone) existingUser.phone = phone;

    if (req.file) {
      existingUser.profileImage = req.file.filename;
    }
    const updatedUser = await existingUser.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    res.status(500);
    res.json({ message: "Failed to update user", error: error.message });
  }
};

const createUser = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);

  const { name, email, password, phone } = req.body;
  console.log("this is the datas", name, email, password, phone);

  // Validate input
  if (!name || !email || !password || !phone) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const user = await User.create({
      message: "User created Successfully",
    name,
    email,
    password: hashedPassword,
    phone,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const removedUser = await User.findByIdAndDelete(userId);

    if (!removedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: removedUser });
  } catch (error) {
    console.error("Error deleting user:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { adminLogin, getUser, edituser, createUser, deleteUser };
