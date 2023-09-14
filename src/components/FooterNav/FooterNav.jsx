import React, { useState } from 'react';
import axios from 'axios';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Container, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@mui/material';

function FooterPage() {
  const [footerType, setFooterType] = useState('');
  const [footerName, setFooterName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields
    if (!footerType || !footerName) {
      setError('All fields are required.');
      return;
    }

    // Prepare the data based on the selected type
    let formData = new FormData();
    formData.append('footerType', footerType);
    formData.append('footerName', footerName);

    if (footerType === 'file' && fileData) {
      formData.append('file', fileData);
    }

    // Send data to the API using Axios
    try {
      const response = await axios.post('YOUR_API_URL_HERE', formData);
      setSuccess('Data sent successfully!');
      setError('');
      setOpenSnackbar(true);
    } catch (error) {
      setError('An error occurred while sending data.');
      setOpenSnackbar(true);
    }
  };

  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };

  return (
    <>
<div className='bgimg' style={{height:'100vh'}}>
    <Container maxWidth="md" style={{ paddingTop: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Footer
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Footer Name"
          value={footerName}
          onChange={(e) => setFooterName(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Footer Type</InputLabel>
          <Select
            label="Footer Type"
            value={footerType}
            onChange={(e) => setFooterType(e.target.value)}
          >
            <MenuItem value="">Select an option</MenuItem>
            <MenuItem value="file">File</MenuItem>
            <MenuItem value="link">Link</MenuItem>
            <MenuItem value="html-editor">HTML Editor</MenuItem>
          </Select>
        </FormControl>
        {footerType === 'file' && (
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.jpg,.png,.jpeg"
              onChange={handleFileChange}
            />
          </div>
        )}
        {footerType === 'link' && (
          <TextField
            fullWidth
            label="Upload link"
            onChange={handleFileChange}
            margin="normal"
            variant="outlined"
          />
        )}
        {footerType === 'html-editor' && (
          <div>
            <label>Editor:</label>
            <FroalaEditorComponent tag="textarea" config={config} />
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      </form>
      {error && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={error}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
      {success && (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={success}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      )}
    </Container>
    </div>
    </>
  );
}

export default FooterPage;
