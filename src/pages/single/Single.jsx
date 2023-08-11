import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import api from '../../utils/apiUrl.json'

export function Registration({ param }) {
  const navigate = useNavigate(); // Use the useNavigate hook
  const location = useLocation();
  const qParams = new URLSearchParams(location.search);
  const id = qParams.get('id')
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    mobile: '',
    address: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`/api/user/${id}`)
      .then(response => {
        setData(response.data);
        setFormData({
          name: response.data.user_name || '',
          email: response.data.email || '',
          mobile: response.data.mobile || '',
          address: response.data.address || '',
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleUpdate = () => {
    const newData = {
      name: formData.user_name,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
    };

    axios.put(`/api/user/${id}`, newData)
      .then(() => fetchData())
      .catch(error => console.error('Error updating data:', error));
  };

  const handleDelete = () => {
    axios.delete(`/api/user/${id}`)
      .then(() => {
        setData(null);
        setFormData({
          user_name: '',
          email: '',
          mobile: '',
          address: '',
        });
        navigate('/users'); // Use the navigate function to redirect
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
// debugger;
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
                        <Form>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">Name</Form.Label>
                            <Form.Control type="text" name="user_name" placeholder="Enter Name" value={id} onChange={handleFormChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleFormChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="Mobile">
                            <Form.Label className="text-center">Mobile</Form.Label>
                            <Form.Control type="text" name="mobile" placeholder="Enter Mobile No" value={formData.mobile} onChange={handleFormChange} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="Address">
                            <Form.Label className="text-center">Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleFormChange} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                          <div id="button" className=" d-flex">
                            <Button variant="primary" type="button" onClick={handleUpdate} style={{ width: 100 }}>
                              Update
                            </Button>
                            <Button variant="primary" type="button" onClick={handleDelete} style={{ width: 100, marginLeft: 5 }}>
                              Delete
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

export default Registration;
