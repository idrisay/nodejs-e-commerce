const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
let SECRET = process.env.SECRET;

router.post("/check-login", async (req, res) => {
  let response = { loggedIn: false };
  try {
    const decoded = jwt.verify(req.body.access_token, SECRET);
    const { email, firstName, lastName, isAdmin } = await User.findOne({
      _id: decoded.userId,
    });
    response = { loggedIn: true, email, firstName, lastName, isAdmin, id: decoded.userId };
  } catch (error) {
    // console.log(error);
  }
  res.status(200).json({ message: "success", ...response });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create and send JWT
    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await newUser.save();

    // Create and send JWT
    const token = jwt.sign({ userId: newUser._id }, "secret", {
      expiresIn: "1d",
    });
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
