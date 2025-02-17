import React from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Drawer, List, Button, Box } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function Dashboard() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    sessionStorage.clear();  
    navigate('/login');   
    window.location.replace('/login');
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
            Admin Dashboard
          </Typography>
          <LogoutIcon sx={{ ml: "75%", color: 'black', cursor: 'pointer' }} onClick={handleLogout} />
          <Typography
            sx={{
              fontWeight: 'bold',
              color: 'black',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() =>{handleLogout(); navigate('/login');}}
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
        <Box sx={{ padding: 2 }}>
          <Button
            fullWidth
            startIcon={<WorkIcon />}
            sx={{
              color: 'white',
              textAlign: 'left',
              justifyContent: 'flex-start',
              mb: 2,
              textTransform: 'none',
            }}
            onClick={() => navigate('/admin-job')}
          >
            Manage Jobs
          </Button>
          <Button
            fullWidth
            startIcon={<PeopleIcon />}
            sx={{
              color: 'white',
              textAlign: 'left',
              justifyContent: 'flex-start',
              mb: 2,
              textTransform: 'none',
            }}
            onClick={() => navigate('/manage-jobseekers')}
          >
            Manage Jobseekers
          </Button>
          <Button
            fullWidth
            startIcon={<PeopleIcon />}
            sx={{
              color: 'white',
              textAlign: 'left',
              justifyContent: 'flex-start',
              mb: 2,
              textTransform: 'none',
            }}
            onClick={() => navigate('/manage-employers')}
          >
            Manage Employers
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Dashboard;
