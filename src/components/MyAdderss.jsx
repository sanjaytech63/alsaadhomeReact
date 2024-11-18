import React, { useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, Button, Dialog, DialogTitle, TextField, IconButton, DialogContent } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdEdit } from "react-icons/md";
import CloseIcon from '@mui/icons-material/Close';

const MyAddress = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              My Address
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
              <Dashboard selectItem={3} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                >
                  MyAdderss
                </Typography>
                <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: "#bb1f2a", color: "#fff" }}>Add Address</Button>
                <Dialog disableScrollLock open={open} onClose={handleClose} fullWidth maxWidth="md">
                  <DialogTitle>
                    <TextField label="Enter a location" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} />
                    <IconButton
                      edge="end"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                      sx={{ position: 'absolute', right: "20px", top: "20px" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </DialogTitle>
                  <DialogContent>
                    <Box sx={{ height: '400px', width: '100%' }}>
                      <iframe
                        src="https://www.google.com/maps?q=Shanghai+location&output=embed"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen
                        loading="lazy"
                        title="Google Maps"
                      />
                    </Box>
                  </DialogContent>
                </Dialog>
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
              <hr />
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}>
                <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                  United Arab Emirates
                </Typography>
                <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                  Al Ain
                </Typography>
                <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                  V3WW+9G Muhayriqah Saudi Arabia
                </Typography>
                <Typography sx={{ color: '#292b2c', display: "flex", alignItems: "center", gap: "10px", textTransform: 'capitalize', fontSize: { sm: '16px', xs: '16px' } }} >
                  <Typography sx={{ borderRadius: "5px", p: "5px", backgroundColor: "#bb1f2a", color: "#eee", cursor: "pointer" }}>
                    <MdEdit size={20} />
                  </Typography>
                  <Typography sx={{ borderRadius: "5px", p: "5px", backgroundColor: "#bb1f2a", color: "#eee", cursor: "pointer" }}>
                    <RiDeleteBin5Line size={20} />
                  </Typography>
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
