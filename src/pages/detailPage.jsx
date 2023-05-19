import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Typography,
  Link,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { tokens } from "../theme";

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const CardWrapper = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginTop: theme.spacing(2),
}));

function DetailPage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = {
    title: "Training Session",
    meetingLink: "https://zoom.us/j/123456789",
    type: "team",
    start: "2023-03-31T10:18",
    end: "2023-03-31T19:18",
    description:
      '<h3><s style="color: rgb(120, 84, 18);">Learn new software tool</s><strong class="ql-font-monospace" style="color: rgb(120, 84, 18);"><span class="ql-cursor">﻿</span></strong></h3>',
    id: 31,
  };

  return (
    <Root>
      <Typography variant="h4" component="h1" gutterBottom>
        {data.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card sx={{ bgcolor: `${colors.primary[500]}` }}>
            <CardHeader title="Details" />
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>Type:</strong> {data.type}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>Start:</strong> {new Date(data.start).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>End:</strong> {new Date(data.end).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>Meeting link1:</strong>{" "}
                <Link
                  href={data.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  color="#868dfb"
                >
                  {data.meetingLink}
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card sx={{ bgcolor: `${colors.primary[500]}` }}>
            <CardHeader title="Description" />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="div"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Root>
  );
}

export default DetailPage;

