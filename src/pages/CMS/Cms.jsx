import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteViewer from '../../components/Edit/Edit';
import Whats_New from '../../components/WhatsNew/WhatsNew';
import './Cms.scss';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
// import {Item}  from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-bootstrap';
import New from '../../pages/new/New'
import { Menu } from '../../components/NavMenu/menu';
import {Submenu} from '../../components/NavMenu/submenu';
// import './Cms.scss'
import { Row, Col,  Button } from 'react-bootstrap';
import { CMShomepage } from '../../components/NavMenu/CMShomepage';
import { Link } from 'react-router-dom';

export const Cms = () => {
  const [menu, setMenu] = React.useState('');
  const [showDiv, setShowDiv] = useState(false);
  const [showDiv1, setShowDiv1] = useState(false);
  const contentType = [
    { label: 'Select' },
    { label: 'File', value: "1" }, 
    { label: 'Link', value: "2" },
    { label: 'HTML', value: "3" },
  ]

  const [selectedRole, setSelectedRole] = useState('')
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the state with the selected value
  };

  const handleChange = (event) => {
    setMenu(event.target.value);
  };
  const [formData, setFormData] = useState({
    name: '',
    url: ''

  });
  //to the div and hide div
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    // if (selectedValue === 'option1') {
    //   setShowDiv(selectedValue === 'option1')
    // }
    setShowDiv(selectedValue === 'option1' || "demo")
    // setShowDiv(if);
  };
  const options = ['Select','Home', 'Menu', 'Submenu']; // Options for the dropdown
  const [selectedOption, setSelectedOption] = useState(options[0]); // Initial selected option

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    
    <div>
    <div className="home">
      <Sidebar className='nav' style={{}} />
      <div className="homeContainer">
        <div className="backgroundcontainer">
          <Navbar />
          <div className='mainContainer'>
           
            <Container className="custom-container"> {/* Add a custom CSS class */}
           
            <Row>
                <Col xs={12} className="text-end">
                <Link to='/cms/menutable' style={{textDecoration:'none'}}>
            <Button>
              Table
            </Button>
            </Link>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="text-center mt-4">
               
                  <h4>Add Menu</h4>
                  
                </Col>
              </Row>
              <Row className="justify-content-left" style={{marginTop:'20px'}}>
                
                <Col xs={6}>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    
                      <Form.Control
                        as="select" 
                        value={selectedOption}
                        onChange={handleOptionChange}
                        className="float-left" // Set dropdown to the left
                      >
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row className="justify-content-left   
              ">
                <Col xs={6}>
                  {/* Render different components based on the selected option */}
                  {selectedOption === 'Home' && <CMShomepage />}
                  {selectedOption === 'Menu' && <Menu />}
                  {selectedOption === 'Submenu' && <Submenu />}
                  {/* {selectedOption === 'Subsubmenu' && <Subsubmenu />} */}
                  {/* {hello my name is demo} */}
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
