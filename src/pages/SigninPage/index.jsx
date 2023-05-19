import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { Button, TextField, Typography, useTheme, Avatar } from "@mui/material";
import { Audio } from "react-loader-spinner";
import { tokens } from "../../theme";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../Redux/Auth/Get/action";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

// const validationSchema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Invalid email address")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .max(20, "Password must be at most 20 characters")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//     )
//     .notOneOf(["password", "123456"], "Password is too common"),
// });

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });
  // console.log(useForm.email)
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email
    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   setEmailError("Invalid email");
    //   return;
    // } else {
    //   setEmailError("");
    // }

    // Validate password
    // if (password.length < 6) {
    //   setPasswordError("Password must be at least 6 characters");
    //   return;
    // } else {
    //   setPasswordError("");
    // }

    const payload = {
      username: email,
      password: password,
    };

    console.log(payload, "ghgh");

    fetch(`${process.env.REACT_APP_SERVER_13}/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data?.token) {
          localStorage.setItem("token", JSON.stringify(data));
          swal("Success!", "Login Successfull", "success", {
            buttons: false,
            timer: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
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
    <form onSubmit={handleSubmit}>
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
          Sign in
        </Typography>

        {/* <Controller
          name="email"
          control={control}
          render={({ field }) => ( */}
        <TextField
          // {...field}
          label="Email Address"
          variant="outlined"
          // error={!!errors.email}
          // helperText={errors.email?.message}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        {/* )}
        /> */}
        {/* <Controller
          name="password"
          control={control}
          render={({ field }) => ( */}
        <TextField
          // {...field}
          label="Password"
          variant="outlined"
          // error={!!errors.password}
          // helperText={errors.password?.message}
          margin="normal"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* )} */}
        {/* /> */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Signup
        </Button>
        <p>
          Don't have an account? <a href="/Signup">Sign Up</a>
        </p>
      </Box>
    </form>
  );
}
