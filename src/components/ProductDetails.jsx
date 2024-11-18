import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box, List, ListItem, Link, Card, CardContent, useTheme, Breadcrumbs, Rating, Avatar, IconButton, Table, TableBody, TableRow, TableCell, CardMedia, useMediaQuery } from '@mui/material';
import tamaraImg from "../../src/assets/tamara.svg";
import { Add, Remove } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Carousel from "react-multi-carousel";
import RecommendedProducts from './RecommendedProducts'
import ReactImageMagnify from 'react-image-magnify';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useLocation } from 'react-router-dom';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const product = {
    name: "Luri Duvet Cover Bedding Set 3 PCS - Single Multi Color",
    price: 149,
    availability: 13,
    description: "Enjoy a peaceful and comfortable sleep with the Microgel Pillow...",
    features: [
        "The pillow provides superior comfort with optimal microgel filling.",
        "It is characterized by high softness to ensure a comfortable and restful sleep.",
        "It is also covered with a soft microfiber fabric."
    ],
    details: {
        size: "(50 x 75) + 5 cm",
        weight: "1.75 KG",
        height: "12 cm",
        material: "Filling: Microgel, Fabric: Microfiber",
        hardness: "Super Soft"
    },
    images: [
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/11666/thumb/jasmine-0021682584449.jpg', alt: 'Pillow Image 1' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/unboxing_challenge/screenshot-2024-07-09-1556281720521386.png', alt: 'Pillow Image 2' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/unboxing_challenge/screenshot-2024-07-09-1557311720521388.png', alt: 'Pillow Image 3' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/unboxing_challenge/screenshot-2024-07-09-1602121720521388.png', alt: 'Pillow Image 1' },
        { src: 'https://img.youtube.com/vi/AXfoLRi_Efg/maxresdefault.jpg', alt: 'Pillow Image 2' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/engagement_categories/sub-catgory1709813964.jpg', alt: 'Pillow Image 3' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/engagement_categories/cat-engagement17138531841714302011.jpg', alt: 'Pillow Image 1' },
        { src: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/engagement_categories/sub-catgory17098124981714491386.jpg', alt: 'Pillow Image 2' },
    ]
};

const products = [
    {
        id: 1,
        title: "Luri Duvet Cover Bedding Set 3 PCS - Single Multi Color",
        price: 49,
        oldPrice: 99,
        discount: "51% Off",
        vatIncluded: true,
        ratings: 0,
        colorOptions: [
            "https://al-saad-home.mo.cloudinary.net/uploads/products/14718/luri-121728653637.jpg",
            "https://al-saad-home.mo.cloudinary.net/uploads/pattern/luri-081728651944.jpg",
            "https://al-saad-home.mo.cloudinary.net/uploads/pattern/luri-091728651944.jpg",
            "https://al-saad-home.mo.cloudinary.net/uploads/pattern/luri-101728651944.jpg",
            "https://al-saad-home.mo.cloudinary.net/uploads/pattern/luri-121728651944.jpg",
        ],
        size: "160 X 220",
        availability: 12,
        deliveryText: "Check your area to see if we deliver this product on same day or tomorrow.",
        paymentText: "Or split in 3 payments of AED 16.33 - No late fees, Sharia compliant!",
    },
];

const productDetails = [
    {
        model: "Arm-Q.Cover-3 Pcs-Luri 12",
        brand: {
            name: "Armada",
            link: "https://www.alsaadhome.com/en/aed/brand/armada"
        },
        tags: [
            { label: "Luri", link: "#" },
            { label: "Duvet Cover Bedding Set", link: "#" },
            { label: "طقم تلبسية", link: "#" },
            { label: "لوري", link: "#" }
        ],
        features: [
            "It is made with strength and durability to maintain its color stability and graphics stability with long use.",
            "Super soft, comfortable, improves your sleep level and makes you sleep better.",
            "Elastic sheet made of the best materials, strong and durable, designed to easily surround and protect the mattress."
        ],
        productDetails: {
            comforter: "1 PC Comforter (160 × 220) cm (Without filling)",
            fittedSheet: "1 PC Fitted sheet (120 × 200) + 25 cm",
            pillowShams: "1 PC Pillow Shams (50 x 70) cm + 5",
            color: "Multi Color",
            material: "Microfiber"
        },
        shareLinks: {
            facebook: "https://www.facebook.com/sharer/sharer.php?u=https://alsaadhome.page.link/kEUf7VJ578Q1xWyU7&display=popup",
            whatsapp: "https://api.whatsapp.com/send?text=https://alsaadhome.page.link/kEUf7VJ578Q1xWyU7"
        }
    }
];
const recommendedProducts = [
    {
        id: 1,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
        price: "199 AED",
        rating: 4,
    },
    {
        id: 2,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "249 AED",
        rating: 5,
    },
    {
        id: 3,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 3,
    },
    {
        id: 4,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 4,
    },

];

