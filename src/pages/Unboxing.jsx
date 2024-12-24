import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import UnboxingTopSection from '../components/UnboxingTopSection';
import UnboxingBottomSection from '../components/UnboxingBottomSection';
import { unboxingData } from '../utils/services/unboxingChallenge';
import Loading from '../components/Loading';
import parse from 'html-react-parser';
const Unboxing = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await unboxingData.unboxingChanllege();
            if (response && response?.status === 200) {
                setLoading(false);
                setData(response.data);

            }
        } catch (error) {
            setLoading(false);
            console.log("Error fetching home data:-", error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Unboxing Challenge
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
            {/* Category list */}
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        <Grid item xs={12} sm={12}>
                            <Box
                                sx={{
                                    boxShadow: 3,
                                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                                    borderRadius: "10px",
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { opacity: 0.8, },
                                    width: "100%",
                                    height: { sm: "500px", xs: "200px" },
                                }}
                            >
                                <img
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "10px",
                                    }}
                                    src={data?.banner}
                                    loading="lazy"
                                    alt="category-image"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{}}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                {data?.title}
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: "28px", color: "#687188", fontWeight: "600" }}>
                                {parse(data?.description)}
                            </Typography>
                        </Box>
                    </Box>
                    {/* {
                        data?.map((item, index) => (
                            < UnboxingTopSection key={index} item={item} />
                        ))
                    }
                     */}
                    <UnboxingBottomSection data={data} />
                </Box>
            </Container>
        </Box>
    );
}

export default Unboxing;