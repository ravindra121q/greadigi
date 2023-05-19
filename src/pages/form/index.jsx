import { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Box,
  Select,
  useTheme,
} from "@mui/material";
import { addData } from "../../Redux/Presentation/Post/action";
import Header from "../../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "react-loader-spinner";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  const theme1 = localStorage.getItem("mode");
  const { loading, msg, error } = useSelector((store) => store.post);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [presentationData, setPresentationData] = useState({});

  const handlechange = (e) => {
    setPresentationData({
      ...presentationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStartDateChange = (event) => {
    const { value } = event.target;
    setStartDate(value);
    const startDateTime = new Date(value).getTime();
    const endDateTime = new Date(endDate).getTime();
    if (endDateTime && startDateTime >= endDateTime) {
      setStartTimeError("Start time must be before end time");
    } else {
      setStartTimeError("");
    }
  };

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    setEndDate(value);
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(value).getTime();
    if (startDateTime && startDateTime >= endDateTime) {
      setEndTimeError("End time must be after start time");
    } else {
      setEndTimeError("");
    }
  };

  const minDate = new Date().toISOString().slice(0, 16);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      navigate: navigate,
      data: {
        ...presentationData,
        start: startDate,
        end: endDate,
        description: description,
      },
    };
    dispatch(addData(payload));
    setPresentationData({});
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleDescriptionChange = (value) => {
    const strippedValue = value.replace(/<[^>]*>/g, '');
    setDescription(strippedValue);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  if (loading) {
    return (
      <center>
        <Audio
          height="90vh"
          width="100%"
          radius="9"
          color={colors.grey[100]}
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </center>
    );
  } else if (error) {
    return alert("Something went Wrong");
  }
  return (
    <Box m="20px" width="85%" margin="auto">
      <Header
        title="CREATE PRESENTATION"
        subtitle="Create a New Presentation"
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              label="Title"
              fullWidth
              variant="outlined"
              name="title"
              onChange={handlechange}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: "2%"}}>
              {" "}
              <TextField
                required
                id="meetingLink"
                type="url"
                label="Link For Meeting"
                fullWidth
                style={{ color: "white" }}
                name="meetingLink"
                onChange={handlechange}
                // backgroundColor={"orange"}
              />
              <FormControl sx={{ width: "40%" }}>
                <InputLabel>Select Type</InputLabel>
                <Select
                  native
                  required
                  onChange={handlechange}
                  inputProps={{
                    name: "type",
                  }}
                  label="Select Type"
                >
                  <option value="" />
                  <option value="team">Team</option>
                  <option value="individual">Individual</option>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <ReactQuill
              modules={modules}
              formats={formats}
              onChange={handleDescriptionChange}
              placeholder="Enter your description here..."
              fieldset="true"
            />
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                marginLeft: "24px",
                marginTop: "24px",
              }}
            >
              <TextField
                required
                id="start-date"
                label="Start Date"
                width="100%"
                type="datetime-local"
                InputLabelProps={{ shrink: true }}
                name="start"
                onChange={handleStartDateChange}
                inputProps={{ min: minDate }}
                error={Boolean(startTimeError)}
                helperText={startTimeError}
              />
            </Box>
            <Box sx={{ flexGrow: 1, marginTop: "24px", marginLeft: "24px" }}>
              <TextField
                required
                id="end-date"
                label="End Date"
                type="datetime-local"
                name="end"
                InputLabelProps={{ shrink: true }}
                onChange={handleEndDateChange}
                inputProps={{ min: startDate }}
                error={Boolean(endTimeError)}
                helperText={endTimeError}
              />
            </Box>
          </Box>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: theme1=="light"?"#5c8001": colors.blueAccent[700],
                color: theme1=="light"?"white":colors.grey[100],
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
