import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../../utils/apiUrl.json';
import './datatable.scss';
import HomeIcon from '@mui/icons-material/Home';

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
  TextField,
  TablePagination,
} from '@mui/material';
import apiClient from '../../services/AxiosApi';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
      await apiClient.delete(api.deleteuser + deleteItemId);

      const updatedData = data.filter((item) => item.users_id !== deleteItemId);
      setData(updatedData);

      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const filteredData = data.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Object.values(item).some((value) => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerCaseSearchTerm);
      }
      return false;
    });
  });

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <div className="datatable-container">
      <div className="datatable-header">
        <h2>Add New User</h2>
        <Link to="/users/new" className="link">
          <Button variant="contained" startIcon={<AddIcon />}>
            Add New
          </Button>
        </Link>
      </div>
      <div className="datatable-header">
        <Link to="/dashboard" className="link">
          <Button variant="contained" startIcon={<HomeIcon />}>
            Back
          </Button>
        </Link>
      </div>
      <div className="search-bar">
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxRows={6}
        />
      </div>
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="table">
          <Table aria-label="simple table">
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
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
                <TableRow key={item.users_id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.user_name}</TableCell>
                  <TableCell>{item.user_email}</TableCell>
                  <TableCell>{item.user_mobile_no}</TableCell>
                  <TableCell>{item.user_address}</TableCell>
                  <TableCell>
                    <Link to={`/users/single/${item.users_id}`} className="link">
                      <Button variant="contained" onClick={() => handleButtonClick(item.user_id)} startIcon={<EditIcon />}>
                        Edit
                      </Button>
                    </Link>
                    <Button variant="contained" onClick={() => handleDeleteClick(item.users_id)} startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={() => {}}
          />
        </TableContainer>
      )}
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
    </div>
  );
};

export default Datatable;
