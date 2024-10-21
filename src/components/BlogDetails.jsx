import React, { useState } from 'react';
import { Grid, Container, Box, Typography, Breadcrumbs } from '@mui/material';
import jsonData from "../../src/blogData.json";
import BlogSideBar from '../components/BlogSideBar';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BlogDetailsCard from './BlogDetailsCard';

const BlogDetails = () => {
    const [blogs] = useState(jsonData.blogDetails); 

    return (
        <Box sx={{ minHeight: "100vh", }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Blog
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Blog</Link>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={4} sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" } }}>
                    <Grid item xs={12} md={4}>
                        <BlogSideBar />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        {blogs.map((blog, index) => (
                            <BlogDetailsCard key={index} blog={blog} />
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogDetails;
