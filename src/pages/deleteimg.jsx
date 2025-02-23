import { useState } from "react";
import axios from "axios";

const DeletePlant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("common"); // "common" or "scientific"
  const [plantData, setPlantData] = useState(null);
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/search", {
        params: { [searchType]: searchQuery },
      });

      if (data) {
        setPlantData((prev) => {
            console.log("Previous State:", prev); // Shows old state
            console.log("New State:", data[0]); // Shows new state
            return data[0];
          });
           
        setMessage("");
      } else {
        setPlantData(null);
        setMessage("Plant not found");
      }
    } catch (error) {
      console.error("Error fetching plant data:", error);
      setMessage("Error fetching data");
    }
  };

  const handleDelete = async () => {
    if (!plantData) return;

    try {
      await axios.delete(`${process.env.REACT_APP_DELETE_URLPATH}/${plantData._id}`);
      setMessage("Deletion Successful ✅");
      setPlantData(null);
    } catch (error) {
      console.error("Error deleting plant:", error);
      setMessage("Error deleting plant ❌");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Delete Plant Data</h2>

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

        {/* Show Delete Button if Plant Found */}
        {plantData && (
          <div className="text-center">
            <h4>Plant Found: {plantData.commonName} ({plantData.scientificName})</h4>
            <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
          </div>
        )}

        {/* Message Display */}
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default DeletePlant;
