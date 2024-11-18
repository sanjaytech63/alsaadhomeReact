import { Box, Typography, Container, Breadcrumbs, Card, CardContent, Grid, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Add, Remove } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = ({ image, title, price, color, size, pattern }) => {
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (quantity !== 10) {
            setQuantity(quantity + 1);
        }
    }

    const decrementQuantity = () => {
        if (quantity !== 1) {
            setQuantity(quantity - 1);
        }
    }

    const handleDelete = () => {
        alert('Item deleted');
    }

    return (
        <Card sx={{ display: 'flex', mb: 2, boxShadow: " 0 0 7px rgb(0 0 0 / 10%)" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    loading="lazy"
                    sx={{
                        maxWidth: { sm: '250px', xs: '110px' },
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />

            </Box>
            <Box sx={{}}>
                <CardContent>
                    <Typography sx={{
                        fontSize: { sm: '1.1rem', xs: '1rem' }, fontWeight: 600, textTransform: 'capitalize', display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 2,
                    }}>{title}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Price: {price} AED</Typography>
                    {color && <Typography variant="body1" sx={{ fontWeight: '500' }}>Color:   <span style={{ backgroundColor: color, borderRadius: '50%', padding: '0 10px' }}> </span></Typography>}
                    {pattern && <Typography variant="body1" sx={{ fontWeight: '500' }}>Pattern:  <img src={pattern} alt="pattern" loading="lazy" style={{ width: '20px', height: '20px' }} /></Typography>}
                    <Typography variant="body1" sx={{ fontWeight: '500' }}>Size:  {size}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: "5px" }}>
                            <Typography onClick={decrementQuantity} sx={{ backgroundColor: "#eee", mr: 1 }}><Remove /></Typography>
                            <Typography sx={{ border: "solid 1px #ddd", px: 2 }} variant="body1">{quantity}</Typography>
                            <Typography onClick={incrementQuantity} sx={{ backgroundColor: "#eee", ml: 1 }}><Add /></Typography>
                        </Box>
                        <Box component="span" onClick={handleDelete} sx={{ color: '#bb1f2a', cursor: 'pointer', mr: 2 }}>
                            <RiDeleteBin5Line size={25} />
                        </Box>
                    </Box>
                </CardContent>
            </Box>
        </Card>
    );
};

const CartPage = () => {
    const nevigate = useNavigate();

    const products = [
        {
            image: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14727/thumb/lori-051728805716.jpg',
            title: 'Lori Hotel Cotton Comforter Bedding Set 6 PCS - King Size',
            price: '349',
            color: '#f8a5c2',
            size: 'Super King',
        },
        {
            image: 'https://al-saad-home.mo.cloudinary.net/uploads/products/14544/thumb/tokyo-121725627128.jpg',
            title: 'Lori Hotel Cotton Comforter Bedding Set 6 PCS - King Size',
            price: '99',
            pattern: 'https://via.placeholder.com/20',
            size: '180 X 240',
        },

    ];

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);
    return (
        <>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Shopping Cart
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
                                        style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize", }}
                                        to={path}
                                    >
                                        {decodeURIComponent(segment)}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Box>
                    <SearchBar />
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {products &&
                            products.map((product, index) => (
                                <Cart key={index} {...product} />
                            ))
                        }
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ p: 2, boxShadow: " 0 0 7px rgb(0 0 0 / 10%)" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", my: 2 }}>
                                <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "600", fontSize: { sm: "18px", xs: "16px" } }}>Sub Total</Typography>
                                <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "600", fontSize: { sm: "18px", xs: "16px" } }} >448.00 AED</Typography>
                            </Box>
                            <Button onClick={() => nevigate('/chekout')} variant="contained" sx={{ backgroundColor: "#bb1f2a", padding: "10px", mt: 1 }} fullWidth>
                                Proceed To Checkout
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center' }}>
                    <div className='row d-flex align-items-center justify-content-between my-4 px-2'>
                        <span className='col-5' style={{ backgroundColor: "#d9d9d9", height: "4px" }}></span>
                        <FaShoppingCart size={30} className='col-2' color="#d9d9d9" />
                        <span className='col-5' style={{ backgroundColor: "#d9d9d9", height: "4px" }}></span>
                    </div>
                </Box>
            </Container>
        </>
    );
};

export default CartPage;
