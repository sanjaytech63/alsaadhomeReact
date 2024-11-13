import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';
import BoltIcon from '@mui/icons-material/Bolt';
import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, IconButton, Typography, Container, Card, Chip, CardMedia, CardContent, Rating } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const RecentlyViewed = ({ productsCard }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const nevigate = useNavigate();
    const isRTL = theme.direction === 'rtl';
    const handleNavigate = () => {
        nevigate(`/prodect/123`)
    }
    const CustomButtonGroup = ({ next, previous }) => (
        <>
            <Box onClick={isRTL ? next : previous} sx={{
                position: "absolute",
                top: '50%',
                left: '-50px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                color: '#292b2c',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowBackIos size={25} />
            </Box>
            <Box onClick={isRTL ? previous : next} sx={{
                position: "absolute",
                top: '50%',
                right: '-50px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                color: '#292b2c',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowForwardIos size={25} />
            </Box>
        </>

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
                    }}>Recently Viewed Products</Typography>
                    <Typography variant="h6" sx={{ color: "#bb1f2a", mt: 1, fontSize: "1rem", textAlign: "right" }}>
                        <BoltIcon />
                        View All
                    </Typography>
                </Box>
                <hr className="mx-2" />
                <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
                    <Carousel
                        rtl={isRTL}
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
                            <Card key={item.id} sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", margin: { xs: 2, sm: "5px", cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)" } }}>
                                <Box position="relative">
                                    <Chip
                                        label="New"
                                        sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px" }}
                                    />
                                    <CardMedia onClick={handleNavigate}
                                        sx={{ minHeight: { sm: "276.37px", xs: "175px" }, maxHeight: { sm: "400px", xs: "175px" }, objectFit: "cover" }}
                                        component="img"
                                        image={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </Box>
                                <CardContent sx={{ p: { xs: "8px", sm: "16px" } }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#292b2c",
                                            fontWeight: 600,
                                            fontSize: { xs: "15px", sm: "1rem" },
                                            alignSelf: "flex-start",
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            wordBreak: "break-all",
                                            whiteSpace: "normal",
                                            textOverflow: "ellipsis",
                                            ":hover": {
                                                color: "#bb1f2a",
                                            }
                                        }}

                                    >
                                        {item.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Typography variant="body1" noWrap sx={{ color: "#bb1f2a", fontWeight: 600, fontSize: { xs: "14px", sm: "1rem" }, }}>
                                            {item.price}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <IconButton sx={{
                                                p: { xs: "4px", sm: "8px" }, boxShadow: 2, ":hover": {
                                                    backgroundColor: "#bb1f2a", color: "#fff"
                                                }
                                            }} onClick={() => alert('Added to cart!')} aria-label="add to cart">
                                                <AddShoppingCart sx={{ fontSize: "1rem" }} />
                                            </IconButton>
                                            <IconButton sx={{
                                                p: { xs: "4px", sm: "8px" }, boxShadow: 2, ":hover": {
                                                    backgroundColor: "#bb1f2a", color: "#fff"
                                                }
                                            }} onClick={() => alert('Added to wishlist!')} aria-label="add to wishlist">
                                                <FavoriteBorder sx={{ fontSize: "1rem" }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Rating sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }} name="no-value" value={null} />
                                        <Typography variant="body2" sx={{ ml: 1, color: "#9a9696" }}>
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

export default RecentlyViewed;




