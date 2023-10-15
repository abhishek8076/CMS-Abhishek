import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import {
  TableHead, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar
} from '@mui/material';

import api from '../../utils/apiUrl.json';
import apiClient from '../../services/AxiosApi';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Banner.scss';

export const BannerTable = () => {
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
  const [data, setData] = useState([]);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(api.getimage);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteRow = async (id) => {
    try {
      await apiClient.delete(`/api/Slider/${id}`);
      setData(prevData => prevData.filter(item => item.u_id !== id));
      setPostIdToDelete(null);
      setShowConfirmationDialog(false);
      setShowAlert(true);
      window.reload()
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }

  const handleDeleteClick = (id) => {
    setPostIdToDelete(id);
    setShowConfirmationDialog(true);
  };

  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setShowConfirmationDialog(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle" style={{ paddingTop: 20, paddingLeft: 10 }}>
        <h1 class="text-center heading-main">Banner Data</h1>
        </div>
      </div>
      <div className="container">
        <TableContainer component={Paper} className="table my-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table className="table table-bordered" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                {user.r_usertype === 2 && (
                  <TableCell>Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={item.u_id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell><img className='getImage' src={item.imgpath} alt={item.u_content} /></TableCell>
                  <TableCell>{item.u_content}</TableCell>
                  {user.r_usertype === 2 && (
                    <TableCell>
                      <Button onClick={() => handleDeleteClick(item.u_id)}>
                        <DeleteIcon />
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showConfirmationDialog && (
          <Dialog open={showConfirmationDialog} onClose={handleCancelDelete}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Do you want to delete this post?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDelete} color="primary">
                No
              </Button>
              <Button onClick={() => deleteRow(postIdToDelete)} color="primary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {showAlert && (
          <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose}>
            <Alert severity="success" onClose={handleAlertClose}>
              Data deleted successfully!
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
};
