import React from 'react';
import { Box, Grid, Typography, Link, IconButton, Container, CssBaseline } from '@mui/material';
import { FaFacebook, FaInstagram, FaSnapchat, FaTiktok, FaYoutube, FaPhone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const nevigate = useNavigate();

  const handleNevigateTerms = () => {
    nevigate('/terms-of-use');
  }
  const handleNevigatePrivacy = () => {
    nevigate('/privacy-policy');
  }
  const handleNevigateCategory = () => {
    nevigate('/category');
  }

  const handleNevigateContactUs = () => {
    nevigate('/contact-us');
  }
  const handleNevigateMyAccount = () => {
    nevigate('/my-account');
  }

  const handleNevigateOderHistory = () => {
    nevigate('/order-history');
  }
  const handleNevigateWishlist = () => {
    nevigate('/wishlist');
  }

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
            direction={{ xs: 'column', sm: 'row', my: { xs: 0, sm: 5 } }}
          >
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                <img
                  src="https://al-saad-home.mo.cloudinary.net/assets/front/images/logo-footer.png"
                  alt="Al Saad Home Logo"
                  loading="lazy"
                  style={{ maxWidth: '150px', marginBottom: '20px', color: "white" }}
                />
                <Typography fontSize={14} >Your dreams start here</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                My Account
              </Typography>
              <Box sx={{
                lineHeight: 2.5,
              }}>
                <Link onClick={handleNevigateMyAccount} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" fontSize={12} color="inherit" display="block">
                  My Account
                </Link>
                <Link onClick={handleNevigateOderHistory} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" color="inherit" fontSize={12} display="block">
                  Orders History
                </Link>
                <Link onClick={handleNevigateWishlist} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" fontSize={12} color="inherit" display="block">
                  Wishlist
                </Link>
                <Link onClick={handleNevigatePrivacy} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" fontSize={12} color="inherit" display="block">
                  Privacy
                </Link>
                <Link onClick={handleNevigateTerms} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" fontSize={12} color="inherit" display="block">
                  Terms & Conditions
                </Link>
                <Link onClick={handleNevigateCategory} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} underline="none" fontSize={12} color="inherit" display="block">
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
                <Typography onClick={handleNevigateContactUs} sx={{
                  ":hover": {
                    cursor: "pointer",
                    color: "#bb1f2a"
                  }
                }} variant="body1" fontSize={14} ml={1}>
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
                }} variant="body1" fontSize={14} ml={1}>
                  contact@alsaadhome.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <FaPhone />
                <Typography variant="body1" fontSize={14} ml={1}>
                  600 575 525
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3} >
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
            pb: { xs: 10, sm: 0 },
            pt: { xs: 2, sm: 0 },
            px: { xs: 1, sm: 0 },
            textAlign: 'center',
            marginTop: '20px',
            borderTop: '1px solid #444',
          }}
        >
          <Typography sx={{ py: { xs: 0, sm: 2 }, fontSize: "14px" }} variant="body2">
            © 2020-2024 All Rights Reserved by <strong>AL SAAD FURNITURE EST</strong>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
