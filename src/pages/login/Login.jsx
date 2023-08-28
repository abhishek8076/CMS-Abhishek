import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import apiClient from '../../services/AxiosApi'; // Adjust the import path
import { useNavigate } from "react-router-dom";
// import apis from "../../Apis/apis";
import api from '../../utils/apiUrl.json'
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
const jsonData= { // Adjust the endpoint
  email: user.email,
  password: user.password
}
const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await apiClient.post(api.login ,jsonData);

    if (response && response.data) {
      const  token  = response.data.token;
      const  data = response.data.user
      
      if (token) {
        localStorage.setItem("token",token );
        localStorage.setItem("userData", data); // Assuming your user data is in `response.data.user`
        alert("You are logged in successfully.");
        navigate("/dashboard");
        // Redirect to the dashboard or any other page
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("Something went wrong.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
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
        <Typography component="h1" variant="h5">
          Sign in
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
  );
}
