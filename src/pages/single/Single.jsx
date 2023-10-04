import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';
import apiClinet from '../../services/AxiosApi';
import api from '../../utils/apiUrl.json';

export function Single() {
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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

  const handleUpdateClick = async () => {
    const errors = {};

    if (!data.name) {
      errors.name = 'Name is required';
    } else if (!isValidName(data.name)) {
      errors.name = 'Invalid name format';
    }
    

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.mobile_no || data.mobile_no.length >10 ) {
      errors.mobile_no = 'Mobile is required';
    } else if (!isValidMobile(data.mobile_no)) {
      errors.mobile_no = 'Invalid mobile format (should contain 10 digits)';
    }

    if (!data.address) {
      errors.address = 'Address is required';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      try {
        setLoading(true);
        await apiClinet.put(api.edituser + id, data);
        setUpdateSuccess(true);
        setLoading(false);
      } catch (error) {
        console.error('Error updating user data:', error);
        setUpdateError('Failed to update user data');
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
                                  flexDirection: 'column',
                                  justifyContent: 'end',
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
    </>
  );
}

export default Single;
