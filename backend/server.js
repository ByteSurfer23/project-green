const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Plant = require("./schema/PlantSchema");
const clientRoutes = require("./routes/clientRoutes");
const filterRoutes = require("./routes/plantFilters");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.use("/client", clientRoutes);
app.use("/api",filterRoutes);
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.post("/upload", async (req, res) => {
    console.log(req.body);
    const { 
      scientificName,
      commonName,
      genus,
      family,
      plantType,
      properties,
      medicinal,
      reference,
      imgUrl,
      latitude,
      longitude,
    } = req.body;
  
    try {
      const newPlant = new Plant({
        scientificName,
        commonName,
        genus,
        family,
        plantType,
        properties,
        medicinal,
        reference,
        imgUrl,
        latitude: latitude || null,
        longitude: longitude || null,
      });
  
      await newPlant.save();
      res.json({ message: "Plant data saved successfully!", plant: newPlant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error saving plant data" });
    }
  });

app.get("/search", async (req, res) => {
  try {
    const { common, scientific } = req.query;

    let query = {};
    if (common) query.commonName = new RegExp(common, "i");
    if (scientific) query.scientificName = new RegExp(scientific, "i");

    const plants = await Plant.find(query);
    if (plants.length === 0) {
      return res.status(404).json({ message: "No plant found" });
    }

    res.json(plants);
  } catch (error) {
    console.error("Error searching plants:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json({ message: "Deletion successful!" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.put("/edit/:id" , async(req,res)=>{
  try{
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body, // Contains updated data
      { new: true } // Returns updated document
    );

    if (!updatedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res.json({ message: "Update successful!", plant: updatedPlant });
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:error});
  }
});





const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
