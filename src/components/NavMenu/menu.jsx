import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Menu.scss';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';
import apis from '../../utils/apiUrl.json';
import MyEditor, { HtmlEditor } from '../htmlEditor/htmlEditor';

export const Menu = () => {
  const [editorContent, setEditorContent] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    is_submenu: 0,
    menu_id: null,
    content_id: '',
    content_type: ' ',
    content_data: '',
  });
  const [errors, setErrors] = useState({});

  const optionsData = [
    { id: 1, value: 'link', label: 'Link' },
    { id: 2, value: 'file', label: 'File' },
    { id: 3, value: 'html', label: 'HTML' },
  ];

  useEffect(() => {
    setFormData({
      name: '',
      is_submenu: 0,
      menu_id: null,
      content_id: '',
      content_type: ' ',
      content_data: '',
    });
  }, []);

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    }

    if (!formData.content_id) {
      errors.content_id = 'Select an option';
    }

    if (formData.content_id === '1' && !formData.content_data) {
      errors.content_data = 'Link is required';
    }

    if (formData.content_id === '2' && !formData.fileValue) {
      errors.fileValue = 'File is required';
    }

    if (formData.content_id === '3' && !editorContent) {
      errors.editorContent = 'HTML content is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
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

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('is_submenu', formData.is_submenu);
        formDataToSend.append('contnet_id', formData.content_id);

        if (formData.content_id === '1') {
          formDataToSend.append('content_type', 'html');
          formDataToSend.append('content_data', formData.content_data);
        } else if (formData.content_id === '2') {
          formDataToSend.append('content_typze', 'file');
          formDataToSend.append('content_data', formData.content_data);
        } else if (formData.content_id === '3') {
          formDataToSend.append('content_type', 'html');
          formDataToSend.append('content_data', formData.content_data);
        }

        const response = await apiClient.post(apis.navmenu, formDataToSend);
        console.log('Data saved:', response.data);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };

  return (
    <div className="container">
      <div>
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
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Select an option</label>
          <select
            className="form-select"
            name="content_id"
            value={formData.content_id}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            {optionsData.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.content_id && (
            <div className="text-danger">{errors.content_id}</div>
          )}
        </div>

        {formData.content_id === '1' && (
          <div className="mb-3">
            <label className="form-label">Enter Link</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Link"
              name="content_data"
              value={formData.content_data}
              onChange={handleInputChange}
            />
            {errors.content_data && (
              <div className="text-danger">{errors.content_data}</div>
            )}
          </div>
        )}

        {formData.content_id === '2' && (
          <div className="mb-3">
            <label className="form-label">Choose File</label>
            <input
              className="form-control"
              type="file"
              onChange={handleFileChange}
            />
            {errors.fileValue && (
              <div className="text-danger">{errors.fileValue}</div>
            )}
          </div>
        )}

        {formData.content_id === '3' && (
          <div className="mb-3">
            <label className="form-label">HTML Editor</label>
            <div>
              <FroalaEditorComponent
                tag="textarea"
                config={config}
                onModelChange={handleEditorChange}
                model={formData.content_data}
              />
            </div>
            {errors.editorContent && (
              <div className="text-danger">{errors.editorContent}</div>
            )}
          </div>
        )}

        <div className="btnsubmit">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
