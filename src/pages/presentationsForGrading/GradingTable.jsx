import React from 'react';

const columns = [
    { id: "name", label: "Team Name", minWidth: 150 },
    {
      id: "members",
      label: "Team Members",
      minWidth: 150
    },
    {
      id: "criteria",
      label: "Assesment Criteria",
      minWidth: 220
    },
    {
      id: "marks",
      label: "Marks",
      minWidth: 170
    },
    {
      id: "comments",
      label: "Comments",
      minWidth: 170
    }
  ];

  function createData(
    name,
    members,
    criteria,
    marks,
    comments
  ) {
    return { name, members, criteria, marks, comments };
  }
  
  const rows = [
    createData("T1", "M1, M2, M3", "Opening Statement", 0, ""),
    createData("", "", "Closing Statement", 0, ""),
    createData("", "", "Flow", 0, ""),
    createData("T2", "M1, M2, M3", "Opening Statement", 0, ""),
    createData("", "", "Closing Statement", 0, ""),
    createData("", "", "Flow", 0, "")
  ];

const GradingTable = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const dispatch = useDispatch();
    // const teams = useSelector((state) => state.teams);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    // const handleMarksChange = (
    //   teamName,
    //   criteria,
    //   marks
    // ) => {
    //   dispatch(setTeamCriteriaMarks({ teamName, criteria, marks }));
    // };
  
    // const handleCommentsChange = (
    //   teamName,
    //   criteria,
    //   comments
    // ) => {
    //   dispatch(setTeamCriteriaComments({ teamName, criteria, comments }));
    // };
  

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "marks" && (
                          <TextField
                            type="number"
                            defaultValue={null}
                            InputProps={{
                              inputProps: { min: 0, max: 10 },
                              onChange: (event) =>
                                dispatch({
                                  type: "SET_MARKS",
                                  teamIndex: rowIndex,
                                  criterionId: column.id,
                                  value: parseInt(event.target.value)
                                })
                            }}
                          />
                        )}
                        {column.id === "comments" && (
                          <TextField
                            type="string"
                            onChange={(event) =>
                              dispatch({
                                type: "SET_COMMENTS",
                                teamIndex: rowIndex,
                                criterionId: column.id,
                                value: event.target.value
                              })
                            }
                          />
                        )}
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
  )
}

export default GradingTable