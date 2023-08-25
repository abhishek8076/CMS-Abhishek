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
  // State variables
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

  // Handler for text input change
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  // Handler for file type selection
  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
    setUrl(''); // Clear URL when file type changes
  };

  // Handler for file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  // Handler for URL input change
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  // Handler for start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate < date) {
      setEndDate(date);
    }
  };

  // Handler for end date change
  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };

  // URL validation logic
  const isUrlValid = (inputUrl) => {
    // Implement your URL validation logic here
    return true;
  };

  // Handler to open confirmation dialog
  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  // Handler to close confirmation dialog
  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  // Handler to post data when confirmed
  // const handleConfirm = async () => {
  //   setConfirmationOpen(false);

  //   // Validation and data preparation
  //   if (!text || !fileType) {
  //     toast.error('Please fill all fields!', toastConfig);
  //     return;
  //   }

  //   // Validate file format based on selected file type
  //   let isFormatValid = true;
  //   if (fileType === 'pdf' && selectedFile?.type !== 'application/pdf') {
  //     isFormatValid = false;
  //   } else if (fileType === 'image' && selectedFile && !selectedFile.type.startsWith('image')) {
  //     isFormatValid = false;
  //   } else if (fileType === 'video' && selectedFile && !selectedFile.type.startsWith('video')) {
  //     isFormatValid = false;
  //   } else if (fileType === 'link' && !isUrlValid(url)) {
  //     isFormatValid = false;
  //   }

  //   if (!isFormatValid) {
  //     setFormatError(true);
  //     toast.error('Invalid format selected!', toastConfig);
  //     return;
  //   }

  //   // Prepare data based on file type
  //   let dataToSend = { text, startDate, endDate };
  //   if (fileType === 'link') {
  //     dataToSend = { ...dataToSend, fileType, url };
  //   } else if (fileType === 'pdf' || fileType === 'image' || fileType === 'video') {
  //     const formData = new FormData();
  //     formData.append('file', selectedFile);
  //     formData.append('fileType', fileType);
  //     dataToSend = { ...dataToSend, formData };
  //   }

  //   // Send data to server
  //   try {
  //     const response = await axios.post('/api/addLink', dataToSend);
  //     if (response.status === 200) {
  //       toast.success('Data posted successfully!', toastConfig);
  //       // Handle success, clear fields, etc.
  //     } else {
  //       console.error('Failed to add link');
  //       toast.error('Failed to post data. Please try again.', toastConfig);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error('An error occurred. Please try again.', toastConfig);
  //   }

  //   // Reset fields and show success toast
  //   setText('');
  //   setFileType('');
  //   setSelectedFile(null);
  //   setFileName('');
  //   setUrl('');
  //   setStartDate(new Date());
  //   setEndDate(new Date());
  //   setDialogOpen(true);
  // };
  const handleConfirm = async () => {
    setConfirmationOpen(false);
  
    if (!text || !fileType) {
      toast.error('Please fill all fields!', toastConfig);
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
  
    // Construct the postData object
    const postData = {
      news_title: text,         // Use 'text' as the news title
      startdate: startDate.toISOString(), // Convert startDate to ISO format
      end_date: endDate.toISOString(),   // Convert endDate to ISO format
      contenttype: 0,            // Set content type (change as needed)
      html: '',                  // Set HTML content (change as needed)
      file: '',                  // Set file path (change as needed)
    };
  
    try {
      const response = await axios.post('/api/addLink', postData);
      if (response.status === 200) {
        console.log('Data added successfully');
        toast.success('Data posted successfully!', toastConfig);
        // Handle success, clear fields, show success toast, etc.
      } else {
        console.error('Failed to add data');
        toast.error('Failed to post data', toastConfig);
        // Handle error, show error toast, etc.
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred', toastConfig);
      // Handle error, show error toast, etc.
    }
  
    // Reset fields and show success toast (for demonstration purposes)
    setText('');
    setFileType('');
    setSelectedFile(null);
    setFileName('');
    setUrl('');
    setStartDate(new Date());
    setEndDate(new Date());
    setDialogOpen(true);
  };
  

  // Handler to close dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Configuration for toast notifications
  const toastConfig = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };
  const handlePostData = async (event) => {
    event.preventDefault();
  
    if (text && fileType) {
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
      toast.error('Please fill all fields and select a file!', toastConfig);
    }
  };
  
  // Options for file types
  const fileTypeOptions = [
    { value: 'link', label: 'Link' },
    { value: 'pdf', label: 'PDF' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
  ];
  
  

  // Render the component
  return (
    <>
      {/* View Button */}
      <div>
        <Button type="button" className="view-button">
          <Link to="/whatsnew/whatsnewtable" className="view-button">
            View
          </Link>
        </Button>
      </div>
      {/* Form */}
      <div className="container1">
        <h1 className="main-heading">What's New Page</h1>
        <form className="form">
          {/* Text Input */}
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
          {/* File Type Dropdown */}
          <FormControl variant="outlined" fullWidth margin="normal" className="mb-3">
            <InputLabel>Select File Type</InputLabel>
            <Select value={fileType} onChange={handleFileTypeChange} label="Select File Type">
              {fileTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* URL or File Input */}
          <div>
            {fileType !== 'link' && (
              <>
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
              </>
            )}
            {fileType === 'link' && (
              <TextField
                label="Enter URL"
                variant="outlined"
                value={url}
                onChange={handleUrlChange}
                fullWidth
                margin="normal"
                className="mb-3"
              />
            )}
          </div>
          {/* Format Error */}
          {formatError && (
            <p className="error-text">
              Please choose the correct format based on the selected option.
            </p>
          )}
          {/* Date Inputs */}
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
          {/* Submit Button */}
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
        {/* Confirmation Dialog */}
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
        {/* Success Dialog */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Data Posted Successfully</DialogTitle>
          <DialogContent>Your data has been successfully posted to the database.</DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
}

export default WhatsNew;
