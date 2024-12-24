import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import {
    Box,
    useMediaQuery,
    useTheme,
    Typography,
    CardMedia,
    Dialog,
    IconButton,
} from "@mui/material";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import ModalVideo from 'react-modal-video';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import parse from 'html-react-parser';
const UnboxingBottomSection = ({ data }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("md"));

    const [isOpen, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const isRTL = theme.direction === "rtl";

    const handleOpen = (youtubeId) => {
        if (youtubeId) {
            setSelectedVideo(youtubeId);
            setOpen(true);
        }
    };

    const CustomButtonGroup = ({ next, previous }) => (
        <>
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

    const renderCarousel = (item) => (
        <Box sx={{ width: "100%", position: "relative", my: 3 }} key={item.id}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, px: "10px" }}>
                {item.video_title}
            </Typography>
            <Typography
                variant="body2"
                sx={{ lineHeight: "24px", color: "#687188", mb: 1, px: "10px" }}
            >
                {item.video_sub_title}
            </Typography>
            <Box sx={{ py: 0 }}>
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
                    customButtonGroup={item.video_image.length > 4 && !matchesSM ? <CustomButtonGroup /> : null}
                    rtl={isRTL}
                >
                    {item.video_image.map((image, index) => (
                        <Box
                            key={index}
                            onClick={() => handleOpen(image.video_id)}
                            sx={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: image.video_id ? "pointer" : "default",
                                width: matchesSM ? "90%" : "100%",
                                height: { xs: "110px", sm: "220px" },
                                padding: "10px",
                                borderRadius: "12px",
                                overflow: "hidden",

                            }}
                        >
                            <CardMedia
                                component="img"
                                draggable="false"
                                src={image.url}
                                loading="lazy"
                                alt={`Video/Image Thumbnail ${index}`}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                }}
                            />
                            {image.video_id && (
                                <PlayCircleOutlineIcon
                                    sx={{
                                        position: "absolute",
                                        fontSize: "50px",
                                        color: "white",
                                        opacity: 0.8,
                                        zIndex: 2,
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Carousel>
            </Box>
            <Typography sx={{ lineHeight: "24px", color: "#687188", pb: 5, fontSize: "16px" }} >
                {parse(item.video_description)}
            </Typography>
        </Box>
    );

    return (
        <div>
            {data?.video_image_data?.map((item) => renderCarousel(item))}
            <Dialog  disableScrollLock open={isOpen} onClose={() => setOpen(false)} maxWidth="md">
                <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 0, right: 0, zIndex: 9999 }} >
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
                <Box sx={{ height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ModalVideo
                        allowFullScreen={false}
                        channel="youtube"
                        youtube={{ mute: 0, autoplay: 0 }}
                        isOpen={isOpen}
                        videoId={selectedVideo}
                        onClose={() => setOpen(false)}
                    />
                </Box>
            </Dialog>
        </div>
    );
};

export default UnboxingBottomSection;
