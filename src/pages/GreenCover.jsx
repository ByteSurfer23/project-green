import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const GreenCoverForm = () => {
  const options = [
    "VIT Parking Area 1",
    "VIT Parking area 2",
    "VIT Parking area 3",
    "VIT Parking area 4",
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
    "Girsl Hostel A&B block inside",
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
    "Girls hostel LHG Block Inside",
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
    "TT Tarace 1",
    "TT Tarace 2",
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
    "SJT Front RAIL Boarder",
    "SJT Front Road divider 1",
    "SJT Front Road divider 2",
    "SJT Inside 1",
    "SJT Inside 2",
    "SJT Ground greenary",
    "SJT Ground Side",
    "SJT Ground",
    "SJT Left 1",
    "SJT Left 2",
    "SJT right Gate no 11",
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
    "MG Block Rail Boarder 1",
    "MG Block Rail Boarder 2",
    "MG Block Front 1",
    "MG Block Front 2",
    "MG Block Front 3",
    "MG Block Back Right",
    "MG Block Back Boarder",
    "MG Block Back",
    "MG Block Front Left",
    "MG Block Front 4",
    "PRP Right Side",
    "PRP Back Forest",
    "VIT Parking Area",
    "PRP side lawn",
    "PRP front left",
    "PRP front right"
  ];

  const [selectedName, setSelectedName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    latitude: "",
    longitude: "",
    visitUrl: "",
    imageUrl: ""
  });

  const handleFetch = () => {
    if (!selectedName) return;
    console.log(process.env.REACT_APP_GREEN_FETCH);
    axios.post(process.env.REACT_APP_GREEN_FETCH, { name: selectedName })
      .then(res => setFormData(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("/api/green-covers", { name: selectedName, ...formData })
      .then(res => alert("Updated successfully!"))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <label className="form-label">Select Green Cover</label>
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="form-select"
            style={{ fontSize: "16px", padding: "10px" }}
          >
            <option value="" style={{ fontWeight: "bold" }}>Select Green Cover</option>
            {options.map((opt) => (
              <option key={opt} value={opt} style={{ fontSize: "14px", padding: "5px" }}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={handleFetch} className="btn btn-primary">Fetch</button>
      
      {formData.name && (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" />
          </div>
          <div className="mb-3">
            <input type="text" name="area" value={formData.area} onChange={handleChange} className="form-control" placeholder="Area" />
          </div>
          <div className="mb-3">
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="form-control" placeholder="Latitude" />
          </div>
          <div className="mb-3">
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="form-control" placeholder="Longitude" />
          </div>
          <div className="mb-3">
            <input type="text" name="visitUrl" value={formData.visitUrl} onChange={handleChange} className="form-control" placeholder="Visit URL" />
          </div>
          <div className="mb-3">
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="form-control" placeholder="Image URL" />
          </div>
          <div className="mb-3 text-center">
            <img src={formData.imageUrl} alt="Green Cover" className="img-fluid rounded" />
          </div>
          <button type="submit" className="btn btn-success">Update</button>
        </form>
      )}
    </div>
  );
};

export default GreenCoverForm;
