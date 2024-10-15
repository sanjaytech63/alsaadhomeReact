import React from "react";
import Carousel from "react-multi-carousel";
import { Box, Link, useMediaQuery, useTheme, IconButton, Container, Typography } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const DealsSlider = ({ DealsSlider }) => {
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
        <div className="w-100 my-4">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, textAlign: "left",mx:2, fontSize: {
                            xs: "18px",
                            sm: "24px",
                        }, }}>Deals for you</Typography>
                <hr />
                <Box sx={{ width: "100%", position: "relative", my: 3 }}>
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
                                items: 5,
                            },
                            laptop: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 4,
                            },
                            tablet: {
                                breakpoint: { max: 768, min: 464 },
                                items: 3,
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 2,
                            },
                        }}

                        showDots={false}
                        slidesToSlide={1}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                        >
                        {/* <Box sx={{ display: "flex", mx: 2, width: "100%" }} > */}
                        {DealsSlider.length <= 0 ? (
                            ""
                        ) :
                            (
                                [...DealsSlider, ...DealsSlider].map((item, index) => (
                                    <img
                                        key={index}
                                        draggable="false"
                                        src={item.src}
                                        alt="DealsSlider"
                                        style={{
                                            width: matchesSM ? "auto" : "auto",
                                            height: matchesSM ? "200px" : "220px",
                                            objectFit: "cover",
                                            marginLeft: '5px',
                                            padding: "10px",
                                        }}
                                    />
                                ))
                            )}
                        {/* </Box> */}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default DealsSlider;
