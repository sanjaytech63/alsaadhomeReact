import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import {
    Box,
    useMediaQuery,
    useTheme,
    IconButton,
    Dialog,
    Typography,
} from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const UnboxingBottomSection = () => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const isRTL = theme.direction === "rtl";

    // Handle opening the dialog with selected YouTube video
    const handleOpen = (youtubeId) => {
        setSelectedVideo(youtubeId);
        setOpen(true);
    };

    // Handle closing the dialog
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setSelectedVideo(null), 200); // Reset video state after closing
    };

    // Custom button group for carousel navigation
    const CustomButtonGroup = ({ next, previous }) => (
        <>
            {/* Previous Button */}
            <Box
                onClick={isRTL ? next : previous}
                sx={{
                    position: "absolute",
                    top: "48%",
                    left: "-45px",
                    cursor: "pointer",
                }}
            >
                <MdOutlineArrowBackIos fontSize="20px" color="#222" />
            </Box>
            {/* Next Button */}
            <Box
                onClick={isRTL ? previous : next}
                sx={{
                    position: "absolute",
                    top: "48%",
                    right: "-45px",
                    cursor: "pointer",
                }}
            >
                <MdOutlineArrowForwardIos fontSize="20px" color="#222" />
            </Box>
        </>
    );

    const videoList = [
        {
            id: 1,
            youtubeId: "WMFIWEFZa7Y",
            thumbnail: "https://img.youtube.com/vi/WMFIWEFZa7Y/maxresdefault.jpg",
        },
        {
            id: 2,
            youtubeId: "L5JdEHUMNB0",
            thumbnail: "https://img.youtube.com/vi/L5JdEHUMNB0/maxresdefault.jpg",
        },
        {
            id: 3,
            youtubeId: "pw_AreztrTs",
            thumbnail: "https://img.youtube.com/vi/pw_AreztrTs/maxresdefault.jpg",
        },
        {
            id: 4,
            youtubeId: "WMFIWEFZa7Y",
            thumbnail: "https://img.youtube.com/vi/WMFIWEFZa7Y/maxresdefault.jpg",
        },
        {
            id: 5,
            youtubeId: "L5JdEHUMNB0",
            thumbnail: "https://img.youtube.com/vi/L5JdEHUMNB0/maxresdefault.jpg",
        },
        {
            id: 6,
            youtubeId: "pw_AreztrTs",
            thumbnail: "https://img.youtube.com/vi/pw_AreztrTs/maxresdefault.jpg",
        },
    ];

    return (
        <div className="w-100">
            {/* Section Header */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Video Tutorials
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ lineHeight: "28px", color: "#687188" }}
                >
                    Learn the secrets to creating engaging unboxing videos! Our tutorials
                    guide you step-by-step to captivate your audience and showcase
                    products like a pro.
                </Typography>
            </Box>

            {/* Carousel Section */}
            <Box sx={{ width: "100%", position: "relative", my: 3 }}>
                <Carousel
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    renderButtonGroupOutside
                    arrows={false}
                    draggable
                    infinite
                    responsive={{
                        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
                        laptop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
                        tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
                        mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
                    }}
                    showDots={false}
                    slidesToSlide={1}
                    swipeable
                    customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                    rtl={isRTL}
                >
                    {videoList.map((video) => (
                        <Box
                            key={video.id}
                            onClick={() => handleOpen(video.youtubeId)}
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                width: matchesSM ? "90%" : "100%",
                                height: "auto",
                                padding: "10px",
                            }}
                        >
                            <img
                                draggable="false"
                                src={video.thumbnail}
                                loading="lazy"
                                alt={`Video Thumbnail ${video.id}`}
                                style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: "white",
                                }}
                            >
                                <PlayCircleOutlineIcon sx={{ fontSize: "60px" }} />
                            </IconButton>
                        </Box>
                    ))}
                </Carousel>

                {/* Video Dialog */}
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                        {selectedVideo && (
                            <iframe
                                title="YouTube Video"
                                src={`https://www.youtube.com/embed/${selectedVideo}`}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                }}
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        )}
                    </Box>
                </Dialog>
            </Box>
        </div>
    );
};

export default UnboxingBottomSection;
