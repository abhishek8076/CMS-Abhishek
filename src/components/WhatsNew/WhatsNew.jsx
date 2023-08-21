import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './whatsnew.scss'; // Import your custom SCSS file

function WhatsNew() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
    setUrl('');
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  const isUrlValid = (inputUrl) => {
    // Implement your URL validation logic here
    return true;
  };

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirm = async () => {
    setConfirmationOpen(false);

    if (!name || !text || !fileType) {
      toast.error('Please fill all fields!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    let isFormatValid = true;

    if (fileType === 'pdf' && selectedFile?.type !== 'application/pdf') {
      isFormatValid = false;
    } else if (fileType === 'image' && selectedFile && !selectedFile.type.startsWith('image')) {
      isFormatValid = false;
    } else if (fileType === 'video' && selectedFile && !selectedFile.type.startsWith('video')) {
      isFormatValid = false;
    } else if (fileType === 'link' && !isUrlValid(url)) {
      isFormatValid = false;
    }

    if (!isFormatValid) {
      setFormatError(true);
      return;
    }

    const postData = { name, text, fileType, fileName, url, startDate, endDate };
    try {
      const response = await axios.post('/api/addLink', postData);
      if (response.status === 200) {
        console.log('Link added successfully');
        // Handle success, clear fields, show success toast, etc.
      } else {
        console.error('Failed to add link');
        // Handle error, show error toast, etc.
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show error toast, etc.
    }

    // Reset fields and show success toast (for demonstration purposes)
    setName('');
    setText('');
    setFileType('');
    setSelectedFile(null);
    setFileName('');
    setUrl('');
    setStartDate(new Date());
    setEndDate(new Date());
    setDialogOpen(true);

    toast.success('Data posted successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handlePostData = async (event) => {
    event.preventDefault();
  
    if (name && text && fileType) {
      let isFormatValid = true;
  
      if (fileType === 'pdf' && selectedFile?.type !== 'application/pdf') {
        isFormatValid = false;
      } else if (fileType === 'image' && selectedFile && !selectedFile.type.startsWith('image')) {
        isFormatValid = false;
      } else if (fileType === 'video' && selectedFile && !selectedFile.type.startsWith('video')) {
        isFormatValid = false;
      } else if (fileType === 'link' && !isUrlValid(url)) {
        isFormatValid = false;
      }
  
      if (!isFormatValid) {
        setFormatError(true);
        return;
      }
  
      handleConfirmationOpen();
    } else {
      toast.error('Please fill all fields and select a file!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  

  return (
    <>
     <div>
        <Button
          type="button"
         
          className="view-button"
        >
          <Link to="/whatsnew/whatsnewtable"  className="view-button" >
          View
        </Link>
        </Button>
        </div> 
    <div className="container1">
       <h1 className="main-heading">What's New Page</h1>
    
     
      <form className="form">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
          className="mb-3"
        />

        <TextField
          label="Add Text"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          className="mb-3"
        />

        <FormControl variant="outlined" fullWidth margin="normal" className="mb-3">
          <InputLabel>Select File Type</InputLabel>
          <Select value={fileType} onChange={handleFileTypeChange} label="Select File Type">
            <MenuItem value="link">Link</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
        </FormControl>

        {fileType === 'link' ? (
          <TextField
            label="Enter URL"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            fullWidth
            margin="normal"
            className="mb-3"
          />
        ) : (
          <div>
            <input
              type="file"
              accept="application/pdf, image/*, video/*"
              onChange={handleFileChange}
              id="fileInput"
              style={{ display: 'none' }}
            />
            <label htmlFor="fileInput" className="file-input-label">
              Choose File
            </label>
            {selectedFile && (
              <div className="selected-file-name">{selectedFile.name}</div>
            )}
            {selectedFile && (
              <Button
                variant="outlined"
                color="secondary"
                className="delete-file-button"
                startIcon={<DeleteIcon />}
                onClick={() => setSelectedFile(null)}
              >
                Delete File
              </Button>
            )}
          </div>
        )}

        {formatError && (
          <p className="error-text">
            Please choose the correct format based on the selected option.
          </p>
        )}

        <TextField
          label="Start Date"
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => handleStartDateChange(new Date(e.target.value))}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="mb-3"
        />

        <TextField
          label="End Date"
          type="date"
          value={endDate.toISOString().split('T')[0]}
          onChange={(e) => handleEndDateChange(new Date(e.target.value))}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          className="mb-3"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handlePostData}
          className="submit-button"
        >
          Post Data
        </Button>
       

      </form>

      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirm Posting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to post the data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Data Posted Successfully</DialogTitle>
        <DialogContent>Your data has been successfully posted to the database.</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div></> );
}

export default WhatsNew;
