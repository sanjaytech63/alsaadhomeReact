import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';
import BoltIcon from '@mui/icons-material/Bolt';
import React from "react";
import Carousel from "react-multi-carousel";
import { Box, Link, useMediaQuery, useTheme, IconButton, Grid, Typography, Container, Card, Chip, CardMedia, CardContent, Rating } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const NewArrivalsSlider = ({ productsCard }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));


    const handleOnClick = (e, item) => {
        e.stopPropagation();
    };

    const CustomButtonGroup = ({ next, previous }) => (
        <Box sx={{ position: "absolute", top: '50%', left: '-70px', right: '-70px', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
            <IconButton onClick={previous} sx={{ color: '#292b2c', height: '60px', width: '60px' }}>
                <MdOutlineArrowBackIos />
            </IconButton>
            <IconButton onClick={next} sx={{ color: '#292b2c', height: '60px', width: '60px' }}>
                <MdOutlineArrowForwardIos />
            </IconButton>
        </Box>
    );

    return (
        <div className="w-100 ">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Box sx={{
                    px: {
                        xs: 2,
                        sm: "0px",
                    }, my: 3, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography variant="h5" sx={{
                        fontWeight: 600,
                        textAlign: "left",
                        fontSize: {
                            xs: "18px",
                            sm: "24px",
                        },
                    }}>New Arrivals</Typography>
                    <Typography variant="h6" sx={{ color: "#bb1f2a", mt: 1, fontSize: "1rem", textAlign: "right" }}>
                        <BoltIcon />
                        View All
                    </Typography>
                </Box>
                <hr />
                <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
                    <Carousel
                        rtl={false}
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        renderButtonGroupOutside
                        arrows={false}
                        draggable
                        infinite={true}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 4,
                            },
                            laptop: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 4,
                            },
                            tablet: {
                                breakpoint: { max: 768, min: 464 },
                                items: 2,
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 2,
                            },
                        }}

                        showDots={false}
                        slidesToSlide={3}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                    >
                        {productsCard && productsCard.map((item) => (
                            <Card key={item.id} sx={{ borderRadius: '8px', margin: { xs: 2, sm: "5px" } }}>
                                <Box position="relative">
                                    <Chip
                                        label="New"
                                        sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px" }}
                                    />
                                    <CardMedia
                                        sx={{ minHeight: "276.37px", maxHeight: "400px", objectFit: "cover" }}
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#292b2c", fontWeight: 600, fontSize: "1rem", fontFamily: "Roboto, sans-serif", alignSelf: "flex-start" }} component="div">
                                        {item.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <Typography variant="body1" sx={{ color: "#bb1f2a", fontWeight: 600 }}>
                                            {item.price}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconButton onClick={() => alert('Added to cart!')} aria-label="add to cart">
                                                <AddShoppingCart />
                                            </IconButton>
                                            <IconButton onClick={() => alert('Added to wishlist!')} aria-label="add to wishlist">
                                                <FavoriteBorder />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Rating name={`rating-${item.id}`} value={item.rating} readOnly />
                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                            ({item.rating})
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default NewArrivalsSlider;




