import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Edashboard from './Edashboard';

const Applicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://backend-deploy-w14v.onrender.com/api/applications')
      .then(response => {
        const sortedApplications = response.data.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
        setApplications(sortedApplications);
      })
      .catch(error => {
        console.error('Error fetching applicants:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [jobId]);
  

  const handleStatusChange = (id, status) => {
    axios.put(`https://backend-deploy-w14v.onrender.com/api/applications/${id}/status`, { status })
      .then(response => {
        setApplications(prevApps => prevApps.map(app =>
          app._id === id ? { ...app, status: response.data.application.status } : app
        ));
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
  }

  if (!applications.length) {
    return <Typography variant="h6" color="error">No applicants found for this job.</Typography>;
  }

  return (
    <div>
      <Edashboard />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Applicants</Typography>
        
        <TableContainer component={Paper} sx={{maxWidth:'80%',marginLeft:'19%'}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Applied At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.mobileNumber}</TableCell>
                  <TableCell><a href={`${app.resume}`} target="_blank" rel="noopener noreferrer">Resume</a></TableCell>
                  <TableCell>{app.jobId?.title}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          app.status === 'pending'
                            ? 'orange'
                            : app.status === 'approved'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {app.status}
                    </Typography>
                  </TableCell>
                  
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {app.status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusChange(app._id, 'approved')}
                          size="small"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleStatusChange(app._id, 'rejected')}
                          size="small"
                        >
                          Reject
                        </Button>
                      </Box>
                    )}
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

export default Applicants;

