import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';
import apis from '../../utils/apiUrl.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './whatsnew.scss';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';

export const EditWhatsnew = () => {
  const { id } = useParams();
  const [u_html, setu_html] = useState('');
  const [ufile, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({
    news_tittle: '',  // Corrected typo in the field name
    contenttype: '',
    external_file: '',
    internal_file: '',  // Corrected field name
    file: null,  // Use null for file state
    startdate: '',
    end_date: '',  // Corrected field name
    u_html: '',
  });
  const [errors, setErrors] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  const optionsData = [
    { id: 4, label: 'External Link' },
    { id: 3, label: 'Internal Link' },
    { id: 2, label: 'File' },
    { id: 1, label: 'HTML' },  // Updated label
  ];

  useEffect(() => {
    if (id) {
      apiClient.get(apis.getwhatsnewbyid + id)
        .then((response) => {
          setFormData(response.data)
         
        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
        });
    } else {
      setFormData({
        news_tittle: '',
        contenttype: '',
        external_file: '',
        internal_file: '',
        file: null,
        startdate: '',
        end_date: '',
        html: '',
      });
    }
  }, [id]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
        
  //       const response = await apiClient.get(apis.getwhatsnewbyid + id);
  //       setFormData(response.data);
       
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
       
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  const handleEditorChange = (content) => {
    setu_html(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.news_tittle) {
      errors.news_tittle = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_file) {
      errors.external_file = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internal_file) {
      errors.internal_file = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !ufile) {
      errors.file = 'File is required';
    }

    if (formData.contenttype === '1' && !u_html) {
      errors.u_html = 'HTML content is required';  // Updated field name
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

    if (type === 'file') {  // Updated type value
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

  // const handleSubmit = async () => {
  //   if (validateForm()) {
  //     try {
  //       const formDataToSend = new FormData();
  //       formDataToSend.append('news_tittle', formData.news_tittle);
  //       formDataToSend.append('contenttype', formData.contenttype);

  //       if (formData.contenttype === 4) {
  //         formDataToSend.append('external_file', formData.external_file);
  //       } else if (formData.contenttype === 3) {
  //         formDataToSend.append('internal_file', formData.internal_file);
  //       } else if (formData.contenttype ===2) {
  //         formDataToSend.append('file', ufile);
  //       } else if (formData.contenttype === 1) {
  //         formDataToSend.append('html', u_html);  // Updated field name
  //       }

  //       formDataToSend.append('startdate', formData.startdate);
  //       formDataToSend.append('end_date', formData.end_date);

  //         const response = await apiClient.put(apis.getwhatsnewbyid + id, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });
  //         console.log('Data updated:', response.data);
  //         toast.success('Data updated successfully!');
  //         openModal('Data updated successfully!');
        
  //     } catch (error) {
  //       console.error('Error saving/updating data:', error);
  //     }
  //   }
  // };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('news_tittle', formData.news_tittle);
        formDataToSend.append('contenttype', formData.contenttype);
  
        if (formData.contenttype === 4) {
          formDataToSend.append('external_file', formData.external_file);
        } else if (formData.contenttype === 3) {
          formDataToSend.append('internal_file', formData.internal_file);
        } else if (formData.contenttype === 2) {
          formDataToSend.append('file', ufile); // Use ufile here
        } else if (formData.contenttype === 1) {
          formDataToSend.append('html', u_html);
        }
  
        formDataToSend.append('startdate', formData.startdate);
        formDataToSend.append('end_date', formData.end_date);
  
        const response = await apiClient.put(apis.getwhatsnewbyid + id, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log('Data updated:', response.data);
        toast.success('Data updated successfully!');
        openModal('Data updated successfully!');
      } catch (error) {
        console.error('Error saving/updating data:', error);
      }
    }
  };
  
  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
  console.log(formData)
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
                    name="news_tittle"
                    value={formData.news_tittle}
                    onChange={handleInputChange}
                  />
                  {errors.news_tittle && <div className="text-danger">{errors.news_tittle}</div>}
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
              <option value={4}>External Link</option>
              <option value={3}>Internal Link</option>
              <option value={2}>File</option>
              <option value={1}>HTML</option>
            </select>
            {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
          </div>

                {/* Render fields based on contenttype */}
                {formData.contenttype === 4 && (
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

                {formData.contenttype === 3 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Enter Internal Link</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Internal Link"
                      name="internal_file"
                      value={formData.internal_file}
                      onChange={handleInputChange}
                    />
                    {errors.internal_file && (
                      <div className="text-danger">{errors.internal_file}</div>
                    )}
                  </div>
                )}

                {formData.contenttype === 2 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">Choose File</label>
                    <input
                      className="form-control"
                      type="file"
                     
                      
                      onChange={handleImageChange}
                    />
                    {errors.ufile && (
                      <div className="text-danger">{errors.ufile}</div>
                    )}
                  </div>
                )}

                {formData.contenttype === 1 && (
                  <div className="mb-3">
                    <label className="form-label text-dark">HTML Editor</label>  {/* Updated label */}
                    <div>
                      <FroalaEditorComponent
                        tag="textarea"
                        config={config}
                        model={u_html}
                        value={formData.html}
                        onModelChange={handleEditorChange}
                      />
                    </div>
                    {errors.u_html && (
                      <div className="text-danger">{errors.u_html}</div>  
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
                    Update
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
