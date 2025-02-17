import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import Unavbar from '../navbar/Unavbar';

const AppliedJobTable = () => {
  const { jobseekerId } = useParams(); // Extract jobseekerId from the URL
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobseekerId) {
      axios.get(`https://backend-deploy-w14v.onrender.com/api/applications/${jobseekerId}`)
        .then(response => {
          const sortedApplications = response.data.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
          setApplications(sortedApplications);
        })
        .catch(error => {
          console.error('Error fetching applications:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [jobseekerId]);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
  }

  if (!applications.length) {
    return <Typography variant="h6" color="error">No applications found for this jobseeker.</Typography>;
  }

  return (
    <div>
      <div>
        <Unavbar />
      </div>
      <Box sx={{ padding: 3, bgcolor: 'background.paper', borderRadius: 2, marginTop: "5%" }}>
        <Typography variant="body1" sx={{ marginBottom: 3, fontWeight: 'bold', color: 'black' }}>
          Applied Jobs
        </Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table sx={{ minWidth: 750 }} aria-label="applicant table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'gray' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Job</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Salary</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Applied At</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app._id}>
                  <TableCell>{app.jobId?.title}</TableCell>
                  <TableCell>{app.jobId?.companyname}</TableCell>
                  <TableCell>{app.jobId?.salary}</TableCell>
                  <TableCell>{app.jobId?.location}</TableCell>
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AppliedJobTable;
