import React, { useEffect } from "react";

import { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
  Select,
  useTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

function GradingAtrributePage() {
  const { id } = useParams();
  const theme = useTheme();
  const light = theme.palette.mode == "light";
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [comment, setComment] = useState("");
  const location = useLocation();

  var uid = location.pathname.split("/");

  var pid = uid[3];
  var tid = uid[4];
  var aid = uid[7];

  console.log(uid, "uid");

  const handleAddSections = () => {
    let obj = {
      value: value,
      comment: comment,
    };

    console.log(obj, "test");
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token.token);

    console.log(obj);
    fetch(
      `https://wary-flame-production.up.railway.app/results/save?attribute=${aid}&team=${tid}`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(obj),
      }
    )
      .then((res) => {
        console.log(res, "data`");
        return res.text();
      })
      .then((value) => {
        console.log(value);
        swal("Success!", " Section Created successfully!", "success", {
          buttons: false,
          timer: 2000,
        });
        navigate(`/grading/team/${pid}/${tid}/atrributes`);
      })
      .catch((error) => {
        console.error("err", error);
        swal("Error!", "Error While Creating Sections:", "error", {
          buttons: false,
          timer: 2000,
        });
      });
  };

  //   console.log(data[0].id,"res")

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue >= 1 && inputValue <= 10) {
      setValue(inputValue);
    } else {
      setValue("");
    }
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Add result" subtitle="Add Score for Attribute" />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Add Score
        </Typography>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "auto",
                flexWrap: "wrap",
                gap: "1%",
              }}
            >
              <TextField
                required
                name="value"
                label="Enter value 1-10"
                value={value}
                onChange={handleChange}
                sx={{ marginTop: "24px", width: "30%" }}
                error={value !== "" && (value < 1 || value > 10)}
              />

              <TextField
                name="comment"
                label="Enter comment"
                onChange={(event) => setComment(event.target.value)}
                sx={{ marginTop: "24px", width: "69%" }}
              />
            </Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                marginLeft: "80%",
                marginTop: "5%",
                width: "15%",
              }}
              onClick={handleAddSections}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GradingAtrributePage;
