import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Rating,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';

const ProductListingMainContant = ({ productsCard }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/prodect/123`);
    };

    return (
        <Grid   container spacing={2}>
            {productsCard && productsCard.map((item) => (
                <Grid key={item.id} item xs={6} sm={4} md={4}>
                    <Card  onClick={handleNavigate}
                        sx={{
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                            cursor: 'pointer',
                            boxShadow: '0 0 7px rgb(0 0 0 / 10%)',
                            margin: '5px',
                        }}
                    >
                        <Box>
                            <CardMedia
                               
                                sx={{
                                    minHeight: { sm: '276.37px', xs: '175px' },
                                    maxHeight: { sm: '400px', xs: '175px' },
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
                                    fontSize: { xs: '15px', sm: '1rem' },
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    justifyContent: 'space-between',
                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                    mt: 1,
                                    textAlign: 'left'
                                }}
                            >
                                <Box sx={{ display: 'block', }}>
                                    <Typography
                                        noWrap
                                        sx={{ color: '#bb1f2a', fontWeight: 600, fontSize: '15px' }}
                                    >
                                        {item.price}
                                    </Typography>
                                    <Typography noWrap sx={{ fontSize: '15px' }}>
                                        <span style={{ textDecoration: 'line-through', color: '#687188' }}>
                                            55 AED
                                        </span>{' '}
                                        <span style={{ color: 'green' }}>(5% Off)</span>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        gap: 2,
                                        mt: { xs: 1, sm: 0 }
                                    }}
                                >
                                    <IconButton
                                        sx={{
                                            p: { xs: '4px', sm: '8px' },
                                            boxShadow: 2,
                                            ':hover': { backgroundColor: '#bb1f2a', color: '#fff' }
                                        }}
                                        onClick={() => alert('Added to cart!')}
                                        aria-label="add to cart"
                                    >
                                        <AddShoppingCart sx={{ fontSize: '1rem' }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            p: { xs: '4px', sm: '8px' },
                                            boxShadow: 2,
                                            ':hover': { backgroundColor: '#bb1f2a', color: '#fff' }
                                        }}
                                        onClick={() => alert('Added to wishlist!')}
                                        aria-label="add to wishlist"
                                    >
                                        <FavoriteBorder sx={{ fontSize: '1rem' }} />
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <Rating sx={{ fontSize: { xs: "1.1rem", sm: "1.5rem" } }}  disabled name="no-value" value={null} />
                                <Typography variant="body2" sx={{ ml: { xs: 0, sm: 1 }, color: '#9a9696' }}>
                                    ({item.rating})
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductListingMainContant;
