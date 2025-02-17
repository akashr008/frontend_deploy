import { AppBar, Toolbar, Typography, Box, Container, IconButton, Menu, MenuItem, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Unavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const jobseekerId = sessionStorage.getItem('jobseekerId');

  const handleDetailsClick = () => {
    if (jobseekerId) {
      navigate(`/applied-job/${jobseekerId}`);
    } else {
      console.error("Jobseeker ID not found");
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
  };

  return (
    <AppBar style={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }}>
            JOB <span style={{ fontWeight: 'bold', color: '#000080', fontSize: '25px' }}>BOARD</span>
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, ml: 70 }}>
            <Button
              onClick={() => navigate('/home')}
              sx={{
                color: 'black',
                fontSize: '16px',
                textTransform: 'none',
                '&:hover': { color: 'black' }
              }}
            >
              Home
            </Button>
            <Button
              onClick={() => navigate('/jobs')}
              sx={{
                color: 'black',
                fontSize: '16px',
                textTransform: 'none',
                '&:hover': { color: 'black' }
              }}
            >
              Jobs
            </Button>
            <Button
              onClick={handleDetailsClick}
              sx={{
                color: 'black',
                fontSize: '16px',
                textTransform: 'none',
                '&:hover': { color: 'black' }
              }}
            >
              Applied Jobs
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <IconButton
              aria-controls={anchorEl ? 'account-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                color: 'grey',
                '&:hover': { color: '#0057FF' }
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 35 }} />
            </IconButton>

            <Menu
              id="account-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                <PersonIcon sx={{ mr: 1, fontSize: 20 }} /> Profile
              </MenuItem>
              <MenuItem onClick={() =>{handleLogout(); navigate('/login');}}>
                <LogoutIcon sx={{ mr: 1, fontSize: 17 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Unavbar;



