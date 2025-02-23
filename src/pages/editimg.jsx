import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPlant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("common"); // "common" or "scientific"
  const [plantData, setPlantData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [image, setImage] = useState(null);


const handleSearch = async () => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_EDIT_SEARCH_URLPATH, {
      params: { [searchType]: searchQuery },
    });

    setPlantData((prev) => {
        console.log("Previous State:", prev); // Shows old state
        console.log("New State:", data[0]); // Shows new state
        return data[0];
      });
       
      setEditedData((prev) => {
        console.log("Previous State:", prev); // Shows old state
        console.log("New State:", data[0]); // Shows new state
        return data[0];
      });
  } catch (error) {
    console.error("Error fetching plant data:", error);
  }
};


  const uploadFile = async () => {
    if (!image) return editedData.imageUrl; // If no new image, keep the old URL

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      let cloudname = process.env.REACT_APP_CLOUD_NAME;
      let resource_type = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudname}/${resource_type}/upload`;

      const res = await axios.post(api, data);
      const secure_url = res.data.secure_url;
      return secure_url;
    } catch (error) {
      console.log(error);
      return editedData.imageUrl; // Fallback to old image if upload fails
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    const newImageUrl = await uploadFile();
    const updatedData = { ...editedData, imgUrl: newImageUrl };
    console.log(updatedData._id);
    console.log(process.env.REACT_APP_EDIT_SEND_URLPATH);
    try {
      // Using PUT for updating an existing resource
      const response = await axios.put(
        `${process.env.REACT_APP_EDIT_SEND_URLPATH}/${updatedData._id}`,
        updatedData
      );
      // Show a popup on successful update
      alert("Document updated successfully!");
      console.log("Updated Document:", response.data);
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating document!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Plant Data</h2>

        {/* Search Section */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search plant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="common">Common Name</option>
            <option value="scientific">Scientific Name</option>
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>

        {/* Edit Form */}
        {plantData && (
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className="mb-3">
              <label className="form-label">Scientific Name</label>
              <input type="text" className="form-control" name="scientificName" value={editedData.scientificName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Common Name</label>
              <input type="text" className="form-control" name="commonName" value={editedData.commonName} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Type of Plant</label>
              <input type="text" className="form-control" name="plantType" value={editedData.plantType} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Properties</label>
              <input type="text" className="form-control" name="properties" value={editedData.properties} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Family</label>
              <input type="text" className="form-control" name="family" value={editedData.family} onChange={handleChange} />
            </div>
            
            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Current Image</label>
              <div>
                <img src={editedData.imgUrl} alt="Plant" className="img-thumbnail" style={{ width: "150px" }} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Upload New Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            </div>

            <button type="submit" className="btn btn-success w-100">Update Plant</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPlant;
