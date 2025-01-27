import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CheckoutSuccess = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        textAlign: 'center' 
      }}
    >
      <Box sx={{ mb: 3 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Thank you for your purchase. Your transaction has been completed successfully.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        onClick={() => window.location.href = '/'}
        sx={{ mt: 2 }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default CheckoutSuccess;
