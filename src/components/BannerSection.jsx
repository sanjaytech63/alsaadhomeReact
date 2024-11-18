import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BannerSection = ({ bannerSection }) => {
    const nevigate = useNavigate();

    const handleNavigate = () => {
        nevigate(`/category/subcategory/productlisting`)
    };
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
                        <Grid item xs={12} sm={6}>
                            <Box
                                key={index}
                                sx={{
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': { transform: 'scale(1.05)' },
                                }}
                            >
                                <img onClick={handleNavigate}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                    }}
                                    loading="lazy"
                                    src={item.src}
                                    alt="saad"
                                />
                            </Box>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default BannerSection;
