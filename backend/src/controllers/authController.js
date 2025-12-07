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
  const { email, password, role = "employee", tasks = [], name } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const normalizedName = name?.trim() || email.split("@")[0];
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: normalizedName,
    email,
    password: hashedPassword,
    role,
    tasks,
  });

  res.status(201).json({
    user: sanitizeUser(user),
    token: generateToken({ id: user._id, role: user.role }),
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
  const { name, email, password } = req.body;

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

  await user.save();

  res.json({ user: sanitizeUser(user) });
});

