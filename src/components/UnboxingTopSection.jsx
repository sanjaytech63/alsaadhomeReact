import React, { useState } from 'react';
import { Box, Grid, Typography, Dialog, IconButton, CardMedia } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import parse from 'html-react-parser';

const UnboxingTopSection = ({ item }) => {

    return (
        <Box sx={{ mt: 5 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    {item.name}
                </Typography>
            </Box>
            <Box sx={{ pb: 4 }}>
                <Grid container sx={{ mb: 2 }} spacing={3}>
                    {item?.video_image.map((video) => (
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
                                <CardMedia component={"img"}
                                    src={video}
                                    loading="lazy"
                                    alt={`Video Thumbnail `}
                                    sx={{ width: '100%', height: { sm: "210px", xs: "120px" } }}
                                />
                                {/* <IconButton
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
                                    <PlayCircleOutlineIcon sx={{ fontSize: '60px' }} /> */}
                                {/* </IconButton> */}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {/* <Dialog
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
                </Dialog> */}
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: "#687188", fontSize: '18px', }}>
                            {parse(item.description)}
                        </Typography>
                        {/* <Typography variant="body1" sx={{ mb: 1, color: "#687188", fontSize: '15px', }}>
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
                        </Typography> */}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default UnboxingTopSection;
