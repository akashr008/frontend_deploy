import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Link } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';

const Adminjob = () => {
  const [cardData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://backend-deploy-w14v.onrender.com/api/jobs');
        
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setData(sortedData);
      } catch (err) {
        setError('Error fetching jobs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const deleteJob = (jobId) => {
    axios.delete(`https://backend-deploy-w14v.onrender.com/api/delete/${jobId}`)
      .then((res) => {
        alert(res.data.message);
        setData((prevData) => prevData.filter(job => job._id !== jobId)); 
      })
      .catch(() => alert('Error deleting job'));
  };

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
        <TableContainer component={Paper} style={{ maxWidth: "80%", marginLeft: '19%', marginTop: "6%" }}>
          <Table sx={{ minWidth: 700 }} aria-label="jobs table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Company Name</strong></TableCell>
                <TableCell align="center"><strong>Title</strong></TableCell>
                <TableCell align="center"><strong>Requirements</strong></TableCell>
                <TableCell align="center"><strong>Salary</strong></TableCell>
                <TableCell align="center"><strong>Location</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cardData.map((job) => (
                <TableRow key={job._id}>
                  <TableCell align="center">{job.companyname}</TableCell>
                  <TableCell align="center">{job.title}</TableCell>
                  <TableCell align="center">{job.requirements}</TableCell>
                  <TableCell align="center">{job.salary}</TableCell>
                  <TableCell align="center">{job.location}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => deleteJob(job._id)}
                      sx={{
                        color: '#e74c3c',
                        '&:hover': { color: '#c0392b' }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
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

export default Adminjob;



