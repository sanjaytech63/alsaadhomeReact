import React, { Suspense, lazy } from 'react';
import { Box, Grid, Typography, IconButton, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const FaFacebook = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaFacebook })));
const FaInstagram = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaInstagram })));
const FaSnapchat = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaSnapchat })));
const FaTiktok = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaTiktok })));
const FaYoutube = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaYoutube })));
const FaPhone = lazy(() => import("react-icons/fa").then((mod) => ({ default: mod.FaPhone })));
const IoMdMail = lazy(() => import("react-icons/io").then((mod) => ({ default: mod.IoMdMail })));
const CiLocationOn = lazy(() => import("react-icons/ci").then((mod) => ({ default: mod.CiLocationOn })));

const Footer = () => {
  const linkStyle = {
    color: "white",
    ":hover": { cursor: "pointer", color: "#bb1f2a" },
  };

  return (
    <footer>
      <Box sx={{ backgroundColor: '#212121', color: 'white', }}>
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            direction={{ xs: 'column', sm: 'row', my: { xs: 0, sm: 5 } }}
          >
            {/* Logo and Tagline */}
            <Grid item xs={12} md={3}>
              <Box sx={{ textAlign: { xs: 'left', md: 'left' } }}>
                <img
                  src="https://al-saad-home.mo.cloudinary.net/assets/front/images/logo-footer.png"
                  alt="Al Saad Home Logo"
                  loading="lazy"
                  style={{ maxWidth: '200px', marginBottom: '20px', color: 'white' }}
                />
                <Typography fontSize={14}>Your dreams start here</Typography>
              </Box>
            </Grid>

            {/* Links Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                My Account
              </Typography>
              <Box sx={{ lineHeight: 2.5 }}>
                {[
                  { to: '/my-account', label: 'My Account' },
                  { to: '/order-history', label: 'Orders History' },
                  { to: '/wishlist', label: 'Wishlist' },
                  { to: '/privacy-policy', label: 'Privacy' },
                  { to: '/terms-of-use', label: 'Terms & Conditions' },
                  { to: '/category', label: 'Category' },
                ].map((link) => (
                  <Link
                    className='link-none'
                    key={link.to}
                    to={link.to}
                  >
                    <Typography
                      sx={linkStyle}
                      fontSize={14}
                      ml={1}
                      mt={1.5}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Contact Info Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Find Our Branches
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Suspense fallback={<span>📍</span>}>
                  <CiLocationOn />
                </Suspense>
                <Link
                  className='link-none'
                  to="/contact-us"
                >
                  <Typography
                    sx={linkStyle}
                    fontSize={14}
                    ml={1}
                  >
                    UAE - Sharjah - Industrial Area 18
                  </Typography>
                </Link>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Suspense fallback={<span>📧</span>}>
                  <IoMdMail />
                </Suspense>
                <Typography
                  sx={linkStyle}
                  fontSize={14}
                  ml={1}
                >
                  contact@alsaadhome.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Suspense fallback={<span>📞</span>}>
                  <FaPhone />
                </Suspense>
                <Typography fontSize={14} ml={1}>
                  600 575 525
                </Typography>
              </Box>
            </Grid>

            {/* Social Media Section */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Social Media
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {[
                  { icon: FaTiktok, label: 'TikTok' },
                  { icon: FaFacebook, label: 'Facebook' },
                  { icon: FaInstagram, label: 'Instagram' },
                  { icon: FaSnapchat, label: 'Snapchat' },
                  { icon: FaYoutube, label: 'YouTube' },
                ].map(({ icon: Icon, label }, index) => (
                  <Suspense fallback={<span key={index}>🎥</span>} key={label}>
                    <IconButton
                      sx={{ color: 'white', ...linkStyle }}
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </IconButton>
                  </Suspense>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Bottom */}
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
          <Typography sx={{ py: { xs: 0, sm: 2 }, fontSize: '14px' }} variant="body2">
            © 2020-2024 All Rights Reserved by <strong>AL SAAD FURNITURE EST</strong>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
