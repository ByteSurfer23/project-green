import React, { useState } from "react";
import axios from "axios";

const GreenCoverForm = () => {
  const [selectedName, setSelectedName] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    latitude: "",
    longitude: "",
    visitUrl: "",
    imageUrl: ""
  });

  const uploadFile = async () => {
    if (!image) return ""; // Allow null image
    
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      const cloudname = process.env.REACT_APP_CLOUD_NAME;
      const api = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;
      const res = await axios.post(api, data);
      return res.data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      return "";
    }
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = await uploadFile();
      const updatedFormData = { ...formData, imageUrl: imgUrl };
      await axios.post(process.env.REACT_APP_GREEN_FETCH, updatedFormData);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error in uploading data", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value || "" });
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleFetch} className="mt-4">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="form-control"
            placeholder="Area"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            className="form-control"
            placeholder="Latitude"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            className="form-control"
            placeholder="Longitude"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="visitUrl"
            value={formData.visitUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="Visit URL"
          />
        </div>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0] || null)}
        />
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default GreenCoverForm;
