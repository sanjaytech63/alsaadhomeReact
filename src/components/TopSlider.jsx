import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, Typography, Container } from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomButtonGroup from "./CustomButtonGroup";
import TopSliderShimmer from "./ShimerEffect/TopSliderShimer";
import useLoaderStore from "../store/loaderStore";


const TopSlider = ({ topSlider }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('md'));
    const isRTL = theme.direction === 'rtl';
    const isLoading = useLoaderStore((state) => state.isLoading);

     if (isLoading) {
       return <TopSliderShimmer />; 
     }


    return (
      <div className="w-100">
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
                desktop: { breakpoint: { max: 3000, min: 1024 }, items: 10 },
                laptop: { breakpoint: { max: 1024, min: 768 }, items: 8 },
                tablet: { breakpoint: { max: 768, min: 464 }, items: 6 },
                mobile: { breakpoint: { max: 464, min: 0 }, items: 4.5 },
              }}
              showDots={false}
              slidesToSlide={3}
              swipeable
              customButtonGroup={
                topSlider.length > 10 && !matchesSM ? (
                  <CustomButtonGroup top="40%" />
                ) : null
              }
              rtl={isRTL}
            >
              {topSlider && topSlider?.length > 0 ? (
                topSlider?.map((item) => (
                  <Link
                    className="link-none"
                    to={{
                      pathname: `/category/${item?.slug}`,
                    }}
                    key={item?.id}
                    draggable={false}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        component="img"
                        draggable="false"
                        src={item?.image}
                        alt={item?.name}
                        loading="lazy"
                        className={!matchesSM ? "rounded-circle" : "rounded-3"}
                        sx={{
                          width: matchesSM ? "70px" : "97px",
                          height: matchesSM ? "70px" : "97px",
                          borderRadius: "5px",
                          objectFit: "cover",
                          border: {
                            xs: "2px solid #cfe9f6",
                            sm: "3px solid #cfe9f6",
                          },
                          cursor: "pointer",
                          "&:hover": { border: "3px solid #bb1f2a" },
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          color: "#292b2c",
                          textAlign: "center",
                          textTransform: "capitalize",
                          fontWeight: "500",
                          fontSize: "14px",
                          marginTop: "10px",
                          cursor: "pointer",
                          "&:hover": { color: "#bb1f2a" },
                        }}
                      >
                        {item?.name}
                      </Typography>
                    </Box>
                  </Link>
                ))
              ) : (
                <TopSliderShimmer />
              )}
            </Carousel>
          </Box>
        </Container>
      </div>
    );
};

export default TopSlider;
