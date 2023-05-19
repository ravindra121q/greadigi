import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { formatDate } from "@fullcalendar/react";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ data, index }) {
  const { id } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);

  return (
    <Card
      sx={{
        height: "30vh",
        width: "30vh",
        m: "1%",

        p: "1%",
        background: colors.primary[800],
      }}
      onClick={() => navigate(`team/${data.id}`)}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, textAlign: "center" }}
          color="text.secondary"
          gutterBottom
        >
          {index + 1}
        </Typography>
        <Typography variant="h5" component="div" sx={{textAlign: "center" ,textTransform:"capitalize"}}>
          {data.title}
        </Typography>
        <Typography sx={{ mb: 1.5 ,textAlign: "center" ,textTransform:"capitalize"}} color="text.secondary">
          {data.type}
        </Typography>
        <Typography variant="body2" sx={{textAlign: "center" ,textTransform:"capitalize"}}>
          {formatDate(data.start, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          -{" "}
          {formatDate(data.start, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
          <br />
          {formatDate(data.end, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          -
          {formatDate(data.end, {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}
