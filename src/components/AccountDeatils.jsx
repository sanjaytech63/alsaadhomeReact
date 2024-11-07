import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TextField, FormControl, Select, MenuItem, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const AccountDeatils = () => {
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
            <Breadcrumbs
              sx={{ fontSize: '14px', cursor: 'pointer' }}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/">
                Home
              </Link>
              <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/my-account">
                Account Deatils
              </Link>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Your Name" required />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField fullWidth label="Enter Your Email" required />
                </Grid>
              </Box>
              <Box sx={{ display: 'flex', my: 2, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <FormControl fullWidth>
                  <Select fullWidth
                    defaultValue="Select Country Code"
                    variant="outlined"
                    sx={{
                      border: '1px solid #ccc',
                      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                      ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                        fontSize: "14px",
                        color: "#333",
                        padding: "17px 13px"
                      }
                    }}
                  >
                    <MenuItem value="Select Country Code" disabled hidden>
                      Select Country Code
                    </MenuItem>
                    <MenuItem sx={{
                      fontSize: "14px",
                      color: "#333",
                    }} value="+ 971">
                      <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 971
                    </MenuItem>
                    <MenuItem sx={{
                      fontSize: "14px",
                      color: "#333",
                    }} value="+ 968">
                      <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 968
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth label="Enter Mobile Number" required />
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
