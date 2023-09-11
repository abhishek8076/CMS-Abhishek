import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from 'react-bootstrap';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import apiClient from '../../services/AxiosApi';
import './Menu.scss';
import { option } from '../../datatablesource';
import apis from '../../utils/apiUrl.json'

export const Menu = (props) => {

  // Initialize state for selected option and form data
  const [selectedOption, setSelectedOption] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const [datamenu, setdatamenu] = useState({
    id: 1,
    menuName: '',
    contentType: '',
    uploadFile: '',
    menuUrl: '',
    uploadHtml: '',
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption(event.target.value);
    setdatamenu((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = {
        ...datamenu,
        contentType: parseInt(selectedOption, 10),
        contentType: editorContent,
        // Add the content from the FroalaEditorComponent
        
      };

      const response = await apiClient.post(apis.navmenu, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Data submitted successfully!');
        // Clear form fields and selected option on success
        setdatamenu({
          menuName: '',
          contentType: '',
          uploadFile: '',
          menuUrl: '',
          uploadHtml: '',
        });
        setSelectedOption('');
        setEditorContent('');
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Something went wrong');
    }
  };

  const config = {
    heightMin: 300,
    innerWidth:300,
    outerWidth:300,
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
console.log(datamenu)
console.log(editorContent)
  return (
    <div className='MainMenuOption'>
      <Container>
      
        <form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label className='text-center' style={{ color: 'white' }}>
              Name
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              name='menuName'
              value={datamenu.menuName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='ContentType'>
            <div className='mb-12'>
              <Form.Label className='text-center' style={{ color: 'white' }}>
                Content Type
              </Form.Label>
              <div>
                <select
                  className='form-control'
                  name='contentType'
                  value={selectedOption}
                  onChange={handleChange}
                >
                  <option value=''>Select a content type</option>
                  {option.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.name}
                    </option>
                  ))}
                </select>

                {selectedOption === '1' && (
                  <div>
                    <input
                      type='file'
                      name='uploadFile'
                      value={datamenu.uploadFile}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {selectedOption === '2' && (
                  <div>
                    <input
                      type='text'
                      name='menuUrl'
                      value={datamenu.menuUrl}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {selectedOption === '3' && (
                  <div>
                    <FroalaEditorComponent
                      tag="textarea"
                      config={config}
                      model={editorContent} // Set the content
  onModelChange={(content) => setEditorContent(content)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Form.Group>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        
      </Container>
    </div>
  );
};
