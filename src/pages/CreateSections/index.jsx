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
import { useDispatch } from "react-redux";
import { addSection } from "../../Redux/Sections/Post/action";

function CreateSections() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([{ input: "", select: "" }]);
  const [data, setData] = useState([]);
  const location = useLocation();
  const theme1 = localStorage.getItem("mode");
  var uid = location.pathname.split("/");
  console.log(uid, "uid");

  var pid = uid[3];

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    let url = `https://wary-flame-production.up.railway.app/users`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token.token);

    fetch(url, {
      headers: headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "userdata");
        setData(res);
      });
  }, []);

  const dispatch = useDispatch();

  const handleAddSections = () => {
    const outputArray = inputs.map((input) => ({
      section: {
        name: input.input,
      },
      reveiwerId: input.select,
    }));

    dispatch(addSection(outputArray, pid));
  };

  const handleAddInput = () => {
    const newInputs = [...inputs, { input: "", select: "" }];
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

  console.log(data, "data");

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CREATE SECTION"
          subtitle="Create Section & Assign Admin "
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box display="grid" gap="5%">
        {/* <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Add Section's
        </Typography> */}

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
          style={{ backgroundColor: theme1 == "light" ? "#ff4d00" : null }}
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
                  name="input"
                  label="Enter Section"
                  value={input.input}
                  onChange={(event) => handleInputChange(index, event)}
                  sx={{ marginTop: "24px", width: "40%" }}
                />

                <FormControl sx={{ width: "40%", marginTop: "24px" }}>
                  <InputLabel>Assign admin</InputLabel>
                  <Select
                    native
                    value={input.select}
                    // required
                    onChange={(event) => handleInputChange(index, event)}
                    inputProps={{
                      name: "select",
                      id: `select-${index}`,
                    }}
                    label="Select Type"
                  >
                    <option value="" />
                    {data &&
                      data?.map((data) => (
                        <option key={data.id} value={data.id}>
                          {data.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>

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
                backgroundColor:
                  theme1 == "light" ? "#5c8001" : colors.blueAccent[700],
                color: theme1 == "light" ? "white" : colors.grey[100],
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

export default CreateSections;
