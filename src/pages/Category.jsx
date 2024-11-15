import React from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';
import catJsonData from "../../src/blogData.json"
const Category = () => {

    const nevigate = useNavigate()
    const category = catJsonData.categories;
   

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
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>
            {/* Category list */}
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188", mt: 3, fontSize: { xs: "12px", sm: "16px" }, }}>
                    Cosmetics Online Shopping Dubai UAE. Al Saad Home is a leading Mattress online store to Buy Perfume, Air Freshener Online leading Mattress online store to Buy Perfume, Air Freshener Online in UAE at the best prices.
                </Typography>
            </Container>
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {category.map((cat) => (
                            <Grid item xs={12} sm={4} key={cat.id}>
                                <Box
                                    onClick={() => nevigate(`/category/${cat.title.trim()}`)}
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
                                        loading="lazy"
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

export default Category;



