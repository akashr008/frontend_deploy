import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, Box, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Edashboard() {
  const navigate = useNavigate(); 

  // Handle logout
  const handleLogout = () => {
    sessionStorage.clear(); 
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#C7D3D4FF',
          boxShadow: 4,
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar sx={{ paddingRight: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
            Dashboard
          </Typography>
          <LogoutIcon
            sx={{ ml: "75%", color: 'black', cursor: 'pointer' }}
            onClick={() =>{handleLogout(); navigate('/login');}}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#603F83FF',
            paddingTop: 3,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List sx={{ padding: 0 }}>
          <ListItem>
            <Button
              component={Link}
              to="/job-cards"
              sx={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WorkIcon sx={{ marginRight: 2 }} />
              Jobs
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/add-jobs"
              sx={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AddIcon sx={{ marginRight: 2 }} />
              Add Jobs
            </Button>
          </ListItem>
          <ListItem>
            <Button
              component={Link}
              to="/applicants"
              sx={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PeopleIcon sx={{ marginRight: 2 }} />
              Applicants
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Edashboard;
