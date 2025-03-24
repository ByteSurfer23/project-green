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


router.get("/green-search", async (req, res) => {
  const name = decodeURIComponent(req.query.name); // Decode the parameter
  console.log(name);
  
  try {
    const data = await green.findOne({name});
    return res.json( data || {});

  } catch (error) {
    console.error("Green Search Error", error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});



router.post("/green-edit", async (req, res) => {
  try {
    const { _id, ...updatedData } = req.body; // Extract _id from request body

    if (!_id) return res.status(400).json({ error: "ID is required" });

    const result = await green.findByIdAndUpdate(_id, updatedData, {
      new: true, // Return the updated document
      overwrite: true, // Replace existing document
    });

    if (!result) return res.status(404).json({ error: "Document not found" });

    res.json({ message: "Data updated successfully!", data: result });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/green-delete", async (req, res) => {
  try {
    const { name } = req.body;
    const deletedItem = await green.findOneAndDelete({ name });
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting item" });
  }
});


module.exports = router;
