import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EditPlant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("common");
  const [plantData, setPlantData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [image, setImage] = useState(null);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_EDIT_SEARCH_URLPATH, {
        params: { [searchType]: searchQuery },
      });
      setPlantData(data[0]);
      setEditedData(data[0]);
    } catch (error) {
      console.error("Error fetching plant data:", error);
    }
  };

  const uploadFile = async () => {
    if (!image) return editedData.imgUrl;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      let cloudname = process.env.REACT_APP_CLOUD_NAME;
      let api = `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`;
      const res = await axios.post(api, data);
      return res.data.secure_url;
    } catch (error) {
      console.log(error);
      return editedData.imgUrl;
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
    try {
      await axios.put(`${process.env.REACT_APP_EDIT_SEND_URLPATH}/${updatedData._id}`, updatedData);
      alert("Plant updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating plant data!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Edit Plant Data</h2>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search plant..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="common">Common Name</option>
            <option value="scientific">Scientific Name</option>
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
        {plantData && (
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <input type="text" className="form-control mb-3" name="scientificName" value={editedData.scientificName} onChange={handleChange} placeholder="Scientific Name" />
            <input type="text" className="form-control mb-3" name="commonName" value={editedData.commonName} onChange={handleChange} placeholder="Common Name" />
            <input type="text" className="form-control mb-3" name="genus" value={editedData.genus} onChange={handleChange} placeholder="Genus" />
            <input type="text" className="form-control mb-3" name="family" value={editedData.family} onChange={handleChange} placeholder="Family" />
            <input type="text" className="form-control mb-3" name="plantType" value={editedData.plantType} onChange={handleChange} placeholder="Plant Type" />
            <input type="text" className="form-control mb-3" name="properties" value={editedData.properties} onChange={handleChange} placeholder="Properties" />
            <input type="text" className="form-control mb-3" name="medicinal" value={editedData.medicinal} onChange={handleChange} placeholder="Medicinal Uses" />
            <input type="text" className="form-control mb-3" name="reference" value={editedData.reference} onChange={handleChange} placeholder="Reference" />
            {/* <input type="text" className="form-control mb-3" name="habitat" value={editedData.habitat} onChange={handleChange} placeholder="Habitat" />
            <input type="text" className="form-control mb-3" name="conservationStatus" value={editedData.conservationStatus} onChange={handleChange} placeholder="Conservation Status" />
            <textarea className="form-control mb-3" name="description" value={editedData.description} onChange={handleChange} placeholder="Description"></textarea> */}
            <div className="mb-3">
              <label className="form-label">Current Image</label>
              <div><img src={editedData.imgUrl} alt="Plant" className="img-thumbnail" style={{ width: "150px" }} /></div>
            </div>
            <input type="file" className="form-control mb-3" accept="image/*" onChange={handleImageChange} />
            <button type="submit" className="btn btn-success w-100">Update Plant</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPlant;
