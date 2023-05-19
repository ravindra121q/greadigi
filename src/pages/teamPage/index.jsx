import FullCalendar, { formatDate } from "@fullcalendar/react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  FormControl,
  FormHelperText,
  Input,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicCard1 from "../../components/cardTeam";
import { getSinglePresentationSectionData } from "../../Redux/Sections/Get/action";
import jwtDecode from "jwt-decode";

const Team = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const theme = useTheme();
  const { loading, data, error } = useSelector((store) => store.getSections);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const theme1 = localStorage.getItem("mode");

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    dispatch(getSinglePresentationSectionData(id));

    let url = `${process.env.REACT_APP_SERVER}/teams?presentation=` + id;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res, "res");
        setData1(res);
      });
  }, [navigate, id]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TEAMS FOR GRADING"
          subtitle="Manage Your Assign Teams For Grading"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => navigate(`create_atrribute/${data.id}`)}
          >
            Create Attribute
          </Button>
        </Box>
      </Box>
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Team's List
        </Typography>

        <Box
          sx={{
            height: "65vh",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            margin: "auto",
            padding: "3vh",
          }}
          justifyContent="space-evenly"
          backgroundColor={theme1 == "light" ? "#ff4d00" : colors.primary[400]}
          overflow="auto"
        >
          {data1.length > 0 ? (
            data1?.map((e, i) => <BasicCard1 data={e} index={i} key={e.id} />)
          ) : (
            <h1>Upload Participants Data</h1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Team;
