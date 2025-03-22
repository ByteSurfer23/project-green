const express = require("express");
const green = require("../schema/GreenSchema.js");

const router = express.Router();

router.post("/green-fetch", async (req, res) => {
  try {
    console.log(req.body);
    res.json();
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
