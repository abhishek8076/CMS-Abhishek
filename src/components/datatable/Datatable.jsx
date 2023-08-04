import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import api from '../../utils/apiUrl.json'
import { Table,
   TableBody, 
   TableCell,
    TableContainer,
     TableHead,
      TableRow, 
      Paper,
    Button } from '@mui/material';

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api.edituser);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
debugger;
  return (
    <>
    
          <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
        <Button variant="outlined">Add New</Button>
        </Link>
      </div>
      </div>
          <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Address</TableCell>
            {/* <TableCell>Address</TableCell> */}
            <TableCell>Action</TableCell>
            {/* <TableCell>Delete</TableCell> */}
            {/* Add more table header cells for other properties */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item,i) => (
            
            <TableRow key={item.users_id}>
               <TableCell>{i+1}</TableCell>
              <TableCell>{item.user_name}</TableCell>
              <TableCell>{item.user_email}</TableCell>
              <TableCell>{item.user_mobile_no}</TableCell>
              <TableCell>{item.user_address}</TableCell>
              <TableCell> <Link to="/users/${:id}" className="link">
        <Button variant="outlined" margin-right="5px">Edit</Button>
        </Link>
        <Link to="/users/new" className="link"></Link>
        <Button variant="outlined" >Delete</Button>
        </TableCell>
              
              
              {/* <TableCell>{item.name}</TableCell> */}
              
              {/* Add more table cells for other properties */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Datatable;