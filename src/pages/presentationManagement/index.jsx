import FullCalendar, { formatDate } from "@fullcalendar/react";
import { Box, Button, Typography, useTheme, Pagination } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCreatedPresentationData } from "../../Redux/Presentation/Get/action";
import swal from "sweetalert";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTOKENSuccess } from "../../Redux/Auth/AuthToken/action";
import InputBase from "@mui/material/InputBase";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PresentationManagement = () => {
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState("");
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initPage = searchParams.get("page");
  const [page, setPage] = useState(initPage || 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [cpage, setCpage] = useState(initPage || 1);
  const { loading, data, error } = useSelector((store) => store.get);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const light = theme.palette.mode == "light";
  const [searchInp, setSearchInp] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  const storeToken = useSelector((store) => store.token.TOKEN);
  const refreshHandler = () => {
    dispatch(getTOKENSuccess(JSON.parse(localStorage.getItem("token"))));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (Object.keys(storeToken).length === 0) {
      refreshHandler();
    }
    dispatch(getUserCreatedPresentationData(currentPage));
  }, [currentPage, searchInp]);

  useEffect(() => {
    var params = {
      page: cpage,
    };
    setSearchParams(params);
    dispatch(getUserCreatedPresentationData(cpage));
  }, [page, cpage]);

  console.log(data, " Presentation data");

  const handleDelete = (id) => {
    let token = JSON.parse(localStorage.getItem("token"));
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete Your Presentation ?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `https://wary-flame-production.up.railway.app/presentations/` + id,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        )
          .then((res) => {
            dispatch(getUserCreatedPresentationData());
            dispatch(getUserCreatedPresentationData(cpage));
            swal("Deleted!", "Your Presentation has been deleted!", "success");
          })
          .then(() => {
            dispatch(getUserCreatedPresentationData(cpage));
          })
          .catch((error) =>
            swal("Error!", "Something went wrong while Deleting", "error")
          );
      }
    });
  };

  const handlePageChange = (event, value) => {
    console.log(value, "v");
    setPage(value);
  };
  const theme1 = localStorage.getItem("mode");

  let filteredData = "";

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
    filteredData = data.content.filter((el) => {
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
  console.log(filteredData, "check");
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="PRESENTATION MANAGEMENT"
          subtitle="Manage Your Presentations"
        />
      </Box>
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Presentation List
        </Typography>

        <Box
          display="flex"
          backgroundColor={light ? "orange" : colors.primary[400]}
          border={light ? "1px solid black" : null}
          borderRadius={light ? "15px" : "3px"}
          width="400px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, gap: 10, mr: 5 }}
            placeholder="Search"
            onChange={handleChange}
          />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <Box alignItems="center">
            <select
              // backgroundColor={light ? "orange" : colors.primary[400]}
              //         border={light ? "1px solid black" : null}
              //         borderRadius={light ? "15px" : "3px"}
              style={{
                ml: 20,
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
        </Box>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={theme1 == "light" ? "#ff4d00" : colors.primary[400]}
          overflow={theme1 == "light" ? "auto" : null}
        >
          {filteredData.length > 0 ? (
            filteredData.map((e, i) => (
              <Box
                key={`${e.id}-${i}`}
                display="grid"
                sx={{ gridTemplateColumns: "2fr 2fr 1fr 0.5fr" }}
                justifyContent="space-between"
                alignItems="center"
                overflow="auto"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box onClick={() => navigate(`detail/${e.id}`)}>
                  <Typography
                    color={
                      theme1 == "light" ? "#black" : colors.greenAccent[500]
                    }
                    variant="h5"
                    fontWeight="600"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {e.title}
                  </Typography>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    color={colors.grey[100]}
                  >
                    {e.type}
                  </Typography>
                </Box>
                <Box
                  color={colors.grey[100]}
                  onClick={() => navigate(`detail/${e.id}`)}
                >
                  {formatDate(e.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  -{" "}
                  {formatDate(e.start, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  <br />
                  {formatDate(e.end, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  -
                  {formatDate(e.end, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Box>

                <Box
                  color={colors.grey[100]}
                  onClick={() => navigate(`detail/${e.id}`)}
                >
                  {e.pstatus}
                </Box>

                <Box sx={{ display: "flex", gap: "5%" }}>
                  <Box
                    backgroundColor={
                      localStorage.getItem("mode") == "light"
                        ? "#5c8001"
                        : colors.greenAccent[500]
                    }
                    color={
                      localStorage.getItem("mode") == "light" ? "white" : null
                    }
                    p="5px 10px"
                    borderRadius="4px"
                    m="auto"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(e.id)}
                  >
                    DELETE
                  </Box>
                </Box>
              </Box>
            ))
          ) : data?.content?.length > 0 ? (
            data?.content.reverse()?.map((e, i) => (
              <Box
                key={`${e.id}-${i}`}
                display="grid"
                sx={{ gridTemplateColumns: "2fr 2fr 1fr 0.5fr" }}
                justifyContent="space-between"
                alignItems="center"
                overflow="auto"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box onClick={() => navigate(`detail/${e.id}`)}>
                  <Typography
                    color={
                      theme1 == "light" ? "#black" : colors.greenAccent[500]
                    }
                    variant="h5"
                    fontWeight="600"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {e.title}
                  </Typography>
                  <Typography
                    sx={{ textTransform: "capitalize" }}
                    color={colors.grey[100]}
                  >
                    {e.type}
                  </Typography>
                </Box>
                <Box
                  color={colors.grey[100]}
                  onClick={() => navigate(`detail/${e.id}`)}
                >
                  {formatDate(e.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  -{" "}
                  {formatDate(e.start, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                  <br />
                  {formatDate(e.end, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  -
                  {formatDate(e.end, {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </Box>
                <Box
                  color={colors.grey[100]}
                  onClick={() => navigate(`detail/${e.id}`)}
                >
                  {e.pstatus}
                </Box>

                <Box sx={{ display: "flex", gap: "5%" }}>
                  <Box
                    backgroundColor={
                      localStorage.getItem("mode") == "light"
                        ? "#5c8001"
                        : colors.greenAccent[500]
                    }
                    color={
                      localStorage.getItem("mode") == "light" ? "white" : null
                    }
                    p="5px 10px"
                    borderRadius="4px"
                    m="auto"
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDelete(e.id)}
                  >
                    DELETE
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <h1>No Data Available!</h1>
          )}
        </Box>
        <Pagination
          count={data.totalPages}
          color="secondary"
          page={cpage}
          sx={{
            "& .Mui-selected": {
              backgroundColor: "red",
              color: "white",
            },
          }}
          onChange={(event, value) => setCpage(value)}
        />
        {/* <Pagination
          sx={{ marginBottom: "5%" }}
          count={data.totalPages}
          page={data.pageNumber}
          onChange={handlePageChange}
          color="primary"
        /> */}
      </Box>
    </Box>
  );
};

export default PresentationManagement;
