import React from "react";
import Carousel from "react-multi-carousel";
import { Box, Link, useMediaQuery, useTheme, IconButton, Typography, Container } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TopSlider = ({ topSlider }) => {
    console.log(topSlider,"=====")
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const nevigate = useNavigate();
    const handleNevigate = () => {
        nevigate(`/category/subcategory`)
    }
    const CustomButtonGroup = ({ next, previous }) => (
        <Box sx={{ position: "absolute", top: '50%', left: '-70px', right: '-70px', display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }} className>
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
                <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
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
                                items: 10,
                            },
                            laptop: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 8,
                            },
                            tablet: {
                                breakpoint: { max: 768, min: 464 },
                                items: 6,
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 4,
                            },
                        }}

                        showDots={false}
                        slidesToSlide={3}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                    >
                        {topSlider.length <= 0 ? (
                            ""
                        ) : (
                            topSlider.map((item, index) => (
                                <Link onClick={handleNevigate}
                                    key={index}
                                    component={"a"}
                                    to={`/${item.slug}`}
                                    draggable={false}
                                    sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', textDecoration: "none" }}
                                >
                                    <Box
                                        sx={{
                                            position: "relative",
                                            display: "inline-block",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box component={"img"}
                                            draggable="false"
                                            src={item.src}
                                            alt={item.slug}
                                            loading="lazy"
                                            className={!matchesSM ? "rounded-circle" : "rounded-3"}
                                            sx={{
                                                width: matchesSM ? "70px" : "97px",
                                                height: matchesSM ? "70px" : "97px",
                                                borderRadius: "5px",
                                                objectFit: "cover",
                                                border: "3px solid #cfe9f6",
                                                cursor: "pointer",
                                                "&:hover": { border: "3px solid #bb1f2a", }
                                            }}
                                        />
                                        <Typography sx={{
                                            fontFamily: "Poppins, sans-serif",
                                            color: "#292b2c",
                                            textAlign: "center",
                                            textTransform: "capitalize",
                                            fontWeight: "500",
                                            fontSize: "14px",
                                            marginTop: "10px",

                                        }}>
                                            {item.text}
                                        </Typography>
                                    </Box>
                                </Link>
                            ))
                        )}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default TopSlider;
