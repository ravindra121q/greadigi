import FullCalendar, { formatDate } from "@fullcalendar/react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData, userData } from "../../Redux/Presentation/Get/action";
import { useNavigate } from "react-router-dom";
import { getTOKENSuccess } from "../../Redux/Auth/AuthToken/action";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Dashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading, data, error } = useSelector((store) => store.get);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [sorting, setSorting] = useState("");
  const today = new Date();
  const storeToken = useSelector((store) => store.token.TOKEN);
  // localStorage.setItem("token", JSON.stringify(storeToken));
  const light = theme.palette.mode == "light";
  const [newloading, setNewloading] = useState(false);
  const token = storeToken || localStorage.getItem(JSON.stringify("token"));
  // console.log(token, storeToken);
  const isAdmin = token?.isAdmin;
  // console.log(theme.palette.mode);
  const [searchInp, setSearchInp] = useState("");

  const refreshHandler = () => {
    dispatch(getTOKENSuccess(JSON.parse(localStorage.getItem("token"))));
  };

  useEffect(() => {
    setNewloading(true);
    // console.log(storeToken?.isAdmin,"initialPhase")
    if (Object.keys(storeToken).length === 0) {
      refreshHandler();
    }
    if (Object.keys(storeToken).length === 0) {
      refreshHandler();
    }
    if (storeToken?.isAdmin == true) {
      dispatch(getData(sorting));
    }
    if (storeToken?.isAdmin == false) {
      dispatch(userData());
    }
    setNewloading(false);
  }, [storeToken, sorting, dispatch, searchInp]);

  console.log(data, "data4");

  let filteredData = [];

  let inp = "";

  const handleChange = (e) => {
    inp = e.target.value;
  };

  const handleSearch = () => {
    setSearchInp(inp);
  };

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
  // const data1=data.sort((a, b) => b.date - a.date);
  // const sortedTeams = data?.sort((a, b) => {
  //   return b - a;
  // });

  //  const newData = data;

  //  const todayEvents = [];
  // for (let i = 0; i < newData.length; i++) {
  //   const eventDate = new Date(data[i].start);
  //   if (
  //     eventDate.getDate() === today.getDate() &&
  //     eventDate.getMonth() === today.getMonth() &&
  //     eventDate.getFullYear() === today.getFullYear()
  //   ) {
  //     todayEvents.push(data[i]);
  //   }
  // }

  //  console.log("todayEvents",todayEvents)

  if (newloading) {
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
    <Box m="20px" backgroundColor={light ? "orange" : null}>
      {/* HEADER */}
      <Box
        display="flex"
        backgroundColor={light ? "orange" : null}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title="DASHBOARD"
          backgroundColor={light ? "black" : null}
          // subtitle="Welcome to your dashboard"
          subtitleTypographyProps={{
            style: {
              backgroundColor: light ? "black" : null,
              color: light ? "white" : "black",
            },
          }}
        />

        <Box
          display="flex"
          backgroundColor={light ? "orange" : colors.primary[400]}
          border={light ? "1px solid black" : null}
          borderRadius={light ? "15px" : "3px"}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            onChange={handleChange}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <select
            // backgroundColor={light ? "orange" : colors.primary[400]}
            //         border={light ? "1px solid black" : null}
            //         borderRadius={light ? "15px" : "3px"}
            style={{
              ml: 2,
              py: 1,
              px: 2,
              border: "none",
              borderRadius: light ? "15px" : "3px",
              backgroundColor: light ? "orange" : colors.primary[400],
              color: "white",
              appearance: "none",
              "&:focus": {
                outline: "none",
              },
              width: "150px",
              padding: "10px",
            }}
            name="sorting"
            onChange={(e) => setSorting(e.target.value)}
            id="sorting"
          >
            <option value="asc">Sort By</option>
            <option value="asc">New to Old</option>
            <option value="desc">Old to New</option>
          </select>
        </Box>

        {isAdmin && (
          <Box>
            <Button
              sx={{
                backgroundColor: light ? "red" : colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => navigate("/form")}
            >
              Schedule New Presentation
            </Button>
          </Box>
        )}
      </Box>
      {/* GRID & CHARTS */}
      {/* <select
        name="sorting"
        onChange={(e) => setSorting(e.target.value)}
        id="sorting"
      >
       
        <option value="asc">ASC</option>
        <option value="desc">DSC</option>
      </select>{" "} */}
      <Box display="grid" backgroundColor={light ? "orange" : null} gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Upcoming Presentations
        </Typography>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={light ? "#ff4d00" : colors.primary[400]}
          overflow="auto"
        >
          {filteredData.length > 0 ? (
            filteredData.map((e, i) => (
              <Box
                key={`${e.id}-${i}`}
                display="grid"
                sx={{ gridTemplateColumns: "2fr 2fr 1fr 2fr", gap: "10px" }}
                justifyContent="space-between"
                alignItems="center"
                overflow="auto"
                backgroundColor={light ? "2f4858" : null}
                onClick={() => navigate(`/detail/${e.id}`)}
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={light ? "black" : colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {e.title}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    color={colors.grey[100]}
                  >
                    {e.type}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    color={colors.grey[100]}
                  >
                    {e.pstatus}
                  </Typography>
                </Box>
                <Box
                  backgroundColor={light ? "#5c8001" : colors.greenAccent[500]}
                  p="5px 10px"
                  color={light ? "white" : null}
                  borderRadius="4px"
                  m="auto"
                  textAlign={"center"}
                  width="200px"
                >
                  {formatDate(e.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  <br />
                  {formatDate(e.start, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  --
                  {formatDate(e.end, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Box>
              </Box>
            ))
          ) : data.length > 0 ? (
            sorting == "asc" ? (
              data.map((e, i) => (
                <Box
                  key={`${e.id}-${i}`}
                  display="grid"
                  sx={{ gridTemplateColumns: "2fr 2fr 1fr 2fr", gap: "10px" }}
                  justifyContent="space-between"
                  alignItems="center"
                  overflow="auto"
                  backgroundColor={light ? "2f4858" : null}
                  onClick={() => navigate(`/detail/${e.id}`)}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={light ? "black" : colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {e.title}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      color={colors.grey[100]}
                    >
                      {e.type}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      color={colors.grey[100]}
                    >
                      {e.pstatus}
                    </Typography>
                  </Box>
                  <Box
                    backgroundColor={
                      light ? "#5c8001" : colors.greenAccent[500]
                    }
                    p="5px 10px"
                    color={light ? "white" : null}
                    borderRadius="4px"
                    m="auto"
                    width="200"
                    textAlign={"center"}
                  >
                    {formatDate(e.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    {formatDate(e.start, {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    --
                    {formatDate(e.end, {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Box>
                </Box>
              ))
            ) : (
              data.reverse().map((e, i) => (
                <Box
                  key={`${e.id}-${i}`}
                  display="grid"
                  sx={{ gridTemplateColumns: "2fr 2fr 1fr 2fr", gap: "10px" }}
                  justifyContent="space-between"
                  alignItems="center"
                  overflow="auto"
                  backgroundColor={light ? "2f4858" : null}
                  onClick={() => navigate(`/detail/${e.id}`)}
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={light ? "black" : colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {e.title}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      color={colors.grey[100]}
                    >
                      {e.type}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ textTransform: "capitalize" }}
                      color={colors.grey[100]}
                    >
                      {e.pstatus}
                    </Typography>
                  </Box>
                  <Box
                    backgroundColor={
                      light ? "#5c8001" : colors.greenAccent[500]
                    }
                    p="5px 10px"
                    color={light ? "white" : null}
                    borderRadius="4px"
                    m="auto"
                    width="200"
                    textAlign={"center"}
                  >
                    {formatDate(e.start, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    <br />
                    {formatDate(e.start, {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    --
                    {formatDate(e.end, {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Box>
                </Box>
              ))
            )
          ) : (
            <h1 style={{ width: "90%", margin: "auto", textAlign: "center" }}>
              {/* No Upcoming Presentations Scheduled */}
              Loading...
            </h1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
