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
import apiClient from '../../services/AxiosApi';
import './Footer.scss';

const Footer = () => {
  const [newName, setNewName] = useState('');
  const [newRoute, setNewRoute] = useState('');
  const [newFieldType, setNewFieldType] = useState('link');

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

    let data = { name: newName, route: '/' + newRoute, type: newFieldType };

    if (newFieldType === 'file') {
      // Get the selected file from the input field
      const selectedFile = document.getElementById('fileInput').files[0];
      // You might need to process the file before sending it, such as converting it to base64
      // For now, let's assume it's already processed
      data.file = selectedFile;
    }

    if (newFieldType === 'html') {
      // Replace 'htmlContent' with the actual way you're retrieving the HTML content
      // const htmlContent = getHtmlContent(); // Implement this function
      // data.htmlContent = htmlContent;
    }

    try {
      const response = await apiClient.post('/api/addLink', data);

      if (response.status === 200) {
        console.log('Link added successfully');
        setNewName('');
        setNewRoute('');
        setNewFieldType('link');
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

  const renderAdditionalInput = () => {
    if (newFieldType === 'link') {
      return (
        <TextField
          label="Link URL"
          variant="outlined"
          value={newRoute}
          onChange={(e) => setNewRoute(e.target.value)}
          error={routeError}
          helperText={routeError && 'Link URL is required'}
        />
      );
    } else if (newFieldType === 'text') {
      return (
        <textarea
          value={newRoute}
          onChange={(e) => setNewRoute(e.target.value)}
          className="form-control"
        />
      );
    } else if (newFieldType === 'html') {
      return (
        <div className="html-editor">HTML Editor Goes Here</div>
      );
    } else if (newFieldType === 'file') {
      return (
        <input
          type="file"
          className="form-control-file"
          id="fileInput"
        />
      );
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
        <div className="dropdown-container">
          <select
            value={newFieldType}
            onChange={(e) => setNewFieldType(e.target.value)}
            className="form-select"
          >
            <option value="link">Link</option>
            <option value="text">Text</option>
            <option value="html">HTML Content</option>
            <option value="file">File Upload</option>
          </select>
        </div>
        {renderAdditionalInput()}
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
