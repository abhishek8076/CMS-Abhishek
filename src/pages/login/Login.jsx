import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import apis from '../../utils/apiUrl.json'



export default function Login() {
  let navigate = useNavigate();
  //  function loginView (){
  const [user, setUser] = useState({
      userName: "",
      password: ""
  });
  const [validation, setValidation] =useState([])

  function handleChange(event) {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
      console.log(user, name)
  }
  const handleSubmit = async (user) => {
      // api.login(user);

      let validationArr = [];

      if (!user.userName || user.userName == '') {
          validationArr.push("UserName Required");
      }
      if (!user.password || user.password == '') {
          validationArr.push("Password Required");
      }
      if (validationArr.length > 0) {
          setValidation(validationArr);
          return false;
      }
      else {
          setValidation([]);
          console.log(user, 'submitted')
          let response = await apis.login(user)
          if (response && response.data) {
              if (response.data.statusCode == 200) {
                  let dt = response.data.data
                  if (dt) {
                      sessionStorage.setItem("user", JSON.stringify(dt.user))
                      sessionStorage.setItem("apiToken", dt.token)
                      //  window['setUserFunc'](getUserProfile());
                      navigate("/")
                      alert("done");
                  }
              }
              else if (response.data.statusCode == 401) {
                  setValidation(["UserName or Password Not Matched"])
              }
          }
          else {
              alert("Unauthorised User")
          }
      }
  }
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
        <form  >
        <Box  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="Username"
            onChange={(e) => { handleChange(e) }}
            
          />
          <TextField
            margin="normal"
            
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={(e) => { handleChange(e) }}
          
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => { handleSubmit(user) }}
           
          >
            Sign In
          </Button>
         
          <Grid container>
           
           
          </Grid>
        </Box>
        </form>
      </Box>
     
    </Container>
  );
}
