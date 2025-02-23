const express = require("express");
const router = express.Router();
const Plant = require("../schema/PlantSchema");
// Route: Search for a plant using common or scientific name
router.get("/plant-search", async (req, res) => {
  const { query, type } = req.query;

  try {
    // Find plant based on search type
    const plant = await Plant.findOne({
      [type === "common" ? "commonName" : "scientificName"]: query,
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
