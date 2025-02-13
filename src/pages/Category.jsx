import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, } from 'react-router-dom';
import Loading from "../components/Loading";
import { homeApi } from '../utils/services/homeServices';

const Category = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    
    const fetchCategory = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await homeApi.getCategory();
            setData(response.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    if (error) {
        return <p className='minHeight'>{error}</p>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Category
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
                                        style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize", }}
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
            {/* Category list */}
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188", mt: 3, fontSize: { xs: "12px", sm: "16px" }, }}>
                    Cosmetics Online Shopping Dubai UAE. Al Saad Home is a leading Mattress online store to Buy Perfume, Air Freshener Online leading Mattress online store to Buy Perfume, Air Freshener Online in UAE at the best prices.
                </Typography>
            </Container>
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {data && data?.map((cat) => (
                            <Grid item xs={12} sm={4} key={cat.id}>
                                <Link state={{id: cat.id,type: "category"}} to={`/category/${cat?.slug}`}>
                                    <Box
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
                                            src={cat?.image}
                                            alt={cat?.name}
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
                                            <Typography variant="h6">{cat?.name}</Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Category;