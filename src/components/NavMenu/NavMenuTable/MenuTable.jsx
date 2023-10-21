import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Checkbox,
  Container,
  FormControl,
  FormGroup,
  TextField,
  TablePagination,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { EditNotifications } from '@mui/icons-material';
import { GridDeleteIcon } from '@mui/x-data-grid';

// Import your API client and URL configurations
import apiClient from '../../../services/AxiosApi.jsx';
import apis from '../../../utils/apiUrl.json';

import Sidebar from '../../sidebar/Sidebar.jsx';
import Navbar from '../../navbar/Navbar.jsx';

export const MenuTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Placeholder for "Select All" functionality

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
      // Make a DELETE request to your API with the deleteItemId
      await apiClient.delete(apis.getmenudatabyid + deleteItemId);

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
        const response = await apiClient.get(apis.getmenuname);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.u_menu_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (u_id) => selected.indexOf(u_id) !== -1;

  const handleCheckboxClick = (event, u_id) => {
    const selectedIndex = selected.indexOf(u_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, u_id];
    } else {
      newSelected = [...selected];
      newSelected.splice(selectedIndex, 1);
    }

    setSelected(newSelected);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <Container>
      <div className="containertable">
        <div>
          <Button type="button" className="view-button">
            <Link to="/cms/menu" className="view-button">
              Add data
            </Link>
          </Button>
          <Button type="button" className="view-button">
            <Link to="/dashboard" className="view-button">
              Back
            </Link>
          </Button>
        </div>
        <div className="scrollable-table">
          <TextField
            type="text"
            label="Search by Title"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      // Implement "Select All" functionality here
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Menu Url</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredData
                ).map((item, i) => {
                  const isItemSelected = isSelected(item.u_id);

                  return (
                    <TableRow
                      key={item.u_id}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Checkbox
                          onClick={(event) => handleCheckboxClick(event, item.u_id)}
                          checked={isItemSelected}
                        />
                      </TableCell>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.u_menu_name}</TableCell>
                      <TableCell>{item.u_menu_url}</TableCell>
                      <TableCell>
                        <Link
                          to={`/cms/menuedit/editmenu/${item.u_id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button variant="contained" onClick={() => handleButtonClick(item.u_id)}>
                            <EditNotifications />
                          </Button>
                        </Link>
                        <Button variant="contained" onClick={() => handleDeleteClick(item.u_id)}>
                          <GridDeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
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
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Data deleted successfully.
        </Alert>
      </Snackbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};
