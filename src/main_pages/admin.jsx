import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import UploadImage from "../pages/uploadimg";
import EditPlant from "../pages/editimg";
import GreenCover from "../pages/GreenCover";
import EditGreenCover from "../pages/EditGreenCover";
import DeleteGreenCover from "../pages/DeleteGreenCover";
import DeletePlant from "../pages/deleteimg";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  // const checkAuth = async () => {
  //   try {
  //     await axios.get(process.env.REACT_APP_ADMIN_AUTH, { withCredentials: true });
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //   }
  // };

  const handleLogin = async () => {
    try {
      await axios.post(
        process.env.REACT_APP_ADMIN_LOGIN,
        { username, password },
        // { withCredentials: true }
      );
      setIsAuthenticated(true);
    } catch (error) {
      alert("Invalid username or password!");
    }
  };

  const handleLogout = async () => {
    await axios.post(process.env.REACT_APP_ADMIN_LOGOUT, {}, 
      //{ withCredentials: true }
    );
    setIsAuthenticated(false);
  };

  return (
    <div className="container mt-5">
      {isAuthenticated ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Admin Dashboard</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>

          <div className="col">
            <div className="mb-3"><UploadImage /></div>
            <div className=" mb-3"><EditPlant /></div>
            <div className="mb-3"><DeletePlant/></div>
            <div className="mb-3"><GreenCover /></div>
            <div className="mb-3"><EditGreenCover /></div>
            <div className="mb-3"><DeleteGreenCover /></div>
          </div>
        </>
      ) : (
        <div className="card mx-auto p-4 shadow" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-3">Admin Login</h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
