import React from "react";
import Carousel from "react-multi-carousel";
import { Box, Link, useMediaQuery, useTheme, IconButton, Typography } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const BannerSlider = ({ BannderSliderData }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesTablet = useMediaQuery(theme.breakpoints.between(464, 1024));


    const handleOnClick = (e, item) => {
        e.stopPropagation();
    };


    return (
        <div className="w-100 my-4 ">
            <Box sx={{ width: "100%",}}>
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
                            <img
                                draggable="false"
                                src={item.src}
                                alt="BannderSliderData"
                                // className={!matchesSM ? "rounded-circle" : "rounded-3"}
                                style={{
                                    width: matchesSM ? "100%" : "100%",
                                    height: matchesSM ? "300px" : "600px",
                                    objectFit: "cover",
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
