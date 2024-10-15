import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Container } from '@mui/material';
import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaYoutube, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#212121',
          color: 'white', 
       
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            direction={{ xs: 'column', sm: 'row', my: { xs: 2, sm: 5 } }}
          >
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                <img
                  src="https://al-saad-home.mo.cloudinary.net/assets/front/images/logo-footer.png"
                  alt="Al Saad Home Logo"
                  style={{ maxWidth: '150px', marginBottom: '20px', color: "white" }}
                />
                <Typography variant="subtitle1">Your dreams start here</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                My Account
              </Typography>
              <Box sx={{
                lineHeight: 2,
              }}>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  My Account
                </Link>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  Orders History
                </Link>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  Wishlist
                </Link>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  Privacy
                </Link>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  Terms & Conditions
                </Link>
                <Link sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} href="#" underline="none" color="inherit" display="block">
                  Category
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Find Our Branches
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <CiLocationOn />
                <Typography sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} variant="body1" ml={1}>
                  UAE - Sharjah - Industrial Area 18
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <IoMdMail />
                <Typography sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} variant="body1" ml={1}>
                  contact@alsaadhome.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <FaPhone />
                <Typography variant="body1" ml={1}>
                  600 575 525
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} textAlign={{ xs: 'left', md: 'left' }}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <Box
                sx={{ display: 'flex', }}
              >
                <IconButton sx={{
                  color: 'white', ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }}>
                  <FaTiktok size={20} />
                </IconButton>
                <IconButton sx={{
                  color: 'white', ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }}>
                  <FaFacebook size={20} />
                </IconButton>
                <IconButton sx={{
                  color: 'white', ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }}>
                  <FaInstagram size={20} />
                </IconButton>
                <IconButton sx={{
                  color: 'white', ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }}>
                  <FaSnapchat size={20} />
                </IconButton>
                <IconButton sx={{
                  color: 'white', ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }}>
                  <FaYoutube size={20} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            textAlign: 'center',
            marginTop: '20px',
            borderTop: '1px solid #444',
            paddingTop: '20px',
          }}
        >
          <Typography sx={{ pb: 2 }} variant="body2">
            © 2020-2024 All Rights Reserved by <strong>AL SAAD FURNITURE EST</strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
