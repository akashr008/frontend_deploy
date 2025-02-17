import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FilterCards from './Filtercards'; // Import the FilterCards component
import Unavbar from '../navbar/Unavbar';;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState([]); // Store selected job titles
  const [selectedLocations, setSelectedLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-deploy-w14v.onrender.com/api/jobs')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setJobs(sortedData);
        setFilteredJobs(sortedData); 
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);
  useEffect(() => {
    let filtered = jobs;

    if (selectedJobTitles.length > 0) {
      filtered = filtered.filter(job => selectedJobTitles.includes(job.title));
    }

    if (selectedLocations.length > 0) {
      filtered = filtered.filter(job =>
        selectedLocations.includes(job.location) 
      );
    }

    setFilteredJobs(filtered);
  }, [selectedJobTitles, selectedLocations, jobs]);

  const handleDetailsClick = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  const handleJobTitleChange = (title) => {
    setSelectedJobTitles(prev =>
      prev.includes(title) ? prev.filter(jobTitle => jobTitle !== title) : [...prev, title]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(loc => loc !== location) : [...prev, location]
    );
  };

  const resetFilters = () => {
    setSelectedJobTitles([]);
    setSelectedLocations([]);
  };
  const jobTitles = Array.from(new Set(jobs.map(job => job.title)));
  const locations = Array.from(new Set(jobs.map(job => job.location)));

  return (
    <div>
      <Unavbar />
      <div style={{ display: 'flex', marginLeft: '20px', marginTop: '7%' }}>
        <FilterCards
          jobTitles={jobTitles}
          locations={locations}
          selectedJobTitles={selectedJobTitles}
          selectedLocations={selectedLocations}
          handleJobTitleChange={handleJobTitleChange}
          handleLocationChange={handleLocationChange}
          resetFilters={resetFilters}
        />
        <Box sx={{
          flex: 1,
          marginLeft: '250px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}>
          {filteredJobs.map((job) => (
  <Card
              key={job._id}
              sx={{
                maxWidth: 250,
                width: 250,
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '10px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <CardMedia
                  sx={{ height: 50, width: 50, objectFit: 'contain', borderRadius: '50%' }}
                  image={job.companylogo}
                  title={job.title}
                />
                <Typography
                  gutterBottom
                  variant="h7"
                  component="div"
                  sx={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}
                >
                  {job.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  <span style={{ color: 'black' }}>Requirements:</span> {job.requirements}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleDetailsClick(job._id)} // Pass jobId to the details page
                  style={{ marginBottom: '20px', borderRadius: '20px', color: '#34495e', textTransform: 'none' }}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Jobs;

