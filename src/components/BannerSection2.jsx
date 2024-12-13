import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerSection2 = ({ bannerSection }) => {
    const nevigate = useNavigate();
    return (
        <Container sx={{ my: { xs: 1, sm: 4 }, px: 2 }}>
            <Grid
                container
                alignItems="center"
                spacing={2}
                direction={{ xs: 'column', sm: 'row' }}
            >
                {
                    bannerSection && bannerSection.map((item, index) => (
                        <Grid key={index} item xs={12} sm={6}>
                            <Box
                                sx={{
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <img onClick={() => nevigate(`/search?type=display-banner&id=${item.id}`)}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: "pointer",
                                    }}
                                    src={item.image}
                                    loading="lazy"
                                    alt="saad"
                                />
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default BannerSection2;
