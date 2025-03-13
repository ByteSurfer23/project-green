import { useState } from "react";
import axios from "axios";

function UploadImage() {
  console.log(process.env.REACT_APP_CLOUD_NAME);

  const [scientificName, setScientificName] = useState("");
  const [commonName, setCommonName] = useState("");
  const [genus, setGenus] = useState("");
  const [family, setFamily] = useState("");
  const [plantType, setPlantType] = useState("");
  const [properties, setProperties] = useState("");
  const [medicinal, setMedicinal] = useState("");
  const [reference, setReference] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [visitUrl, setVisitUrl] = useState("");
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "images_preset");

    try {
      let cloudname = process.env.REACT_APP_CLOUD_NAME;
      let resource_type = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudname}/${resource_type}/upload`;

      const res = await axios.post(api, data);
      const secure_url = res.data.secure_url;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    try {
      const imgUrl = await uploadFile();
      setImgUrl(imgUrl);
      await axios.post(process.env.REACT_APP_UPLOAD_URLPATH, {
        scientificName,
        commonName,
        genus,
        family,
        plantType,
        properties,
        medicinal,
        reference,
        latitude: latitude || null,
        longitude: longitude || null,
        visitUrl,
        imgUrl,
      });

      alert("Data uploaded successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Upload Plant Data</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-3" placeholder="Scientific Name" value={scientificName} onChange={(e) => setScientificName(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Common Name" value={commonName} onChange={(e) => setCommonName(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Genus" value={genus} onChange={(e) => setGenus(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Family" value={family} onChange={(e) => setFamily(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Type of Plant" value={plantType} onChange={(e) => setPlantType(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Properties" value={properties} onChange={(e) => setProperties(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Medicinal Uses" value={medicinal} onChange={(e) => setMedicinal(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Reference" value={reference} onChange={(e) => setReference(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Latitude (optional)" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Longitude (optional)" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          <input type="text" className="form-control mb-3" placeholder="Visit URL (optional)" value={visitUrl} onChange={(e) => setVisitUrl(e.target.value)} />
          <input type="file" className="form-control mb-3" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <button type="submit" className="btn btn-primary w-100">Upload</button>
        </form>
      </div>
    </div>
  );
}

export default UploadImage;
