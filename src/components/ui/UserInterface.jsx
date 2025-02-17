import React, { useState, useEffect } from 'react';
import { Box, Button, InputAdornment, TextField, Typography, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from '../navbar/Navbar'
import Footer from './Footer';

const UserInterface = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [search, setSearch] = useState('');

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

      if (search) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.requirements.toLowerCase().includes(search.toLowerCase())
        );
      }

      setFilteredJobs(filtered);
    }, [search, jobs]);

    const handleDetailsClick = () => {
      navigate('/login');
    };

    return (
      <div>
        <Navbar/>
        <div>
          <Typography
            variant='h4'
            sx={{
              mt: 25,
              justifyContent: 'center',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Find Your <span style={{ color: '#2e86c1' }}> Dream Job</span> now
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
            <TextField
              variant="outlined"
              placeholder="Find your dream job"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setSearch(search)}>
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{
                borderRadius: '30px',
                maxWidth: 550,
                backgroundColor: 'white',
                boxShadow: '3',
                padding: '0 16px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                  },
                },
              }}
            />
          </Box><br /><br /><br />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
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
                  borderRadius: '25px',
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
                    onClick={handleDetailsClick} 
                    style={{ marginBottom: '20px', borderRadius: '20px', color: '#34495e', textTransform: 'none' }}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
};

export default UserInterface;
