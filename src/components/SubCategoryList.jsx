import React from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';

const SubCategoryList = () => {

    const catList = [
        { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538211.jpeg", title: "Comforter Set" },
        { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538232.jpeg", title: "Duvet Cover Set" },
        { id: 3, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538251.jpeg", title: "BedSpread" },
        { id: 4, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538269.jpeg", title: "Bed Sheet" },
        { id: 5, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538289.jpeg", title: "Pillows" },
        { id: 6, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538309.jpeg", title: "Blanket  Throw" },
        { id: 7, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538325.jpeg", title: "Beds  Mattress" },
        { id: 8, src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1617538343.jpeg", title: "Carpets" },
    ];

    const nevigate = useNavigate();

    const handleNavigate = () => {
        nevigate(`/category/subcategory/productlisting`)
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Category
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Category</Link>
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category/subcategory">SubCategory</Link>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            {/* Category list */}
            <Box sx={{ my: 4 }}>
                <Container>
                    <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188" }}>
                        Shop from the largest collection of bedding, featuring comforter set , duvet, and bedspreads in UAE , KSA & Oman ✅ king comforter , single, and queen sizes ✅ Choose from cotton, microfiber, and other materials for a perfect comforter and a better night's sleep
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {catList.map((cat) => (
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
        </Box>
    );
}

export default SubCategoryList;



