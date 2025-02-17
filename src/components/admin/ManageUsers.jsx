import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import Dashboard from './Dashboard';

const ManageUsers = () => {
  const [jobseekers, setJobseekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchJobseekers = async () => {
      try {
        const response = await axios.get('https://backend-deploy-w14v.onrender.com/api/jobseekers');
        
        
        const sortedJobseekers = response.data.sort((a, b) => new Date(b.timestamps) - new Date(a.timestamps));
        
        setJobseekers(sortedJobseekers);
      } catch (err) {
        setError('Error fetching jobseekers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobseekers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Dashboard />
      <Box p={3}>
        <TableContainer component={Paper} style={{ maxWidth: "80%", overflowY: 'auto', marginLeft: '19%', marginTop: "6%" }}>
          <Table sx={{ minWidth: 650 }} aria-label="jobseekers table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Name</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Mobile Number</strong></TableCell>
                <TableCell align="center"><strong>Resume</strong></TableCell>
                <TableCell align="center"><strong>Account Created</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobseekers.map((jobseeker) => (
                <TableRow key={jobseeker._id} hover>
                  <TableCell align="center">{jobseeker.name}</TableCell>
                  <TableCell align="center">{jobseeker.email}</TableCell>
                  <TableCell align="center">{jobseeker.mobileNumber}</TableCell>
                  <TableCell align="center">
                    {jobseeker.resume ? (
                      <Link 
                        href={jobseeker.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{
                          textDecoration: 'none', 
                          color: 'primary.main', 
                          fontWeight: 'bold'
                        }}
                      >
                        View Resume
                      </Link>
                    ) : 'No resume uploaded'}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(jobseeker.timestamps).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default ManageUsers;



