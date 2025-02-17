import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import  Dashboard  from './Dashboard';


const ManageEmployers = () => {
  const [employers, setEmployers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployers();
  }, []);

    const fetchEmployers = async () => {
        try {
          const response = await axios.get('https://backend-deploy-w14v.onrender.com/api/admin/all-employers');
          if (Array.isArray(response.data)) {
            const sortedEmployers = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setEmployers(sortedEmployers);
          } else {
            setError('Invalid response from the server');
            console.error('Unexpected response format', response.data);
          }
        } catch (err) {
          setError('Failed to fetch employers');
          console.error(err);
        }
      };
      

  const handleApproval = async (employerId, action) => {
    try {
      await axios.post('https://backend-deploy-w14v.onrender.com/api/admin/approve-employer', { employerId, action });

      setEmployers((prevEmployers) =>
        prevEmployers.map((employer) =>
          employer._id === employerId ? { ...employer, status: action === 'approve' ? 'approved' : 'rejected' } : employer
        )
      );
    } catch (err) {
      setError('Failed to approve/reject employer');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <Dashboard/>
      </div>
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} style={{ maxWidth:"80%", overflowY: 'auto',marginLeft:'19%',marginTop:"6%" }}>
  <Table size="small" style={{ minWidth: '200px' }}>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Company</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Contact</TableCell>
        <TableCell>Created At</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {employers.map((employer) => (
        <TableRow key={employer._id}>
          <TableCell>{employer.name}</TableCell>
          <TableCell>{employer.companyName}</TableCell>
          <TableCell>{employer.email}</TableCell>
          <TableCell>{employer.contactNumber}</TableCell>
          <TableCell>{new Date(employer.createdAt).toLocaleDateString()}</TableCell>
          <TableCell>{employer.status}</TableCell>
          <TableCell>
            {employer.status === 'pending' && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleApproval(employer._id, 'approve')}
                  style={{ marginRight: '10px' }}
                >
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleApproval(employer._id, 'reject')}
                >
                  Reject
                </Button>
              </>
            )}
            {employer.status === 'approved' && <Typography variant="body2" color="primary">Approved</Typography>}
            {employer.status === 'rejected' && <Typography variant="body2" color="error">Rejected</Typography>}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </div>
  );
};

export default ManageEmployers;
