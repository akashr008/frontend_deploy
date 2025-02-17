import React, { useState } from 'react';
import { Button, TextField, Typography, Box, AppBar, Container, Toolbar } from '@mui/material';
import axios from 'axios';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../ui/Footer';

const EmployerRegister = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-deploy-w14v.onrender.com/api/employer-register', { 
        name, 
        companyName, 
        email, 
        contactNumber, 
        password 
      });
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
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
    <Link to="/jobseeker-registeration" style={{ textDecoration: 'none', color: 'black' }}>
      For Jobseekers
    </Link>
    <ArrowOutwardIcon sx={{ marginLeft: '5px', fontSize: '16px', color: 'black' }} />
  </Typography>
</Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ width: 350, mx: 'auto', mt: 15, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="h6" align="center" sx={{  fontWeight: 'bold' }}>
          Employer Registration
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
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

export default EmployerRegister;






