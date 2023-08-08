import React, { useState } from 'react';
import axios from 'axios'
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import Select from 'react-select';
import api from '../../utils/apiUrl.json';
import { Options } from 'react-select';
import MenuItem from '@mui/material/MenuItem';


export function New() {
  const [age, setAge] = React.useState('');
  const roles = [
    { label: 'Admin', value: "1" },
    { label: 'DEO', value: "2" }
  ]
  const [selectedRole, setSelectedRole] = useState('')
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the state with the selected value
  };


  const handleChange1 = (event) => {
    setAge(event.target.value);
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
    usertype: '',
    createdby: 'admin',
    password: '',
    ip_address: '192.168.0.1'
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
          mobile_no: '',
          address: '',
          usertype: '',
          createdby: 'admin',
          password: '',
          ip_address: '192.168.0.1'
        });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle error, if needed
      });
  };


  return (
    <>
      <div>
        <div className="home">
          <Sidebar className='nav' style={{}} />
          <div className="homeContainer">
            <Navbar />
            <div></div>
            <Container>

              <Row className="vh-100 d-flex justify-content-center align-items-center">

                <Col md={10} lg={6} xs={12}>

                  <Card.Body>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-4 text-center text-uppercase ">
                        User Details
                      </h2>
                      <div className="mb-3">

                        <Form onSubmit={handleSubmit}>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">Name</Form.Label>
                            <Form.Control type="text"
                              placeholder="Enter Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Enter email"

                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="Password">
                            <Form.Label className="text-center">Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter Password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="Mobile">
                            <Form.Label className="text-center">Mobile</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile No"
                              name="mobile_no"
                              value={formData.mobile_no}
                              onChange={handleChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="Address">
                            <Form.Label className="text-center">Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange} />

                          </Form.Group>

                          {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            
                            name="usertype"
                            label="User Type"
                            onChange={handleChange}
                          >
                            <MenuItem value={formData.usertype} >Ten</MenuItem>
                            <MenuItem value={formData.usertype} >Twenty</MenuItem>
                            <MenuItem value={formData.usertype} >Thirty</MenuItem>
                          </Select> */}
                          <Form.Group className="mb-3" controlId="Address">
                            <div className="mb-12"><Form.Label className="text-center">Role</Form.Label>
                              <select className='form-control' name='usertype' value={selectedRole} onChange={handleRoleChange}>
                                <option value={formData.usertype}>Select a role</option>
                                {roles.map((role) => (
                                  <option key={role.value} value={formData.usertype}>
                                    {role.label}
                                  </option>
                                ))}
                              </select>

                            </div>
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          ></Form.Group>
                          <div id="button" className=" d-flex">
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
    </>
  );
}
export default New;