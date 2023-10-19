import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import apiClinet from '../../services/AxiosApi';
import api from '../../utils/apiUrl.json';
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material'; // Import Material-UI components
import { toast } from 'react-toastify';
import apiClient from '../../services/AxiosApi'
export function Single() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype:''
  });
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await apiClinet.get(api.edituser + id);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);
  useEffect(() => {
    async function fetchData1() {
      try {
        setLoading(true);
        const response = await apiClinet.get(api.getUserType);
        setDropdownOptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    }
    fetchData1();
  }, []);

  const handleUpdateClick = async () => {
    const errors = {};

    if (!data.name) {
      errors.name = 'Enter your name';
    } else if (!isValidName(data.name)) {
      errors.name = 'Please input alphabet characters only';
    }
    

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'E-mail must include "@" character ';
    }

    if (!data.mobile_no || data.mobile_no.length !== 10) {
      errors.mobile_no = 'Mobile is required and should contain 10 digits';
    } else if (!isValidMobile(data.mobile_no)) {
      errors.mobile_no = 'Please enter a valid 10-digit phone number ';
    }

    if (!data.address) {
      errors.address = 'Address is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      // Open the confirmation dialog when the user clicks "Update User"
      setConfirmDialogOpen(true);
    }
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
      ...data,
      usertype: parseInt(selectedRole, 10),
    };

    const response = await apiClient.put(api.edituser + id, formDataToSend);
    if (response.status === 200) {
      // Show the success dialog
      setSuccessDialogOpen(true);

      
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error submitting data:', error);
    toast.error('Something went wrong');
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedRole(e.target.value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;

    return mobileRegex.test(mobile);
  };
  const isValidName = (name) => {
    const nameRegex = /^[A-Za-z ]+$/;
    return nameRegex.test(name);
  };

  const storedUserString = localStorage.getItem('user');
  const user = JSON.parse(storedUserString);

  return (
    <>
      <div>
        <div className="home">
          <Sidebar className="nav" style={{}} />
          <div className="homeContainer">
            <Navbar />
            <div></div>
            <Container>
              <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={10} lg={6} xs={12}>
                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-4 text-center text-uppercase">
                        User Details
                      </h2>
                      <div className="mb-3">
                        <Form>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="nametitle" style={{ color: "black" }}>Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={data.name}
                              onChange={handleInputChange}
                              isInvalid={!!validationErrors.name}
                              maxLength={15}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationErrors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center" style={{ color: "black" }}>
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={data.email}
                              onChange={handleInputChange}
                              isInvalid={!!validationErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationErrors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Mobile">
                            <Form.Label className="text-center" style={{ color: "black" }}>Mobile</Form.Label>
                            <Form.Control
                              type="text"
                              name="mobile_no"
                              value={data.mobile_no}
                              onChange={handleInputChange}
                              isInvalid={!!validationErrors.mobile_no}
                              maxLength={10}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationErrors.mobile_no}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Address">
                            <Form.Label className="text-center" style={{ color: "black" }}>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={data.address}
                              onChange={handleInputChange}
                              isInvalid={!!validationErrors.address}
                            />
                            <Form.Control.Feedback type="invalid">
                              {validationErrors.address}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Usertype">
                              <div className="mb-12">
                                <Form.Label className="text-center" style={{color:"black"}}>Role</Form.Label>
                                <select
                                  className='form-control'
                                  name='usertype'
                                  value={data.usertype}
                                  onChange={handleInputChange}
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
                          {loading ? (
                            <Spinner animation="border" variant="primary" />
                          ) : (
                            <>
                              {updateSuccess && (
                                <div className="alert alert-success">
                                  User data updated successfully.
                                </div>
                              )}
                              {updateError && (
                                <div className="alert alert-danger">
                                  {updateError}
                                </div>
                              )}
                              <div
                                style={{
                                  display: 'flex',
                                  
                                  justifyContent:'space-between',
                                  marginTop: '5px',
                                }}
                              >
                                <Button
                                  style={{ width: 'fit-content' }}
                                  onClick={handleUpdateClick}
                                >
                                  Update User
                                </Button>

                                <Link to="/users">
                                  <Button
                                    variant="primary"
                                    style={{
                                      marginTop: '5px',
                                      alignContent: 'right',
                                    }}
                                  >
                                    Back
                                  </Button>
                                </Link>
                              </div>
                            </>
                          )}
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          Are you sure you want to update this user?
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

      <Dialog
  open={successDialogOpen}
  onClose={() => setSuccessDialogOpen(false)}
>
  <DialogTitle>Success</DialogTitle>
  <DialogContent>
    User updated successfully!
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
      OK
    </Button>
  </DialogActions>
</Dialog>
    </>
  );
}

export default Single;
