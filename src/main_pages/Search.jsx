import { useState } from "react";
import axios from "axios";

const Search = () => {
  const [scientificName, setScientific] = useState("");
  const [commonName, setCommon] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [family, setFamily] = useState("");
  const [genus, setGenus] = useState("");
  const [plantType, setPlantType] = useState("");
  const [medicinal, setMedicinal] = useState("");
  const [properties, setProperties] = useState("");
  const [plantData, setPlantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const plantTypes = [
    "Perennial shrub",
    "Tree",
    "Evergreen perennial",
    "Perennial herb",
    "Evergreen shrub",
    "Evergreen shrub or small tree",
    "Evergreen tree",
    "Tropical evergreen shrub",
    "Tall deciduous tree",
    "Epiphytic aroid root-climber",
    "Perennial bunch grass",
    "Perennial shrub, tree",
    "Woody shrub",
    "Shrub",
    "Evergreen, climbing shrub",
    "Herbaceous, succulent, perennial plant",
    "Herbaceous shrub",
    "Perennial evergreen shrub",
    "Herb",
    "Grass",
    "Succulent evergreen perennial",
    "Epiphytic fern",
    "Evergreen perennial herb",
    "Deciduous tree",
    "Neotropical tree",
    "Perennial succulent shrub",
    "Root climber",
    "Climber",
    "Evergreen fan palm",
    "Aromatic shrub",
    "Tropical shrub",
    "Aromatic deciduous shrub",
    "Evergreen plant",
    "Flowering plant",
    "Tropical clumping bamboo",
    "Perennial tree",
    "Evergreen Bamboo",
    "Large bushy shrub",
    "Erect shrub",
    "Rare flowering shrub",
    "Small, upright bush",
    "Cactus",
    "Large shrub",
    "Spreading plant",
    "Evergreen vining shrub",
  ];
  const propertyOptions = [
    "Ornamental plant",
    "Flowering plant",
    "Flowering seed plant",
    "Medicinal plant",
    "Ornamental and medicinal plant",
    "Medicinal, ornamental and economically important plant",
    "Tropical houseplant",
    "Fruit tree",
    "Medicinal and vegetable plant",
    "Ornamental and indoor plant",
    "Shade tree",
    "Fiber plant",
    "Medicinal and fruit plant",
    "Wood tree",
    "Fruit plant",
    "Medicinal, wood, fruit plant",
    "Food plant",
  ];

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPlantData([]);
    setCurrentPage(1);

    try {
      const response = await axios.post(
        process.env.REACT_APP_CLIENT_PLANTFILTER,
        {
          scientificName: scientificName.trim() || "",
          commonName: commonName.trim() || "",
          references: searchQuery.trim() || "",
          medicinal: medicinal.trim() || "",
          family: family.trim() || "",
          genus: genus.trim() || "",
          plantType: plantType.trim() || "",
          properties: properties.trim() || "",
        }
      );

      if (response.data.length > 0) {
        setPlantData(response.data);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = plantData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(plantData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Search Plants</h2>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control small-text"
            placeholder="Enter Scientific Name"
            value={scientificName}
            onChange={(e) => setScientific(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control small-text"
            placeholder="Enter Common Name"
            value={commonName}
            onChange={(e) => setCommon(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control small-text"
            placeholder="Enter plant reference..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-2 small-text"
              placeholder="Family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2 small-text"
              placeholder="Genus"
              value={genus}
              onChange={(e) => setGenus(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select mb-2 small-text"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
            >
              <option value="">Select Plant Type</option>
              {plantTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control mb-2 small-text"
              placeholder="Medicinal"
              value={medicinal}
              onChange={(e) => setMedicinal(e.target.value)}
            />
            <select
              className="form-select mb-2 small-text"
              value={properties}
              onChange={(e) => setProperties(e.target.value)}
            >
              <option value="">Select Properties</option>
              {propertyOptions.map((prop, index) => (
                <option key={index} value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {currentItems.length > 0 && (
          <div className="mt-4">
            {currentItems.map((plant, index) => (
              <div key={index} className="card mt-3 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{plant.scientificName}</h5>
                  <ul className="list-group list-group-flush">
                    {Object.entries(plant).map(([key, value]) => {
                      if (["imgUrl", "_id", "score","__v","visitUrl"].includes(key)) return null;

                      if (key === "medicinal") {
                        return (
                          <li key={key} className="list-group-item small-text">
                            <strong>Medicinal Properties:</strong>{" "}
                            {value || "N/A"}
                          </li>
                        );
                      }
                      


                      
                      if (["latitude", "longitude"].includes(key)) {
                        return (
                          <li key={key} className="list-group-item small-text">
                            <strong>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong>{" "}
                            {value || "N/A"}
                          </li>
                        );
                      }

                      const formattedKey =
                        key === "reference"
                          ? "References"
                          : key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase());

                      return (
                        <li key={key} className="list-group-item small-text">
                          <strong>{formattedKey}:</strong> {value || "N/A"}
                        </li>
                      );
                    })}
                  </ul>


                  {plant.visitUrl && (
                    <p className="mt-2 small-text">
                      <strong>Visit plant :</strong>{" "}
                      <a
                        href={plant.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plant.visitUrl}
                      </a>
                    </p>
                  )}


                  {plant.imgUrl && (
                    <p className="mt-2 small-text">
                      <strong>Image:</strong>{" "}
                      <a
                        href={plant.imgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plant.imgUrl}
                      </a>
                    </p>
                  )}
                  
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-primary small-text"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className="btn btn-primary small-text"
                onClick={nextPage}
                disabled={
                  currentPage >= Math.ceil(plantData.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
