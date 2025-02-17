import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        color: 'black',
        paddingTop: 7,
        paddingBottom: 3,
        marginTop: 'auto',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mt={3}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
