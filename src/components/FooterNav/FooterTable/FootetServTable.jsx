import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EditNotifications } from '@mui/icons-material';
import { GridDeleteIcon } from '@mui/x-data-grid';

// Import your API client and URL configurations
import apiClient from '../../../services/AxiosApi.jsx';
import apis from '../../../utils/apiUrl.json';

import Sidebar from '../../sidebar/Sidebar.jsx';
import Navbar from '../../navbar/Navbar.jsx'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert'; 

// import './whatsnew.scss';

export const FooterServTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleButtonClick = (users_id) => {
    const selectedItem = data.find((item) => item.u_id === users_id);

    if (selectedItem) {
      console.log('Selected item:', selectedItem);
    }
  };

  const handleDeleteClick = (users_id) => {
    setDeleteItemId(users_id);
    setConfirmDialogOpen(true);
  };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     // Make a DELETE request to your API with the deleteItemId
  //     await apiClient.delete(apis.deletewhatsnew + deleteItemId);

  //     // Remove the deleted item from the data array
  //     const updatedData = data.filter((item) => item.u_id !== deleteItemId);
  //     setData(updatedData);

  //     // Close the confirmation dialog
  //     setConfirmDialogOpen(false);

  //     // Show a toast notification
  //     setSnackbarOpen(true);
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };
  const handleDeleteConfirm = async () => {
    try {
      // Make a DELETE request to your API with the deleteItemId
      await apiClient.delete(apis.deletewhatsnew + deleteItemId);
  
      // Remove the deleted item from the data array
      const updatedData = data.filter((item) => item.u_id !== deleteItemId);
      
      console.log('Deleted item ID:', deleteItemId);
      
      console.log('Updated Data after deletion:', updatedData);
      
      setData(updatedData);
  
      // Close the confirmation dialog
      setConfirmDialogOpen(false);
  
      // Show a toast notification
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  

  const handleDeleteCancel = () => {
    setConfirmDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(apis.getfooter);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="containertable">
            <div>
              <Button type="button" className="view-button">
                <Link to="/footer" className="view-button">
                  <ArrowBackIcon /> Back
                </Link>
              </Button>
            </div>
            <div className="scrollable-table">
              <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Content Type</TableCell>
                      <TableCell>File</TableCell>
                      <TableCell>External Link</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, i) => (
                      <TableRow key={item.u_id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.u_tittle_name}</TableCell>
                        <TableCell>{item.u_contenttype}</TableCell>
                        <TableCell>{item.u_file}</TableCell>
                        <TableCell>{item.u_external_link}</TableCell>
                        
                        <TableCell>
                          <Link
                            to={`/whatsnew/editwhatsnew/${item.u_id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => handleButtonClick(item.u_id)}
                            >
                              <EditNotifications />
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            onClick={() => handleDeleteClick(item.u_id)}
                          >
                            <GridDeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Data deleted successfully.
        </Alert>
      </Snackbar>
    </div>
  );
};
