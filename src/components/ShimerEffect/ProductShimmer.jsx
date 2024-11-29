import React from 'react';
import { Box, Container, Grid, Skeleton } from '@mui/material';

const ProductShimmer = () => {
    return (
        <div className="my-5">
            <Container maxWidth="lg" sx={{ px: 2 }}>
                <Grid container spacing={2}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                            <Box
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                {/* Image Skeleton */}
                                <Skeleton
                                    variant="rectangular"
                                    sx={{
                                        width: "100%",
                                        height: "150px",
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default ProductShimmer;
