import React, { useState } from 'react';
import { Box, Grid, Typography, Dialog, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

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

const UnboxingTopSection = () => {
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

    return (
        <Box sx={{ mt: 5 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Examples
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188", fontWeight: "600" }}>
                    Here are some video ideas for unboxing to get some inspiration.
                </Typography>
            </Box>
            <Box sx={{ pb: 4 }}>
                <Grid container sx={{ mb: 2 }} spacing={3}>
                    {videoList.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video.id}>
                            <Box
                                sx={{
                                    position: 'relative',
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src={video.thumbnail}
                                     loading="lazy"
                                    alt={`Video Thumbnail ${video.id}`}
                                    style={{ width: '100%', height: 'auto' }}
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
                        </Grid>
                    ))}
                </Grid>
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
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#687188", fontSize: '18px', }}>
                            You can make your videos in different ways:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
                            <Box
                                sx={{
                                    width: '5px',
                                    height: '5px',
                                    padding: '3px',
                                    borderRadius: '50%',
                                    backgroundColor: "#687188",
                                    display: 'inline-block'
                                }}
                            /> you can do the unboxing without showing your face; just review the items and put background music or the real sound for the unboxing ( ASMR )
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
                            <Box
                                sx={{
                                    padding: '3px',
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    backgroundColor: "#687188",
                                    display: 'inline-block'
                                }}
                            />  But showing yourself talking about the items or your experience could be an effective way to make better results.
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UnboxingTopSection;
