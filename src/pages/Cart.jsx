import { Box, Typography, Container, Breadcrumbs, Card, CardContent, Grid, IconButton, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React, { useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { Add, Remove, Delete } from '@mui/icons-material';
import SearchBar from '../components/SearchBar';

const Cart = ({ image, title, price, color, size, pattern }) => {
    const [quantity, setQuantity] = useState(0);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        setQuantity(quantity - 1);
    }
    return (
        <Card sx={{ display: 'flex', mb: 2 }}>
            <Box sx={{ width: { xs: '40%', md: '30%' }, display: 'flex', alignItems: 'center' }}>
                <Box
                    component="img"
                    src={image}
                    alt={title}
                    loading="lazy"
                    sx={{
                        maxWidth: { sm: '188px', xs: '110px' },
                        height: '100%',
                    }}
                />

            </Box>
            <Box sx={{ width: '70%', }}>
                <CardContent>
                    <Typography variant="h6" noWrap>{title}</Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}><strong>Price:</strong> <strong>{price} AED</strong></Typography>
                    {color && <Typography variant="body1"><strong>Color: </strong>  <span style={{ backgroundColor: color, borderRadius: '50%', padding: '0 10px' }}> </span></Typography>}
                    {pattern && <Typography variant="body1"><strong>Pattern: </strong> <img src={pattern} alt="pattern" loading="lazy" style={{ width: '20px', height: '20px' }} /></Typography>}
                    <Typography variant="body1"><strong>Size: </strong> <strong>{size}</strong></Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <IconButton onClick={decrementQuantity} sx={{ p: 1, backgroundColor: "#eee", mr: 1 }}><Remove /></IconButton>
                        <Typography sx={{ border: "solid 1px #ddd", px: 2 }} variant="body1">{quantity}</Typography>
                        <IconButton onClick={incrementQuantity} sx={{ p: 1, backgroundColor: "#eee", ml: 1 }}><Add /></IconButton>
                        <IconButton sx={{ color: 'red', ml: 'auto' }}><Delete /></IconButton>
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
            title: 'Tokyo BedSpread Bedding Set 4 PCS - Single Grey',
            price: '99',
            pattern: 'https://via.placeholder.com/20',
            size: '180 X 240',
        },

    ];

    return (
        <>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            Shopping Cart
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                            <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Shopping Cart</Link>
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
                        <Box sx={{ p: 2, border: "solid 1px #ddd" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", my: 2 }}>
                                <Typography sx={{ color: "#212529" }}>Sub Total</Typography>
                                <Typography sx={{ color: "#212529" }} >448.00 AED</Typography>
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
