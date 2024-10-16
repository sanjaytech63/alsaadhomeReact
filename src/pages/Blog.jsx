import React, {  useState } from 'react';
import { Grid, Container, Box, Typography, Pagination, Breadcrumbs } from '@mui/material';
import jsonData from "../../src/blogData.json";
import BlogCards from '../components/BlogCards';
import BlogSideBar from '../components/BlogSideBar';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const Blog = () => {
    const [blogs, setBlogs] = useState(jsonData.blogPosts);
    console.log(setBlogs);
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
                <Container maxWidth="lg" sx={{ py: 5,  }}>
                    <Grid  container spacing={4} className='any' sx={{ display: "flex", flexDirection: {xs: "column-reverse !important", sm: "row !important"}}}>
                        <Grid item xs={12} md={4}>
                            <BlogSideBar />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={4}>
                                {blogs.map((blog) => (
                                    <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                        <BlogCards blog={blog} />
                                    </Grid>
                                ))}
                            </Grid>
                            {/* Pagination */}
                            <Box my={4} display="flex" justifyContent="left">
                                <Pagination count={10} color="primary" />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
    );
};

export default Blog;
