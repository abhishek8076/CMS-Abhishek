import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';
import apis from '../../utils/apiUrl.json';
import MyEditor, { HtmlEditor } from '../htmlEditor/htmlEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './whatsnew.scss';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';
// import { Sidebar } from '@react-page/editor';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

export const EditWhatsnew = () => {
  const { id } = useParams();
  const [html, setHtml] = useState('');
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({
    news_title: '',
    contenttype: '',
    external_file: '',
    internale_file: '',
    file: "",
    startdate: '',
    end_date: '',
    html: ""
  });
  const [errors, setErrors] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);


  const optionsData = [
    { id: '4', label: 'External Link' },
    { id: '3', label: 'Internal Link' },
    { id: '2', label: 'File' },
    { id: '1', label: 'HTML' },
  ];

  useEffect(() => {
    if (editingItemId) {
      apiClient.get(`/api/your-endpoint/${editingItemId}`)
        .then((response) => {
          const dataToEdit = response.data;
          setFormData({
            news_title: dataToEdit.news_title,
            contenttype: dataToEdit.contenttype,
            external_file: dataToEdit.external_file,
            internale_file: dataToEdit.internale_file,
            startdate: dataToEdit.startdate,
            end_date: dataToEdit.end_date,
            html: dataToEdit.html,
          });
        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
        });
    } else {
      setFormData({
        news_title: '',
        contenttype: '',
        external_file: '',
        internale_file: '',
        file: "",
        startdate: '',
        end_date: '',
        html: ""
      });
    }
  }, [editingItemId]);

  const handleEditorChange = (content) => {
    setHtml(content);
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
    setFile(imageFile);
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
          formDataToSend.append('file', file);
        } else if (formData.contenttype === '1') {
          formDataToSend.append('html_content', html);
        }

        formDataToSend.append('startdate', formData.startdate);
        formDataToSend.append('end_date', formData.end_date);

        if (editingItemId) {
          const response = await apiClient.put(`/api/your-endpoint/${editingItemId}`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log('Data updated:', response.data);
          toast.success('Data updated successfully!');
          openModal('Data updated successfully!');
        } else {
          const response = await apiClient.post(apis.whatsnew, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log('Data saved:', response.data);
          toast.success('Data saved successfully!');
          openModal('Data saved successfully!');
        }
      } catch (error) {
        console.error('Error saving/updating data:', error);
      }
    }
  };

  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };

  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
            <Link to='/whatsnew/whatsnewtable' style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary" >
                <ViewListIcon /> Data view
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
        <div class="box-sec">
        <h1 className="text-center heading-main">What's New</h1>
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="news_title"
              value={formData.news_title}
              onChange={handleInputChange}
            />
            {errors.news_title && <div className="text-danger">{errors.news_title}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Select a content type</label>
            <select
              className="form-select"
              name="contenttype"
              value={formData.contenttype}
              onChange={handleInputChange}
            >
              <option value="">Select a content type</option>
              {optionsData.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.contenttype && (
              <div className="text-danger">{errors.contenttype}</div>
            )}
          </div>

          {/* Render fields based on contenttype */}
          {formData.contenttype === '4' && (
            <div className="mb-3">
              <label className="form-label text-dark">Enter External Link</label>
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
              <label className="form-label text-dark">Enter Internal Link</label>
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
              <label className="form-label text-dark">Choose File</label>
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
              <label className="form-label text-dark">HTML Editor</label>
              <div>
                <FroalaEditorComponent
                  tag="textarea"
                  config={config}
                  model={html}
                  onModelChange={handleEditorChange}
                />
              </div>
              {errors.editorContent && (
                <div className="text-danger">{errors.editorContent}</div>
              )}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-dark">Starting Date</label>
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
            <label className="form-label text-dark">Ending Date</label>
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
              {editingItemId ? 'Update' : 'Submit'}
            </button>
            <CustomModal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};

const CustomModal = ({ isOpen, message, onClose }) => {
  return (
    isOpen && (
      <div className="custom-modal">
        <div className="modal-content">
          <h2>{message}</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};
