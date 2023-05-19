import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

export const SectionGradingPage = () => {
  const [flowGrade, setFlowGrade] = useState(0);
  const [responsivenessGrade, setResponsivenessGrade] = useState(0);
  const [cleanCodeGrade, setCleanCodeGrade] = useState(0);
  const [scalabilityGrade, setScalabilityGrade] = useState(0);
  const [documentationGrade, setDocumentationGrade] = useState(0);
  const [testingGrade, setTestingGrade] = useState(0);
  const theme = useTheme();
  const theme1 = localStorage.getItem("mode");
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    fetch("http://localhost:8080/teams")
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
    <div
      className="Section-Container"
      style={{
        background: colors.primary[400],
      }}
    >
      <h2 className="title" style={{ color: colors.grey[100] }}>
        Technical Grading
      </h2>
      <div className="grading-box">
        <label className="label" style={{ color: colors.grey[100] }}>
          Code Flow
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={flowGrade}
          onChange={handleFlowGradeChange}
        />
        <span className="span">{flowGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label" style={{ color: colors.grey[100] }}>
          Responsiveness
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={responsivenessGrade}
          onChange={handleResponsivenessGradeChange}
        />
        <span className="span">{responsivenessGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label" style={{ color: colors.grey[100] }}>
          Clean Code
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={cleanCodeGrade}
          onChange={handleCleanCodeGradeChange}
        />
        <span className="span">{cleanCodeGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label" style={{ color: colors.grey[100] }}>
          Scalability
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={scalabilityGrade}
          onChange={handleScalabilityGradeChange}
        />
        <span className="span">{scalabilityGrade}</span>
      </div>
      <div
        className="grading-box
  "
      >
        <label className="label" style={{ color: colors.grey[100] }}>
          Documentation
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={documentationGrade}
          onChange={handleDocumentationGradeChange}
        />
        <span className="span">{documentationGrade}</span>
      </div>
      <div className="grading-box">
        <label className="label" style={{ color: colors.grey[100] }}>
          Testing
        </label>
        <input
          type="range"
          min="0"
          max="5"
          value={testingGrade}
          onChange={handleTestingGradeChange}
        />
        <span className="span">{testingGrade}</span>
      </div>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }}
        onClick={handleSubmit}
      >
        Submit Grading
      </Button>
    </div>
  );
};

//  export default SectionGradingPage;
