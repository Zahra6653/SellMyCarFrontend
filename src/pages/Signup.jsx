import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { checkFormData } from '../utils/SignUpValidation';
import { base_url } from '../utils/base_url';
import axios from "axios"

const Signup = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [helperText, setHelperText] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
   const [err, setErr] = useState(false);
  const [errorVal, setErrorVal] = useState("");

  const handleChange =  (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setHelperText({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setErr(false);
    const validationResult = checkFormData(formData);

    if (Object.keys(validationResult).length > 0) {
      setHelperText({ ...validationResult });
    } else {
      axios
        .post(`${base_url}/api/v1/user/signup`, formData)
        .then((response) => {
          
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
      
          navigate("/login", { state: true, replace: true });
        })
        .catch((error) => {
          setErr(true);
          setErrorVal(error.response.data.message);
        });
    }
  };

 

  return (
    <Box  sx={{  bgcolor: '#58c7c2'}}>
    <Container maxWidth="sm">
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          bgcolor: 'white',
          padding: '2rem',
          borderRadius: '8px',
        }}
      >
         {err && (
              <Alert
                severity="error"
                onClose={() => {
                  setErr(false);
                }}
              >
                {errorVal}
              </Alert>
            )}
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
               autoComplete="given-name"
               autoFocus
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                helperText={helperText.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                helperText={helperText.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                helperText={helperText.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                helperText={helperText.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
                mt: 3,
                bgcolor: '#58c7c2',
                '&:hover': {
                  bgcolor: '#449b98',
                },
              }}
         
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
              <Grid item>
              <Typography variant="body2" color="textSecondary">
              Already have an account?
              </Typography>
                <Link to={"/login"} color={"secondary"}>
                   Sign in
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </Box>
  </Container>
  </Box>
);
};


export default Signup;
