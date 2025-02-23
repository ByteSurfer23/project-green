import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("common"); // "common" or "scientific"
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    
    try {
      const { data } = await axios.get(process.env.REACT_APP_CLIENT_PLANTSEARCH, {
        params: { query: searchQuery, type: searchType }
      });

      if (data) {
        setPlantData(data);
    
      } else {
        setPlantData(null);
        setError("No plant found.");
      }
    } catch (err) {
      console.error("Search Error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Search Plants</h2>
        
        {/* Search Bar */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter plant name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="common">Common Name</option>
            <option value="scientific">Scientific Name</option>
          </select>
          <button className="btn btn-primary" onClick={handleSearch}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Display Results */}
        {plantData && (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{plantData.commonName} ({plantData.scientificName})</h5>
              <p className="card-text"><strong>Type:</strong> {plantData.plantType}</p>
              <p className="card-text"><strong>Properties:</strong> {plantData.properties}</p>
              <p className="card-text"><strong>Family:</strong> {plantData.family}</p>
              <p className="card-text"><strong>Latitude:</strong> {plantData.latitude}</p>
              <p className="card-text"><strong>Longitude:</strong> {plantData.longitude}</p>
              {plantData.imgUrl && <img src={plantData.imgUrl} alt="Plant" className="img-fluid rounded" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
