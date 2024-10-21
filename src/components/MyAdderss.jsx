import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const MyAddress = () => {
  return (
    <div style={{ minHeight: '100vh', }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb', py: "30px" }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              My Address
            </Typography>
            <Breadcrumbs
              sx={{ fontSize: '14px', cursor: 'pointer' }}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/">
                Home
              </Link>
              <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/my-account">
                My Address
              </Link>
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar - Order History Menu */}
          <Grid sx={{my:"50px", bgcolor: 'white', boxShadow: 1, borderRadius: 1, mt: 3, }} item xs={12} sm={4} md={3}>
            <Dashboard selectItem={3} />
          </Grid>
          {/* Main Content Area */}
          <Grid item xs={12} sm={8} md={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                >
                  MyAdderss
                </Typography>
                <Button variant="contained" sx={{ backgroundColor: "#bb1f2a", color: "#fff" }}>Add Address</Button>
              </Box>
              <hr />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                  Country
                </Typography>
                <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                  City
                </Typography>
                <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                  Address
                </Typography>
                <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                  Actions
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyAddress;
