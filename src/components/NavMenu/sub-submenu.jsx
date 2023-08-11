import React ,{useState}from 'react';
// import React, { useState } from 'react';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import NoteViewer from '../../components/Edit/Edit';
// import Whats_New from '../../components/WhatsNew/WhatsNew';
// import './Cms.scss';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
// import {Item}  from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Form } from 'react-bootstrap';
import FileUploadPage from '../content/fileUpload/Fileupload';



export const Subsubmenu = () => {
    const options = ['Select','File' ,'Link', 'HTML']; // Options for the dropdown
    const [selectedOption, setSelectedOption] = useState(options[0]); // Initial selected option
  
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
      const options1 = ['Select','Home' ,'About us', 'Login']; // Options for the dropdown
    const [selectedOption1, setSelectedOption1] = useState(options1[0]); // Initial selected option

    const options2 = ['Select' ,'About us1', 'Login1']; // Options for the dropdown
    const [selectedOption2, setSelectedOption2] = useState(options2[0]); // Initial selected option
  
    const handleOptionChange1 = (event) => {
      setSelectedOption1(event.target.value);
    };

  return (
    <div><div className='MainMenuOption'>
    <Container>

    <Form >
        <Form.Group className="mb-3" controlId="Menulist">
          <Form.Label className="text-center">Menulist</Form.Label>
        
              <select value={selectedOption} onChange={handleOptionChange1}>
                      {options1.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}

                    </select>
        </Form.Group>
      </Form>
      <Form >
        <Form.Group className="mb-3" controlId="Menulist">
          <Form.Label className="text-center">submenulist</Form.Label>
        
              <select value={selectedOption} onChange={handleOptionChange1}>
                      {options2.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}

                    </select>
        </Form.Group>
      </Form>
      
      <Form >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-center">Name</Form.Label>
          <Form.Control type="text"
            placeholder="Enter Name"
            name="name"
            // value={formData.name}
            // onChange={handleChange}
             />
        </Form.Group>
      </Form>
      <Form >
        <Form.Group className="mb-3" controlId="name">
          <Form.Label className="text-center">URL</Form.Label>
          <Form.Control type="text"
            placeholder="Enter URL"
            name="url"
            // value={formData.url}
            // onChange={handleChange}
             />
        </Form.Group>
      </Form>
      <Form.Group className="mb-3" controlId="Address">
        <div className="mb-12">
          <Form.Label className="text-center">Content Type</Form.Label>
          <div>
      <select value={selectedOption} onChange={handleOptionChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedOption === 'File' && <div><FileUploadPage/> </div>}
      {selectedOption === 'Link' && <div>This is Div 2 content.</div>}
      {selectedOption === 'HTML' && <div>This is Div 3 content.</div>}
    </div>

        </div>
      </Form.Group>
    </Container>

  </div></div>
  )
}
export default Subsubmenu;