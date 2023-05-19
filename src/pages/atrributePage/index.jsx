import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSinglePresentationSectionData } from "../../Redux/Sections/Get/action";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AtrributePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [data1, setData1] = useState([]);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { loading, data, error } = useSelector((store) => store.get);
  const theme1 = localStorage.getItem("mode");

  const token = JSON.parse(localStorage.getItem("token"));

  var uid = location.pathname.split("/");

  var pid = uid[3];
  var tid = uid[4];

  console.log(uid, pid, tid, "pro");

  useEffect(() => {
    dispatch(getSinglePresentationSectionData(pid));
  }, [navigate, id]);

  useEffect(() => {
    getAttributes(data.id);
  }, [data.id]);
  console.log(data);
  function getAttributes(id) {
    console.log(id, "id");
    if (data) {
      let url =
        `https://wary-flame-production.up.railway.app/attributes?section=` + id;

      fetch(url, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setData1(res);
        });
    }
  }

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete Your Presentation ?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://wary-flame-production.up.railway.app/attributes/` + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
          .then((res) => {
            console.log(res, "data");
            if (res.ok) {
              getAttributes(data.id);
              swal(
                "Deleted!",
                "Your Presentation has been deleted!",
                "success"
              );
            } else {
              swal("Error!", "Something went wrong while Deleting", "error");
            }
          })
          .catch((error) =>
            swal("Error!", "Something went wrong while Deleting", "error")
          );
      }
    });
  };

  if (loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="ATRRIBUTE MANAGEMENT"
          subtitle="Manage Or Create Section Atrribute"
        />
      </Box>
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          {data?.name + " "} Atrribute's List
        </Typography>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {data1.length > 0 &&
            data1?.map((e, i) => (
              <Box
                key={`${e.id}-${i}`}
                display="grid"
                sx={{ gridTemplateColumns: "2fr 2fr 0.5fr" }}
                justifyContent="space-between"
                alignItems="center"
                overflow="auto"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box onClick={() => navigate(`grade/${e.id}`)}>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {e.name}
                  </Typography>
                </Box>
                <Box
                  color={colors.grey[100]}
                  onClick={() => navigate(`grade/${e.id}`)}
                >
                  <Typography
                    color={colors.grey[100]}
                    variant="p"
                    fontWeight="600"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {e.description}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "5%" }}>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    m="auto"
                    onClick={() => handleDelete(e.id)}
                  >
                    DELETE
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AtrributePage;
