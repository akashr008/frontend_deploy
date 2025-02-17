import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

function UpdateProfile({ open, onClose, jobseekerData }) {
  const defaultSkills = [
    "Python Programming",
    "Web Development",
    "Database Management",
    "Cloud Computing",
    "Cybersecurity",
    "Networking",
    "Machine Learning",
    "Frontend",
    "Backend"
  ];

  const [name, setName] = useState(jobseekerData?.name || '');
  const [email, setEmail] = useState(jobseekerData?.email || '');
  const [mobileNumber, setMobileNumber] = useState(jobseekerData?.mobileNumber || '');
  const [bio, setBio] = useState(jobseekerData?.bio || '');
  const [skills, setSkills] = useState(jobseekerData?.skills || []);
  const [resume, setResume]= useState(jobseekerData?.resume || '');
  const [error, setError] = useState('');

  const handleSave = async () => {
    const UpdateData = {
      name,
      email,
      mobileNumber,
      bio,
      skills,
      resume,
    };
  
    const token = sessionStorage.getItem('logintoken');
  
    if (token) {
      try {
        await axios.put('https://backend-deploy-w14v.onrender.com/api/profile', UpdateData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        onClose();
      } catch (error) {
        setError(error.response?.data?.message || 'Error updating profile');
      }
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      aria-labelledby="customized-dialog-title"
      sx={{
        '& .MuiDialog-paper': {
          minWidth: 200,
          maxWidth: 350,
          minHeight: 100,
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 'bold' }} id="customized-dialog-title">
        Update Profile
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {error && <Typography color="error">{error}</Typography>}
        <TextField fullWidth label="Name" margin="dense" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField fullWidth label="Email" margin="dense" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField fullWidth label="Number" margin="dense" variant="outlined" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        <TextField fullWidth label="Bio" margin="dense" variant="outlined" value={bio} onChange={(e) => setBio(e.target.value)} sx={{ mb: 2 }} />
        <Autocomplete
          multiple
          id="skills"
          options={defaultSkills}
          value={skills}
          onChange={(event, newValue) => setSkills(newValue)}
          renderInput={(params) => <TextField {...params} label="Skills" variant="outlined" />}
          renderOption={(props, option, state) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
        />
        <TextField fullWidth label="Resume" margin="dense" variant="outlined" value={resume} onChange={(e) => setResume(e.target.value)} sx={{ mt:2 }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} style={{ color: 'black' }}>Save</Button>
        <Button onClick={onClose} style={{ color: 'black' }}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateProfile;


