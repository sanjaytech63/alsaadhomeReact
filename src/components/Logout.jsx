import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const Logout = () => {
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
              Logout
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
                Logout
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
            <Dashboard selectItem={7} />
          </Grid>
          {/* Main Content Area */}
          <Grid item xs={12} sm={8} md={9}>
            {/* <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
              >
                Logout
              </Typography>
            </Box> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Logout;
