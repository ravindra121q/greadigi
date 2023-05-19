import React, { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
export const OtpVerify = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [otpverified, setOtpverified] = useState(false)
  
  const Submithandler = (e) => {
    e.preventDefault();
    setState(true);
    setOtpverified(true)
    setTimeout(() => {
      setState(false);
      setOtpverified(false)
      // return navigate("/fpassword/otpverify/changepassword");
    }, 2000);
  };
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        padding: "10% 35% 20% 35%",
      }}
    >
      {state ? (
        <Alert
          style={{ marginBottom: "10%", textAlign: "center" }}
          severity="success"
        >
          Otp Verified!
        </Alert>
      ) : null}
      <form
        style={{ color: "white", textAlign: "center", height: "450px" }}
        className={styles.form}
      >
        {" "}
        <center>
          <p style={{ color: "orange" }} className="heading">
            Enter the verification code sent to you
          </p>
          <div className="box">
            <input maxLength="1" className={styles["input1"]} />
            <input maxLength="1" className={styles["input1"]} />
            <input maxLength="1" className={styles["input1"]} />
            <input maxLength="1" className={styles["input1"]} />
            <input maxLength="1" className={styles["input1"]} />
            <input maxLength="1" className={styles["input1"]} />
          </div>
          {/* <button className={styles.submit} onClick={Submithandler}>
            Submit
          </button> */}
          {/* <button className={styles.exit} onClick={() => navigate("/login")}>
            Back
          </button> */}
        </center>
        <p id="heading" style={{paddingTop:"45px",color:"orange"}} color="orange">
          <span color="orange">Change Password</span>
        </p>
        <div className={styles.field}>
          <svg
            className={styles["input-icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="New Password"
            className={styles["input-field"]}
            type="text"
          />
        </div>
        <div className={styles["field"]}>
          <svg
            className={styles["input-icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Confirm Password"
            className={styles["input-field"]}
            type="password"
          />
        </div>
        <div className={styles.btn}>
          {/* <button className="button1">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button className={styles.button2}>Sign Up</button> */}
        </div>
        <button
          // onClick={otpSendhandler}
          style={{ marginTop: "3%",cursor:"pointer" }}
          className={styles.button3}
          onClick={() => navigate("/login")}
        >
          Submit
        </button>
      </form>
      
    </div>
  );
};
