import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BannerSlider = ({ BannderSliderData }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const matchesTablet = useMediaQuery(theme.breakpoints.between(464, 1024));
    const nevigate = useNavigate();

    const handleNavigate = () => {
        nevigate(`/category/subcategory/productlisting`)
    };

    return (
        <div className="w-100 my-4 ">
            <Box sx={{ width: "100%", }}>
                <Carousel
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    renderButtonGroupOutside
                    arrows={false}
                    draggable
                    infinite={true}
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
                    showDots={true}
                    slidesToSlide={1}
                    swipeable
                >
                    {BannderSliderData.length <= 0 ? (
                        ""
                    ) : (
                        BannderSliderData.map((item, index) => (
                            <Box component="img"
                                key={index}
                                onClick={handleNavigate}
                                draggable="false"
                                src={item.src}
                                loading="lazy"
                                alt="BannderSliderData"
                                sx={{
                                    width: matchesSM ? "100%" : "100%",
                                    height: matchesSM ? "300px" : "600px",
                                    objectFit: "cover",
                                    cursor: "pointer",
                                }}
                            />
                        ))
                    )}
                </Carousel>
            </Box>
        </div>
    );
};

export default BannerSlider;
