import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Unavbar from '../navbar/Unavbar';

const JobDetails = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [jobDetails, setJobDetails] = useState(null); 
  const [jobSeekerData, setJobSeekerData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const token = sessionStorage.getItem('logintoken');

    if (!token) {
      console.error('No token found in sessionStorage');
      navigate('/login');
      return;
    }

    axios.get(`https://backend-deploy-w14v.onrender.com/api/jobs/${jobId}`)
      .then(response => {
        setJobDetails(response.data); 
      })
      .catch(error => {
        console.error('Error fetching job details:', error);
      });

    axios.get('https://backend-deploy-w14v.onrender.com/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    })
      .then(response => {
        setJobSeekerData(response.data); // Set job seeker data
      })
      .catch(error => {
        console.error('Error fetching job seeker data:', error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [jobId, navigate]); 

  const handleApply = () => {
    if (jobSeekerData && jobDetails) {
      console.log('Job Seeker Data:', jobSeekerData);
      console.log('Applying for job:', jobDetails.title);

      axios.post('https://backend-deploy-w14v.onrender.com/api/apply', {
        jobId: jobDetails._id,
        jobSeekerId: jobSeekerData._id,
        name: jobSeekerData.name,
        mobileNumber: jobSeekerData.mobileNumber,
        email: jobSeekerData.email,
        resume: jobSeekerData.resume
      })
      .then(response => {
        setSuccessMessage('You have successfully applied for the job!');
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          setErrorMessage('You have already applied for this job.');
        } else {
          setErrorMessage('Error applying for the job. Please try again later.');
        }
      });
    } else {
      setErrorMessage('No job seeker data found.');
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
  }
  if (!jobDetails) {
    return <Typography variant="h6" color="error">Job details not found.</Typography>;
  }

  return (
    <div>
      <div>
        <Unavbar/>
      </div>
<Box
  sx={{
    marginTop: '10%',
    padding: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '60%',
    backgroundColor: '#f9f9f9',
    borderRadius: 2,
    boxShadow: 3, 
    border: '1px solid #ddd',
  }}
>
  <Typography
    variant="h5"
    sx={{
      marginBottom: 2,
      color: '#1976d2',
      fontWeight: 'bold',
    }}
  >
    {jobDetails.title}
  </Typography>

  <Typography
    variant="body1"
    sx={{
      fontWeight: 'bold',
      marginBottom: 2,
      color: '#555',
    }}
  >
    Company name: {jobDetails.companyname}
  </Typography>

  <Typography
    variant="body1"
    sx={{
      marginBottom: 2,
      color: '#555',
    }}
  >
    <strong>Description:</strong> {jobDetails.description}
  </Typography>

  <Typography
    variant="body1"
    sx={{
      marginBottom: 2,
      color: '#555',
    }}
  >
    <strong>Location:</strong> {jobDetails.location}
  </Typography>

  <Typography
    variant="body1"
    sx={{
      marginBottom: 2,
      color: '#555',
    }}
  >
    <strong>Salary:</strong> {jobDetails.salary}
  </Typography>

  <Typography
    variant="body1"
    sx={{
      marginBottom: 3,
      color: '#555',
    }}
  >
    <strong>Requirements:</strong> {jobDetails.requirements}
  </Typography>

  <Button
    variant="contained"
    color="primary"
    onClick={handleApply}
    sx={{
      width: '13%',
      padding: '8px',
      borderRadius: 2,
      fontSize: '16px',
      textTransform: 'none',
      marginTop: 2,
    }}
  >
    Apply Now
  </Button>

      {successMessage && (
        <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      {errorMessage && (
        <Snackbar open={Boolean(errorMessage)} autoHideDuration={6000} onClose={() => setErrorMessage('')}>
          <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
    </Box>
    </div>
  );
};

export default JobDetails;

