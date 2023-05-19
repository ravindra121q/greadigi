import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCardTeam({ data, index ,SPSData}) {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  // const [data1,setData1]=useState([])

  // const sid = [id, data.id];


  // useEffect(() => {
  //   let token = JSON.parse(localStorage.getItem("token"));
  //   console.log(data.id,"rererrerer")
  //       let url = `http://${process.env.REACT_APP_SERVER}/attributes?section=` + data.id;

  //       fetch(url, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((res) => {
  //           setData1(res);
  //         }).catch((err)=> console.log(err));
    
  // }, []);

  // console.log("daaattaa",data1)

  return (
    <Card
      sx={{
        height: "30vh",
        width: "30vh",
        m: "auto",
        background: colors.primary[500],
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
      
      onClick={() =>{
        // if (data1) {
          navigate(`/grading/team/${id}/${data.id}/atrributes`);
        // } else {
          // alert(data1.message);
        // }
           
          
          }
      }
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          {index + 1}
        </Typography>
        <Typography
          variant="h1"
          component="div"
          sx={{ textAlign: "center", alignContent: "center" }}
        >
          {data.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
