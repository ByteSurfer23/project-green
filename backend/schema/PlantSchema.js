const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  scientificName: { type: String, required: true },
  commonName: { type: String, required: true },
  plantType: { type: String, required: true },
  properties: { type: String, required: true },
  family: { type: String, required: true },
  imgUrl: { type: String, required: true },
  latitude: { type: String, default : null  },
  longitude: { type: String, default : null },
});

module.exports = mongoose.model("Plant", PlantSchema);
