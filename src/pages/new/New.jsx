import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import apiClient from '../../services/AxiosApi'
import api from '../../utils/apiUrl.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './new.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material'; // Import Material-UI components

export function New() {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype: '',
  });

  // New state variables for confirmation dialog and snackbar
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedRole(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      errors.name = 'Invalid name format';
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.mobile_no) {
      errors.mobile_no = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile_no)) {
      errors.mobile_no = "Invalid mobile number format";
    }

    if (!formData.address) {
      errors.address = "Address is required";
    }

    if (!selectedRole) {
      errors.usertype = "Role is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Open the confirmation dialog when the user clicks "Submit"
    setConfirmDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    // Handle cancel action in the confirmation dialog
    setConfirmDialogOpen(false);
  };

  const handleDeleteConfirm = async () => {
    // Handle confirm action in the confirmation dialog

    // Close the confirmation dialog
    setConfirmDialogOpen(false);

    try {
      const formDataToSend = {
        ...formData,
        usertype: parseInt(selectedRole, 10),
      };

      const response = await apiClient.post(api.newuser, formDataToSend);
      if (response.status === 200) {
        toast.success('Data submitted successfully!');

        // Show the snackbar with a success message
        setSnackbarMessage('Data submitted successfully.');
        setSnackbarOpen(true);

        setFormData({
          name: '',
          email: '',
          mobile_no: '',
          address: '',
          usertype: '',
        });
        setSelectedRole('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(api.getUserType);
        setDropdownOptions(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <>
      <div>
        <div className="home">
          <Sidebar className='nav' style={{}} />
          <div className="homeContainer">
            <Navbar />
            <div className='bgimg'>
              <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-left">
                  <Col md={10} lg={6} xs={12}>
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <h2 className="fw-bold mb-4 text-center text-uppercase">
                          User Details
                        </h2>
                        <div className="mb-3">
                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="Name">
                              <Form.Label className="text-center" style={{color:"black"}}>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                isInvalid={!!formErrors.name}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.name}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Email">
                              <Form.Label className="text-center" style={{color:"black"}}>E-mail</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!formErrors.email}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="MobileNo">
                              <Form.Label className="text-center" style={{color:"black"}}>Mobile No.</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Mobile No."
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                isInvalid={!!formErrors.mobile_no}
                                maxLength={10}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.mobile_no}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Address">
                              <Form.Label className="text-center" style={{color:"black"}}>Address</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                isInvalid={!!formErrors.address}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formErrors.address}
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Usertype">
                              <div className="mb-12">
                                <Form.Label className="text-center" style={{color:"black"}}>Role</Form.Label>
                                <select
                                  className='form-control'
                                  name='usertype'
                                  value={selectedRole}
                                  onChange={handleChange}
                                  isInvalid={!!formErrors.usertype}
                                >
                                  <option value='' style={{color:"black"}}>Select a role</option>
                                  {dropdownOptions.map((data) => (
                                    <option key={data.users_id} value={data.users_id}>
                                      {data.user_name}
                                    </option>
                                  ))}
                                </select>
                                <Form.Control.Feedback type="invalid">
                                  {formErrors.usertype}
                                </Form.Control.Feedback>
                              </div>
                            </Form.Group>

                            <div id="button" className="d-flex">
                              <Button variant="primary" type="submit" style={{ width: 100 }}>
                                Submit
                              </Button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Create</DialogTitle>
        <DialogContent>
          Are you sure you want to create this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default New;
