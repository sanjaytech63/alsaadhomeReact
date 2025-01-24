import { Grid, Container, Box, Typography, Pagination, Breadcrumbs } from '@mui/material';
import BlogCards from '../components/BlogCards';
import BlogSideBar from '../components/BlogSideBar';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState, useEffect } from 'react';
import { blogApi } from '../utils/services/blogServices';
import Loading from '../components/Loading';

const Blog = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    const [searchParams] = useSearchParams();
    const tag = searchParams.get('tag');
    const dates = searchParams.get('dates');

    const fetchHomeData = async (page) => {
        setLoading(true);
        try {
            const reqBody = {
                "keyword": "",
                "tag": tag,
                "dates": dates,
                "page": page
            };
            const response = await blogApi.getBlog(reqBody);
            if (response && response?.status === 200) {
                setData(response.data);
                setTotalPages(Math.ceil(response?.data?.total_page / response.data?.per_page));
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
            setError("Failed to fetch blog data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeData(pageNumber);
    }, [pageNumber, searchParams]);

    const handleChangePage = (event, newPage) => {
        setPageNumber(newPage);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p className='minHeight'>{error}</p>;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }}>
                            Blog
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link
                                className="breadcrumbs-hover"
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
                                    <Link
                                        className="breadcrumbs-hover"
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
                        <Grid container spacing={4}>
                            {data?.blogs?.map((blog) => (
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
                            count={totalPages}
                            page={pageNumber}
                            onChange={handleChangePage}
                            shape="rounded"
                            size="small"
                            variant="outlined"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    "&.Mui-selected": {
                                        backgroundColor: "#bb1f2a",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#a91c26" },
                                    },
                                },
                            }}
                        />
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Blog;
