import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("common");
  const [ornamental, setOrnamental] = useState("");
  const [medicinal, setMedicinal] = useState("");
  const [family, setFamily] = useState("");
  const [genus, setGenus] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPlantData(null);

    try {
      const { data } = await axios.get("http://localhost:5000/api/plant-filter", {
        params: {
          references: searchQuery.trim() || "",
          ornamental: ornamental ? "true" : "",
          medicinal: medicinal ? "true" : "",
          family: family.trim() || "",
          genus: genus.trim() || "",
          plantType: plantType.trim() || "",
        },
      });

      if (data.length > 0) {
        setPlantData(data);
      } else {
        setError("No matching plants found.");
      }
    } catch (err) {
      console.error("Filter Error:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Search Plants</h2>
        
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter plant reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Genus"
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Plant Type"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
            />
            <select className="form-select mb-2" value={ornamental} onChange={(e) => setOrnamental(e.target.value)}>
              <option value="">Ornamental?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <select className="form-select mb-2" value={medicinal} onChange={(e) => setMedicinal(e.target.value)}>
              <option value="">Medicinal?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {plantData && (
          <div className="card mt-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{plantData.commonName} ({plantData.scientificName})</h5>
              <ul className="list-group list-group-flush">
                {Object.entries(plantData).map(([key, value]) => (
                  value && key !== "imgUrl" ? (
                    <li key={key} className="list-group-item">
                      <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}
                    </li>
                  ) : null
                ))}
              </ul>
              <p className="mt-2"><strong>Image Link:</strong> <a href={plantData.imgUrl} target="_blank" rel="noopener noreferrer">{plantData.imgUrl}</a></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
