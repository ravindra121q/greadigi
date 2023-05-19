import { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Modal,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getData } from "../../Redux/Presentation/Get/action";
import { addData } from "../../Redux/Presentation/Post/action";
import DetailPage from "../calendarDetailPage";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [did, setDid] = useState("");
  const { loading, data, error } = useSelector((store) => store.get);
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const navigate = useNavigate();
  const token =  JSON.parse(localStorage.getItem("token"));
  const isAdmin=token.isAdmin
  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
    description: description,
    meetingLink: "",
  });


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    dispatch(getData());
  }, []);

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

  const handleModalOpen = (e) => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDescriptionModalOpen = (e) => {
    setIsDescriptionModalOpen(true);
  };

  const handleDescriptionModalClose = () => {
    setIsDescriptionModalOpen(false);
  };

  const handleDateClick = (selected) => {
    if(isAdmin && selected.startStr >= new Date().toISOString().replace(/T.*$/, "")){ 
      setSelectedData(selected);
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();
    setFormData({
      title: "",
      start:new Date(selected.startStr).toISOString().slice(0, 16),
      end: new Date(selected.endStr).toISOString().slice(0, 16),
      description: description,
      meetingLink: "",
      type: "",
    });
    handleModalOpen(selected.startStr);
  }else{
    // alert("You are not authorized!")
    return;
  }
   
  };

  const validRange = {
    start: new Date().toISOString().replace(/T.*$/, ""),
    end: "2050-01-01",
  };

  const handleFormSubmit = (event) => {
    console.log(formData, "font event");
    event.preventDefault();

    const calendarApi = selectedData.view.calendar;
    calendarApi.unselect();

    if (formData.title) {
      calendarApi.addEvent({
        id: `${formData.start}-${formData.title}`,
        name: formData.title,
        start: formData.start,
        end: formData.end,
        allDay: true,
      });
    }

    const newData = {
      navigate:navigate,
      data:{...formData,
      description: description,}
    };
console.log(newData,"payload")
    dispatch(addData(newData));
    setFormData({
      title: "",
      start: "",
      end: "",
      description: "",
      meetingLink: "",
      type: "",
    });
    setDescription("");
    handleModalClose();
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleEventClick = (selected) => {
    setDid(selected.event.id)
    handleDescriptionModalOpen();
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            // validRange={validRange}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={data}
          />
        </Box>
      </Box>

      {/* Form Modal */}

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          bgcolor={colors.primary[400]}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Header
            title="CREATE PRESENTATION"
            subtitle="Create a New Presentation"
          />
          <Box sx={{ mt: 2 }}>
            <form onSubmit={handleFormSubmit}>
              <TextField
                label="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                required
                id="meetingLink"
                type="url"
                label="Link For Meeting"
                fullWidth
                value={formData.meetingLink}
                onChange={(e) =>
                  setFormData({ ...formData, meetingLink: e.target.value })
                }
                sx={{ mb: 2 }}
              />

              <FormControl sx={{ width: "100%" }}>
                <InputLabel>Select Type</InputLabel>
                <Select
                  native
                  required
                  sx={{ mb: 2 }}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  inputProps={{
                    name: "select",
                  }}
                  label="Select Type"
                >
                  <option value="" />
                  <option value="team">Team</option>
                  <option value="induvisual">Induvisual</option>
                </Select>
              </FormControl>

              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={description}
                onChange={handleDescriptionChange}
              />

              <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button sx={{ mr: 2 }} onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Modal>

      {/* Description Modal */}
      <Modal
  open={isDescriptionModalOpen}
  onClose={handleDescriptionModalClose}
>
  <Box
    bgcolor={colors.primary[400]}
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,

      boxShadow: 24,
      p: 4,
      borderRadius: "8px",
    }}
  >
    <Header title="DETAIL PAGE" subtitle="Presentation Details" />
    <Box display="grid" gap="5%">
      <Box
        sx={{ height: "65vh" }}
        backgroundColor={colors.primary[400]}
        overflow="auto"
      >
        <DetailPage id={did} />
      </Box>
    </Box>

    <Box sx={{ textAlign: "right", mt: 2 }}>
      <Button
        variant="contained"
        onClick={handleDescriptionModalClose}
        sx={{
          background: colors.blueAccent[700],
          color: colors.primary[100],
        }}
      >
        Cancel
      </Button>
    </Box>
  </Box>
</Modal>
     
    </Box>
  );
};

export default Calendar;
