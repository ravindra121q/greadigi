import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { Button, TextField, Typography, useTheme, Avatar } from "@mui/material";
import { Audio } from "react-loader-spinner";
import { tokens } from "../../theme";
import { useForm, Controller } from "react-hook-form";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { getTOKENSuccess } from "../../Redux/Auth/AuthToken/action";
import { useDispatch } from "react-redux";

export default function LogIn() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const light = localStorage.getItem("mode");
  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      username: email,
      password: password,
    };
    // console.log(theme.palette.mode=="light");
    // console.log(payload, "ghgh");

    fetch(`https://wary-flame-production.up.railway.app/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.token) {
          localStorage.setItem("token", JSON.stringify(data));
          dispatch(getTOKENSuccess(JSON.parse(localStorage.getItem("token"))));
          swal("Success!", "Login Successfull", "success", {
            buttons: false,
            timer: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 2500);
        } else {
          swal("Error!", " Invalid_crediantials ", "error", {
            buttons: false,
            timer: 3000,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: light == "light" ? "5%" : null,
        paddingBottom: light == "light" ? "20%" : null,
      }}
    >
      <Box
        display={"flex"}
        border={light == "light" ? "1px solid black" : null}
        flexDirection="column"
        maxWidth={450}
        alignItems="center"
        justifyContent={"center"}
        margin="auto"
        marginTop={5}
        padding={5}
        borderRadius={5}
        // boxShadow={light == "light" ? null : "5px 5px 10px #ccc"}
        boxShadow={light == "light" ? null : "#ccc 0px 0px 16px"}
        sx={{
          ":hover": {
            // boxShadow: "10px 10px 20px #ccc",
            boxShadow: "#ccc 0px 1px 2px 0px, #ccc 0px 2px 6px 2px",
          },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h2" padding={3} textAlign="center">
          Login
        </Typography>

        <TextField
          label="Email Address"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />

        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            marginTop: 2,
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
        >
          Submit
        </Button>
        <p>
          <a
            href="/fpassword"
            style={{ color: "white", textDecoration: "none" }}
          >
            Forgot Password ?
          </a>
        </p>
        {/* <p>
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p> */}
      </Box>
    </form>
  );
}
