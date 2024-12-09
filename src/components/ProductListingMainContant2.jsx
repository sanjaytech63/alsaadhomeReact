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
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';

const ProductListingMainContant2 = ({ productsCard }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/prodect/123`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        alert('Added to cart!')
    }
    const handleAddToWishlist = (e) => {
        e.stopPropagation();
        alert('Added to wishlist!')
    }

    return (
        <>
            {productsCard.products && productsCard?.products.map((item) => (
                <Grid key={item.id} mb={4} >
                    <Card onClick={handleNavigate}
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
                                <Box sx={{ displayDirection: 'column', alignItems: 'center', gap: 1 }}>
                                    {item.sale_price > 0 && item.sale_price !== item.list_price &&
                                        <Typography noWrap sx={{ color: "#bb1f2a", fontWeight: 600, fontSize: { xs: "14px", sm: "1rem" }, }}>
                                            {item.sale_price} AED
                                        </Typography>
                                    }

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography noWrap sx={{ fontWeight: item.sale_price > 0 && item.sale_price !== item.list_price ? "0" : "600", color: item.sale_price > 0 && item.sale_price !== item.list_price ? "gray" : "#bb1f2a", textDecoration: item.sale_price > 0 && item.sale_price !== item.list_price ? "line-through" : "none", fontSize: { xs: "14px", sm: "1rem" }, }}>
                                            {item.list_price} AED
                                        </Typography>
                                        {item.sale_price > 0 && item.sale_price !== item.list_price &&
                                            <Typography noWrap sx={{ color: "green", fontSize: { xs: "14px", sm: "1rem" }, }}>
                                                {item.discount_label}
                                            </Typography>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', mt: 8, alignItems: 'center', gap: 2 }}>
                                <Button
                                    sx={{
                                        py: { xs: '6px', sm: '8px' },
                                        px: { xs: '6px', sm: '13px' },
                                        boxShadow: 2,
                                        backgroundColor: '#bb1f2a', color: '#fff',
                                        textTransform: 'capitalize',
                                    }}
                                    onClick={handleAddToCart}
                                >
                                    <Typography sx={{
                                        px: { xs: '6px', sm: '8px' },
                                    }}  >
                                        <svg className='cart-svg-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="#fff" d="M1015.66 284a31.82 31.82 0 0 0-25.999-13.502h-99.744L684.78 95.666c-24.976-24.976-65.52-25.008-90.495 0L392.638 270.498h-82.096l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.568 0-31.776 14.224-31.776 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.592 23.183h431.968c13.408 0 25.376-8.4 29.904-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM639.537 140.93l152.032 129.584H487.457zm175.488 579.263H429.538L328.386 334.065h616.096zm-63.023 127.936c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80m-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80" /></svg>

                                    </Typography>
                                    Add to Cart
                                </Button>
                                <IconButton
                                    sx={{
                                        p: { xs: '6px', sm: '8px' },
                                        boxShadow: 2,
                                        ':hover': { backgroundColor: '#bb1f2a', color: '#fff' },
                                    }}
                                    onClick={handleAddToWishlist}
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
