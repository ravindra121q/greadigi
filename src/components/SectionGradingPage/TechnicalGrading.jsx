import React, { useEffect, useState } from "react";
import "./TechnicalGrading.css";

export const TechnicalGrading = () => {
  const [flowGrade, setFlowGrade] = useState(0);
  const [responsivenessGrade, setResponsivenessGrade] = useState(0);
  const [cleanCodeGrade, setCleanCodeGrade] = useState(0);
  const [scalabilityGrade, setScalabilityGrade] = useState(0);
  const [documentationGrade, setDocumentationGrade] = useState(0);
  const [testingGrade, setTestingGrade] = useState(0);

  useEffect(() => {
    fetch("http://localhost:80/teams")
      .then((response) => response.json())
      .then((data) => {
        setFlowGrade(data.technicalGrading.flow);
        setResponsivenessGrade(data.technicalGrading.responsiveness);
        setCleanCodeGrade(data.technicalGrading.cleanCode);
        setScalabilityGrade(data.technicalGrading.scalability);
        setDocumentationGrade(data.technicalGrading.documentation);
        setTestingGrade(data.technicalGrading.testing);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleFlowGradeChange = (event) => {
    setFlowGrade(event.target.value);
  };

  const handleResponsivenessGradeChange = (event) => {
    setResponsivenessGrade(event.target.value);
  };

  const handleCleanCodeGradeChange = (event) => {
    setCleanCodeGrade(event.target.value);
  };

  const handleScalabilityGradeChange = (event) => {
    setScalabilityGrade(event.target.value);
  };

  const handleDocumentationGradeChange = (event) => {
    setDocumentationGrade(event.target.value);
  };

  const handleTestingGradeChange = (event) => {
    setTestingGrade(event.target.value);
  };

  const handleSubmit = () => {
    console.log({
      flowGrade,
      responsivenessGrade,
      cleanCodeGrade,
      scalabilityGrade,
      documentationGrade,
      testingGrade,
    });
  };

  return (
    <div className="container">
      <h2 className="title">Technical Grading</h2>
      <div className="grading-box">
        <label className="label">Code Flow</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={flowGrade}
          onChange={handleFlowGradeChange}
        />
        <span>{flowGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label">Responsiveness</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={responsivenessGrade}
          onChange={handleResponsivenessGradeChange}
        />
        <span>{responsivenessGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label">Clean Code</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={cleanCodeGrade}
          onChange={handleCleanCodeGradeChange}
        />
        <span>{cleanCodeGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label">Scalability</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={scalabilityGrade}
          onChange={handleScalabilityGradeChange}
        />
        <span>{scalabilityGrade}</span>
      </div>
      <div
        className="grading-box
  "
      >
        <label className="label">Documentation</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={documentationGrade}
          onChange={handleDocumentationGradeChange}
        />
        <span>{documentationGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label">Testing</label>
        <input
        className="input"
          type="range"
          min="0"
          max="5"
          value={testingGrade}
          onChange={handleTestingGradeChange}
        />
        <span>{testingGrade}</span>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit Grading
      </button>
    </div>
  );
};


