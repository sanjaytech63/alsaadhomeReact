import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, Container, Typography } from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const DealsSlider = ({ DealsSlider }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';

    const CustomButtonGroup = ({ next, previous }) => (
        <>
            <Box onClick={isRTL ? next : previous} sx={{
                position: "absolute",
                top: '48%',
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
                top: '48%',
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
                        rtl={isRTL}
                    >
                        {DealsSlider.length > 0 && [...DealsSlider, ...DealsSlider].map((item) => (
                            <Link
                                className="link-none"
                                state={{ id: item.id, type: "display_banners" }}
                                key={item.id}
                                to={`/search?type=display-banner&id=${item.id}`}
                            >
                                <Box
                                    component="img"
                                    draggable="false"
                                    src={item.image}
                                    loading="lazy"
                                    alt={item.banner_name}
                                    sx={{
                                        width: "100%",
                                        height: matchesSM ? "200px" : "220px",
                                        objectFit: "cover",
                                        padding: '0px 10px',
                                        cursor: "pointer",
                                    }}
                                />
                            </Link>
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default DealsSlider;
