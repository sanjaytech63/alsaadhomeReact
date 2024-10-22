import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Pagination, Breadcrumbs, Button, } from '@mui/material';
// import jsonData from "../../src/blogData.json";
import BlogCards from '../components/BlogCards';
import BlogSideBar from '../components/BlogSideBar';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import instance from '../EndPoint';
import Loading from '../components/Loading';

// ?page=1&limit=10
const Blog = () => {
    // const [blogs, setBlogs] = useState(jsonData.blogPosts);
    const [blog, setBlog] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await instance.get(`/randomproducts/?page=${pageNumber}&limit=10`);
            setBlog((prevBlog) => [...prevBlog, ...response.data.data.data]);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

  


    useEffect(() => {
        fetchProducts(pageNumber);
    }, [pageNumber]);

    if (loading) {
        return <Loading />
    }

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
            <Container maxWidth="lg" sx={{ py: 5, }}>
                <Grid container spacing={4} className='any' sx={{ display: "flex", flexDirection: { xs: "column-reverse !important", sm: "row !important" } }}>
                    <Grid item xs={12} md={3}>
                        <BlogSideBar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={4}>
                            {blog.map((blog) => (
                                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                    <BlogCards blog={blog} loading={loading} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                {/* Pagination */}
                <Box sx={{ my: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Pagination page={pageNumber} count={totalPages} onChange={(e, page) => setPageNumber(page)} variant="outlined" shape="rounded" />
                </Box>
            </Container>
        </Box>
    );
};

export default Blog;
