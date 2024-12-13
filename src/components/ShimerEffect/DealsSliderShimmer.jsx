import React from 'react';
import { Box, Skeleton, useMediaQuery, useTheme, Container, Typography } from '@mui/material';

const DealsSliderShimmer = () => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg')); // Large screens and below
    const matchesXS = useMediaQuery(theme.breakpoints.down('sm')); // Small screens and below

    return (
        <div className="w-100 my-4">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                {/* Section Title Skeleton */}
                <Skeleton
                    variant="rectangular"
                    width="20%"
                    height={20}
                    sx={{
                        marginBottom: 2,
                        mx: 2,
                    }}
                />

                {/* Skeleton for Deals Slider */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: matchesXS ? "space-between" : "flex-start",
                        gap: matchesXS ? 1 : 2,
                        my: 3,
                    }}
                >
                    {/* Simulating multiple items in the carousel */}
                    {Array(4).fill().map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: matchesXS ? "0 0 48%" : "0 0 25%",
                            }}
                        >
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={matchesSM ? 200 : 220}
                                sx={{
                                    marginBottom: 2,
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Container>
        </div>
    );
};

export default DealsSliderShimmer;
