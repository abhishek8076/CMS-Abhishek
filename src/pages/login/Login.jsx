import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import apiClient from '../../services/AxiosApi'; // Adjust the import path
import { Link, useNavigate } from "react-router-dom";
// import apis from "../../Apis/apis";
import api from '../../utils/apiUrl.json'
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.jpg';
import "bootstrap"
export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    r_email: "",
    r_password: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const jsonData= { // Adjust the endpoint
  r_email: user.email,
  r_password: user.password
}
const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await apiClient.post(api.login ,jsonData);

    // if (response.status === 200  && response.email === response.data.r_email)
    //    {
    //   const  token  = response.data.token;
    //   const  data = response.data.user
      
    //   if (token) {
    //     localStorage.setItem("token",token );
    //     localStorage.setItem("userData", data); // Assuming your user data is in `response.data.user`
    //     alert("You are logged in successfully.");
    //     navigate("/dashboard");
    //     // Redirect to the dashboard or any other page
    //   } else {
    //     alert("Invalid email or password.");
    //   }
    // } else {
    //   alert("Something went wrong.");
    // }
    if (response && response.data) {
      if (response.status == 200) {
          let dt = response.data;
          let user = dt.user;
          let token = dt.token
          localStorage.setItem("user",  JSON.stringify(user))
          const storedUserString = localStorage.getItem('user');
          const u = JSON.parse(storedUserString)
         
          if (dt) {
            localStorage.setItem("token", token)
              alert("login Sucess!!")
              navigate("/dashboard")
          }
      }
      else if (response.data.status== 401) {
          alert("UserName or Password Not Matched")
      }
  }
  else {
      alert("Unauthorised User")
  }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
    
  };
console.log(user);
let u =localStorage.getItem('user');
console.log(u);

// const storedUserString = localStorage.getItem('user');
// const storedUser = JSON.parse(storedUserString)
// console.log(localStorage.setItem('user', JSON.stringify(use)))
// console.log(storedUser);
useEffect(() => {
  localStorage.clear();
}, []);
  return (
    <>  
      <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo}/>
        <Typography component="h1" variant="h5">
         
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
      
    </Container>

    </>
  );
}
