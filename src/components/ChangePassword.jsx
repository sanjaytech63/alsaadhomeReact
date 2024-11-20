import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TextField, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';

const ChangePassword = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    return (
        <div style={{ minHeight: '100vh', }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: '#f7f8fb',py: {sm:"30px",xs:"15px"}, }}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                        >
                            Change Password
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
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
                            <Dashboard selectItem={6} />
                        </Box>
                    </Grid>

                    {/* Main Content */}
                    <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
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
