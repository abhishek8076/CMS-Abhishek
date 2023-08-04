import React from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.css';     


export function Registration() {
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
                        <Form.Control type="text" placeholder="Enter Name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                     <Form.Group className="mb-3" controlId="Mobile">
                      <Form.Label className="text-center">Mobile</Form.Label>
                      <Form.Control type="text" placeholder="Enter Mobile No" />
                      </Form.Group>
                    
                      <Form.Group className="mb-3" controlId="Address">
                      <Form.Label className="text-center">Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter Address" />

                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div id="button" className=" d-flex">
                        <Button variant="primary" type="button" style={{width:100}}>
                          Update
                        </Button>
                        <Button variant="primary" type="button" style={{width:100, marginLeft:5}}>
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