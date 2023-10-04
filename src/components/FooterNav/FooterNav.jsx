import React, { useState } from 'react';
import axios from 'axios';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'bootstrap/dist/css/bootstrap.min.css';

function FooterPage() {
  const [footerType, setFooterType] = useState('');
  const [footerName, setFooterName] = useState('');
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the fields
    if (!footerName) {
      setError('Footer Name is required.');
      return;
    }

    if (!footerType) {
      setError('Footer Type is required.');
      return;
    }

    if (footerType === 'file' && !fileData) {
      setError('File is required for File type.');
      return;
    }

    // Prepare the data based on the selected type
    let formData = new FormData();
    formData.append('footerType', footerType);
    formData.append('footerName', footerName);

    if (footerType === 'file' && fileData) {
      formData.append('file', fileData);
    }

    // Send data to the API using Axios
    try {
      const response = await axios.post('YOUR_API_URL_HERE', formData);
      setSuccess('Data sent successfully!');
      setError('');
      setOpenSnackbar(true);
    } catch (error) {
      setError('An error occurred while sending data.');
      setOpenSnackbar(true);
    }
  };

  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const config = {
    placeholderText: 'Content Here!',
    charCounterCount: false,
  };

  return (
    <div className='bgimg' style={{ height: '100vh' }}>
      <div className='headingdiv'></div>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='headingdiv'>
              <p className='text-center' style={{ color: 'black',fontSize:"40px", fontWeight:"bold"}} id='headingfooter'>
                Footer
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label>Footer Name</label>
                <input
                  type='text'
                  className='form-control'
                  value={footerName}
                  onChange={(e) => setFooterName(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <label>Footer Type</label>
                <select
                  className='form-select'
                  value={footerType}
                  onChange={(e) => setFooterType(e.target.value)}
                >
                  <option value=''>Select an option</option>
                  <option value='file'>File</option>
                  <option value='link'>Link</option>
                  <option value='html-editor'>HTML Editor</option>
                </select>
              </div>
              {footerType === 'file' && (
                <div className='mb-3'>
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx,.txt,.jpg,.png,.jpeg'
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {footerType === 'link' && (
                <div className='mb-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Upload link'
                    onChange={handleFileChange}
                  />
                </div>
              )}
              {footerType === 'html-editor' && (
                <div className='mb-3'>
                  <label>Editor:</label>
                  <FroalaEditorComponent tag='textarea' config={config} />
                </div>
              )}
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </form>
            {error && (
              <div
                className='alert alert-danger mt-3'
                role='alert'
                show={openSnackbar}
                onClose={handleSnackbarClose}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className='alert alert-success mt-3'
                role='alert'
                show={openSnackbar}
                onClose={handleSnackbarClose}
              >
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterPage;
