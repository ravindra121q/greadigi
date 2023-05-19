import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSectionData } from "../../Redux/Sections/Get/action";
import swal from "sweetalert";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SectionPage = () => {
  const { id } = useParams();
  const location = useLocation();
  var path = location.pathname.split("/");

  const go = path[1];
  const id1 = path[3];
  const go2 = path[3];
  // const id = path[3];
  const dispatch = useDispatch();
  const theme = useTheme();
  // const { loading, data, error } = useSelector((store) => store.getSections);
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const theme1 = localStorage.getItem("mode");

  useEffect(() => {
    console.log("line 20", id);
    dispatch(getSectionData(id));
    console.log("line 20 after", id);
  }, []);

  // console.log(data, "data");

  const [data1, setData1] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { data } = useSelector((store) => store.get);

  useEffect(() => {
    getAttributes(data.id);
  }, [data.id]);
  console.log(data);

  // const handlePresent = (e) => {

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdXJsaUBnbWFpbC5jb20iLCJuYW1lIjoibXVybGkiLCJpc0FkbWluIjp0cnVlLCJleHAiOjE2ODM2MjI0OTMsInVzZXJJZCI6NSwiaWF0IjoxNjgzNDQyNDkzfQ.zjt5GwClfVFMWti92a--9AON7XPiP9G_CTFX2d3R4gHaftDa_C4v0XshNW0LYlLF6sklEEXCZFv4owXq54tNUw");

  //   var raw = JSON.stringify({
  //     "id": 14,
  //     "name": "CSBT",
  //     "present": 0
  //     // id: e.id,
  //     // name: e.name,
  //     // present: "",
  //   });

  //   var requestOptions = {
  //     method: 'PUT',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch(`https://wary-flame-production.up.railway.app/sections/update`, requestOptions)
  //     .then(response => response.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  function getAttributes(id) {
    // console.log(id, "id");
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

  // console.log(data, "data");

  const handleDelete = (id) => {
    console.log(id, "id");
    let token = JSON.parse(localStorage.getItem("token"));
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete Your Presentation ?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
      // colors:
    }).then((willDelete) => {
      if (willDelete) {
        //

        fetch(`https://wary-flame-production.up.railway.app/sections/` + id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
          .then((res) => {
            console.log(res, "de");

            swal(
              "Deleted!",
              "Your Presentation section has been deleted!",
              "success"
            );
            // const { id1 } = useParams();
            dispatch(getSectionData(id1));
            console.log("delete Id", id1);
          })
          .catch((error) =>
            swal("Error!", "Something went wrong while Deleting", "error")
          );
      }
    });
  };

  //   const today = new Date();
  //   const todayEvents = data.filter(
  //     (event) =>
  //       new Date(event.start).getDate() === today.getDate() &&
  //       new Date(event.start).getMonth() === today.getMonth() &&
  //       new Date(event.start).getFullYear() === today.getFullYear()
  //   );

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="SECTION MANAGEMENT"
          subtitle="Manage Or Create Presentations Section"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("create&assign")}
          >
            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
            Create & Assign
          </Button>
        </Box>
      </Box>
      <Box display="grid" gap="5%">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Section's List
        </Typography>

        <Box
          sx={{ height: "65vh" }}
          backgroundColor={theme1 == "light" ? "#ff4d00" : colors.primary[400]}
          overflow="auto"
        >
          {data.length > 0 ? (
            data?.map((e, i) => (
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
                <Box>
                  <Typography
                    color={
                      theme1 == "light" ? "black" : colors.greenAccent[500]
                    }
                    variant="h5"
                    fontWeight="600"
                  >
                    {e.name}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>
                  <Typography
                    color={colors.grey[100]}
                    variant="p"
                    fontWeight="600"
                  >
                    {e.assignedUser.name}
                  </Typography>
                </Box>

                {/* <Box
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
                <Box
                 onClick={() => navigate(`grade/${e.id}`)}>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    sx={{textTransform:"capitalize"}}
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
                    sx={{textTransform:"capitalize"}}
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
        </Box> */}

                <Box sx={{ display: "flex", gap: "5%" }}>
                  {/* <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                  m="auto"
                  sx={{ cursor: "pointer" }}
                    width={"80pxpx"}
                    textAlign={'center'}
                    onClick={() => handlePresent(e)}
                >
                  PRESENT
                </Box>  */}

                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    m="auto"
                    sx={{ cursor: "pointer" }}
                    width={"125px"}
                    textAlign={"center"}
                    onClick={() =>
                      navigate(`/manage/detail/${id}/create_atrribute/${e.id}`)
                    }
                  >
                    ADD ATTRIBUTE
                  </Box>

                  <Box
                    backgroundColor={colors.greenAccent[500]}
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
            <h1>{data.message}</h1>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SectionPage;
