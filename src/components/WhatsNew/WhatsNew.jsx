import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import { DatePicker } from '@mui/lab';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WhatsNewTable } from './WhatsNewTable';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px'
};

const buttonStyle = {
  marginTop: '16px'
};

const errorTextStyle = {
  color: 'red',
  marginTop: '8px'
};

const fileInputStyle = {
  display: 'none'
};

const fileInputLabelStyle = {
  display: 'block',
  marginBottom: '8px'
};

const selectedFileNameStyle = {
  fontWeight: 'bold',
  marginBottom: '8px'
};

async function postDataToApi(data) {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
}

function WhatsNew() {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formatError, setFormatError] = useState(false);
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

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

      const postData = {
        name,
        text,
        fileType,
        fileName,
        url,
        startDate,
        endDate
      };

      try {
        await postDataToApi(postData);

        toast.success('Data posted successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });

        setName('');
        setText('');
        setFileType('');
        setSelectedFile(null);
        setFileName('');
        setUrl('');
        setStartDate(new Date());
        setEndDate(new Date());
        setDialogOpen(true);
      } catch (error) {
        toast.error('An error occurred while posting data.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    } else {
      toast.error('Please fill all fields and select a file!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const isUrlValid = (inputUrl) => {
    // Implement your URL validation logic here
    return true;
  };

  return (
    <div style={containerStyle}>
      <div style={{'display':'flex'}}>
     <Link Link to='/cms' style={{ textDecoration: "none" }}>
              <div className="viewButton" >View</div>
            </Link>
      </div> 
      <h1>What's New Page</h1>
     
      <form onSubmit={handlePostData}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
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
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Select File Type</InputLabel>
          <Select value={fileType} onChange={handleFileTypeChange} label="Select File Type">
            <MenuItem value="link">Link</MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="image">Image</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>
        </FormControl>

        {fileType === 'link' && (
          <TextField
            label="Enter URL"
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
          
            margin="normal"
          />
          
        )}

        {fileType !== 'link' && (
          <>
            <input
              type="file"
              accept="application/pdf, image/*, video/*"
              onChange={handleFileChange}
              style={fileInputStyle}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={fileInputLabelStyle}>
              Choose File
            </label>
            {selectedFile && (
              <div style={selectedFileNameStyle}>{selectedFile.name}</div>
            )}
            {selectedFile && (
              <Button
                variant="outlined"
                color="secondary"
                
                startIcon={<DeleteIcon />}
                onClick={() => setSelectedFile(null)}
              >
                Delete File
              </Button>
            )}
          </>
        )}

        {formatError && (
          <p style={errorTextStyle}>
            Please choose the correct format based on the selected option.
          </p>
        )}

        {/* <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          fullWidth
          margin="normal"
          format="MM/dd/yyyy"
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          fullWidth
          margin="normal"
          format="MM/dd/yyyy"
        /> */}
          <TextField
          label="Start Date"
          type="date"
          value={startDate.toISOString().split('T')[0]} // Convert to ISO string and format for input
          onChange={(e) => handleStartDateChange(new Date(e.target.value))}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate.toISOString().split('T')[0]} // Convert to ISO string and format for input
          onChange={(e) => handleEndDateChange(new Date(e.target.value))}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={buttonStyle}
        >
          Post Data
        </Button>
      </form>

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
    </div>
  );
}

export default WhatsNew;
