import { useState } from "react";
import axios from "axios";

const GreenCover = () => {
  const [selectedOption, setSelectedOption] = useState("Select Location");
  const [locationData, setLocationData] = useState(null);

  const vitLocations = [
    "VIT Parking Area 1",
    "VIT Parking Area 2",
    "VIT Parking Area 3",
    "VIT Parking Area 4",
    "All mart & Generator area",
    "CDMM front",
    "CDMM side",
    "Clinic front",
    "GD Naidu Black front 1",
    "GD Naidu block front 2",
    "GD Naidu block inside 1",
    "GD Naidu Block inside 2",
    "GD Naidu Block inside 3",
    "GD Naidu Block inside 4",
    "GD Naidu Block inside 5",
    "GD Naidu Block & Main canteen between",
    "Main Gate Right",
    "Main Gate Right 1",
    "MGR Front 1",
    "MGR Front 2",
    "MGR Front 3",
    "MGR Front 4",
    "MGR Front 5",
    "MGR Front 6",
    "MGR Front 7",
    "MGR Front 8",
    "MGR Front 9",
    "MGR Front 10",
    "MGR Front 11",
    "MGR Front 12",
    "MGR Front 13",
    "MGR Front 14",
    "MGR Front 15",
    "MGR Front 16",
    "MGR Front 17",
    "MGR Front 18",
    "MGR Front 19",
    "MGR Front Right",
    "MGR Back Right",
    "MGR Front Left",
    "MGR Back Left",
    "MGR Inside 1",
    "MGR Inside 2",
    "MGR Inside 3",
    "Anna Auditorium Front",
    "Anna Auditorium Side 1",
    "Anna Auditorium Side 2",
    "Volley Ball & Basketball Court",
    "CTS front & Side",
    "Woodys",
    "Library Front",
    "Library Right and Back",
    "SMV & Library Middle",
    "Main Gate Left and Road Side",
    "Kalpana Chawla Ground",
    "Adjacent to National Flag",
    "Kings Road 1",
    "Kings Road 2",
    "Kings Road 3",
    "Gate 3 Right road side",
    "Gate 3 Inside Right",
    "Girls Hostel A&B block inside",
    "Girls Hostel A&B Block 1",
    "Girls Hostel A&B Block 2",
    "Foodys & Greenos",
    "SMV Front Left",
    "SMV Inside 1",
    "SMV Inside 2",
    "SMV Inside 3",
    "SMV Inside 4",
    "SMV Inside 5",
    "SMV Inside 6",
    "SMV Back Right",
    "SMV Back Left",
    "TT Front Basketball court",
    "VIT 3rd Gate Left",
    "Guest house front",
    "Guest House Side",
    "Guest House Inside",
    "CBMR Road",
    "Nursery 1",
    "Nursery 2",
    "Nursery 3",
    "Nursery 4",
    "Nursery 5",
    "Nursery 6",
    "Nursery 7",
    "Nursery 8",
    "Nursery 9",
    "Nursery 10",
    "Nursery 11",
    "Nursery Border",
    "Cultivation field",
    "Nursery Parking Area",
    "Girls Hostel LHG Block Inside",
    "Nursery Road Side",
    "Girls Hostel LHG Block Backside",
    "VIT Lake border",
    "DC & TT Front",
    "DC Front",
    "DC Side",
    "TT Front",
    "TT Front Right",
    "TT Back 1",
    "TT Back 2",
    "TT Back Left",
    "TT Front Left",
    "TT Inside 1",
    "TT Inside 2",
    "TT Inside 3",
    "TT Terrace 1",
    "TT Terrace 2",
    "Girls Hostel 1",
    "Girls Hostel 2",
    "Girls Hostel 3",
    "Girls Hostel 4",
    "Girls Hostel 5",
    "Girls Hostel 6",
    "Girls Hostel 7",
    "Girls Hostel 8",
    "Girls Hostel 9",
    "Girls Hostel 10",
    "Girls Hostel 11",
    "Girls Hostel 12",
    "Girls Hostel 13",
    "Girls Hostel 14",
    "Girls Hostel 15",
    "Girls Hostel 16",
    "TT & Girls Hostel Front Border",
    "Girls Hostel Front Rail Track center",
    "Girls Hostel Front Road Divider 1",
    "Girls Hostel Front Road Divider 2",
    "SJT Front Left",
    "SJT Front",
    "SJT Front Right Side",
    "SJT Front RAIL Border",
    "SJT Front Road divider 1",
    "SJT Front Road divider 2",
    "SJT Inside 1",
    "SJT Inside 2",
    "SJT Ground greenery",
    "SJT Ground Side",
    "SJT Ground",
    "SJT Left 1",
    "SJT Left 2",
    "SJT Right Gate no 11",
    "New Subway Left",
    "New Subway Road divider 1",
    "New Subway Road divider 2",
    "PRP Front Left",
    "PRP Front Right",
    "PRP Front Right 2",
    "PRP Front Right 3",
    "PRP Front Right 4",
    "PRP Front Rail Border",
    "PRP Front Road Divider",
    "PRP Front Right 1",
    "MG Block Side 1",
    "MG Block Side 2",
    "MG Block Side 3",
    "MG Block Rail Border 1",
    "MG Block Rail Border 2",
    "MG Block Front 1",
    "MG Block Front 2",
    "MG Block Front 3",
    "MG Block Back Right",
    "MG Block Back Border",
    "MG Block Back",
    "MG Block Front Left",
    "MG Block Front 4",
    "PRP Right Side",
    "PRP Back Forest",
    "VIT Parking Area",
  ];

  const AreaComponent = ({ area }) => (
    <div className="mt-3">
      <h5 className="text-secondary">Area</h5>
      <p className="fw-bold">{area} sq. meters</p>
    </div>
  );

  const CoordinatesComponent = ({ latitude, longitude }) => (
    <div className="mt-3">
      <h5 className="text-secondary">Coordinates</h5>
      <p className="fw-bold">Latitude: {latitude}</p>
      <p className="fw-bold">Longitude: {longitude}</p>
    </div>
  );

  const fetchLocationData = async () => {
    if (selectedOption === "Select Location") {
      alert("Please select a location first!");
      return;
    }

    try {
      const response = await axios.get(process.env.REACT_APP_GREEN_SEARCH, {
        params: { name: encodeURIComponent(selectedOption) },
      });

      setLocationData(response.data); // Store received data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Green Cover Locator</h2>

        <div className="dropdown mb-3">
          <button
            className="btn btn-primary dropdown-toggle w-100"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedOption || "Select a Location"}
          </button>
          <ul
            className="dropdown-menu w-100 overflow-auto"
            style={{ maxHeight: "300px" }}
            aria-labelledby="dropdownMenuButton"
          >
            {vitLocations.map((option) => (
              <li key={option}>
                <button
                  className="dropdown-item"
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button className="btn btn-success w-100" onClick={fetchLocationData}>
          Search
        </button>

        {locationData && (
          <div className="mt-4">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h3 className="card-title">{locationData.name}</h3>

                <div className="mt-3">
                  <AreaComponent area={locationData.area} />
                  <CoordinatesComponent
                    latitude={locationData.latitude}
                    longitude={locationData.longitude}
                  />
                </div>

                <a
                  href={locationData.visitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info mt-3 text-white"
                >
                  View on Map
                </a>

                {locationData.imgUrl && (
                  <div className="mt-3">
                    <img
                      src={locationData.imgUrl}
                      alt={locationData.name}
                      className="img-fluid rounded shadow-sm"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenCover;
