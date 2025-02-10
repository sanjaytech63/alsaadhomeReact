import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import CustomButtonGroup from "./CustomButtonGroup";
import useLoaderStore from "../store/loaderStore";
import TopSliderShimmer from "./ShimerEffect/TopSliderShimer";

const FeatureBrandsSlider = ({ FeaturedBrands }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';
    const isLoading = useLoaderStore((state) => state.isLoading);

    if (isLoading) {
      return <TopSliderShimmer />;
    }
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
                        customButtonGroup={FeaturedBrands.length > 10 && !matchesSM ? (<CustomButtonGroup top="46%" />) : null}
                        rtl={isRTL} 
                    >
                        {FeaturedBrands.length > 0 && FeaturedBrands.map((item) => (
                            <Link className="link-none"
                                to={`/brand/${item.id}`}
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
                                        src={"https://cdn.pixabay.com/photo/2020/09/13/14/24/coffee-5568374_1280.jpg"}
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
