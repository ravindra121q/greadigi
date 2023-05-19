import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PresentationTable = ({ data }) => {
  // Calculate the total marks for each team
  const teamTotals = {};
  data?.teams?.map((team) => {
    teamTotals[team.teamName] = 0;
    team?.sections?.map((section) => {
      section?.attributes?.map((attribute) => {
        teamTotals[team.teamName] += attribute.value;
      });
    });
  });

  // Sort the teams based on their total marks
  const sortedTeams = data?.teams?.sort((a, b) => {
    return teamTotals[b.teamName] - teamTotals[a.teamName];
  });

  // Render the table rows in the sorted order and display the total marks for each team
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="presentation table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Team Name</TableCell>
            <TableCell align="center">Section Name</TableCell>
            <TableCell align="center">Attribute Name</TableCell>
            <TableCell align="center">Marks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTeams?.map((team, teamIndex) => (
            <>
              {team?.sections?.map((section, sectionIndex) =>
                section?.attributes?.map((attribute, attributeIndex) => (
                  <TableRow
                    key={`${teamIndex}-${sectionIndex}-${attributeIndex}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {attributeIndex === 0 && sectionIndex === 0 && (
                      <TableCell rowSpan={team.sections.reduce((acc, curr) => acc + curr.attributes.length, 0)} align="center">
                        {team.teamName}
                      </TableCell>
                    )}
                    {attributeIndex === 0 && (
                      <TableCell rowSpan={section.attributes.length} align="center">
                        {section.sectionName}
                      </TableCell>
                    )}
                    <TableCell align="center">{attribute.attributeName}</TableCell>
                    <TableCell align="center">{attribute.value}</TableCell>
                  </TableRow>
                ))
              )}
              <TableRow key={`${teamIndex}-total`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell colSpan={3} align="right">
                  Total
                </TableCell>
                <TableCell align="center">{teamTotals[team.teamName]}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PresentationTable;
