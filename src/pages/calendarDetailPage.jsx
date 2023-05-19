import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserPresentationData } from "../Redux/Presentation/Get/action";

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const CardWrapper = styled(Card)(({ theme }) => ({
  minWidth: 275,
  marginTop: theme.spacing(2),
}));

function CalendarDetailPage(props) {
  const theme = useTheme();
  const dispatch=useDispatch()
  const colors = tokens(theme.palette.mode);
  const { loading, data, error } = useSelector((store) => store.get);

  useEffect(() => {
    dispatch(getSingleUserPresentationData(props.id));
  }, []);
  console.log(data,"calender Props")

  return (
    <Root>
      <Typography variant="h4" component="h1" gutterBottom sx={{textTransform:"capitalize"}}>
        {data.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card sx={{ bgcolor: `${colors.primary[500]}` }}>
            <CardHeader title="Details" />
            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p" sx={{textTransform:"capitalize"}} >
                <strong>Type:</strong> {data.type}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>Start:</strong> {new Date(data.start).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>End:</strong> {new Date(data.end).toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <strong>Meeting link:</strong>{" "}
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

export default CalendarDetailPage;
