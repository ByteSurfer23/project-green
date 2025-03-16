const express = require("express");
const router = express.Router();
const Plant = require("../schema/PlantSchema");

// Route: Search for a plant using common or scientific name
router.get("/plant-search", async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({ message: "Query and type are required." });
  }

  try {
    // Normalize query
    const searchQuery = query.trim().toLowerCase();
    const searchField = type === "common" ? "commonName" : "scientificName";

    // Use regex for case-insensitive and partial matching
    const plant = await Plant.findOne({
      [searchField]: { $regex: new RegExp(searchQuery, "i") },
    });

    if (!plant) {
      return res.status(404).json({ message: "No plant found." });
    }

    res.json(plant);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
