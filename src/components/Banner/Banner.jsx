import React, { useState } from 'react';
import axios from 'axios';
import { Button, Box, IconButton, Paper, Grid, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../utils/apiUrl.json';

const ImageUploader = ({ id, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('name', imageName);

    try {
      const response = await axios.post(api.imageAdd, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('Image uploaded successfully!', response.data);

      // Show a success toast notification
      toast.success('Image uploaded successfully!', {
        position: toast.POSITION.TOP_CENTER
      });

      // You can update your images state or perform other actions
    } catch (error) {
      console.error('Error uploading image:', error);

      // Show an error toast notification
      toast.error('Error uploading image', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <>
    
    <Paper elevation={3} sx={{ padding: 2, position: 'relative' }}>
      {selectedImage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
          />
        </Box>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id={`upload-input-${id}`}
      />
      <label htmlFor={`upload-input-${id}`}>
        <Button variant="outlined" component="span">
          Choose Image
        </Button>
      </label>
      {selectedImage && (
        <IconButton onClick={handleDelete} sx={{ position: 'absolute', top: 5, right: 5 }}>
          <DeleteIcon />
        </IconButton>
      )}
      <TextField
        label="Image Name"
        value={imageName}
        onChange={handleNameChange}
        fullWidth
        sx={{ marginTop: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleImageUpload}
        disabled={!selectedImage}
        sx={{ marginTop: 2 }}
      >
        Upload Image
      </Button>
    </Paper>
    </>
  );
};

 export const Banner = () => {
  const [imageComponents, setImageComponents] = useState([]);

  const handleAddImage = () => {
    const newImageComponent = {
      id: imageComponents.length + 1,
    };
    setImageComponents([...imageComponents, newImageComponent]);
  };

  const handleDeleteImage = (id) => {
    const updatedComponents = imageComponents.filter((component) => component.id !== id);
    setImageComponents(updatedComponents);
  };

  return (
    <div>
      <h1 className="main-heading">Banner</h1>
      <Button variant="contained" color="primary" onClick={handleAddImage}>
        Add Image
      </Button>
      <Grid container spacing={2}>
        {imageComponents.map((component) => (
          <Grid key={component.id} item xs={12} sm={6} md={4}>
            <ImageUploader
              id={component.id}
              onDelete={handleDeleteImage}
            />
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </div>
  );
};

// export default ImageUploadComponent;
 