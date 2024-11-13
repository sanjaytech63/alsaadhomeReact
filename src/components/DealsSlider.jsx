import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, IconButton, Container, Typography } from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DealsSlider = ({ DealsSlider }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';
    const navigate = useNavigate();

    // Handle Navigation to product listing
    const handleNavigate = () => {
        navigate(`/category/subcategory/productlisting`);
    };

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
        <div className="w-100 my-4">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                {/* Section Title */}
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        mb: 2,
                        textTransform: "capitalize",
                        textAlign: "left",
                        mx: 2,
                        fontSize: { xs: "18px", sm: "24px" },
                    }}
                >
                    Deals for you
                </Typography>
                <hr className="mx-2" />
                
                {/* Carousel Component */}
                <Box sx={{ width: "100%", position: "relative", my: 3 }}>
                    <Carousel
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        renderButtonGroupOutside
                        arrows={false}
                        draggable
                        infinite
                        responsive={{
                            desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
                            laptop: { breakpoint: { max: 1024, min: 768 }, items: 4 },
                            tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
                            mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
                        }}
                        showDots={false}
                        slidesToSlide={1}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                        rtl={isRTL} // Enable RTL for carousel
                    >
                        {DealsSlider.length > 0 && [...DealsSlider, ...DealsSlider].map((item, index) => (
                            <Box
                                key={index}
                                component="img"
                                onClick={handleNavigate}
                                draggable="false"
                                src={item.src}
                                alt="Deals Slider"
                                loading="lazy"
                                sx={{
                                    width: "100%",
                                    height: matchesSM ? "200px" : "220px",
                                    objectFit: "cover",
                                    padding: '0px 10px',
                                    cursor: "pointer",
                                }}
                            />
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default DealsSlider;
