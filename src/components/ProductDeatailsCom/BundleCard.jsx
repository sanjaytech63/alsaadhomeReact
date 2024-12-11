import { Box, Card, Typography,CardMedia,Button,CardContent } from '@mui/material'
import React from 'react'
import Carousel from 'react-multi-carousel'
import CustomButtonGroup from './CustomButtonGroup'

const BundleCard = ({bundleCard,isRTL,handleNavigate,pathname,matchesSM}) => {
    return (
        <>
            <Box sx={{ pt: 4, pb: 4, width: "100%" }}>
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#292b2c",
                            textTransform: "capitalize",
                            fontWeight: "700",
                            fontSize: { sm: "24px", xs: "16px" },
                        }}
                    >
                        {pathname === "/prodect/1234"
                            ? "Full Set / Package"
                            : "Product"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                        borderRadius: "8px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
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
                                items: 1,
                            },
                            laptop: {
                                breakpoint: { max: 1024, min: 768 },
                                items: 1,
                            },
                            tablet: {
                                breakpoint: { max: 768, min: 464 },
                                items: 1,
                            },
                            mobile: {
                                breakpoint: { max: 464, min: 0 },
                                items: 1,
                            },
                        }}
                        showDots={false}
                        slidesToSlide={1}
                        swipeable
                        customButtonGroup={
                            !matchesSM ? <CustomButtonGroup /> : null
                        }
                    >
                        {bundleCard.map((product) => (
                            <Box sx={{ px: 1 }}>
                                <Card
                                    sx={{
                                        width: "100%",
                                        boxShadow: "none",
                                        alignItems: "center",
                                        padding: { xs: "0px", sm: "12px" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        {/* Product Image */}
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                width: { xs: "100px", sm: "150px" },
                                                height: { xs: "100px", sm: "150px" },
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                                mr: { sm: 2 },
                                            }}
                                            image={product.imgSrc}
                                            alt={product.title}
                                        />
                                        {/* Product Details */}
                                        <CardContent
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                flexGrow: 1,
                                                p: { xs: 1, sm: 2 },
                                            }}
                                        >
                                            <Typography
                                                onClick={handleNavigate}
                                                variant="h6"
                                                sx={{
                                                    textTransform: "capitalize",
                                                    mt: 1,
                                                    fontWeight: 600,
                                                    fontSize: { sm: "16px", xs: "14px" },
                                                    "&:hover": { color: "#bb1f2a" },
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {product.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 1 }}
                                            >
                                                {product.offerTitle}
                                            </Typography>

                                            {product.discount && (
                                                <Box sx={{ display: "flex", gap: 1 }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: "#bb1f2a",
                                                            fontSize: { xs: "14px", sm: "16px" },
                                                        }}
                                                    >
                                                        {product.originalPrice} AED
                                                    </Typography>
                                                    <Typography sx={{ color: "green" }}>
                                                        ({product.discount}% off)
                                                    </Typography>
                                                </Box>
                                            )}

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    textTransform: "capitalize",
                                                    mt: 1,
                                                    textDecoration: "line-through",
                                                }}
                                            >
                                                {product.price} AED
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                    {/* Add to Cart Button */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            sx={{
                                                color: "#fff",
                                                width: "fit-content",
                                                height: "fit-content",
                                                background: "#bb1f2a",
                                                textTransform: "capitalize",
                                                textAlign: "right",
                                                padding: { xs: "2px 5px", sm: "5px 10px" },
                                            }}
                                        >
                                            Go to cart
                                        </Button>
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                    </Carousel>
                </Box>
            </Box>
        </>
    )
}

export default BundleCard
