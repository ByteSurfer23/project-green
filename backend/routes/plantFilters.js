const express = require("express");
const Plant = require("../schema/PlantSchema");

const router = express.Router();

router.post("/plant-filter", async (req, res) => {
  try {
    const { references,  medicinal, family, genus ,plantType , properties} = req.body;
    console.log(references);
    console.log(medicinal);
    console.log(family);
    console.log(genus);
    console.log(plantType);
    console.log(properties);

    let query = {};
    let projection = {};

    if (references || family || genus) {
      let searchTerms = [];
      if (references) searchTerms.push(references.trim());
      if (family) searchTerms.push(family.trim());
      if (genus) searchTerms.push(genus.trim());
      if(medicinal) searchTerms.push(medicinal.trim());
      query.$text = { $search: searchTerms.join(" ") };
      projection.score = { $meta: "textScore" };
    }

    
    if (plantType) query.plantType = plantType;
    if(properties) query.properties = properties;

    const plants = await Plant.find(query, projection)
      .sort(references || family || genus ? { score: { $meta: "textScore" } } : {});

    if (plants.length === 0) {
      return res.status(404).json({ message: "No matching plants found." });
    }

    res.json(plants);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
