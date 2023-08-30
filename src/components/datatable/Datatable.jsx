import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import api from '../../utils/apiUrl.json'
import './datatable.scss'
import { Table,
   TableBody, 
   TableCell,
    TableContainer,
     TableHead,
      TableRow, 
      Paper,
     } from '@mui/material';
     import apiClient from "../../services/AxiosApi";

const Datatable = () => {
  const [data, setData] = useState([]);
  //  const [catId, setCatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(api.newuser);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (users_id) => {
    // Find the item with the clicked ID
    const selectedItem = data.find(item => item.users_id === users_id);
    
    if (selectedItem) {
      // Do something with the selected item data
      console.log('Selected item:', selectedItem);
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link Link to={`/users/single/?id=${data.users_id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" ><EditIcon/>View</div>
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
// debugger;
  return (
    <>
    
          <div className="datatable">
      <div className="datatableTitle"style={{paddingTop: 20, paddingLeft: 10}}>
        <h2>Add New User</h2>
        <Link to="/users/new" className="link">
        <Button  id="btn" variant="contained">Add New</Button>
        </Link>
      </div>
      </div>
      <div className="container">
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
              <TableCell> <Link Link to={`/users/single/${item.users_id}`} style={{ textDecoration: "none" }}>
        <Button variant="contained"  onClick={() => handleButtonClick(item.user_id)}><EditIcon/>View</Button>
        </Link>
        {/* <Link to="/users/new" className="link"></Link>
        <Button variant="outlined" >Delete</Button> */}
        </TableCell>
              
              
              {/* <TableCell>{item.name}</TableCell> */}
              
              {/* Add more table cells for other properties */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
};

export default Datatable;