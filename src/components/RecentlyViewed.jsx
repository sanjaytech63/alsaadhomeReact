import { FavoriteBorder } from '@mui/icons-material';
import BoltIcon from '@mui/icons-material/Bolt';
import React from "react";
import Carousel from "react-multi-carousel";
import { Box, useMediaQuery, useTheme, IconButton, Typography, Container, Card, Chip, CardMedia, CardContent, Rating } from "@mui/material";
import { Link } from 'react-router-dom';
import CustomButtonGroup from './CustomButtonGroup';
const RecentlyViewed = ({ productsCard, title }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';

    return (
        <div className="w-100 ">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Box sx={{
                    px: {
                        xs: 2,
                        sm: "0px",
                    }, my: 3, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    <Typography variant="h5" sx={{
                        fontWeight: 600,
                        textAlign: "left",
                        fontSize: {
                            xs: "18px",
                            sm: "24px",
                        },
                    }}>{title}</Typography>
                    <Link state={{ type: 'display_banners' }} to={`/search?type=display-banner&id=${"recommended_product"}`} className='link-none'>
                        <Typography variant="h6" sx={{ color: "#bb1f2a", mt: 1, fontSize: "1rem", textAlign: "right" }}>
                            <BoltIcon />
                            View All
                        </Typography>
                    </Link>
                </Box>
                <hr />
                <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
                    <Carousel
                        rtl={isRTL}
                        additionalTransfrom={0}
                        autoPlaySpeed={3000}
                        renderButtonGroupOutside
                        arrows={false}
                        draggable
                        infinite={true}
                        responsive={{
                            desktop: {
                                breakpoint: { max: 3000, min: 1024 },
                                items: 4,
                            },
                            laptop: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 4,
                            },
                            tablet: {
                                breakpoint: { max: 768, min: 464 },
                                items: 2,
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 2,
                            },
                        }}

                        showDots={false}
                        slidesToSlide={3}
                        swipeable
                        customButtonGroup={!matchesSM ? <CustomButtonGroup top="48%" left="-45px" /> : null}
                    >
                        {productsCard && productsCard.map((item) => (
                            <Card key={item.product_id}
                                sx={{
                                    height: "100%",
                                    overflow: "hidden",
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px',
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    cursor: "pointer",
                                    boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                                    margin: {
                                        xs: 1, sm: "5px",
                                    },
                                }}
                            >
                                <Box position="relative">
                                    {
                                        item.is_new === true && <Chip
                                            label="New"
                                            sx={{ position: 'absolute', height: "24px", width: "50px", top: 10, right: 10, backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px" }}
                                        />
                                    }
                                    <Link state={{ product_id: item.product_id, variant_id: item.product_variant_id }} to={`/products/${item.slug}`} className='link-none'>
                                        <CardMedia
                                            sx={{ minHeight: { sm: "276.37px", xs: "175px" }, maxHeight: { sm: "276.37px", xs: "175px" }, objectFit: "cover" }}
                                            component="img"
                                            image={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </Link>
                                </Box>
                                <CardContent sx={{ p: { xs: "8px", sm: "16px" } }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontSize: "1rem",
                                            color: "292b2c",
                                            fontWeight: 500,
                                            lineHeight: "1.2",
                                            alignSelf: "flex-start",
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            wordBreak: "break-all",
                                            whiteSpace: "normal",
                                            textOverflow: "ellipsis",
                                            ":hover": {
                                                color: "#bb1f2a",
                                            }
                                        }}

                                    >
                                        {item.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex',flexWrap: "wrap", justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                        <Box sx={{ displayDirection: 'column', alignItems: 'center', gap: 1,mt:1 }}>
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
                                        <Box sx={{ display: 'flex',  alignItems: 'center', gap: 1,mt:1 }}>
                                            <IconButton sx={{
                                                p: { xs: "4px", sm: "8px" }, boxShadow: 2,
                                                ":hover": {
                                                    backgroundColor: "#bb1f2a",
                                                    color: "#fff",
                                                    "& .cart-svg-icon path": {
                                                        fill: "#fff",
                                                        transition: "fill 0.3s ease",
                                                    },
                                                },

                                            }} onClick={() => alert('Added to cart!')} aria-label="add to cart">
                                                <svg className='cart-svg-icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1024 1024"><path fill="#292b2c" d="M1015.66 284a31.82 31.82 0 0 0-25.999-13.502h-99.744L684.78 95.666c-24.976-24.976-65.52-25.008-90.495 0L392.638 270.498h-82.096l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.568 0-31.776 14.224-31.776 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.592 23.183h431.968c13.408 0 25.376-8.4 29.904-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM639.537 140.93l152.032 129.584H487.457zm175.488 579.263H429.538L328.386 334.065h616.096zm-63.023 127.936c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80m-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80" /></svg>
                                            </IconButton>
                                            <IconButton sx={{
                                                p: { xs: "4px", sm: "8px" }, boxShadow: 2, ":hover": {
                                                    backgroundColor: "#bb1f2a", color: "#fff",
                                                    transition: "fill 0.3s ease",
                                                }, color: "#292b2c"
                                            }} onClick={() => alert('Added to wishlist!')} aria-label="add to wishlist">
                                                <FavoriteBorder sx={{ fontSize: "1rem", }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                        <Rating disabled sx={{ fontSize: { xs: "1.3rem", sm: "1.5rem" } }} name="no-value" value={0} />
                                        <Typography variant="body2" sx={{ ml: 1, color: "#9a9696" }}>
                                            (0)
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </div>
    );
};

export default RecentlyViewed;
