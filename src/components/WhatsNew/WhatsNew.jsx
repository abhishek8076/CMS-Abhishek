import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // Make sure Axios is imported if used elsewhere
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi'; // Adjust the import path as needed
import apis from '../../utils/apiUrl.json'; // Adjust the import path as needed
import MyEditor, { HtmlEditor } from '../htmlEditor/htmlEditor'; // Adjust the import path as needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Modal from 'react-modal';

export const WhatsNew = () => {
  const [html, sethtml] = useState('');
  const [file, setselectefile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMessage, setModalMessage] = useState('');

  const [formData, setFormData] = useState({
    news_title: '',
    
    contenttype: '',
    external_file: '',
    internale_file: '',
    file: "",
    startdate: '', // Added Starting Date
    end_date: '',   // Added Ending Date
    html:""
  });
  const [errors, setErrors] = useState({});

  const optionsData = [
    { id: '4', label: 'External Link' },
    { id: '3', label: 'Internal Link' },
    { id: '2', label: 'File' },
    { id: '1', label: 'HTML' },
  ];

  useEffect(() => {
    setFormData({
      news_title: '',
      contenttype: '',
      external_file: '',
      internale_file: '',
      file: "",
      startdate: '', // Initialize Starting Date
      end_date: '', 
      html:""  // Initialize Ending Date
    });
  }, []);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.news_title) {
      errors.news_title = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_file) {
      errors.external_file = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internale_file) {
      errors.internale_file = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    }

    if (formData.contenttype === '1' && !html) {
      errors.editorContent = 'HTML content is required';
    }

    if (!formData.startdate) {
      errors.startdate = 'Starting Date is required';
    }

    if (!formData.end_date) {
      errors.end_date = 'Ending Date is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setselectefile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === '2') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
       
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('news_title', formData.news_title);
       
        formDataToSend.append('contenttype', formData.contenttype);

        if (formData.contenttype === '4') {
          formDataToSend.append('external_file', formData.external_file);
        } else if (formData.contenttype === '3') {
          formDataToSend.append('internale_file', formData.internale_file);
        } else if (formData.contenttype === '2') {
          formDataToSend.append('file',file);
        } else if (formData.contenttype === '1') {
          formDataToSend.append('html_content', html);
        }

        formDataToSend.append('startdate', formData.startdate); // Add Starting Date
        formDataToSend.append('end_date', formData.end_date);     // Add Ending Date

        const response = await apiClient.post(apis.whatsnew, formDataToSend,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log('Data saved:', response.data);
        toast.success('Data saved successfully!');
        openModal('Data saved successfully!');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  };

  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
  console.log(formData);

  return (
    <div className="container">
    <div className="row">
      <div className="col">
      <div className="col text-end">
        <button className="btn btn-primary" >
          Submit
        </button>
      </div>
        <h1 className="text-center">What's New</h1>
      </div>
     
    </div>
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            name="news_title"
            value={formData.news_title}
            onChange={handleInputChange}
          />
          {errors.name && <div className="text-danger">{errors.news_title}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Select a content type</label>
          <select
            className="form-select"
            name="contenttype"
            value={formData.contenttype}
            onChange={handleInputChange}
          >
            <option value="">Select a content type</option>
            {/* Add your options here */}
            <option value="4">External</option>
            <option value="3">Internal</option>
            <option value="2">File</option>
            <option value="1">HTML</option>
          </select>
          {errors.contenttype && (
            <div className="text-danger">{errors.contenttype}</div>
          )}
        </div>

        {formData.contenttype === '4' && (
          <div className="mb-3">
            <label className="form-label">Enter External Link</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter External Link"
              name="external_file"
              value={formData.external_file}
              onChange={handleInputChange}
            />
            {errors.external_file && (
              <div className="text-danger">{errors.external_file}</div>
            )}
          </div>
        )}

        {formData.contenttype === '3' && (
          <div className="mb-3">
            <label className="form-label">Enter Internal Link</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Internal Link"
              name="internale_file"
              value={formData.internale_file}
              onChange={handleInputChange}
            />
            {errors.internale_file && (
              <div className="text-danger">{errors.internale_file}</div>
            )}
          </div>
        )}

        {formData.contenttype === '2' && (
          <div className="mb-3">
            <label className="form-label">Choose File</label>
            <input
              className="form-control"
              type="file"
              name="file"
              onChange={handleImageChange}
            />
            
            {errors.file && (
              <div className="text-danger">{errors.file}</div>
            )}
          </div>
        )}

        {formData.contenttype === '1' && (
          <div className="mb-3">
            <label className="form-label">HTML Editor</label>
            <div>
              {/* Include your HTML editor component here */}
              <textarea
                className="form-control"
                value={formData.editorContent}
                onChange={(e) => handleEditorChange(e.target.value)}
              ></textarea>
            </div>
            {errors.editorContent && (
              <div className="text-danger">{errors.editorContent}</div>
            )}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Starting Date</label>
          <input
            className="form-control"
            type="date"
            name="startdate"
            value={formData.startdate}
            onChange={handleInputChange}
          />
          {errors.startdate && (
            <div className="text-danger">{errors.startdate}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Ending Date</label>
          <input
            className="form-control"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />
          {errors.end_date && (
            <div className="text-danger">{errors.end_date}</div>
          )}
        </div>
        <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
      </div>
    </div>
  </div>

  );
};
