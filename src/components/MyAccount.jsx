import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
const MyAccount = () => {
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
                            Dashboard
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
                                Dashboard
                            </Link>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            {/* Main Content Section */}
            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {/* Sidebar - Order History Menu */}
                    <Grid sx={{my:"50px", bgcolor: 'white', boxShadow: 1, borderRadius: 1, mt: 3, }} item xs={12} sm={4} md={3}>
                        <Dashboard selectItem={1} />
                    </Grid>
                    {/* Main Content Area */}
                    <Grid item xs={12} sm={8} md={9}>
                        {/* "0 0 4px 0 #e9e9e9" boxshaddow */}
                        <Box sx={{ bgcolor: 'white', p: 3, boxShadow: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 500, fontSize: { sm: '24px', xs: '16px' } }}
                            >
                                Dashboard
                            </Typography>
                            <hr />
                            <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 2 }}>
                                <Box sx={{ borderRadius: "50%", width: "150px", height: "150px" }} component={"img"} src="https://al-saad-home.mo.cloudinary.net/uploads/customers/1729493589.jpg" alt="img" loading='lazy' />
                                <Box>
                                    <Typography variant="h6" x={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 500, fontSize: { sm: '14px', xs: '14px' }, ":hover": { color: "#bb1f2a" } }} >
                                        <span><PersonOutlineOutlinedIcon /></span>   y2code dev
                                    </Typography>
                                    <Typography variant="h6" x={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 500, fontSize: { sm: '14px', xs: '14px' }, ":hover": { color: "#bb1f2a" } }} >
                                        <span><MailOutlinedIcon /></span>   y2codedev@gmail.com
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default MyAccount;
