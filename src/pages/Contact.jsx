import React from 'react';
import { Container, Grid, Box, Breadcrumbs, Typography } from '@mui/material';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const contactLocations = [
    {
        id: 1,
        title: 'AL Saad Homes Real Estate Office',
        location: 'Sharjah - Al Nabaa - Behind Arabian Gulf St - Shop Number 1',
        mapLink: 'https://maps.google.com/maps?q=Shanghai+location',
    },
    {
        id: 2,
        title: 'AL Saad Homes Office 2',
        location: 'Al Ain Industrial Area - Opposite Daman',
        mapLink: 'https://maps.google.com/maps?q=Shanghai+location',
    },
    {
        id: 3,
        title: 'AL Saad Office 3 - Dubai',
        location: 'Dubai, UAE',
        mapLink: 'https://maps.google.com/maps?q=Dubai+location',
    },
];


const Contact = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    
    return (
        <>
            <div style={{ width: "100%", minHeight: "100vh" }}>
                <Box sx={{ bgcolor: "#f7f8fb" }}>
                    <Container>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",py: {sm:"30px",xs:"15px"}, fontFamily: "Roboto" }}>
                            <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                                Contact
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
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Grid container spacing={4}>
                        {/* Left Section: Contact Locations */}
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={3}>
                                {contactLocations.map((location) => (
                                    <Grid item xs={12} key={location.id}>
                                        <ContactCard location={location} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        {/* Right Section: Google Maps */}
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <iframe
                                    src="https://www.google.com/maps?q=Shanghai+location&output=embed"
                                    style={{ border: 0, width: '100%', height: '640px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Google Maps"
                                />
                            </Box>
                        </Grid>
                    </Grid>

                    {/* Contact Form */}
                    <Box my={5}>
                        <ContactForm />
                    </Box>
                </Container>
            </div>
        </>
    );
};

export default Contact;
