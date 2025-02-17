import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edashboard from './Edashboard';

const AddJobs = () => {
  const [jobData, setJobData] = useState({
    companylogo: '',
    companyname: '',
    title: '',
    description: '',
    salary: '',
    requirements: '',
    location: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  function postJob() {
    if (location.state && location.state.isUpdate) {
      axios.put(`https://backend-deploy-w14v.onrender.com/api/update/${location.state.val._id}`, jobData)
        .then((res) => {
          alert(res.data.message);
          navigate('/job-cards');
        });
    } else {
      axios.post('https://backend-deploy-w14v.onrender.com/api/add', jobData)
        .then((res) => {
          alert(res.data.message);
          navigate('/job-cards');
        });
    }
  }

  useEffect(() => {
    if (location.state) {
      setJobData(location.state.val);
    }
  }, [location.state]);

  return (
    <div>
      <Edashboard />
      <Box
        sx={{
          maxWidth: 600,
          marginLeft: '38%',
          marginTop: '11%',
          padding: 3,
        }}
      >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                label="Company Logo"
                name="companylogo"
                variant="outlined"
                fullWidth
                value={jobData.companylogo}
                onChange={(e) => setJobData({ ...jobData, companylogo: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Company Name"
                name="companyname"
                variant="outlined"
                fullWidth
                value={jobData.companyname}
                onChange={(e) => setJobData({ ...jobData, companyname: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Job Title"
                name="title"
                variant="outlined"
                fullWidth
                value={jobData.title}
                onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Salary"
                name="salary"
                variant="outlined"
                type="number"
                fullWidth
                value={jobData.salary}
                onChange={(e) => setJobData({ ...jobData, salary: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Description"
                name="description"
                variant="outlined"
                fullWidth
                value={jobData.description}
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Requirements"
                name="requirements"
                variant="outlined"
                fullWidth
                value={jobData.requirements}
                onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                fullWidth
                value={jobData.location}
                onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
              />
            </Grid>
          </Grid> <br />
          <Grid item xs={6}>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={postJob}
              >
                {location.state && location.state.isUpdate ? 'Update' : 'Submit'}
              </Button>
              {location.state && location.state.isUpdate && (
                <Button
                  type="button"
                  href='/job-cards'
                  variant="contained"
                  color="secondary"
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
        </form>
      </Box>
    </div>
  );
};

export default AddJobs;




 
