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
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EditNotifications } from '@mui/icons-material';
import { GridDeleteIcon } from '@mui/x-data-grid';

// Import your API client and URL configurations
import apiClient from '../../services/AxiosApi.jsx';
import apis from '../../utils/apiUrl.json';

import Sidebar from '../sidebar/Sidebar.jsx';
import Navbar from '../navbar/Navbar.jsx'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';

import './whatsnew.scss';

export const WhatsNewTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

  const handleDeleteConfirm = async () => {
    try {
      await apiClient.delete(apis.deletewhatsnew + deleteItemId);

      const updatedData = data.filter((item) => item.u_id !== deleteItemId);
      setData(updatedData);

      setConfirmDialogOpen(false);
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
        const response = await apiClient.get(apis.getwhatsnew);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter data based on the search query
  const filteredData = data.filter((item) =>
    item.u_news_tittle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="containertable">
            <div>
              <Button type="button" className="view-button">
                <Link to="/whatsnew" className="view-button">
                  <ArrowBackIcon /> Back
                </Link>
              </Button>
            </div>
            <div className="scrollable-table">
              {/* Add the search bar input field */}
              <input
                type="text"
                placeholder="Search by Title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Content Type</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item, i) => (
                      <TableRow key={item.u_id}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{item.u_news_tittle}</TableCell>
                        <TableCell>{item.u_contenttype}</TableCell>
                        <TableCell>{item.u_start_date}</TableCell>
                        <TableCell>{item.u_enddate}</TableCell>
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
