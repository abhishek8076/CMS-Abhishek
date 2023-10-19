import React, { useState, useCallback, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/mateal/Alert;
import Alert from '@mui/material/Alert';
import { ButtonBase } from '@mui/material';
import { ButtonGroup } from 'react-bootstrap';
import apiClient from '../../../services/AxiosApi'
import apis from '../../../utils/apiUrl.json'

export const CMShomepage = () => {
  const id = 21;
  const [content, setContent] = useState('');
  const[data , setData]= useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    // Fetch the existing content when the component loads
    async function fetchData() {
      try {
        const response = await apiClient.get(apis.homepagebyid+id);
        setData(response.data.u_h_html);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    }
    fetchData();
  }, []);

  const onChange = useCallback((newContent) => {
    console.log('Editor content changed:', newContent);
    setContent(newContent);
  }, []);

  const handleSave = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      const sendformData = new FormData();
      sendformData.append('h_html', data);

      const response = await apiClient.put(apis.homepagebyid +id, sendformData);

      console.log(response.data);
      setModalMessage('Content saved successfully.');
      setSnackbarOpen(true);
      setContent('');
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
  console.log(data)

  return (
    <div>
      <div className="box-sec">
        <h1 className="heading-main">Home Page</h1>
        <div className="App">
          <JoditEditor value={data} onChange={onChange} />
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
