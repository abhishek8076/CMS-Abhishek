import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';

export const FooterOffice = () => {
  const [html, setHtml] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    address: '',
    phoneno: '',
  });
  const [errors, setErrors] = useState({});

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.tittle_name.trim()) {
      newErrors.tittle_name = 'Name is required';
    }
  
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
  
    if (!formData.phoneno) {
      errors.phoneno = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phoneno)) {
      errors.phoneno = "Invalid mobile number format";
    }
  

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmSubmit = async () => {
    try {
      if (validateForm()) {
        const formDataToSend = new FormData();
        formDataToSend.append('tittle_name', formData.tittle_name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('phoneno', formData.phoneno);

        const response = await Axios.post('your-api-endpoint', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Data saved:', response.data);
        setModalMessage('Data saved successfully!');
        setSnackbarOpen(true);

        // Clear the form fields
        setFormData({
          tittle_name: '',
          address: '',
          phoneno: '',
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
      <div className="col text-end">
            <Link to="/footer/footerofficetable" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                <ViewListIcon /> Data view
              </button>
            </Link>
          </div>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-md-6">
        <div className="box-sec">
          <div className="mb-3">
          <h1 className="text-center heading-main">Office Address</h1>
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && <div className="text-danger">{errors.tittle_name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Address</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Phone No</label>
            <input
              className="form-control"
              type="text"
              placeholder="Phone No"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleInputChange}
              maxLength={10}
              minLength={10}
            />
            {errors.phoneno && <div className="text-danger">{errors.phoneno}</div>}
          </div>

          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleConfirmSubmit}>
              Submit
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
