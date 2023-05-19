import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  useTheme,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../../components/FileUpload/FileUpload";
import { getSingleUserPresentationData } from "../../Redux/Presentation/Get/action";

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const theme1 = localStorage.getItem("mode");
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const { loading, data, error } = useSelector((store) => store.get);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    dispatch(getSingleUserPresentationData(id));
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const Root = styled("div")(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
  }));

  const CardWrapper = styled(Card)(({ theme }) => ({
    minWidth: 275,
    marginTop: theme.spacing(2),
  }));

  const AddSection = styled("div")(({ theme }) => ({
    marginTop: theme.spacing(2),
  }));

  if (loading) {
    return (
      <center>
        <h1>Loading...</h1>
      </center>
    );
  } else if (error) {
    return alert("Something went Wrong");
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={data.title}
          subtitle="Presentation Details"
          subtitleColor="black"
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
            onClick={() => navigate(`section`)}
          >
            Add Section
          </Button>
        </Box>
      </Box>

      <Box display="grid" gap="5%">
        <Box
          sx={{ height: "65vh" }}
          style={{ backgroundColor: theme1 == "light" ? "#ff4d00" : null }}
          overflow="auto"
        >
          <Root>
            {/* <Typography variant="h4" component="h1" gutterBottom>
              {data.title}
            </Typography> */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CardWrapper sx={{ bgcolor: `${colors.primary[500]}` }}>
                  <CardHeader title="Details" />
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Type:</strong> {data.type}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Start:</strong>{" "}
                      {new Date(data.start).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>End:</strong>{" "}
                      {new Date(data.end).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>Meeting link:</strong>{" "}
                      <Link
                        href={data.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ color: "darkcyan" }}
                      >
                        {data.meetingLink}
                      </Link>
                    </Typography>
                  </CardContent>
                </CardWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <CardWrapper sx={{ bgcolor: `${colors.primary[500]}` }}>
                  <CardHeader title="Description" />
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="div"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                  </CardContent>
                </CardWrapper>

                <AddSection>
                  <div>
                    <div className="Upload">Upload file</div>
                    <FileUpload
                      files={files}
                      setFiles={setFiles}
                      removeFile={removeFile}
                    />
                  </div>
                </AddSection>
              </Grid>
            </Grid>
          </Root>
        </Box>
      </Box>
    </Box>
  );
}

export default DetailPage;
