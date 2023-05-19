import { Button, TextField, Typography, useTheme, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { Audio } from "react-loader-spinner";
import { tokens } from "../../theme";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../../Redux/Auth/Post/action";
import ThreeStepForm from "../Signup1";

const validationSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .notOneOf(["password", "123456"], "Password is too common"),
});

export default function Signup() {
  const dispatch = useDispatch();
  const { loading, msg, error } = useSelector((store) => store.postUser);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e) => {
    setEmail(e.target.value);
    console.log(email, "email");
    // dispatch(sendOtp(email));
    setShowOtpForm(true);
  };

  const handleVerifyOtp = () => {
    // dispatch(verifyOtp(email, otp));
    // dispatch(addUserData({ userName, email, password }));
  };

  // const onSubmit = (data) => {
  //   const { userName, email, password } = data;
  //   setEmail(email);
  //   handleSendOtp();
  // };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  console.log(useForm.email, "useForm");

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(addUserData(data));
  };

  const handleChageEmail = (e) => {
    // console.log(data);
    setEmail(e.target.value);
    // dispatch(addUserData(data));
  };

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

          <ThreeStepForm />

          <p>
            Already have an account? <a href="/Signin">Sign in</a>
          </p>
        </Box>
      </form>
    </>
  );
}
