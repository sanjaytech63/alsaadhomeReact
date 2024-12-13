
import { Grid, Container, Box, Typography, Pagination, Breadcrumbs, } from '@mui/material';
// import jsonData from "../../src/blogData.json";
import BlogCards from '../components/BlogCards';
import BlogSideBar from '../components/BlogSideBar';
import { Link, useLocation } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import instance from '../EndPoint';
import { useState, useEffect } from 'react';

// ?page=1&limit=10
const Blog = () => {
    // const [blogs, setBlogs] = useState(jsonData.blogPosts);
    const [blog, setBlog] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (pageNumber) => {
        try {
            setLoading(true);
            const response = await instance.get(`/randomproducts/?page=${pageNumber}&limit=10`);
            setBlog(response.data.data.data);
            setTotalPages(response.data.data.totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePage = (e, newPage) => {
        setPageNumber(newPage);
    };

    useEffect(() => {
        fetchProducts(pageNumber);
    }, [pageNumber]);


    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    return (
        <Box sx={{ minHeight: "100vh", }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Blog
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', marginRight: '8px' }}
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
                {totalPages > 1 && (
                    <Box display="flex" justifyContent="center" my={4}>
                        <Pagination
                            sx={{ fontSize: { xs: '12px', sm: '14px' } }}
                            count={totalPages}
                            page={pageNumber}
                            size='small'
                            onChange={handleChangePage}
                            shape='rounded'
                            color='error'
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Blog;
