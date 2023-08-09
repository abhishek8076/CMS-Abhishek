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

// import
import { TextField ,Input} from '@mui/material';
import Select from '@mui/material/Select';

export const Cms = () => {
  const [menu, setMenu] = React.useState('');
  const [showDiv, setShowDiv] = useState(false);
  const contentType = [
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
    setShowDiv(selectedValue === 'option1')
    // setShowDiv(if);
  };
  return (
    <div>
      <div className="home">
        <Sidebar className='nav' style={{}} />
        <div className="homeContainer">
          <Navbar />
          <h1>CMS</h1>
          <Container>
            <Grid container spacing={2}>
              <Grid >
                <h4>Menu List</h4>
              </Grid>
              <Grid >
                <FormControl sx={{ minWidth: 200 }} size="small">

                  {/* <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={menu}
        label="menu"
        onChange={handleChange}
      > */}

                  <select onChange={handleDropdownChange}>
                    <option value=" ">Select</option>
                    <option value="option1">Menu</option>
                    <option value="option2">Sub_Menu</option>
                    <option value="option3">Sub-submenu</option>
                  </select>
                  {/* </Select>  */}
                  <div>


                  </div>
                </FormControl>
              </Grid>
              <Grid xs={6} md={4}>

                {showDiv && (
                  <div>
                    <Container>
                   
                    <Form >
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="text-center">Name</Form.Label>
                            <Form.Control type="text"
                              placeholder="Enter Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange} />
                          </Form.Group>
                    </Form>
                    <Form >
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Label className="text-center">URL</Form.Label>
                            <Form.Control type="text"
                              placeholder="Enter URL"
                              name="url"
                              value={formData.url}
                              onChange={handleChange} />
                          </Form.Group>
                    </Form>
                    <Form.Group className="mb-3" controlId="Address">
                            <div className="mb-12"><Form.Label className="text-center">Content Type</Form.Label>
                              <select className='form-control' name='usertype' value={selectedRole} onChange={handleRoleChange}>
                                <option value={formData.usertype}>Select </option>
                                {contentType.map((role) => (
                                  <option key={role.value} value={formData.usertype}>
                                    {role.label}
                                  </option>
                                ))}
                              </select>

                            </div>
                          </Form.Group>
                    </Container>

                  </div>
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  )
}
