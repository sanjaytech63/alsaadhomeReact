import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';

const ProductListingMainContant = ({ productsCard }) => {
    const nevigate = useNavigate();

    const handleNavigate = () => {
        nevigate(`/category/subcategory/productlisting/productdetail`)
    }
    return (
        <>
            <Card sx={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", margin: { xs: 2, sm: "5px", cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)" } }}>
                <Box position="relative">
                    <Chip
                        label="New"
                        sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px" }}
                    />
                    <CardMedia onClick={handleNavigate}
                        sx={{ minHeight: { sm: "276.37px", xs: "175px" }, maxHeight: { sm: "400px", xs: "175px" }, objectFit: "cover" }}
                        component="img"
                        image={productsCard.image}
                        alt={productsCard.title}
                        loading="lazy"
                    />
                </Box>
                <CardContent sx={{ p: { xs: "8px", sm: "16px" } }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#292b2c",
                            fontWeight: 600,
                            fontSize: { xs: "15px", sm: "1rem" },
                            alignSelf: "flex-start",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            wordBreak: "break-all",
                            whiteSpace: "normal",
                            textOverflow: "ellipsis"
                        }}
                        component="div"
                    >
                        {productsCard.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body1" noWrap sx={{ color: "#bb1f2a", fontWeight: 600, fontSize: { xs: "14px", sm: "1rem" }, }}>
                            {productsCard.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton sx={{
                                p: { xs: "4px", sm: "8px" }, boxShadow: 2, ":hover": {
                                    backgroundColor: "#bb1f2a", color: "#fff"
                                }
                            }} onClick={() => alert('Added to cart!')} aria-label="add to cart">
                                <AddShoppingCart sx={{ fontSize: "1rem" }} />
                            </IconButton>
                            <IconButton sx={{
                                p: { xs: "4px", sm: "8px" }, boxShadow: 2, ":hover": {
                                    backgroundColor: "#bb1f2a", color: "#fff"
                                }
                            }} onClick={() => alert('Added to wishlist!')} aria-label="add to wishlist">
                                <FavoriteBorder sx={{ fontSize: "1rem" }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating name="no-value" value={null} />
                        <Typography variant="body2" sx={{ ml: 1, color: "#9a9696" }}>
                            ({productsCard.rating})
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
};

export default ProductListingMainContant;
