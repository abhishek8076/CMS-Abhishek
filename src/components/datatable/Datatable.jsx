import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../../utils/apiUrl.json';
import './datatable.scss';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import apiClient from '../../services/AxiosApi';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(api.newuser);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleButtonClick = (users_id) => {
    const selectedItem = data.find((item) => item.users_id === users_id);

    if (selectedItem) {
      console.log('Selected item:', selectedItem);
    }
  };

  const handleDeleteClick = (users_id) => {
    setDeleteItemId(users_id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Make a DELETE request to your API with the deleteItemId
      await apiClient.delete(`/users/${deleteItemId}`);
      
      // Remove the deleted item from the data array
      const updatedData = data.filter((item) => item.users_id !== deleteItemId);
      setData(updatedData);
      
      // Close the dialog
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle" style={{ paddingTop: 20, paddingLeft: 10 }}>
          <h2>Add New User</h2>
          <Link to="/users/new" className="link">
            <Button id="btn" variant="contained">
              <AddIcon /> Add New
            </Button>
          </Link>
        </div>
      </div>
      <div className="container">
        {loading ? (
          <CircularProgress style={{ margin: '20px auto', display: 'block' }} />
        ) : (
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile No</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={item.users_id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{item.user_name}</TableCell>
                    <TableCell>{item.user_email}</TableCell>
                    <TableCell>{item.user_mobile_no}</TableCell>
                    <TableCell>{item.user_address}</TableCell>
                    <TableCell>
                      <Link
                        to={`/users/single/${item.users_id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="contained" onClick={() => handleButtonClick(item.user_id)}>
                          <EditIcon />
                        </Button>
                      </Link>
                      <Button variant="contained" onClick={() => handleDeleteClick(item.users_id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Datatable;
