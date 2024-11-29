import React from 'react';
import { Box, Container, Skeleton } from '@mui/material';

const NewsletterShimmer = () => {
    return (
        <div style={{ backgroundColor: "#eee" }} className="py-5">
            <Container maxWidth="lg" sx={{  mb: 4 }}>
                <Box className="row align-items-center">
                    {/* Title Shimmer */}
                    <Box className="col-md-6">
                        <Skeleton
                            variant="text"
                            sx={{
                                fontSize: '2rem',
                                width: '70%',
                            }}
                        />
                    </Box>

                    {/* Form Shimmer */}
                    <Box className="col-md-6">
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mt: { xs: 3, md: 0 },
                            }}
                        >
                            {/* Input Field Skeleton */}
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    width: '70%',
                                    height: '50px',
                                    borderRadius: '4px',
                                }}
                            />
                            {/* Button Skeleton */}
                            <Skeleton
                                variant="rectangular"
                                sx={{
                                    width: '25%',
                                    height: '50px',
                                    borderRadius: '4px',
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default NewsletterShimmer;
