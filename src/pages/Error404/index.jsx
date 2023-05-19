import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Error404 = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#1F2937",
      }}
    >
      <img src="../../assets/error404.png" width={"30%"} alt="404error" />
      <Typography variant="h3" component="h1">
        Oops! 404 Not Found
      </Typography>
      <Typography variant="h6" component="h4">
        The page you are looking for does not exist.
      </Typography>
      <Link to="/">
        <Button
          variant="contained"
          style={{
            background: "#1F2937",
            color: "white",
            fontWeight: 600,
            marginTop: "1rem",
          }}
        >
          Go back to home
        </Button>
      </Link>
    </div>
  );
};

export default Error404;
