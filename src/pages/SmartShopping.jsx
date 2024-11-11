import React from 'react';
import { Breadcrumbs, Grid, Typography, Container, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useNavigate } from 'react-router-dom';

const SmartShopping = () => {
    const navigate = useNavigate();

    const handleNavigateBedroom = () => {
        navigate("/smart-shopping/category/badroom")
    }

    const handleNavigateLivingRoom = () => {
        navigate("/smart-shopping/category/livingroom")
    }
    const bedroom = [
        { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/engagement_categories/whatsapp-image-2024-03-18-at-17-09-16-322c00c41710767542.jpg", title: "Bedroom" },
    ];

    const livingroom = [
        { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/engagement_categories/livingroom1710960588.jpg", title: "Living Room" },
    ];

    return (
        <Box sx={{}}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }}>
                            Category
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Smart Shopping</Link>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>
            <Container>
                <Box sx={{ my: 5, display: "flex", alignItems: "center", gap: 3, flexDirection: { xs: "column", sm: "row" } }}>
                    <Box sx={{ my: { sm: 5, xs: 2 } }}>
                        {bedroom?.map((cat) => (
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
                                <img onClick={handleNavigateBedroom}
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
                    </Box>
                    <Box sx={{ my: { sm: 5, xs: 2 } }}>
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
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default SmartShopping;
