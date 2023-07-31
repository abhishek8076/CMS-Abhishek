import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, such as sending it to a server
    console.log(formData);
  };

  return (
    <>   <div>
    <div className="home">
       <Sidebar className='nav' style={{}} />
       <div className="homeContainer">
       <Navbar />
       <form onSubmit={handleSubmit}>
      <div className="row ">
       
        <div className="col-lg-4 user-data">
        <div className="name">
        <label htmlFor="firstName">Username 
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        </label>
      </div>
      <div>
        <label htmlFor="email">Email 
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </label>
      </div>
      <div>
        <label htmlFor="mobileNo">Mobile 
        <input
          type="text"
          id="mobileNo"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />
        </label>
      </div>
      <div> 
        <label htmlFor="usertype"> Usertype
        <select name="usertype" id="usertype">
          <option value=""> </option>
          <option value="Superadmin">Superadmin</option>
          <option value="Admin">Admin</option>
          <option value="user1">user1</option>
   
        </select>
        </label>
      </div>
      <div>
        <label htmlFor="address">Address 
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        </label>
      </div>
      
      <button className="btn btn-primary margin-left"  type="submit">Submit</button>
</div>

          <div className="col-lg-1"> 
          {/* rtty */}
          </div>

         <div className="col-lg-7 imgnewuser">
          {/* <img src="./newuser.webp" alt="" /> */}
         </div>

      </div>
    </form>
       </div>
       </div>
     </div>
    
    </>
  );
};

export default New;
