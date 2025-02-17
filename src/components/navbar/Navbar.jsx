import { AppBar, Toolbar, Button, Typography, Box, Container, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  return (
    <AppBar style={{ backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }}>
            JOB <span style={{ fontWeight: 'bold', color: '#000080', fontSize: '25px' }}>BOARD</span>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2, alignItems: 'center', ml: 75 }}>
            <Button
              sx={{
                color: 'black',
                fontSize: '16px',
                textTransform: 'none',
                '&:hover': { color: 'black' }
              }}
              onClick={() => navigate('/')} // Use navigate for Home
            >
              Home
            </Button>
            <Button
              sx={{
                color: 'black',
                fontSize: '16px',
                textTransform: 'none',
                '&:hover': { color: 'black' }
              }}
              onClick={() => navigate('/login')} // Use navigate for Jobs
            >
              Jobs
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: 'black' }} />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
                color: '#0057FF',
                borderColor: '#0057FF',
                textTransform: 'none',
                '&:hover': { borderColor: '#0057FF', backgroundColor: 'rgba(0, 87, 255, 0.1)' }
              }}
              onClick={() => navigate('/login')} // Use navigate for Login
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                color: 'white',
                backgroundColor: '#FF5733',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#E14C2A' }
              }}
              onClick={() => navigate('/jobseeker-registeration')} // Use navigate for Register
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => navigate('/jobseeker-registeration')}>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;


