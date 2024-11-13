import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TextField, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const ChangePassword = () => {
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
                            Change Password
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
                                Change Password
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
                            <Dashboard selectItem={6} />
                        </Box>
                    </Grid>

                    {/* Main Content */}
                    <Grid item sx={{mb:{sm:0,xs:5}}} xs={12} sm={9}>
                        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                            >
                                Change Password
                            </Typography>
                            <hr />
                            <Box>
                                <TextField sx={{ my: 1.5 }} fullWidth label="Old Password" required />
                                <TextField sx={{ my: 1.5 }} fullWidth label="New Password" required />
                                <TextField sx={{ my: 1.5 }} fullWidth label="Confirm Password" required />
                                <Button variant='contained' sx={{ color: "#fff", backgroundColor: "#bb1f2a", py: 1.5, px: 4 }}>Save</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default ChangePassword;
