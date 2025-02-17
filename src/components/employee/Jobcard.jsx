import { Box, Card, CardActions, CardContent, Typography, IconButton, CardMedia } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Edashboard from './Edashboard';

const JobCard = () => {
  const [cardData, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://backend-deploy-w14v.onrender.com/api/jobs') 
      .then((res) => {
        const sortedData = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      })
      .catch(() => alert('Error fetching jobs'));
  }, []);
  

  const updateJob = (job) => {
    navigate('/add-jobs', { state: { val: job, isUpdate: true } });
  };

  const deleteJob = (jobId) => {
    axios.delete(`https://backend-deploy-w14v.onrender.com/api/delete/${jobId}`)
      .then((res) => {
        alert(res.data.message);
        setData((prevData) => prevData.filter(job => job._id !== jobId)); 
      })
      .catch(() => alert('Error deleting job'));
  };

  return (
    <div>
      <Edashboard/>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: '8%', marginLeft: '30px' }}>
        {cardData.map((job) => (
        
          <Card sx={{ maxWidth: 700, marginLeft: '32%', padding: '20px', borderRadius: '30px', width: 700, display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { transform: 'scale(1.00)', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.15)' } }} key={job._id}>
              <CardMedia
          sx={{ height:50, width:50 }}
          image={job.companylogo}
          title="green iguana"
        />
            <CardContent sx={{ flex: 1, overflow: 'auto' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`Company Name: ${job.companyname}`}</Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`Title: ${job.title}`}</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`Description: ${job.description}`}</Typography>
              <Typography variant="body2">{`Salary: ${job.salary}`}</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`Requirements: ${job.requirements}`}</Typography>
              <Typography variant="body2">{`Location: ${job.location}`}</Typography>
            </CardContent>
            
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <IconButton size="small" onClick={() => updateJob(job)}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={() => deleteJob(job._id)}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default JobCard;


