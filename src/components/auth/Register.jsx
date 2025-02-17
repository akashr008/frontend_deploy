import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Container, Toolbar } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';

const Register = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-deploy-w14v.onrender.com/api/jobseeker-register', { 
        email, 
        password, 
        name, 
        mobileNumber
      });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
 <AppBar style={{ backgroundColor: 'white' }}>
  <Container maxWidth="lg">
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }}>
        JOB <span style={{ fontWeight: 'bold', color: '#000080', fontSize: '25px' }}>BOARD</span>
      </Typography>

     
      <Box sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: 3 }}>
  <Typography
    sx={{
      color: 'black',
      fontSize: '16px',
      textTransform: 'none',
      '&:hover': { color: 'black' },
      marginRight: '15px',
    }}
  >
    Already Registered? 
    <Link to="/login" style={{ textDecoration: 'none' }}>
      <span style={{ fontWeight: 'bold', color: '#0096FF' }}> Login </span>
    </Link>
    here
  </Typography>

  <Typography
    sx={{
      color: 'black',
      fontSize: '16px',
      textTransform: 'none',
      display: 'flex',
      alignItems: 'center',
      borderLeft: '2px solid gray',
      paddingLeft: '10px', 
    }}
  >
    <Link to="/employer-registeration" style={{ textDecoration: 'none', color: 'black' }}>
      For Employers
    </Link>
    <ArrowOutwardIcon sx={{ marginLeft: '5px', fontSize: '16px', color: 'black' }} />
  </Typography>
</Box>

    </Toolbar>
  </Container>
</AppBar>


      <Box sx={{ width: 350, mx: 'auto', mt: 15, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
          Jobseeker Registration
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <TextField
            label="Email ID"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Register
          </Button>
        </form>
      </Box>
      <Footer/>
    </div>
  );
};

export default Register;

