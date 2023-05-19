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

function CreateAtrributePage() {
  const theme = useTheme();
  const location = useLocation();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([{ name: "", description: "" }]);
  const theme1 = localStorage.getItem("mode");

  var path = location.pathname.split("/");

  const go = path[1];
  const go1 = path[2];
  const go2 = path[3];
  const id = path[3];
  console.log(id, "new");
  const handleAddSections = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token.token);

    fetch(
      `https://wary-flame-production.up.railway.app/attributes/save?section=` +
        id,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(inputs),
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        } else if (res.status === 500) {
          swal("Error!", res.message || "Attribute already exists", "error", {
            buttons: false,
            timer: 2000,
          });
        }
      })
      .then((value) => {
        console.log(value);
        swal("Success!", " Attribute Created successfully!", "success", {
          buttons: false,
          timer: 2000,
        });
        // navigate(`/${go}/${go1}/${go2}`);
        console.log("navigate", id);
        navigate(`/manage/detail/${id}/section`);
      })
      .catch((error) => {
        console.error("error", error);
        swal(
          "Error!",
          error.message || "Error While Creating Sections:",
          "error",
          {
            buttons: false,
            timer: 2000,
          }
        );
      });
    // });
    // }
  };

  //   console.log(data[0].id,"res")

  const handleAddInput = () => {
    const newInputs = [...inputs, { name: "", description: "" }];
    setInputs(newInputs);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newInputs = [...inputs];
    newInputs[index][name] = value;
    setInputs(newInputs);
  };

  const handleDeleteInput = (index) => {
    const values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CREATE ATTRIBUTE" subtitle="Create Section Attribute " />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Add Section Attributes
        </Typography>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={theme1 == "light" ? "#ff4d00" : colors.primary[400]}
          overflow="auto"
        >
          <Box>
            {inputs.map((input, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "90%",
                  margin: "auto",
                  flexWrap: "wrap",
                  gap: "1%",
                }}
              >
                <TextField
                  name="name"
                  label="Enter Section Attribute"
                  value={input.input}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ marginTop: "24px", width: "30%" }}
                />

                {/* <TextField
                  name="type"
                  label="Enter Type"
                  value={input.type}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ marginTop: "24px", width: "40%" }}
                /> */}

                <TextField
                  name="description"
                  label="Enter description..."
                  value={input.description}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ marginTop: "24px", width: "50%" }}
                />

                <Button
                  onClick={handleAddInput}
                  width="100px"
                  sx={{ color: "#4A505E !important", marginTop: "24px" }}
                  icon={<AddCircleOutlineIcon />}
                >
                  <AddCircleOutlineIcon />
                </Button>
                {inputs.length > 1 ? (
                  <Button
                    onClick={handleDeleteInput}
                    width="100px"
                    sx={{ color: "#4A505E !important", marginTop: "24px" }}
                    icon={<RemoveCircleOutlineIcon />}
                  >
                    <RemoveCircleOutlineIcon />
                  </Button>
                ) : null}
              </Box>
            ))}
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

export default CreateAtrributePage;
