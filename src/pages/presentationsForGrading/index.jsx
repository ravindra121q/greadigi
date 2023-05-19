import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData } from "../../Redux/Presentation/Get/action";
import { useNavigate } from "react-router-dom";
import BasicCard from "../../components/card";
import PresentationsTable from "./PresentationsTable";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getTOKENSuccess } from "../../Redux/Auth/AuthToken/action";

const PresentationsForGrading = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, data, error } = useSelector((store) => store.get);
  const navigate = useNavigate();
  const theme1 = localStorage.getItem("mode");
  const token = JSON.parse(localStorage.getItem("token"));
  const light = theme.palette.mode == "light";
  const [searchInp, setSearchInp] = useState("");
  const storeToken = useSelector((store) => store.token.TOKEN);
  const refreshHandler = () => {
    dispatch(getTOKENSuccess(JSON.parse(localStorage.getItem("token"))));
  };
  useEffect(() => {
    if (Object.keys(storeToken).length === 0) {
      refreshHandler();
    }
    if (Object.keys(storeToken).length === 0) {
      refreshHandler();
    }
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    dispatch(getData());
  }, [searchInp]);

  let filteredData = [];

  let inp = "";

  const handleChange = (e) => {
    inp = e.target.value;
  };

  const handleSearch = () => {
    setSearchInp(inp);
  };

  console.log(data, "checking");

  if (searchInp != "") {
    const searchStr = searchInp.toLowerCase();
    filteredData = data.filter((el) => {
      return (
        el.title?.toLowerCase().includes(searchStr) ||
        el.type?.toLowerCase().includes(searchStr) ||
        el.description?.toLowerCase().includes(searchStr) ||
        el.start?.toLowerCase().includes(searchStr) ||
        el.end?.toLowerCase().includes(searchStr) ||
        el.pstatus?.toLowerCase().includes(searchStr)
      );
    });
  }

  if (loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }
  // else if (error) {
  //   return alert("Something went Wrong");
  // }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="GRADING ASSESSMENTS"
          subtitle="Manage Your Assign Presentations For Grading"
          subtitleColor={"black"}
        />
      </Box>
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Presentations List
        </Typography>

        <Box
          display="flex"
          backgroundColor={light ? "orange" : colors.primary[400]}
          border={light ? "1px solid black" : null}
          borderRadius={light ? "15px" : "3px"}
          width="400px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            value={searchInp}
            onChange={handleChange}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box
          style={{ backgroundColor: theme1 == "light" ? "#ff4d00" : null }}
          sx={{
            height: "65vh",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            margin: "auto",
            padding: "3vh",
          }}
          justifyContent="space-evenly"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {data.length > 0 ? (
            // (
            //   data?.map((e, i) => <BasicCard data={e} index={i} key={e.id} />)
            // )
            <PresentationsTable data={data} />
          ) : (
            <h1>No Presentations Scheduled For Grading!</h1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PresentationsForGrading;
