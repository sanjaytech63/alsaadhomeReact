import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';
import BoltIcon from '@mui/icons-material/Bolt';
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Box, Link, useMediaQuery, useTheme, IconButton, Grid, Dialog, Typography, Container } from "@mui/material";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const UnboxingBottomSection = () => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesTablet = useMediaQuery(theme.breakpoints.between(464, 1024));

    const [open, setOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleOpen = (youtubeId) => {
        setSelectedVideo(youtubeId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVideo(null);
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
    ];

    return (
        <div className="w-100">
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Video Tutorials
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188" }}>
                    Learn the secrets to creating engaging unboxing videos! Our tutorials guide you step-by-step to captivate your audience and showcase <br /> products like a pro
                </Typography>
            </Box>
            <Box sx={{ width: "100%",  mt: 2 , pb: 5}}>
                <Carousel
                    rtl={false}
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    renderButtonGroupOutside
                    arrows={false}
                    draggable
                    infinite={true}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 1024 },
                            items: 3,
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 768 },
                            items: 3,
                        },
                        mobile: {
                            breakpoint: { max: 768, min: 0 },
                            items: 2,
                        },
                    }}
                    showDots={false}
                    slidesToSlide={2}
                    swipeable
                    customButtonGroup={!matchesSM && !matchesTablet ? <CustomButtonGroup /> : null}
                >
                    {videoList.map((video) => (
                        <Box
                            key={video.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                width: matchesSM ? '90%' : '100%',
                                height: 'auto',
                                padding: '10px',
                            }}
                        >
                            <img
                                draggable="true"
                                src={video.thumbnail}
                                alt={`Video Thumbnail ${video.id}`}
                                style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                            />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    fontSize: '40px',
                                }}
                                onClick={() => handleOpen(video.youtubeId)}
                            >
                                <PlayCircleOutlineIcon sx={{ fontSize: '60px' }} />
                            </IconButton>
                        </Box>
                    ))}
                </Carousel>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                >
                    <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                        {selectedVideo && (
                            <iframe
                                title="YouTube Video"
                                src={`https://www.youtube.com/embed/${selectedVideo}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
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
