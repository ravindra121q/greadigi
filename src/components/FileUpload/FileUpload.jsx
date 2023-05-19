import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./FileUpload.css";
import axios from "axios";
import { useTheme, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { tokens } from "../../theme";
import { useState } from "react";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const FileUpload = ({files, setFiles}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [data, setData] = useState({});
  const colors = tokens(theme.palette.mode);

console.log(id,"id")

  useEffect(() => {


    let token = JSON.parse(localStorage.getItem("token"));

    fetch(`${process.env.REACT_APP_SERVER}/teams?presentation=`+id, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      });
  }, [files]);

  console.log(data,"team data")

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    file.isUploading = true;
    setFiles(file);
    console.log(file, "pintu");
    // upload file

    const formData = new FormData();
    formData.append("file", file, file.name);

    let token = JSON.parse(localStorage.getItem("token"));
    const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token.token);
  

    fetch(`${process.env.REACT_APP_SERVER}/csv?presentation=`+ id, {
      method: "POST",
      headers: headers,
      body: formData,
    }).then((res)=>{
      if (res.headers.get('Content-Type').includes('application/json')) {
        return res.json();
      }

      return res.text()
    })
      .then((response) => {
        if(response.status == 500){
          swal("Error!", `${response.message}` ,"error", {
            buttons: false,
            timer: 2000,
          });
          return;
        }
        swal("Success!", "CSV file uploaded successfully!", "success", {
          buttons: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.error("csv error", error);
        swal("Error!", "Error uploading CSV file:", "error", {
          buttons: false,
          timer: 2000,
        });
      });
  };

  const deleteFileHandler = () => {

    let token = JSON.parse(localStorage.getItem("token"));

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + token.token);

    fetch(`${process.env.REACT_APP_SERVER}/csv?presentation=`+ id,{
      method: "DELETE",
      headers: headers,
    }).then((res)=>{
      if (res.headers.get('Content-Type').includes('application/json')) {
        return res.json();
      }
      return res.text()
    })
      .then((response) => {

        console.log(response.status)
        if(response.status==500){
          swal("Error!", `${response.message}` ,"error", {
            buttons: false,
            timer: 2000,
          });
          return
        }
        swal("Success!", "CSV file delete successfully!", "success", {
          buttons: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        console.log(error,"error")
        swal("Error!", "Error delete CSV file:", "error", {
          buttons: false,
          timer: 2000,
        });
      });
  };

  return (
    <>
      <div
        className="file-card"
        style={{
          backgroundColor: colors.primary[500],
          borderRadius: "10px",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <div className="file-inputs">
          <input type="file" name="file" onChange={uploadHandler} />
          <Button
            style={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <i>
              <FontAwesomeIcon
                style={{ color: colors.grey[100] }}
                icon={faPlus}
              />
            </i>
            Upload
          </Button>
        </div>
        {/* {data.length > 0 && <p style={{ color: "green" }}>File Uploded</p>} */}
        <p className="main">Supported files</p>
        <p className="info" style={{textTransform:"lowercase"}}>.csv</p>
        <a href="../../assets/Book1.csv" download="sample.csv">
          Download sample CSV file
        </a>
        <Button
          onClick={deleteFileHandler}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            marginTop: "5%",
          }}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default FileUpload;
