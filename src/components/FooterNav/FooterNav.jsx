import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiClient from '../../services/AxiosApi';
import './Footer.scss';

const Footer = () => {
  const [newName, setNewName] = useState('');
  const [newRoute, setNewRoute] = useState('');

  const [nameError, setNameError] = useState(false);
  const [routeError, setRouteError] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    if (!newName || !newRoute) {
      setNameError(!newName);
      setRouteError(!newRoute);
    } else {
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirm = async () => {
    closeDialog();

    const data = { name: newName, route: '/' + newRoute };

    try {
      // const response = await axios.post('/api/addLink', data, { headers });
      const response = await apiClient.post('/api/addLink', data);

      if (response.status === 200) {
        console.log('Link added successfully');
        setNewName('');
        setNewRoute('');
        toast.success('Link added successfully!', { position: 'top-right' });
      } else {
        console.error('Failed to add link');
        toast.error('Failed to add link', { position: 'top-right' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred', { position: 'top-right' });
    }
  };

  return (
    <footer>
      <h1 className="main-heading">Footer</h1>
      <div className="footer-container">
        <TextField
          label="Name"
          variant="outlined"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setNameError(false);
          }}
          error={nameError}
          helperText={nameError && 'Name is required'}
        />
        <TextField
          label="Route"
          variant="outlined"
          value={newRoute}
          onChange={(e) => {
            setNewRoute(e.target.value);
            setRouteError(false);
          }}
          error={routeError}
          helperText={routeError && 'Route name is required'}
        />
        <Button variant="contained" color="primary" onClick={openDialog}>
          Add Link
        </Button>
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>Confirm Save</DialogTitle>
          <DialogContent>
            <DialogContentText>Do you want to save this link?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <ToastContainer />
    </footer>
  );
};

export default Footer;
