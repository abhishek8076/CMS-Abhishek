import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap. css';
import 'bootstrap/dist/css/bootstrap.css';
import axios  from "axios";

const New = ({ inputs, title }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API to submit the form data
    axios.post('/api/user', formData)
      .then((response) => {
        console.log('Data submitted successfully!', response.data);
        // Handle success, if needed

        // Optionally, reset the form after successful submission
        setFormData({
          usernamename: '',
          email: '',
          password: ''
        });
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        // Handle error, if needed
      });
  };


  return (
    <>   <div>
      <div className="home">
        <Sidebar className='nav' style={{}} />
        <div className="homeContainer">
          <Navbar />
          <section style={{ backgroundColor: '#eee' }}>
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center h-100" style={{ backgroundColor : "white" }}>
                <div className="col-lg-12 col-xl-11">
                  <div className="card mt-5 mb-5 text-black" style={{ borderRadius: "25px",border: "none" }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                          <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example1c">Username</label>
                                <input type="text"
                                 id="form3Example1c"
                                  className="form-control"
                                   style={{border : '2px solid black'}}
                                   name="username"
                                   value={formData.username}
                                   onChange={handleChange}
                                   placeholder="Name"
                                   />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example3c">Email</label>
                                <input type="email" 
                                id="form3Example3c" 
                                className="form-control" 
                                style={{border : '2px solid black'}} 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Name"
                                />
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <label for="usertype">Usertype</label><br></br>
                                <select id="usertype" name="usertype" style={{ width: '22vw',backgroundColor : "white", border : '2px solid black', padding : '6px', borderRadius:'8px', marginTop : '4px'}}>
                                  <option value="Select">Select</option>
                                  <option value="Superadmin">Superadmin</option>
                                  <option value="Admin">Admin</option>
                                  
                                </select>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example4c">Mobile No</label>
                                <input type="password"
                                 id="form3Example4c"
                                  className="form-control"
                                   style={{border : '2px solid black'}}
                                   name="password"
                                   value={formData.password}
                                   onChange={handleChange}
                                   placeholder="Name"
                                    />
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example4c">Address</label>
                                <input type="password" id="form3Example4c" className="form-control" style={{border : '2px solid black'}} />
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" className="btn btn-primary btn-lg">Register</button>
                            </div>

                          </form>

                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            className="img-fluid" alt="Sample image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    </>
  );
};

export default New;
