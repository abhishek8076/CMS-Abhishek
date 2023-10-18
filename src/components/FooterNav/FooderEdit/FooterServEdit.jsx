import React, { useState, useEffect } from 'react';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../../services/AxiosApi';
import apis from '../../../utils/apiUrl.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from '@mui/material';

export const FooterService = () => {
  const [html, setHtml] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    title_name: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      title_name: '',
      description: '',
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title_name) {
      newErrors.title_name = 'Title is required';
    } else {
      newErrors.title_name = '';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    } else {
      newErrors.description = '';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).every((key) => newErrors[key] === '');
  };

  const handleFileChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpenConfirmation = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('title_name', formData.title_name);
        formDataToSend.append('description', formData.description);

        // Add more formData fields here if needed

        const response = await apiClient.post(apis.newfooter, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Data saved:', response.data);
        toast.success('Data saved successfully!');
        setModalMessage('Data saved successfully!');
        setSnackbarOpen(true);

        // Clear the form fields
        setFormData({
          title_name: '',
          description: '',
        });
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
            <Link to="/footer/footerservtable" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                <ViewListIcon /> Data view
              </button>
            </Link>
          </div>
          <h1 className="text-center">Footer Service</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Input for Title */}
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Title"
              name="title_name"
              value={formData.title_name}
              onChange={handleInputChange}
            />
            {errors.title_name && <div className="text-danger">{errors.title_name}</div>}
          </div>
          {/* Input for Description */}
          <div className="mb-3">
            <label className="form-label text-dark">Enter Description</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          {/* Submit Button */}
          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleOpenConfirmation}>
              Submit
            </button>
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
              <DialogTitle>Confirm Submit</DialogTitle>
              <DialogContent>Are you sure you want to submit this data?</DialogContent>
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
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
            >
              {modalMessage}
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterService;
