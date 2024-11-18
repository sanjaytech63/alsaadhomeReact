import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';

const AccountDeatils = () => {

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
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
              Account Deatils
            </Typography>
            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', marginRight: '8px' }}
                to="/"
              >
                Home
              </Link>
              {pathnames.map((segment, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                  <span
                    key={index}
                    style={{ color: '#6c757d', textTransform: "capitalize" }}
                  >
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link className='breadcrumbs-hover'
                    key={index}
                    style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }}
                    to={path}
                  >
                    {decodeURIComponent(segment)}
                  </Link>
                );
              })}
            </Breadcrumbs>
          </Box>
        </Container>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <Dashboard selectItem={4} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
              >
                Account details
              </Typography>
              <hr />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Your Name" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Enter Your Email" required />
                  </Grid>
                </Grid>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  my: 2,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Grid container spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'row' }, }}>
                  <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                      <Select disableScrollLock
                        fullWidth
                        variant="outlined"
                        defaultValue="Select Country Code"
                        sx={{
                          padding: '2px 4px',
                          border: '1px solid #ccc',
                          '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                          ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                            padding: '13px 0px',
                            fontSize: '14px',
                            color: '#333',
                          },
                        }}
                      >
                        <MenuItem value="Select Country Code" disabled hidden>
                          Select Country Code
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: '14px', color: '#333' }}
                          value="+ 971"
                        >
                          <img
                            style={{ width: '23px', height: '23px', marginRight: '4px' }}
                            src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                            alt="UAE Flag"
                          />{' '}
                          + 971
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: '14px', color: '#333' }}
                          value="+ 968"
                        >
                          <img
                            style={{ width: '23px', height: '23px', marginRight: '4px' }}
                            src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                            alt="Oman Flag"
                          />{' '}
                          + 968
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <TextField fullWidth type="number" label="Enter Mobile Number" required />
                  </Grid>
                </Grid>
              </Box>
              <Button variant='contained' sx={{ color: "#fff", backgroundColor: "#bb1f2a", py: 1.5, px: 4 }}>Save</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountDeatils;
