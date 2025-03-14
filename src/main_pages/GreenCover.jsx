import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GreenCover= () => {
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const handleSelection = async (value) => {
    setSelectedOption(value);

    try {
      const response = await fetch("https://your-backend-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOption: value }),
      });

      const data = await response.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOption}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {["Option 1", "Option 2", "Option 3"].map((option) => (
            <li key={option}>
              <button
                className="dropdown-item"
                onClick={() => handleSelection(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GreenCover;
