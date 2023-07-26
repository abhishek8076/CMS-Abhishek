// import Link from "@mui/material/Link";
import {Box,Container} from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const handleClick =()=>{
    <Link to='/'>
      Dashboard
    </Link>
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
    <form>

  <div class="form-outline mb-4">
    <input type="email" id="form2Example1" class="form-control" />
    <label class="form-label" for="form2Example1">Email address</label>
  </div>

 
  <div class="form-outline mb-4">
    <input type="password" id="form2Example2" class="form-control" />
    <label class="form-label" for="form2Example2">Password</label>
  </div>

 
  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
    
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
        <label class="form-check-label" for="form2Example31"> Remember me </label>
      </div>
    </div>

   
  </div>

 <Link to="/">
  <button type="button" class="btn btn-primary btn-block mb-4">Sign in</button>
  </Link>
</form>
      </Box>
    </Container>
  );
}
