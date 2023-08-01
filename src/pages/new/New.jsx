import "./new.scss";
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap. css';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// import MobileDatePicker from '/packages/x-date-pickers/src/MobileDatePicker'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import api from "../../utils/apiUrl.json"


const New = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address:'jhkjhh',
    usertype:'1',
    createdby:'admin',
    password:'B23@321',
    ip_address:'23332232'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API to submit the form data
    axios.post(api.newuser, formData)
      .then((response) => {
        console.log('Data submitted successfully!', response.data);
        // Handle success, if needed

        // Optionally, reset the form after successful submission
        setFormData({
         name: '',
          email: '',
          mobile_no: ''
        });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle error, if needed
      });
  };


  return (
    <>   <div>
      <div className="home">
        <Sidebar className='nav' style={{}} />
        <div className="homeContainer">
          <Navbar />
          <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-9 offset-2">
            <Card>
              <CardHeader title="Registration Form" />
              <form onSubmit={handleSubmit}>
              <CardContent>
                <FormControl  sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Name</InputLabel>
                  <Input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}

                  />
                </FormControl>
               
           

             
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">mobile</InputLabel>
                  <Input
                    required
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Password</InputLabel>
                  <Input
                    required
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Address</InputLabel>
                  <Input
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>
                <Box sx={{ '& button': { m: 3 } }}>
                  <div>
                    <Button  type="submit" variant="contained">Submit</Button>
                  </div>
                </Box>
              </CardContent>
              </form>
              <div>
                
              </div>
            </Card>
          </div>
        </div>
      </div >
   
    </div >
        </div>
      </div>
    </div>

    </>
  );
};

export default New;
