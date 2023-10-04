import React, { useState } from 'react';
import Axios from 'axios';
import './Menu.scss';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';

export const Submenu = () => {
  const [editorContent, setEditorContent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    option: '',
    linkValue: '',
    fileValue: null,
    htmlValue: '',
    menuoption: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    option: '',
    linkValue: '',
    fileValue: '',
    htmlValue: '',
    menuoption: '',
  });

  const optionsData = [
    { id: 1, value: 'link', label: 'Link' },
    { id: 2, value: 'file', label: 'File' },
    { id: 3, value: 'html', label: 'HTML' },
  ];

  const Menuoptions = [
    // ... (your menu options data)
  ];

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      fileValue: file,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required';
      isValid = false;
    } else {
      newErrors.name = '';
    }

    if (formData.option === '') {
      newErrors.option = 'Please select an option';
      isValid = false;
    } else {
      newErrors.option = '';
    }

    if (formData.option === '1' && formData.linkValue.trim() === '') {
      newErrors.linkValue = 'Link is required for this option';
      isValid = false;
    } else {
      newErrors.linkValue = '';
    }

    if (formData.option === '2' && !formData.fileValue) {
      newErrors.fileValue = 'File is required for this option';
      isValid = false;
    } else {
      newErrors.fileValue = '';
    }

    if (formData.option === '3' && editorContent.trim() === '') {
      newErrors.htmlValue = 'HTML content is required for this option';
      isValid = false;
    } else {
      newErrors.htmlValue = '';
    }

    if (formData.menuoption === '') {
      newErrors.menuoption = 'Please select a menu';
      isValid = false;
    } else {
      newErrors.menuoption = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('option', formData.option);
        formDataToSend.append('menuoption', formData.menuoption);
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
    }
  };

  const config = {
    heightMin: 300,
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };

  return (
    <div className="container">
      <div>
        <div className="mb-3">
          <label className="form-label">Select Menu</label>
          <select
            className="form-select"
            name="menuoption"
            value={formData.menuoption}
            onChange={handleInputChange}
          >
            <option value="">Select Menu</option>
            {Menuoptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="text-danger">{errors.menuoption}</div>
        </div>
        {/* Name input field */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <div className="text-danger">{errors.name}</div>
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
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="text-danger">{errors.option}</div>
        </div>

        {/* Conditional input fields based on selected option */}
        {formData.option === 'link' && (
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
            <div className="text-danger">{errors.linkValue}</div>
          </div>
        )}

        {formData.option === 'file' && (
          <div className="mb-3">
            <label className="form-label">Choose File</label>
            <input
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
            <div className="text-danger">{errors.fileValue}</div>
          </div>
        )}

        {formData.option === 'html' && (
          <div className="mb-3">
            <label className="form-label">HTML Editor</label>
            <div>
              <FroalaEditorComponent
                tag="textarea"
                config={config}
                onModelChange={handleEditorChange}
                model={editorContent}
              />
            </div>
            <div className="text-danger">{errors.htmlValue}</div>
          </div>
        )}

        {/* Submit button */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
