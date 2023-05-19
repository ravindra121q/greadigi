import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getResultData } from '../../Redux/Presentation/Get/action';
import PresentationTable from '../../components/Test';

const ProjectPresentation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((store) => store.get);

  useEffect(() => {
      dispatch(getResultData(id));
  }, []);

  console.log(data)

  return (
   <div>
    <PresentationTable data={data}/>
   </div>
  );
};

export default ProjectPresentation;
