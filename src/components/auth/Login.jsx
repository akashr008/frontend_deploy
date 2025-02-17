import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../ui/Footer';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  function handleLogin() {
    axios
      .post('https://backend-deploy-w14v.onrender.com/api/login', form)
      .then((res) => {
        console.log("Login Response:", res.data); 

        if (res.data.token) {
          sessionStorage.setItem('logintoken', res.data.token);
          sessionStorage.setItem('role', res.data.role);
          sessionStorage.setItem('jobseekerId', res.data.jobseekerId);
          
          alert(res.data.message);
          if (res.data.role === 'employer') {
            navigate('/job-cards');
          } else if (res.data.role === 'jobseeker') {
            navigate('/home');
          } else if (res.data.role === 'admin') {
            navigate('/admin-job');
          }
        } else {
          alert('Login failed. No token received.');
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
        alert('Invalid login');
      });
  }

  return (
    <div>
    <div>
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 16,
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email ID"
        variant="outlined"
        placeholder="Enter registered email ID"
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        placeholder="Enter password"
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
        sx={{ mb: 2 }}
      />

      <Typography sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Link style={{ color: '#0096FF', textDecoration: 'none' }}>Forgot password?</Link>
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLogin}
        sx={{ mb: 2 }}
      >
        Log in
      </Button>

      <Typography align="center" variant="body2" sx={{ mb: 1 }}>
        or
      </Typography>

      <Typography
        align="center"
        variant="body2"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Don’t have a registered email ID?
      </Typography><br />
      <Link to={'/jobseeker-registeration'}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          size="large"
          sx={{ mb: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Create account
        </Button>
      </Link>
    </Box>
    </div>
    <Footer/>
    </div>
  );
};

export default Login;
