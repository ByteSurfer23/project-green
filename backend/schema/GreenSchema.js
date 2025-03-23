const mongoose = require("mongoose");

const GreenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  area: { type: String, required: true },
  imgUrl: { type: String, required: true },
  latitude: { type: String, default: null },
  longitude: { type: String, default: null },
  visitUrl: { type: String, default: null }, // New parameter added
});

module.exports = mongoose.model("Green", GreenSchema);
