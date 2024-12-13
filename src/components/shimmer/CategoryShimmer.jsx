import React from "react";
import { Grid, Skeleton, Box } from "@mui/material";

const CategoryShimmer = () => {
    return (
        <Grid container spacing={2} sx={{ my: 5, pb: 4 }}>
            {[...Array(9)].map((_, index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Box
                        sx={{
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 3,
                        }}
                    >
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            height={200}
                            sx={{ borderRadius: 2 }}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default CategoryShimmer;
