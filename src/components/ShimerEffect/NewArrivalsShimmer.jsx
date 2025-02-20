import React from "react";
import { Box, Card, CardContent, Skeleton, useTheme, useMediaQuery, Container } from "@mui/material";

const NewArrivalsShimmer = () => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const skeletonCount = matchesSM ? 2 : 4;

    return (
        <Container maxWidth="lg" sx={{ padding: 0 }}>
            <Box sx={{ width: "100%", display: "flex", my: 2, justifyContent: "space-between" }}>
                <Skeleton
                    variant="rectangular"
                    width="20%"
                    height={20}
                />
                <Skeleton
                    variant="rectangular"
                    width="20%"
                    height={20}
                />
            </Box>

            <Box sx={{ display: "flex", gap: 4, my: 4 }}>
                {[...Array(skeletonCount)].map((_, index) => (
                    <Card
                        key={index}
                        sx={{
                            minWidth: { xs: "45%", sm: "25%" },
                            borderRadius: "8px",
                            boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                        }}
                    >
                        {/* Image Skeleton */}
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                height: { xs: "175px", sm: "276.37px" },
                                borderTopLeftRadius: "8px",
                                borderTopRightRadius: "8px",
                            }}
                        />
                        <CardContent sx={{ padding: { xs: 1, sm: 2 } }}>
                            {/* Title Skeleton */}
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.25rem" },
                                    marginBottom: 1,
                                }}
                            />
                            {/* Price Skeleton */}
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Skeleton variant="text" width="30%" />
                                <Skeleton variant="text" width="20%" />
                            </Box>
                            {/* Actions Skeleton */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                <Skeleton variant="circular" width={36} height={36} />
                                <Skeleton variant="circular" width={36} height={36} />
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default NewArrivalsShimmer;
