const express = require("express");
const Plant = require("../schema/PlantSchema");

const router = express.Router();

router.post("/plant-filter", async (req, res) => {
  try {
    const { references, ornamental, medicinal, family, genus, plantType } = req.body;
    
    let query = {};

    if (references) {
      query.$text = { $search: references.trim() };
    }

    const plants = await Plant.find(query, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });

    if (plants.length === 0) {
      return res.status(404).json({ message: "No matching plants found." });
    }

    res.json([plants]);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
