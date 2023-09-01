import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);
  console.log(user)

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
                      <h2 className="fw-bold mb-4 text-center text-uppercase">
                        User Details
                      </h2>
                      <div className="mb-3">
                        <Form>
                          <Form.Group className="mb-3" controlId="Name">
                            <Form.Label className="text-center">Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={data.name}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="user_email"
                              value={data.email}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Mobile">
                            <Form.Label className="text-center">Mobile</Form.Label>
                            <Form.Control
                              type="text"
                              name="user_mobile_no"
                              value={data.mobile_no}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Address">
                            <Form.Label className="text-center">Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="user_address"
                              value={data.address}
                              onChange={handleInputChange}
                            />
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
                              <div style={{display:"flex",flexDirection:"column",justifyContent:"end",marginTop:"5px"}}>
                             
                              <Button style={{width: "fit-content"}} onClick={handleUpdateClick}>
                                Update User
                              </Button>
                            

                              <Link to='/users'>
                                <Button variant="primary"  style={{marginTop:"5px",alignContent:"right"}}>
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
