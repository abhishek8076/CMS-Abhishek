import React, { useState } from 'react';
import Axios from 'axios';
import './Menu.scss'; // Import your custom SCSS file for additional styling
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';
import { withTheme } from '@emotion/react';

export const Subsubmenu = () => {
  // State to manage form data
  const [editorContent, setEditorContent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    option: '', // Initialize with an empty string
    linkValue: '',
    fileValue: null,
    htmlValue: '',
    selectedOptionId: '',
    SubMenuoptions: ''
  });

  // JSON data for dropdown options

  const optionsData = [
    { id: 1, value: 'link', label: 'Link' },
    { id: 2, value: 'file', label: 'File' },
    { id: 3, value: 'html', label: 'HTML' },
  ];
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const optionsForFirstDropdown=[
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];
  const [optionsForSecondDropdown, setOptionsForSecondDropdown] = useState([]);

  const fetchOptionsForSecondDropdown = (selectedId) => {
    // Simulated data based on selectedId
    const dummyData = {
      1: [{ id: 11, name: 'Suboption 1.1' }, { id: 12, name: 'Suboption 1.2' }],
      2: [{ id: 21, name: 'Suboption 2.1' }, { id: 22, name: 'Suboption 2.2' }],
      3: [{ id: 31, name: 'Suboption 3.1' }, { id: 32, name: 'Suboption 3.2' }],
    };

    const options = dummyData[selectedId] || [];
    setOptionsForSecondDropdown(options);
  };
  // Handle changes in the first dropdown
  const handleFirstDropdownChange = (event) => {
    const selectedId = event.target.value;
    setSelectedOptionId(selectedId);
    fetchOptionsForSecondDropdown(selectedId);
  };

  // Handle input field changes
  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      fileValue: file,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('option', formData.option);
      formDataToSend.append('selectedOptionId', selectedOptionId);
      formDataToSend.append('SubMenuoptions', formData.SubMenuoptions)
      if (formData.option === '1') {
        formDataToSend.append('data', formData.linkValue);
      } else if (formData.option === '2') {
        formDataToSend.append('data', formData.fileValue);
      } else if (formData.option === '3') {
        formDataToSend.append('data', formData.htmlValue);
      }

      const response = await apiClient.post('/api/save-data', formDataToSend);
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const config = {
    heightMin: 300,
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
  console.log(editorContent);
  console.log(formData);

  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label htmlFor="firstDropdown" style={{color:"white", fontWeight:"bold"}}>Select Menu Option:</label>
          <select id="firstDropdown" className="form-select" 
          value={selectedOptionId} 
          onChange={handleFirstDropdownChange}>
            <option value="">Select...</option>
            {optionsForFirstDropdown.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="secondDropdown" style={{color:"white", fontWeight:"bold"}}>Select Submenu option:</label>
          <select id="secondDropdown" 
          className="form-select"
          name="SubMenuoptions"
          value={formData.SubMenuoptions}
          onChange={handleInputChange}
          
          >
            <option value="">Select...</option>
            {optionsForSecondDropdown.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {/* Name input field */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Sub-submenu name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Dropdown to select an option */}

        <div className="mb-3">
          <label className="form-label">Select an option</label>
          <select
            className="form-select"
            name="option"
            value={formData.option}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            {optionsData.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional input fields based on selected option */}
        {formData.option === '1' && (
          <div className="mb-3">
            <label className="form-label">Enter Link</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Link"
              name="linkValue"
              value={formData.linkValue}
              onChange={handleInputChange}
            />
          </div>
        )}

        {formData.option === '2' && (
          <div className="mb-3">
            <label className="form-label">Choose File</label>
            <input
              className="form-control"
              type="file"
              // Change the file type as needed
              onChange={handleFileChange}
            />
          </div>
        )}

        {formData.option === '3' && (
          <div className="mb-3">
            <label className="form-label">HTML Editor</label>
            <div>
              <FroalaEditorComponent
                tag="textarea"
                config={config}
                onModelChange={handleEditorChange} // Handle Froala editor content changes
                model={editorContent} // Pass the editor content to the component
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>


  );
}
