import React from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link ,useLocation} from 'react-router-dom';
import UnboxingTopSection from '../components/UnboxingTopSection';
import UnboxingBottomSection from '../components/UnboxingBottomSection';

const Unboxing = () => {

    const catList = [
        { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/unboxing_challenge/landing_screens/banner-eng1720873550.png" },
    ];

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: {sm:"flex",xs:"block"}, justifyContent: "space-between", alignItems: "center",py: {sm:"30px",xs:"15px"},  fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Unboxing Challenge
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize',  }}
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
            {/* Category list */}
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {catList.map((cat) => (
                            <Grid item xs={12} sm={12} key={cat.id}>
                                <Box
                                    sx={{
                                        boxShadow: 3,
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        borderRadius: "10px",
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { opacity: 0.8, },
                                        width: "100%",
                                        height: { sm: "500px", xs: "200px" },
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                        }}
                                        src={cat.src}
                                         loading="lazy"
                                        alt="category-image"
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{}}>
                        <Box sx={{  mb: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                Participate in The Unboxing Challenge
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: "28px", color: "#687188", fontWeight: "600" }}>
                                Here's your chance to become a content <br />
                                creator with a new and unique experience ❤️ <br />
                                Participate in the challenge, and you'll receive a gift box from Al Saad. You'll also have a chance to win cash prizes up to 2000 AED.
                            </Typography>
                        </Box>
                        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#687188", fontSize: '18px', }}>
                                    How to participate:
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
                                    1. Record a video of receiving your order from Al Saad Home App, showcasing your products.
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
                                    2. Upload the video to your Instagram account with a mention of our official account{' '}
                                    <strong>@alsaadhome</strong>.
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
                                    3. Browse videos for unboxing ideas or check out our tutorial videos to help you get started.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <UnboxingTopSection/>
                    
                    <UnboxingBottomSection />
                </Box>
            </Container>
        </Box>
    );
}

export default Unboxing;



