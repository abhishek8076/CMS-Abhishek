import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box,
} from '@mui/material'; // Import Material-UI components
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import apiClinet from '../../services/AxiosApi';
import api from '../../utils/apiUrl.json';
import { Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material'; // Import Material-UI components
import { toast } from 'react-toastify';
import apiClient from '../../services/AxiosApi';

export function Single() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype: '',
  });
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);

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

    if (selectedRole === '') {
      errors.usertype = 'Please select a role';
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
    // Show the loading indicator
    setShowLoadingDialog(true);
    
    setTimeout(() => {
      // Simulate a 3-second loading delay
      setShowLoadingDialog(false);
      
      // Update data
      apiClient
        .put(api.edituser + id, {
          ...data,
          usertype: parseInt(selectedRole, 10),
        })
        .then((response) => {
          if (response.status === 200) {
            setUpdateSuccess(true);
          } else {
            setUpdateSuccess(false);
            toast.error('Something went wrong');
          }
        })
        .catch((error) => {
          console.error('Error submitting data:', error);
          setUpdateSuccess(false);
          toast.error('Something went wrong');
        })
        .finally(() => {
          setSuccessDialogOpen(true);
        });
    }, 3000);
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

  return (
    <>
      <div>
        <div className="home">
          <Sidebar className="nav" style={{}} />
          <div className="homeContainer">
            <Navbar />
            <Container maxWidth="lg">
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    User Details
                  </Typography>
                  <Box mt={2}>
                    <form>
                      <Box mb={2}>
                        <TextField
                          fullWidth
                          label="Name"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleInputChange}
                          error={!!validationErrors.name}
                          helperText={validationErrors.name}
                          inputProps={{ maxLength: 15 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleInputChange}
                          error={!!validationErrors.email}
                          helperText={validationErrors.email}
                        />
                      </Box>
                      <Box mb={2}>
                        <TextField
                          fullWidth
                          label="Mobile"
                          type="text"
                          name="mobile_no"
                          value={data.mobile_no}
                          onChange={handleInputChange}
                          error={!!validationErrors.mobile_no}
                          helperText={validationErrors.mobile_no}
                          inputProps={{ maxLength: 10 }}
                        />
                      </Box>
                      <Box mb={2}>
                        <TextField
                          fullWidth
                          label="Address"
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleInputChange}
                          error={!!validationErrors.address}
                          helperText={validationErrors.address}
                        />
                      </Box>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="role-label">Role</InputLabel>
                          <Select
                            labelId="role-label"
                            id="role-select"
                            name="usertype"
                            value={data.usertype}
                            onChange={handleInputChange}
                            error={!!validationErrors.usertype}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {dropdownOptions.map((option) => (
                              <MenuItem key={option.users_id} value={option.users_id}>
                                {option.user_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </form>
                  </Box>
                  <Box mt={2}>
                    {loading ? (
                      <CircularProgress color="primary" />
                    ) : (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleUpdateClick}
                        >
                          Update User
                        </Button>
                        <Link to="/users">
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '5px' }}
                          >
                            Back
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Box>
                </CardContent>
              </Card>
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

      <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
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

      {/* Loading Dialog */}
      <Dialog open={showLoadingDialog} onClose={() => setShowLoadingDialog(false)}>
        <DialogTitle>Loading</DialogTitle>
        <DialogContent>
          Updating data...
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Single;
