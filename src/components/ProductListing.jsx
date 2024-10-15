import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Pagination, Breadcrumbs } from '@mui/material';
import jsonData from "../../src/blogData.json";
import BlogCards from '../components/BlogCards';
import BlogSideBar from '../components/BlogSideBar';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ProductListingSideBar from './ProductListingSideBar';
import ProductListingMainContant from './ProductListingMainContant';

const ProductListing = () => {
    const [blogs, setBlogs] = useState(jsonData.blogPosts);
    console.log(blogs);
    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <Box sx={{ bgcolor: "#f7f8fb" }}>
                    <Container>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                            <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                                Product List & Search
                            </Typography>
                            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Category</Link>
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category/subcategory">Product List & Search</Link>
                            </Breadcrumbs>
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188" }}>
                            Explore our luxurious collection of king-size comforters, designed to elevate your sleep experience. Choose from a variety of styles, including hotel-inspired comforters, elegant embroidery, classic plain designs, plush velvet, breathable cotton, and soft microfiber. Find the perfect king-size comforter to match your style and comfort needs.
                        </Typography>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <ProductListingSideBar />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={4}>
                                {blogs.map((blog) => (
                                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                        <ProductListingMainContant blog={blog} />
                                    </Grid>
                                ))}
                            </Grid>
                            {/* Pagination */}
                            <Box mt={4} display="flex" justifyContent="center">
                                <Pagination count={10} color="primary" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

export default ProductListing;
