import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Breadcrumbs } from '@mui/material';
import BlogSideBar from '../components/BlogSideBar';
import { Link, useLocation, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BlogDetailsCard from './BlogDetailsCard';
import Loading from './Loading';
import { blogApi } from '../utils/services/blogServices';

const BlogDetails = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { slug } = useParams();

    const fetchBlogDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const reqBody = {
                slug: slug
            }
            const response = await blogApi.getBlogDetails(reqBody);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogDetails();
    }, [slug]);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Box sx={{ minHeight: "100vh", }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Blog
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
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
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={4} sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" } }}>
                    <Grid item xs={12} md={3}>
                        <BlogSideBar data={data} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <BlogDetailsCard blog={data} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogDetails;
