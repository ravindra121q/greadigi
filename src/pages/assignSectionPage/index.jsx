import React, { useState } from "react";
import "./index.css";

export const AssignSectionPage = () => {
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [selectedGrading, setSelectedGrading] = useState("");

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
          <option value="Nurpul">Nurpul</option>
          <option value="Aman">Aman</option>
          <option value="Vinuth">Vinuth</option>
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