import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { OutputOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { tokens } from "../theme";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "../Redux/Auth/Post/action";

const ThreeStepForm = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, msg, error } = useSelector((store) => store.postUser);

  const handleSubmit = () => {
    const Payload = {
      userName: username,
      email: email,
      password: password,
    };
    dispatch(addUserData(Payload));

    // console.log(Payload,"payload");
  };

  const handleNext = () => {
    // Check if the email is in a valid format using a regular expression
    if (username.length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorEmail(true);
      } else {
        // let authDetails = JSON.parse(localStorage.getItem("authDetails"));
        // let token = authDetails?.token;
        console.log(email,"Email");
        const url =
          `${process.env.REACT_APP_SERVER_13}/otp/send/`+email;

        fetch(url, {
          method: "POST",
        })
          .then((res) => {
            return res.json();
          })
          .then((val) => {
            console.log(val);
            swal("Success!", "OTP send to your email Successfully", "success", {
              buttons: false,
              timer: 2000,
            });
            setActiveStep(activeStep + 1);
          })
          .catch((error) => {
            console.log(error);
            console.log("Shree")
            swal("Error!", "Something went wrong while sending OTP", "error", {
              buttons: false,
              timer: 2000,
            });
          });
      }
    } else {
      setErrorUsername(true);
    }
  };

  const handleNext1 = () => {
    // Check if the email is in a valid format using a regular expression

    if (otp.length == 6) {
      // let authDetails = JSON.parse(localStorage.getItem("authDetails"));
      // let token = authDetails?.token;
      console.log(otp, "otp");
      const url =
        "42ed-2409-4043-4e05-1b59-e8a4-4adb-fc69-a41a.in.ngrok.io/otp/verify/" +
        otp;

      fetch(url, {
        method: "POST",
      })
        .then((res) => {
          return res.text();
        })
        .then((val) => {
          console.log(val);
          swal("Success!", "OTP successfully verified", "success", {
            buttons: false,
            timer: 2000,
          });
          setActiveStep(activeStep + 1);
        })
        .catch((error) => {
          console.log(error);
          swal("Error!", "Something went wrong", "error", {
            buttons: false,
            timer: 3000,
          });
        });
    } else {
      setErrorUsername(true);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              required
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginTop: 2 }}
              value={username}
              onChange={handleUsernameChange}
            />
            {errorUsername && (
              <Typography color="error">Please enter username.</Typography>
            )}
            <TextField
              label="Email"
              variant="outlined"
              sx={{ marginTop: 2 }}
              error={errorEmail}
              fullWidth
              value={email}
              onChange={handleEmailChange}
            />
            {errorEmail && (
              <Typography color="error">
                Please enter a valid email address.
              </Typography>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              label="OTP"
              variant="outlined"
              sx={{ marginTop: 2 }}
              fullWidth
              value={otp}
              onChange={handleOtpChange}
            />

            {errorUsername && (
              <Typography color="error">Please enter valid OTP.</Typography>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <FormControl sx={{ marginTop: 2 }} variant="outlined" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                multiline
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Username and Email</StepLabel>
        </Step>
        <Step>
          <StepLabel>OTP Verification</StepLabel>
        </Step>
        <Step>
          <StepLabel>Password</StepLabel>
        </Step>
      </Stepper>
      <div>
        {activeStep === 0 && (
          <div>
            {getStepContent(activeStep)}
            <Button
              onClick={handleNext}
              sx={{
                marginTop: 2,
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
            >
              Next
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            {getStepContent(activeStep)}
            <Button
              onClick={handleBack}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                marginTop: 2,
                marginRight: 2,
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleNext1}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                marginTop: 2,
              }}
            >
              Next
            </Button>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            {getStepContent(activeStep)}
            <Button
              onClick={handleBack}
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                marginTop: 2,
                marginRight: 2,
              }}
            >
              Back
            </Button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeStepForm;
