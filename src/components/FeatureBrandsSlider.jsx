import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, Typography, Container } from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const FeatureBrandsSlider = ({ FeaturedBrands }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';

    const CustomButtonGroup = ({ next, previous }) => (
        <>
            <Box onClick={isRTL ? next : previous} sx={{
                position: "absolute",
                top: '46%',
                left: '-45px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowBackIos fontSize={"20px"} color="#222" />
            </Box>
            <Box onClick={isRTL ? previous : next} sx={{
                position: "absolute",
                top: '46%',
                right: '-45px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowForwardIos fontSize={"20px"} color="#222" />
            </Box>
        </>

    );

    return (
        <div className="w-100">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                {/* Title for Featured Brands */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 600,
                        px: { xs: 2, sm: "0px" },
                        textAlign: { xs: "left", sm: "center" },
                        fontSize: { xs: "18px", sm: "28px" }
                    }}
                >
                    Featured Brands
                </Typography>

                {/* Carousel Component */}
                <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
                    <Carousel
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        renderButtonGroupOutside
                        arrows={false}
                        draggable
                        infinite
                        responsive={{
                            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 10 },
                            laptop: { breakpoint: { max: 1024, min: 768 }, items: 8 },
                            tablet: { breakpoint: { max: 768, min: 464 }, items: 6 },
                            mobile: { breakpoint: { max: 464, min: 0 }, items: 4 },
                        }}
                        showDots={false}
                        slidesToSlide={3}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                        rtl={isRTL} // Enable RTL for carousel
                    >
                        {FeaturedBrands.length > 0 && FeaturedBrands.map((item) => (
                            <Link className="link-none"
                                state={{
                                    id: item.id,
                                    type: 'brand'
                                }}
                                to={`/brand/${encodeURIComponent(item.name)}`}
                                key={item.id}
                                draggable={false}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "inline-block",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        draggable="false"
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className={!matchesSM ? "rounded-circle" : "rounded-3"}
                                        sx={{
                                            borderRadius: "50%",
                                            width: matchesSM ? "70px" : "97px",
                                            height: matchesSM ? "70px" : "97px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </Box>
                            </Link>
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default FeatureBrandsSlider;
