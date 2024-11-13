import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Chip,
    Rating,
    Grid,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';

const ProductListingMainContant2 = ({ productsCard }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/prodect/123`);
    };

    return (
        <>
            {productsCard && productsCard.map((item) => (
                <Grid key={item.id} mb={4} >
                    <Card
                        sx={{
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 0 7px rgb(0 0 0 / 10%)',
                            margin: '5px',
                            display: 'flex',
                            overflow: 'hidden',

                        }}
                    >
                        <Box>
                            <CardMedia
                                onClick={handleNavigate}
                                sx={{
                                    maxWidth: { sm: '275.37px', xs: '175px' },
                                    minHeight: "100%",
                                    objectFit: 'cover',
                                }}
                                component="img"
                                image={item.image}
                                alt={item.title}
                                loading="lazy"
                            />
                        </Box>
                        <CardContent sx={{ p: { xs: '8px', sm: '16px' } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#292b2c',
                                    fontWeight: 600,
                                    fontSize: '15px',
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    wordBreak: 'break-all',
                                    textOverflow: 'ellipsis',
                                    ':hover': { color: '#bb1f2a' },
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                <Box sx={{ display: 'block', alignItems: 'center' }}>
                                    <Typography noWrap sx={{ color: '#bb1f2a', fontWeight: 600, fontSize: '15px', }}>
                                        {item.price}
                                    </Typography>
                                    <Typography noWrap sx={{ fontSize: '15px', }}>
                                        <span style={{ textDecoration: 'line-through', color: '#687188' }}>55 AED</span> <span style={{ color: 'green' }}>(5% Off)</span>
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                    <Rating disabled name="no-value" value={null} />
                                    <Typography variant="body2" sx={{ ml: 1, color: '#9a9696' }}>
                                        ({item.rating})
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mt: 8, alignItems: 'center', gap: 2 }}>
                                <Button
                                    sx={{
                                        px: 3,
                                        boxShadow: 2,
                                        backgroundColor: '#bb1f2a', color: '#fff',
                                    }}
                                    onClick={() => alert('Added to cart!')}
                                >
                                    <AddShoppingCart sx={{ fontSize: '1rem', mr: 1 }} /> Add To Cart
                                </Button>
                                <IconButton
                                    sx={{
                                        p: { xs: '4px', sm: '8px' },
                                        boxShadow: 2,
                                        ':hover': { backgroundColor: '#bb1f2a', color: '#fff' },
                                    }}
                                    onClick={() => alert('Added to wishlist!')}
                                    aria-label="add to wishlist"
                                >
                                    <FavoriteBorder sx={{ fontSize: '1rem' }} />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
};

export default ProductListingMainContant2;
