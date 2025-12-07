import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role = "employee", tasks = [], name, secretKey } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  if (!secretKey || secretKey.trim().length < 3) {
    res.status(400);
    throw new Error("Secret key is required (minimum 3 characters)");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  // First user automatically becomes admin
  const userCount = await User.countDocuments();
  const finalRole = userCount === 0 ? "admin" : role;

  const normalizedName = name?.trim() || email.split("@")[0];
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: normalizedName,
    email,
    password: hashedPassword,
    role: finalRole,
    secretKey: secretKey.trim(),
    tasks,
  });

  res.status(201).json({
    user: sanitizeUser(user),
    token: generateToken({ id: user._id, role: user.role }),
    message: userCount === 0 ? "First user created as admin" : "User registered successfully",
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    user: sanitizeUser(user),
    token: generateToken({ id: user._id, role: user.role }),
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists && emailExists._id.toString() !== req.user._id.toString()) {
      res.status(409);
      throw new Error("Email already in use");
    }
    user.email = email;
  }

  if (name) {
    user.name = name;
  }

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  if (secretKey !== undefined) {
    if (!secretKey || secretKey.trim().length < 3) {
      res.status(400);
      throw new Error("Secret key must be at least 3 characters");
    }
    user.secretKey = secretKey.trim();
  }

  await user.save();

  res.json({ user: sanitizeUser(user) });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword, secretKey } = req.body;

  if (!email || !newPassword || !secretKey) {
    res.status(400);
    throw new Error("Email, new password, and secret key are required");
  }

  if (newPassword.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found with this email");
  }

  if (!user.secretKey) {
    res.status(400);
    throw new Error("Secret key not set for this account. Please contact administrator.");
  }

  // Compare secret key (case-sensitive)
  if (user.secretKey.trim() !== secretKey.trim()) {
    res.status(401);
    throw new Error("Invalid secret key");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({
    message: "Password reset successfully. Please login with your new password.",
  });
});

export const checkDatabaseStatus = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const adminCount = await User.countDocuments({ role: "admin" });

  res.json({
    isEmpty: userCount === 0,
    userCount,
    adminCount,
    message: userCount === 0
      ? "Database is empty. Please register to create the first admin account."
      : "Database has users.",
  });
});

