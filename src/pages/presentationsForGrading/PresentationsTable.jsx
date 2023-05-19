import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { tokens } from "../../theme";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { formatDate } from "@fullcalendar/react";
const theme1 = localStorage.getItem("mode");
const columns = [
  { id: "presentation", label: "PRESENTATION NAME", minWidth: 150 },
  { id: "meetingLink", label: "MEETING LINK", minWidth: 150 },
  { id: "description", label: "DESCRIPTION", minWidth: 150 },
  {
    id: "date",
    label: "DATE AND TIME",
    minWidth: 220,
  },
  {
    id: "pstatus",
    label: "STATUS",
    minWidth: 170,
  },
];

function createData(presentation, meetingLink, description, date, pstatus) {
  return { presentation, meetingLink, description, date, pstatus };
}

// const rows = [
//   createData("P1", "link", "desc", "04/05/2023 2:15pm-3:15pm", "Upcoming"),
//   createData("P2", "link", "desc","03/05/2023 2:15pm-3:15pm", "Ongoing"),
//   createData("P3", "link", "desc","02/05/2023 2:15pm-3:15pm", "Graded")
// ];

{
  /* <Box
backgroundColor={light ? "#5c8001" : colors.greenAccent[500]}
 p="5px 10px"
color={light ? "white" : null}
 borderRadius="4px"
 m="auto"
 >
 {formatDate(e.start, {
 year: "numeric",
 month: "short",
  day: "numeric",
})}
<br />
{formatDate(e.start, {
 hour: "numeric",
 minute: "numeric",
 hour12: true,
  })}
 --
{formatDate(e.end, {
  hour: "numeric",
 minute: "numeric",
 hour12: true,
 })}
</Box> */
}

const PresentationsTable = ({ data }) => {
  console.log(data, "trial");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const theme1 = localStorage.getItem("mode");

  const rows = [];
  data.map((el) => {
    let date =
      formatDate(el.start, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " | " +
      formatDate(el.start, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      "--" +
      formatDate(el.end, {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    rows.push(
      createData(el.title, el.meetingLink, el.description, date, el.pstatus)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (row) => {
    console.log("Presentation Clicked");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead
            style={
              theme1 === "light"
                ? { backgroundColor: "black", color: "white" }
                : null
            }
          >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  sx={{ textTransform: "capitalize" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isAlternateRow = index % 2 === 1; // Check if the row is alternate
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.presentation}
                    onClick={handleClick(row)}
                    sx={{
                      backgroundColor:
                        theme1 === "light"
                          ? isAlternateRow
                            ? "red"
                            : "inherit"
                          : "grey",
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PresentationsTable;
