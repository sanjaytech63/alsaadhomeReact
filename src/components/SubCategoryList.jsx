import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import { homeApi } from '../utils/services/homeServices';
const SubCategoryList = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let { subcategory } = useParams();
    const location = useLocation();
    const { type, id } = location.state || {};
    const pathnames = location.pathname.split('/').filter(x => x);

    const fetchCategory = async () => {
        setLoading(true);
        setError(null);
        try {
            const requestData = {
                category_id: subcategory,
                id: id || "",
                type: type || "",
            };
            const response = await homeApi.getSubCategory(requestData);
            if (response && response.status === 200) {
                setData(response.data);
            }
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
        return <p>{error}</p>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
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
            <Box sx={{ my: 4 }}>
                <Container>
                    <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188", fontSize: { xs: "12px", sm: "16px" }, }}>
                        Shop from the largest collection of bedding, featuring comforter set , duvet, and bedspreads in UAE , KSA & Oman ✅ king comforter , single, and queen sizes ✅ Choose from cotton, microfiber, and other materials for a perfect comforter and a better night's sleep
                    </Typography>
                </Container>
            </Box>
            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {data && data?.map((item) => (
                            <Grid item xs={12} sm={4} key={item.id}>
                                <Link className="link-none"
                                    state={{
                                        id: item.id,
                                        type: 'category'
                                    }}

                                    to={`/category/${subcategory}/${item.slug}`}
                                    key={item.id}
                                >
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
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
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
                                            <Typography variant="h6">{item.name}</Typography>
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

export default SubCategoryList;