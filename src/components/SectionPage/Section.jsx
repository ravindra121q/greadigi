
import React, { useState, useEffect } from "react";
import "./Section.css";

export const GradingSelection = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedGrading, setSelectedGrading] = useState("");

  useEffect(() => {
    fetch("http://localhost:80/users")
      .then((response) => response.json())
      .then((data) => setAdmins(data));
  }, []);

  const handleAdminSelection = (event) => {
    setSelectedAdmin(event.target.value);
  };

  const handleGradingSelection = (event) => {
    setSelectedGrading(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="title">Grading Selection</h2>
      <div className="select-container">
        <select
          className="select"
          value={selectedAdmin}
          onChange={handleAdminSelection}
        >
          <option value="">Select Admin</option>
          {admins.map((admin) => (
            <option key={admin.id} value={admin.userName}>
              {admin.userName}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <select
          className="select"
          value={selectedGrading}
          onChange={handleGradingSelection}
        >
          <option value="">Select Grading Type</option>
          <option value="technical">Technical Grading</option>
          <option value="communication">Communication Grading</option>
          <option value="teamwork">Teamwork Assessment</option>
        </select>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
};
