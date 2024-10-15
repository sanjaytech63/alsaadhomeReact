import { Box, Container, Grid } from '@mui/material';
import React from 'react';

const Products = ({ products }) => {
    return (
        <div className="my-4">
            <Container maxWidth="lg" sx={{ px: 2 }}>
                <Grid container spacing={2}>
                    {products && products.map((product, index) => (
                        <Grid item xs={6} sm={6} md={3} key={index}>
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
                                <img
                                    style={{
                                        width: "100%",
                                        height: "150px",
                                        objectFit: "cover",
                                    }}
                                    src={product.src}
                                    alt="product-image"
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Products;
