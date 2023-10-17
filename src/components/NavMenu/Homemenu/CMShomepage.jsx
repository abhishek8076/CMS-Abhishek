import React, { useState, useCallback } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ButtonBase } from '@mui/material';
import { ButtonGroup } from 'react-bootstrap';
import apiClient from '../../../services/AxiosApi'
import apis from '../../../utils/apiUrl.json'

export const CMShomepage = () => {
  const [content, setContent] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  
  const onChange = useCallback((newContent) => {
    console.log('Editor content changed:', newContent);
    setContent(newContent);
  }, []);

  const handleSave = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('h_html',content);
  
      const response = await apiClient.post(apis.homepage, formData
      
      );
  
      console.log(response.data);
      setModalMessage('Content saved successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error saving content.');
      setSnackbarOpen(true);
    }
  
    setConfirmDialogOpen(false);
  };
  

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div>
      <div class="box-sec">
      <h1 class="heading-main">Home Page</h1>
      <div className="App">
        <JoditEditor value={content} onChange={onChange} />
        <Button onClick={handleSave}>Save Content</Button>
      </div>

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Submit</DialogTitle>
        <DialogContent>
          Are you sure you want to submit this data?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        // autoHideDuration={8000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {modalMessage}
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
};
