import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Col, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import apiClinet from '../../services/AxiosApi';
import axios from 'axios';
import api from '../../utils/apiUrl.json'
export function Single() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  // console.log(id);
  // const fetchData = async () => {

  //   console.log(id);
  //     try {
  //       const response = await apiClinet.get(api.edituser + id);

        
  //       // const resData = await response.json()
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };


  // useEffect(() => {
  //   console.log("gg");
  //   fetchData();
  // }, [id]);
  useEffect(() => {
    console.log("kjlksad")
    async function fetchData() {
      const result = await apiClinet.get(
        api.edituser + id,
        // { headers: headers() }
      );
      const resultResp = result.data;
      setData(resultResp);
      // setResetGetValues(resultResp);
      console.log("result31124", result);
      // dstype = resultResp.dtype;
      // setLoading(false);
    }
    fetchData();
  }, [id]);
  console.log(data);
  //const user = data[0];
  //  console.log(data[0].user_name)
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
                            <Form.Control type="text" name="user_name" value={data.user_name} />
                          </Form.Group>
                          {console.log(data.user_name)}
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="text-center">
                              Email
                            </Form.Label>
                            
                            <Form.Control type="email" name="user_email" value={data.user_email} readOnly />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Mobile">
                            <Form.Label className="text-center">Mobile</Form.Label>
                            <Form.Control type="text" name="mobile" value={data.user_mobile_no} readOnly />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="Address">
                            <Form.Label className="text-center">Address</Form.Label>
                            <Form.Control type="text" name="address" value={data.user_address}  />
                          </Form.Group>
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