const reviews = [
    {
        id: 1,
        name: 'kkkk',
        image: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/customers/logo-21721644637.jpg',
        date: '21 Dec, 2023',
        rating: 20,  // 20% for 1 star
        reviewTitle: 'kkkk',
        reviewBody: 'Kkkk',
        likes: 0
    },
    {
        id: 2,
        name: 'beart',
        image: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/customers/logo-21721644637.jpg',
        date: '11 Dec, 2023',
        rating: 80,  // 80% for 4 stars
        reviewTitle: 'Awesome product exactly',
        reviewBody: 'Test',
        likes: 0
    },
    {
        id: 3,
        name: 'Gaurav',
        image: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/images/users/no-image.png',
        date: '08 Dec, 2023',
        rating: 100,  // 100% for 5 stars
        reviewTitle: 'this is the best',
        reviewBody: 'Best Product',
        likes: 0
    }
];
const productsCard = [
    {
        id: 1,
        title: 'bundle -091',
        imgSrc: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/12046/thumb/0217029769341703158835.jpg',
        offerTitle: '5432563225',
        price: 50,
        originalPrice: 60,
        discount: 5,
        link: 'https://staging.alsaadhome.com/en/aed/products/bundle-091-22305',
    },
    {
        id: 2,
        title: 'bundle -091',
        imgSrc: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/7692/thumb/lemon-soap-11654607508.jpg',
        offerTitle: '7654345654',
        price: 50,
        originalPrice: 60,
        discount: 5,
        link: 'https://staging.alsaadhome.com/en/aed/products/bundle-091-22305',
    },
    // Add more products as needed
];
const ProductDetails = () => {
    const [selectedColor, setSelectedColor] = useState(products[0].colorOptions[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0].src);
    const [count, setCount] = useState(1);
    const [isSlected, setIsSelected] = useState(false);
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isRTL = theme.direction === 'rtl';
    const incrementChange = () => {
        if (count !== 8) {
            setCount(count + 1);
        }
    }

    const dicrementChange = () => {
        if (count !== 1) {
            setCount(count - 1);
        }
    }
    const CustomButtonGroup = ({ next, previous }) => (
        <>
            <Box onClick={isRTL ? next : previous} sx={{
                position: "absolute",
                top: '48%',
                left: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowBackIos fontSize={"20px"} color="#222" />
            </Box>
            <Box onClick={isRTL ? previous : next} sx={{
                position: "absolute",
                top: '48%',
                right: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                transform: 'translateY(-50%)',
                direction: isRTL ? 'rtl' : 'ltr',
                cursor: 'pointer',
            }}>
                <MdOutlineArrowForwardIos fontSize={"20px"} color="#222" />
            </Box>
        </>
    );
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    return (
        <div style={{ minHeight: "100vh" }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Product Detail
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', marginRight: '8px' }}
                                to="/"
                            >
                                Home
                            </Link>
                            {pathnames.map((segment, index) => {
                                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                                const isLast = index === pathnames.length - 1;

                                return isLast ? (
                                    <span
                                        key={index}
                                        style={{ color: '#6c757d', textTransform: "capitalize" }}
                                    >
                                        {decodeURIComponent(segment)}
                                    </span>
                                ) : (
                                    <Link className='breadcrumbs-hover'
                                        key={index}
                                        style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }}
                                        to={path}
                                    >
                                        {decodeURIComponent(segment)}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>
            <Container maxWidth="lg" sx={{ my: 5 }}>
                <Grid container spacing={4}>
                    {/* Image Gallery */}
                    <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', position: 'relative' }}>
                                {/* <Magnifier
                                    src={selectedImage}
                                    loading="lazy"
                                    alt="Selected"

                                    style={{ width: '100%', borderRadius: '8px' }}
                                /> */}
                                <div className="image-magnifier-container" style={{
                                    width: '100%',
                                    height: '300px',
                                    maxWidth: '800px',
                                    margin: '0 auto',
                                    overflow: 'hidden',
                                }}>
                                    <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: 'Wristwatch by Ted Baker London',
                                                isFluidWidth: true,
                                                src: selectedImage,
                                                srcSet: selectedImage,

                                                className: 'magnify-image',
                                            },
                                            largeImage: {
                                                isFluidWidth: true,
                                                src: selectedImage,
                                                width: 1200,
                                                height: 800,
                                            },
                                            enlargedImageContainerStyle: {
                                                zIndex: 10,
                                            },
                                            enlargedImagePosition: 'over',
                                        }}
                                    />
                                </div>
                            </Box>

                            <Box sx={{ width: '100%', position: 'relative', mt: 2 }}>
                                <Carousel
                                    additionalTransfrom={0}
                                    autoPlaySpeed={3000}
                                    renderButtonGroupOutside
                                    arrows={true}
                                    draggable={true}
                                    infinite={true}
                                    responsive={{
                                        desktop: {
                                            breakpoint: { max: 3000, min: 1024 },
                                            items: 3,
                                        },
                                        laptop: {
                                            breakpoint: { max: 1024, min: 768 },
                                            items: 3,
                                        },
                                        tablet: {
                                            breakpoint: { max: 768, min: 464 },
                                            items: 3,
                                        },
                                        mobile: {
                                            breakpoint: { max: 464, min: 0 },
                                            items: 2,
                                        },
                                    }}
                                    showDots={false}
                                    slidesToSlide={3}
                                    swipeable={true}
                                >
                                    {product.images && product.images.map((img, idx) => (
                                        <Box sx={{ px: 1 }} key={idx}>
                                            <CardMedia
                                                component="img"
                                                src={img.src}
                                                alt={img.alt}
                                                loading="lazy"
                                                onClick={() => setSelectedImage(img.src)}
                                                sx={{
                                                    width: { sm: '170px', xs: '100%' },
                                                    height: { sm: '110px', xs: '80px' },
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                    border: selectedImage === img.src ? '2px solid #bb1f2a' : '1px solid gray',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Carousel>
                            </Box>
                            <Box sx={{ pt: 4, pb: 4, width: '100%' }}>
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                                        Full Set / Package
                                    </Typography>
                                </Box>
                                <Box sx={{ boxShadow: "0 0 7px rgb(0 0 0 / 10%)", borderRadius: '8px', overflow: 'hidden', position: 'relative', }}>
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
                                        slidesToSlide={3}
                                        swipeable
                                        customButtonGroup={!matchesSM ? <CustomButtonGroup /> : null}
                                    >
                                        {productsCard.map((product) => (
                                            <Box sx={{ px: 2 }}>
                                                <Card
                                                    sx={{
                                                        width: '100%',
                                                        boxShadow: "none",
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        alignItems: 'center',
                                                        padding: { xs: '8px', sm: '12px' },
                                                        flexDirection: { xs: 'column', sm: 'row' },
                                                    }}
                                                >
                                                    {/* Product Image */}
                                                    <CardMedia
                                                        component="img"
                                                        sx={{
                                                            width: { xs: '120px', sm: '150px' },
                                                            height: { xs: '120px', sm: '150px' },
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            mr: { sm: 2 },
                                                        }}
                                                        image={product.imgSrc}
                                                        alt={product.title}
                                                    />

                                                    {/* Product Details */}
                                                    <CardContent
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: { xs: 'center', sm: 'flex-start' },
                                                            textAlign: { xs: 'center', sm: 'left' },
                                                            flexGrow: 1,
                                                            p: { xs: 1, sm: 2 },
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                mt: 1,
                                                                fontWeight: 600,
                                                                fontSize: { sm: '16px', xs: '14px' },
                                                                "&:hover": { color: "#bb1f2a" },
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            {product.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                            {product.offerTitle}
                                                        </Typography>

                                                        {product.discount && (
                                                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                                <Typography sx={{ fontWeight: 600, color: '#bb1f2a', fontSize: { xs: '14px', sm: '16px' } }} >
                                                                    {product.originalPrice} AED
                                                                </Typography>
                                                                <Typography sx={{ color: 'green' }} >
                                                                    ({product.discount}% off)
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{
                                                                textTransform: 'capitalize',
                                                                mt: 1,
                                                                textDecoration: 'line-through',
                                                            }}
                                                        >
                                                            {product.price} AED
                                                        </Typography>
                                                    </CardContent>

                                                    {/* Add to Cart Button */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Button
                                                            variant="contained"
                                                            sx={{
                                                                width: { xs: '100%', sm: '130px' },
                                                                fontSize: '14px',
                                                                height: '40px',
                                                                backgroundColor: '#bb1f2a',
                                                                mb: { xs: 2, sm: 0 },
                                                                mt: { xs: 0, sm: 15 },
                                                            }}
                                                        >
                                                            Add to cart
                                                        </Button>
                                                    </Box>
                                                </Card>
                                            </Box>
                                        ))}
                                    </Carousel>
                                </Box>
                            </Box>

                        </Box>
                    </Grid>

                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{}}>
                            {products.map((product) => (
                                <Box key={product.id}>
                                    <Typography variant="h6" sx={{ fontSize: { sm: "1.4rem", xs: "1rem", fontWeight: 600 } }}>
                                        {product.title}
                                    </Typography>
                                    {/* Price & Rating */}
                                    <Box sx={{ display: { sm: "flex", xs: "block" } }} alignItems="center" justifyContent="space-between" mt={2}>
                                        <Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography sx={{ fontSize: { sm: "1.2rem", xs: "1rem" }, fontWeight: "500", color: "#bb1f2a" }} >
                                                    {product.price} AED
                                                </Typography>
                                                <Typography sx={{ fontSize: { sm: "1.2rem", xs: "1rem" }, fontWeight: "500", color: "green", textDecoration: 'line-through', mx: 2 }}>
                                                    {product.oldPrice} AED
                                                </Typography>
                                                <Typography sx={{ fontSize: { sm: "1.2rem", xs: "1rem" }, fontWeight: "500", color: "green", }}>
                                                    {product.discount}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="textSecondary" mt={1}>
                                                {product.vatIncluded ? "(Price includes VAT)" : ""}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Rating disabled value={product.ratings} />
                                            <Typography component="legend">({product.ratings}) ratings</Typography>
                                        </Box>
                                    </Box>

                                    {/* Color Options */}
                                    <Box mt={2}>
                                        <Typography variant="body1" fontWeight="bold">
                                            Color
                                        </Typography>
                                        <Box display="flex" gap={1} mt={1}>
                                            {product.colorOptions.map((color, index) => (
                                                <img
                                                    key={index}
                                                    src={color}
                                                    loading="lazy"
                                                    alt={`color-${index}`}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        border: selectedColor === color ? '2px solid #bb1f2a' : '1px solid #ccc',
                                                        borderRadius: '50%',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => setSelectedColor(color)}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    {/* Size */}
                                    <Box mt={2} display="flex" alignItems="center" gap={2}>
                                        <Typography variant="body1" color="#687188">
                                            Size
                                        </Typography>
                                        <Typography sx={{ backgroundColor: '#bb1f2a', color: '#fff', padding: '3px 10px', borderRadius: '4px' }}>
                                            {product.size}
                                        </Typography>
                                    </Box>

                                    {/* Availability */}
                                    <Box mt={2}>
                                        <Typography variant="body1" sx={{ color: "#687188" }} fontWeight="bold">
                                            Availability: <span style={{ color: "green" }}>{product.availability} Item{product.availability > 1 ? 's' : ''} in stock</span>
                                        </Typography>
                                    </Box>

                                    {/* Delivery Text */}
                                    <Box mt={2}>
                                        <Typography variant="body2" color="#687188">
                                            {product.deliveryText}{' '}
                                            <Typography variant="body2" color="#bb1f2a" component="span">
                                                Select Area
                                            </Typography>
                                        </Typography>
                                    </Box>

                                    {/* Payment Options */}
                                    <Box sx={{ padding: 2, mt: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
                                        <Box>
                                            <Typography variant="body2" color="textSecondary">
                                                {product.paymentText}
                                            </Typography>
                                            <img src={tamaraImg} loading="lazy" alt="tamara" style={{ marginTop: '5px' }} />
                                        </Box>
                                    </Box>

                                    {/* Quantity and Add to Cart */}
                                    <Box sx={{ display: { xs: 'block', sm: 'flex' }, }} alignItems="center" gap={2} mt={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                                            <Typography onClick={dicrementChange} sx={{ backgroundColor: "#eee", mr: 1, cursor: "pointer" }}><Remove /></Typography>
                                            <Typography sx={{ border: "solid 1px #ddd", px: 2 }} variant="body1">{count}</Typography>
                                            <Typography onClick={incrementChange} sx={{ backgroundColor: "#eee", ml: 1, cursor: "pointer" }}><Add /></Typography>
                                        </Box>

                                        <Box sx={{ pt: { xs: 2, sm: 0 }, gap: 2, display: 'flex', alignItems: 'center' }}>
                                            <Button variant="contained" sx={{ backgroundColor: '#bb1f2a', color: '#fff', }} startIcon={<MdOutlineShoppingCart />}>
                                                Add to Cart
                                            </Button>
                                            <IconButton aria-label="add to favorites" sx={{ ":hover": { color: "#bb1f2a" }, borderRadius: "50%", backgroundColor: "#eee" }}  >
                                                <FavoriteBorderIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                        <Box sx={{ mb: 4 }}>
                            {productDetails.map((product, index) => (
                                <Box key={index}>
                                    <List>
                                        <ListItem>
                                            <Typography variant="body1"><strong color='#687188'>Model:</strong> {product.model}</Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="body1">
                                                <strong color='#687188'>Brand:</strong>
                                                <Link sx={{ textDecoration: 'none', color: "#292b2c" }} href={product.brand.link} color="primary" target="_blank" rel="noopener">
                                                    {` ${product.brand.name}`}
                                                </Link>
                                            </Typography>
                                        </ListItem>
                                        <ListItem>
                                            <Typography variant="body1">
                                                <strong color='#687188'>Tags:</strong>
                                                {product.tags.map((tag, idx) => (
                                                    <React.Fragment key={idx}>
                                                        <Link href={tag.link} rel="tag" sx={{ textDecoration: 'none', color: "#292b2c" }}>
                                                            {tag.label}
                                                        </Link>
                                                        {idx < product.tags.length - 1 && ','}
                                                    </React.Fragment>
                                                ))}
                                            </Typography>
                                        </ListItem>
                                    </List>
                                    {/* Share Section */}
                                    <Box mt={3} display="flex" gap={2} alignItems="center">
                                        <Typography variant="body1" color="#687188"><strong>Share:</strong></Typography>
                                        <span style={{ backgroundColor: "#1877f2", padding: "4px 8px", borderRadius: "4px", color: "#fff" }}><FaFacebookF /></span>
                                        <span style={{ backgroundColor: "#12af0a", padding: "3px", borderRadius: "4px", color: "#fff" }}><WhatsAppIcon /> </span>
                                    </Box>
                                    {/* Features */}
                                    <Typography variant="h6" fontWeight="bold" mt={2}>Features</Typography>
                                    <List>
                                        {product.features.map((feature, idx) => (
                                            <ListItem key={idx}>
                                                <Typography variant="body1">{feature}</Typography>
                                            </ListItem>
                                        ))}
                                    </List>

                                    {/* Product Details */}
                                    <Typography variant="h6" fontWeight="bold" mt={2}>Product Details</Typography>
                                    <Table sx={{ maxWidth: '100%' }}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <List>
                                                        <ListItem>{product.productDetails.comforter}</ListItem>
                                                        <ListItem>{product.productDetails.fittedSheet}</ListItem>
                                                        <ListItem>{product.productDetails.pillowShams}</ListItem>
                                                    </List>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <strong>Color:</strong>
                                                </TableCell>
                                                <TableCell>{product.productDetails.color}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    <strong>Material:</strong>
                                                </TableCell>
                                                <TableCell>{product.productDetails.material}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Box id="Reviews" sx={{ width: '100%', }} >
                    <Box sx={{ my: { sm: 6, xs: 3 }, alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                                Customer Reviews
                            </Typography>
                            <Rating
                                value={null}
                                precision={0.5}
                                readOnly
                            />
                        </Box>
                        <Typography sx={{ fontSize: { sm: 16, xs: 14 } }}>
                            3.3 out of 5
                        </Typography>
                    </Box>
                    <hr />
                    {/* Reviews List */}
                    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        {reviews.map((review) => (
                            <Box
                                key={review.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #ddd',
                                    p: 2,
                                    mb: 2,
                                    width: '100%',
                                    boxSizing: 'border-box',
                                    borderRadius: 2
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar
                                        src={review.image}
                                        alt={review.name}
                                        sx={{ width: 40, height: 40, mr: 2 }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                            {review.name}
                                        </Typography>

                                    </Box>
                                    <Box sx={{ alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Rating
                                                value={review.rating}
                                                precision={0.5}
                                                readOnly
                                            />

                                            <ThumbUpOffAltIcon />
                                            <Typography sx={{ mt: "4px" }}>
                                                {review.likes}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                            {review.date}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                    {review.reviewTitle}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1, textTransform: 'capitalize' }}>
                                    {review.reviewBody}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
            <div className='mb-5'>
                <RecommendedProducts productsCard={recommendedProducts} />
            </div>
        </div>
    );
};

export default ProductDetails;
