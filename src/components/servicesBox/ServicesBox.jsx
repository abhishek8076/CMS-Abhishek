import React, { useState } from 'react';
import { Box, Button, Container, Grid, Paper, Select, TextField, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

 export const  ServicesBox=()=> {
  const [services, setServices] = useState([]);
  const [fieldType, setFieldType] = useState('image');
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');

  const handleFieldTypeChange = (event) => {
    setFieldType(event.target.value);
    setInputValue('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddService = () => {
    if (title.trim() !== '') {
      const newService = {
        title,
        fieldType,
        inputValue,
      };
      setServices([...services, newService]);
      setTitle('');
      setInputValue('');
    }
  };

  const handleSendToDatabase = () => {
    // Here, you would send 'services' to your backend API for storage.
    // You can use fetch or an HTTP library like Axios to make the API call.
    // Example: fetch('/api/saveServices', { method: 'POST', body: JSON.stringify(services) })
    // Handle the API response as needed.
    console.log('Sending services to the database:', services);
  };

  return (
    <>
     <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar />
      <div className="container">
    <Container>
      <Typography variant="h4" gutterBottom>
        Add Services
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleTitleChange}
            value={title}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Choose a field type"
            variant="outlined"
            fullWidth
            onChange={handleFieldTypeChange}
            value={fieldType}
          >
            <option value="image">Image</option>
            <option value="text">Text</option>
            <option value="link">Link</option>
          </Select>
        </Grid>
        {fieldType === 'image' && (
          <Grid item xs={6}>
            <TextField
              label="Add Image URL"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              value={inputValue}
            />
          </Grid>
        )}
        {fieldType === 'text' && (
          <Grid item xs={12}>
            <TextField
              label="Add Text"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              onChange={handleInputChange}
              value={inputValue}
            />
          </Grid>
        )}
        {fieldType === 'link' && (
          <Grid item xs={12}>
            <TextField
              label="Add Link URL"
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
              value={inputValue}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddService}
            startIcon={<AddCircleIcon />}
          >
            Add Service
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendToDatabase}
          >
            Send to Database
          </Button>
        </Grid>
        {services.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Services:
            </Typography>
            <Grid container spacing={2}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Type: {service.fieldType}
                    </Typography>
                    {service.fieldType === 'image' && (
                      <img src={service.inputValue} alt="Service" style={{ maxWidth: '100%' }} />
                    )}
                    {service.fieldType === 'text' && (
                      <Typography variant="body1">
                        {service.inputValue}
                      </Typography>
                    )}
                    {service.fieldType === 'link' && (
                      <Typography variant="body2">
                        <a href={service.inputValue} target="_blank" rel="noopener noreferrer">
                          {service.inputValue}
                        </a>
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
    </div>
    </div>
    </div>
    
    </>
  );
}

// export default AddServices;
