import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Button, Box, List, ListItem, Link, Breadcrumbs, Rating, IconButton, Table, TableBody, TableRow, TableCell, CardMedia } from '@mui/material';
import tamaraImg from "../../src/assets/tamara.svg";
import { Add, Remove } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Carousel from "react-multi-carousel";
import { useLocation } from 'react-router-dom';
import { smartShoppingApi } from '../utils/services/smartShopping';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { keyframes } from "@mui/system";

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
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 1' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 2' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 3' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 1' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 2' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 3' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 1' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 2' },
        { src: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14718/thumb/luri-121728653637.jpg', alt: 'Pillow Image 3' }
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

const SmartShoppingDetails = () => {
    const [selectedColor, setSelectedColor] = useState(products[0].colorOptions[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0].src);
    const [count, setCount] = useState(1);
    const [data, setData] = useState(null);

    const incrementChange = () => {
        if (count !== 10) {
            setCount(count + 1);
        }
    }

    const dicrementChange = () => {
        if (count !== 1) {
            setCount(count - 1);
        }
    }

    const tags = [
        { id: 1, label: 'Duvet Cover', position: { top: 110, left: 30 } },
        { id: 2, label: 'Bedspread', position: { top: 20, right: 120 } },
        { id: 3, label: 'Throw', position: { top: { sm: 200, xs: 90 }, right: { sm: 110, xs: 50 } } },
    ];

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const ping = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  75% {
    transform: scale(2);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

    const smartShoppingDetails = async () => {
        try {
            const requestBody = {
                engagement_id: "5"
            }
            const response = await smartShoppingApi.smartShoppingDetailsApi(requestBody);
            if (response && response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error, "error in smart shopping smartShoppingDetails ")
        }
    }

    useEffect(() => {
        smartShoppingDetails();
    }, []);

    return (
        <div style={{ minHeight: "100vh" }}>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { xs: "block", sm: "flex" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Comforter Set
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
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
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', position: 'relative' }}>
                                <img
                                    src={data?.image || "https://www.k12digest.com/wp-content/uploads/2024/03/1-3-550x330.jpg"}
                                    loading="lazy"
                                    alt={data?.title || "Image"}
                                    style={{ width: data?.background_image_width, height: data?.background_image_height, }}
                                />

                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "95%",
                                        height: "100%",
                                    }}
                                >
                                    <Box sx={{ position: "absolute", top: "2%", left: "0%", cursor: "pointer", zIndex: 1, width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)" }}>
                                        Piker
                                    </Box>


                                    <Box sx={{ position: "absolute", top: "2%", right: "0%", cursor: "pointer", zIndex: 1, width: "35px", height: "35px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderRadius: "50%", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)" }}>
                                        <VisibilityIcon />
                                    </Box>

                                    {data?.tag_list?.map((tag, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                position: "absolute",
                                                top: `${tag.top}%`,
                                                left: `${tag.left}%`,
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            {/* Pointer Icon */}
                                            <Box
                                                sx={{
                                                    width: "20px",
                                                    height: "20px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                    borderRadius: "50%",
                                                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        width: "20px",
                                                        height: "20px",
                                                    }}
                                                >
                                                    {/* Pulsing Effect */}
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            width: "100%",
                                                            height: "100%",
                                                            borderRadius: "50%",
                                                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                                                            animation: `${ping} 1.5s cubic-bezier(0, 0, 0.2, 1) infinite`,
                                                        }}
                                                    />

                                                    {/* Static Center Dot */}
                                                    <Box
                                                        sx={{
                                                            width: "10px",
                                                            height: "10px",
                                                            backgroundColor: "red",
                                                            borderRadius: "50%",
                                                            position: "absolute",
                                                            top: "50%",
                                                            left: "50%",
                                                            transform: "translate(-50%, -50%)",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>

                                            {/* Line Connector */}
                                            <Box
                                                sx={{
                                                    width: "30px",
                                                    height: "2px",
                                                    backgroundColor: "black",
                                                    marginLeft: "4px",
                                                }}
                                            ></Box>

                                            {/* Tag Label */}
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontSize: "12px",
                                                    fontWeight: "bold",
                                                    color: "#000",
                                                    backgroundColor: "#fff",
                                                    padding: "6px 12px",
                                                    borderRadius: "16px",
                                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                                                }}
                                            >
                                                {tag.text}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                            </Box>

                            {/* <Box sx={{ width: '100%', position: 'relative', mt: 2 }}>
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
                                            items: 3,
                                        },
                                    }}
                                    showDots={false}
                                    slidesToSlide={3}
                                    swipeable={true}
                                >
                                    {product.images && product.images.map((img, idx) => (
                                        <Box sx={{ px: 1 }}>
                                            < img key={idx}
                                                src={img.src}
                                                alt={img.alt}
                                                loading="lazy"
                                                onClick={() => setSelectedImage(img.src)}
                                                style={{
                                                    width: '100%',
                                                    cursor: 'pointer',
                                                    border: selectedImage === img.src ? '1px solid lightgray' : '1px solid #bb1f2a',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Carousel>
                            </Box> */}
                        </Box>
                    </Grid>
                    {/* Product Details */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{}}>
                            {products.map((product) => (
                                <Box key={product.id}>
                                    <Typography variant="h5" sx={{ fontSize: { sm: "1.5rem", xs: "1rem", fontWeight: 600 } }}>
                                        {product.title}
                                    </Typography>
                                    {/* Price & Rating */}
                                    <Box sx={{ display: { sm: "flex", xs: "block" } }} alignItems="center" justifyContent="space-between" mt={2}>
                                        <Box>
                                            <Box display="flex" alignItems="center">
                                                <Typography sx={{ fontSize: { sm: "1.5rem", xs: "1rem" }, fontWeight: "500", color: "#bb1f2a" }} >
                                                    {product.price} AED
                                                </Typography>
                                                <Typography sx={{ fontSize: { sm: "1.5rem", xs: "1rem" }, fontWeight: "500", color: "green", textDecoration: 'line-through', mx: 2 }}>
                                                    {product.oldPrice} AED
                                                </Typography>
                                                <Typography sx={{ fontSize: { sm: "1.5rem", xs: "1rem" }, fontWeight: "500", color: "green", }}>
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
            </Container>
        </div >
    );
};

export default SmartShoppingDetails;
