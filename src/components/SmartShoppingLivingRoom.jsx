import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { Box, Breadcrumbs, Container, Typography, Grid } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import RecommendedProducts from './RecommendedProducts';

const SmartShoppingLivingRoom = () => {
    const recommendedProducts = [
        {
            id: 1,
            title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
            image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
            price: "199 AED",
            rating: 4,
        },
        {
            id: 2,
            title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
            image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
            price: "249 AED",
            rating: 5,
        },
        {
            id: 3,
            title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
            image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
            price: "179 AED",
            rating: 3,
        },
        {
            id: 4,
            title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
            image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
            price: "179 AED",
            rating: 4,
        },

    ];

    const catList = [
        { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538211.jpeg", title: "Comforter Set" },
        { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538232.jpeg", title: "Duvet Cover Set" },
    ];
    const nevigate = useNavigate();

    const handleNavigate = () => {
        nevigate(`/smart-shopping/details/222`)
    }

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    return (
        <div>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: {sm:"30px",xs:"15px"},  fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Living Room
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

            <Container>
                <Typography variant="h5" sx={{ mt: 2, color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                    Carpet
                </Typography>
                <hr />
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {catList && catList?.map((cat) => (
                            <Grid item xs={12} sm={4} key={cat.id}>
                                <Box
                                    onClick={handleNavigate}
                                    sx={{
                                        position: 'relative',
                                        boxShadow: 3,
                                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': { opacity: 0.8, },
                                    }}
                                >
                                    <img
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                        src={cat.src}
                                        alt="category-image"
                                        loading="lazy"
                                    />
                                    {/* Text on image */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: "35%",
                                            width: '100%',
                                            color: '#fff',
                                            textAlign: 'center',
                                            fontSize: "16px",
                                            py: 1,
                                        }}
                                    >
                                        <Typography variant="h6">{cat.title}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <div className='mb-5'>
                <RecommendedProducts productsCard={recommendedProducts} />
            </div>
        </div>
    )
}

export default SmartShoppingLivingRoom;