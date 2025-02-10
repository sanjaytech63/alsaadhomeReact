import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import useLoaderStore from "../store/loaderStore";
import BannerSliderShimmer from "./ShimerEffect/BannerSliderShimmer";

const BannerSlider = ({ BannderSliderData }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const isLoading = useLoaderStore((state) => state.isLoading);

    if (isLoading) {
      return <BannerSliderShimmer />;
    }

    return (
        <Box sx={{ width: "100%", mb: { xs: 2, sm: 4 }, mt: { xs: 0, sm: 2 } }}>
            <Box sx={{ width: "100%" }}>
                <Carousel
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    renderButtonGroupOutside
                    arrows={false}
                    draggable
                    infinite
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 1,
                        },
                        laptop: {
                            breakpoint: { max: 1024, min: 768 },
                            items: 1,
                        },
                        tablet: {
                            breakpoint: { max: 768, min: 464 },
                            items: 1,
                        },
                        mobile: {
                            breakpoint: { max: 464, min: 0 },
                            items: 1,
                        },
                    }}
                    showDots
                    slidesToSlide={1}
                    swipeable
                >
                    {BannderSliderData.length > 0 && BannderSliderData.map((item) => (
                        <Link className="link-none"
                            key={item.id}
                            to={`/search/banner/${item.id}`}
                        >
                            <Box
                                component="img"
                                draggable="false"
                                // src={item.image}
                                src="https://cdn.pixabay.com/photo/2016/04/15/11/48/hotel-1330847_1280.jpg"
                                loading="lazy"
                                alt={`BannerSlide-${item.banner_name}`}
                                sx={{
                                    width: "100%",
                                    height: matchesSM ? "200px" : "600px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        </Link>
                    ))}
                </Carousel>
            </Box>
        </Box>
    );
};

export default BannerSlider;
