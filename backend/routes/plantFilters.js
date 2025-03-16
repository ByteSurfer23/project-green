const express = require("express");
const router = express.Router();
const Plant = require("../schema/PlantSchema");

// Route: Filter plants based on references and optional filters
router.get("/plant-filter", async (req, res) => {
  let { references, ornamental, medicinal, family, genus, plantType } = req.query;

  try {
    // Initialize query object
    let query = {};

    // Add references to query if provided
    if (references && references.trim()) {
      query.references = { $regex: new RegExp(references.trim(), "i") };
    }

    // Add optional filters if they are provided
    if (ornamental && ornamental.trim()) query.ornamental = ornamental.trim().toLowerCase() === "true";
    if (medicinal && medicinal.trim()) query.medicinal = medicinal.trim().toLowerCase() === "true";
    if (family && family.trim()) query.family = { $regex: new RegExp(family.trim(), "i") };
    if (genus && genus.trim()) query.genus = { $regex: new RegExp(genus.trim(), "i") };
    if (plantType && plantType.trim()) query.plantType = { $regex: new RegExp(plantType.trim(), "i") };

    // Fetch matching plants
    const plants = await Plant.find(query);

    if (plants.length === 0) {
      return res.status(404).json({ message: "No matching plants found." });
    }

    res.json(plants);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
