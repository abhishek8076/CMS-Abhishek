import React from 'react';
import { Table,
    TableBody, 
    TableCell,
     TableContainer,
      TableHead,
       TableRow, 
       Paper,
      } from '@mui/material';
      import {userRows} from '../../datatablesource.js'

export const BannerTable = () => {
  return (
    <div>      <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Mobile No</TableCell>
          <TableCell>Address</TableCell>
          {/* <TableCell>Address</TableCell> */}
          {/* <TableCell>Delete</TableCell> */}
          {/* Add more table header cells for other properties */}
        </TableRow>
      </TableHead>
      <TableBody>
        
        {userRows.map((item,i) => (
          
          <TableRow key={item.id}>
             <TableCell>{i+1}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.status}</TableCell>
           
            
            
            {/* <TableCell>{item.name}</TableCell> */}
            
            {/* Add more table cells for other properties */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer></div>
  )
}
