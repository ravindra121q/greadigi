import {
  Button,
  TextField,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../../Redux/Auth/Post/action";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';



export default function Signup() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { loading, msg, error } = useSelector((store) => store.postUser);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState({});

  const handlechange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const payload={
      navigate:navigate,
      data:userData
    }
    dispatch(addUserData(payload));
  };

  if (loading) {
    return (
      <center>
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
      </center>
    );
  } else if (error) {
    return alert("Something went Wrong");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Signup form code here */}
        <Box
          display={"flex"}
          flexDirection="column"
          maxWidth={450}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow="5px 5px 10px #ccc"
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h2" padding={3} textAlign="center">
            Sign up
          </Typography>
          <TextField
            required
            label="Full name"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
            name="name"
            onChange={handlechange}
          />

          <TextField
            required
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 2 }}
            name="userName"
            onChange={handlechange}
          />

          <TextField
            label="Email"
            variant="outlined"
            sx={{ marginTop: 2 }}
            fullWidth
            name="email"
            onChange={handlechange}
          />

          <TextField
            label="Password"
            variant="outlined"
            sx={{ marginTop: 2 }}
            fullWidth
            type="Password"
            name="password"
            onChange={handlechange}
          />

          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              marginTop: 2,
            }}
          >
            Submit
          </Button>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </Box>
      </form>
    </>
  );
}
