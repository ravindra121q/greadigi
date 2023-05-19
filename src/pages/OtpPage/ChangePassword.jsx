import React, { useState } from "react";
import styles from "./styles.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const [optsend, setOptsend] = useState(false);
  const navigate = useNavigate();
  const otpSendhandler = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setOptsend(true);
    }, 2000);
    setTimeout(() => {
      setOptsend(false);
    }, 4000);
    setTimeout(() => {
      return navigate("/login");
    }, 6000);
  };
  return (
    <div
      style={{
        display: "grid",
        alignItems: "center",
        padding: "10% 35% 20% 35%",
        paddingTop: optsend ? "6%" : "12%",
      }}
    >
      {optsend ? (
        <Alert
          style={{ marginBottom: "10%", textAlign: "center" }}
          severity="success"
        >
          Password Successfully Changed!
        </Alert>
      ) : null}
      <form
        style={{ color: "white", textAlign: "center", height: "250px" }}
        className={styles.form}
      >
        <p id="heading" color="white">
          <span color="white">Change Password</span>
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
          onClick={otpSendhandler}
          style={{ marginTop: "5%" }}
          className={styles.button3}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
