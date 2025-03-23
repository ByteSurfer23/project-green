const express = require("express");
const green = require("../schema/GreenSchema.js");

const router = express.Router();

router.post("/green-fetch", async (req, res) => {
  try {
    console.log(req.body);
    const { name, area, latitude, longitude, visitUrl, imageUrl } = req.body;

    const newGreen = new green({
      name,
      area,
      latitude,
      longitude,
      visitUrl,
      imgUrl: imageUrl,
    });

    await newGreen.save();
    return res.json({ message: "Plant data saved successfully!", plant: newGreen });

  } catch (error) {
    console.error("Filter Error:", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
