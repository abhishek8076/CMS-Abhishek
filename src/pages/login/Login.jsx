import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import apiClient from '../../services/AxiosApi';
import { Link, useNavigate } from "react-router-dom";
import api from '../../utils/apiUrl.json';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.jpg';
import "bootstrap";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    r_email: "",
    r_password: ""
  });

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const jsonData = {
    r_email: user.r_email,
    r_password: user.r_password
  };

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!emailRegex.test(user.r_email)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(true);
    }

    // Validate password
    if (!passwordRegex.test(user.r_password)) {
      setIsValidPassword(false);
      return;
    } else {
      setIsValidPassword(true);
    }

    const response = await apiClient.post(api.login, jsonData);

    if (response && response.data) {
      if (response.status === 200) {
        let dt = response.data;
        let user = dt.user;
        let token = dt.token;
        localStorage.setItem("user", JSON.stringify(user));
        const storedUserString = localStorage.getItem('user');
        const u = JSON.parse(storedUserString);

        if (dt) {
          localStorage.setItem("token", token);
          alert("Login Success!!");
          navigate("/dashboard");
        }
      } else if (response.r_email !== jsonData.r_email ||
                 response.r_password !== jsonData.r_password) {
        alert("Username and Password Not Matched");
      } else {
        alert("Unauthorized User");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

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
          <img src={logo} alt="Logo" />
          <Typography component="h1" variant="h5">
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="r_email"
              label="Email Address"
              name="r_email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              error={!isValidEmail}
              helperText={!isValidEmail ? "Invalid email address" : ""}
            />
            <TextField
              margin="normal"
              fullWidth
              name="r_password"
              label="Password"
              type="password"
              onChange={handleChange}
              error={!isValidPassword}
              helperText={!isValidPassword ? "Password must be at least 8 characters long and contain at least one letter and one number" : ""}
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
