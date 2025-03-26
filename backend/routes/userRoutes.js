const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../schema/UserSchema");


const router = express.Router();
const SECRET_KEY = process.env.SECURE_KEY; // Replace with a secure key

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(SECRET_KEY);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, { httpOnly: true }).json({ message: "Logged in" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Auth Check Route
// router.get("/auth", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "Not authenticated" });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).json({ message: "Invalid token" });
//     res.json({ message: "Authenticated" });
//   });
// });

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});

module.exports = router;
