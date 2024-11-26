import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { smartShoppingApi } from '../utils/services/smartShopping';

const SmartShopping = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const fetchSmartShopping = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await smartShoppingApi.smartShopping({});
            setData(response.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSmartShopping();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Box sx={{}}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }}>
                            Category
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', py: { sm: "30px", xs: "15px" }, }}
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
            <Container>
                <Box sx={{ my: { sm: 5, xs: 2 }, gap: 3, pb: { sm: 5, xs: 2 }, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" } }}>
                    {data?.map((cat) => (
                        <Box key={cat.id}
                            sx={{
                                boxShadow: 3,
                                backgroundColor: '#000',
                                borderRadius: 2,
                                cursor: 'pointer',
                                bgcolor: 'rgba(0, 0, 0, 0.6)',
                                transition: 'transform 0.3s ease',
                                '&:hover': { opacity: 0.8, },
                                width: "100%",
                                height: "200px",
                                position: "relative",
                            }}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 4,
                                }}
                                loading="lazy"
                                src={cat.image}
                                alt="category-image"
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: "0%",
                                    left: "50%",
                                    transform: 'translate(-50%, -50%)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: "120px",
                                    bgcolor: "#fff",
                                    borderRadius: "6px",
                                    padding: "6px",
                                    boxShadow: 2,
                                }}
                            >
                                <Typography sx={{
                                    textTransform: "capitalize",
                                    color: "#292b2c",
                                    textAlign: "center",
                                    fontSize: "15px",
                                    '&:hover': { color: "#bb1f2a" },
                                }}
                                    variant="h6">
                                    {cat.name}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                {/* <Box sx={{ my: { sm: 5, xs: 2 } }}>
                        {livingroom?.map((cat) => (
                            <Box key={cat.id}
                                sx={{
                                    boxShadow: 3,
                                    backgroundColor: '#000',
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { opacity: 0.8, },
                                    width: "100%",
                                    height: "200px",
                                    position: "relative",
                                }}
                            >
                                <img onClick={handleNavigateLivingRoom}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 4,
                                    }}
                                    loading="lazy"
                                    src={cat.src}
                                    alt="category-image"
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: "0%",
                                        left: "50%",
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: "120px",
                                        bgcolor: "#fff",
                                        borderRadius: "6px",
                                        padding: "6px",
                                        boxShadow: 2,
                                    }}
                                >
                                    <Typography sx={{
                                        textTransform: "capitalize",
                                        color: "#292b2c",
                                        textAlign: "center",
                                        fontSize: "15px",
                                        '&:hover': { color: "#bb1f2a" },
                                    }}
                                        variant="h6">
                                        {cat.title}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box> */}

            </Container>
        </Box>
    );
}

export default SmartShopping;
