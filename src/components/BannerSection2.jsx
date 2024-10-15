import { Box, Container, Grid } from '@mui/material';
import React from 'react';

const BannerSection2 = ({ bannerSection }) => {
    return (
        <Container sx={{ my: 2, px: 2 }}>
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
                            key={item.id}
                            sx={{
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
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

export default BannerSection2;
