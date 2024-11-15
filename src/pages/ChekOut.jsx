import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Container, Box, Select, MenuItem, Checkbox, FormControl,  Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import { FaRegCreditCard } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import tamaraImg from "../../src/assets/tamara.svg"
import { useNavigate } from 'react-router-dom';
const Checkout = () => {
    const [countryCode, setCountryCode] = useState("+ 968");
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };

    const handelChecked = (id) => {
        setChecked(id);
    }
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const orderData = [
        {
            id: 1,
            imgSrc: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/12126/thumb/flow-041727958393.jpg',
            name: 'Luxury Bed Sheet Set - King Size',
            price: 299.0,
        },
        {
            id: 2,
            imgSrc: 'https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/12126/thumb/flow-041727958393.jpg',
            name: 'Luxury Bed Sheet Set - King Size',
            price: 450.0,
        },
    ];


    const total = 299.0;
    const processing = 33.0;
    const shipping = 0.00;
    const finalTotal = total + processing + shipping;

    const navigate = useNavigate();

    const navigateToTermsCondactions = () => {
        navigate("/terms-of-use")
    }

    return (
        <Box sx={{ my: 2, }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} >
                        <Box sx={{ my: 2, py: 2, backgroundColor: "#f7f7f7", px: 3, display: "flex", alignItems: "center", gap: 1 }}>
                            <LocalOfferIcon sx={{ color: "#bb1f2a" }} />
                            <Typography color='#687188' sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="h6">Do you have a coupon?</Typography>
                        </Box>
                        <Box
                            sx={{
                                border: { sm: '1px solid #e0e0e0', xs: 'none' },
                                padding: { sm: 3, xs: 0 },
                            }}
                        >
                            <Grid
                                container
                                alignItems="stretch"
                                sx={{ gap: { sm: 2, xs: 0 } }}
                            >
                                <Grid item xs={6} sm={7}>
                                    <TextField
                                        fullWidth
                                        label="Enter Coupon"
                                        variant="outlined"
                                        sx={{
                                            height: '52px',
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%',
                                                borderRadius: { sm: 0, xs: '8px 0 0 8px' },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            borderRadius: { sm: 0, xs: '0 8px 8px 0' },
                                            height: '52px',
                                            padding: 0,
                                            backgroundColor: '#bb1f2a',
                                        }}
                                    >
                                        Apply Coupon
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', my: { xs: 2, sm: 4 } }}>
                            <Box sx={{ flex: 1, height: '4px', backgroundColor: '#d9d9d9' }}></Box>
                            <FaRegCreditCard size={30} color="#d9d9d9" style={{ margin: '0 16px' }} />
                            <Box sx={{ flex: 1, height: '4px', backgroundColor: '#d9d9d9' }}></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography sx={{ color: "#292b2c", fontSize: "22px", fontWeight: "700", mb: 4 }} variant="h6" gutterBottom>
                            Billing Details
                        </Typography>
                        <Box sx={{}}>
                            <TextField fullWidth label="Name" variant="outlined" sx={{ marginBottom: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                                <Grid container spacing={2}>
                                    {/* Select Country Code */}
                                    <Grid item xs={5} sm={4}>
                                        <FormControl fullWidth>
                                            <Select
                                                value={countryCode}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    padding: '2px 4px',
                                                    border: '1px solid #ccc',
                                                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                    ".MuiSelect-select": {
                                                        padding: "13px 0px",
                                                        fontSize: "14px",
                                                        color: "#333",
                                                    },
                                                }}
                                            >
                                                <MenuItem value="Select Country Code" disabled hidden>
                                                    Select Country
                                                </MenuItem>
                                                <MenuItem value="+ 971">
                                                    <img
                                                        src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                                        alt="UAE"
                                                        style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                                    />
                                                    + 971
                                                </MenuItem>
                                                <MenuItem value="+ 968">
                                                    <img
                                                        src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                                        alt="Oman"
                                                        style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                                    />
                                                    + 968
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Mobile Number Input */}
                                    <Grid item xs={7} sm={8}>
                                        <TextField fullWidth type="number" label="Mobile Number" required />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                                <Grid container spacing={2}>
                                    {/* Select Country Code */}
                                    <Grid item xs={5} sm={4}>
                                        <FormControl fullWidth>
                                            <Select
                                                value={countryCode}
                                                onChange={handleChange}
                                                variant="outlined"
                                                sx={{
                                                    padding: '2px 4px',
                                                    border: '1px solid #ccc',
                                                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                    ".MuiSelect-select": {
                                                        padding: "13px 0px",
                                                        fontSize: "14px",
                                                        color: "#333",
                                                    },
                                                }}
                                            >
                                                <MenuItem value="Select Country Code" disabled hidden>
                                                    Select Country
                                                </MenuItem>
                                                <MenuItem value="+ 971">
                                                    <img
                                                        src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                                        alt="UAE"
                                                        style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                                    />
                                                    + 971
                                                </MenuItem>
                                                <MenuItem value="+ 968">
                                                    <img
                                                        src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                                        alt="Oman"
                                                        style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                                    />
                                                    + 968
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    {/* Mobile Number Input */}
                                    <Grid item xs={7} sm={8}>
                                        <TextField fullWidth type="number" label="Whatsapp Number" required />
                                    </Grid>
                                </Grid>
                            </Box>

                            <TextField fullWidth label="Email" variant="outlined" sx={{ my: 2 }} />

                            <Button onClick={handleOpen} fullWidth variant="contained" sx={{ marginBottom: 2, backgroundColor: "#bb1f2a" }}>
                                Shipping Address
                            </Button>
                            <Dialog disableScrollLock open={open} onClose={handleClose} fullWidth maxWidth="md">
                                <DialogTitle>
                                    <TextField label="Enter a location" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} />
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                        sx={{ position: 'absolute', right: "20px", top: "20px" }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>
                                <DialogContent>
                                    <Box sx={{ height: '400px', width: '100%' }}>
                                        <iframe
                                            src="https://www.google.com/maps?q=Shanghai+location&output=embed"
                                            style={{ border: 0, width: '100%', height: '100%' }}
                                            allowFullScreen
                                            loading="lazy"
                                            title="Google Maps"
                                        />
                                    </Box>
                                </DialogContent>
                            </Dialog>
                            <Select fullWidth variant="outlined" defaultValue="Select Country" sx={{ marginBottom: 2 }}>
                                <MenuItem value="Select Country">Select City</MenuItem>
                                <MenuItem value="uae">United Arab Emirates</MenuItem>
                            </Select>
                            <Select fullWidth variant="outlined" defaultValue="Select Country" sx={{ marginBottom: 2 }}>
                                <MenuItem value="Select Country">Select Country</MenuItem>
                                <MenuItem value="dubai">Dubai</MenuItem>
                            </Select>
                            <TextField fullWidth label="Appartment No." variant="outlined" sx={{ marginBottom: 2 }} />
                            <TextField fullWidth label="Building No." variant="outlined" sx={{ marginBottom: 2 }} />
                            <TextField fullWidth label="Note" variant="outlined" sx={{ marginBottom: 2 }} />
                            <TextField fullWidth label="Adderss" variant="outlined" sx={{ marginBottom: 2 }} />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                padding: 2,
                                backgroundColor: "#f7f8fb"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#292b2c",
                                    fontSize: { xs: "18px", md: "22px" },
                                    fontWeight: "700",
                                    mb: 2
                                }}
                                variant="h6"
                            >
                                Your Orders
                            </Typography>
                            <hr />
                            <Grid container sx={{ alignItems: 'center', padding: 1, }}>
                                {/* Photo Header */}
                                <Grid item xs={3} sm={2}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Photo
                                    </Typography>
                                </Grid>
                                {/* Product Header */}
                                <Grid item xs={6} sm={8}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600",

                                        }}
                                    >
                                        Product
                                    </Typography>
                                </Grid>
                                {/* Total Header */}
                                <Grid item xs={3} sm={2} sx={{ textAlign: 'right' }}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Total
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            {orderData.map((product) => (
                                <Grid
                                    key={product.id}
                                    container
                                    spacing={2}
                                    sx={{
                                        alignItems: 'center',
                                        marginBottom: 2,
                                        textAlign: { xs: 'center', sm: 'left' },
                                    }}
                                >
                                    {/* Product Image */}
                                    <Grid item xs={3} sm={2}>
                                        <img
                                            src={product.imgSrc}
                                            alt="product"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                            }}
                                            loading="lazy"
                                        />
                                    </Grid>
                                    {/* Product Name */}
                                    <Grid item xs={6} sm={8}>
                                        <Typography sx={{ ":hover": { color: "#bb1f2a" }, fontSize: { xs: '14px', sm: '16px' }, }}>
                                            {product.name}
                                        </Typography>
                                    </Grid>
                                    {/* Product Price */}
                                    <Grid item xs={3} sm={2} sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, }}>
                                            {product.price.toFixed(2)} AED
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}


                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Sub Total</Typography>
                                <Typography>{total.toFixed(2)} AED</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Flat Shipping Rate</Typography>
                                <Typography>{shipping.toFixed(2)} AED</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Cod Processing Fee</Typography>
                                <Typography>{processing.toFixed(2)} AED</Typography>
                            </Box>
                            <hr />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography sx={{ fontWeight: 700 }}>Final Total</Typography>
                                <Typography sx={{ fontWeight: 700 }}>{finalTotal.toFixed(2)} AED</Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                my: 4,
                                padding: 2,
                                backgroundColor: "#f7f8fb"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#292b2c",
                                    fontSize: { xs: "18px", md: "22px" },
                                    fontWeight: "700"
                                }}
                                gutterBottom
                                variant="h6"
                            >
                                Payment Method
                            </Typography>
                            <Box
                                sx={{
                                    boxShadow: 2,
                                    padding: 2,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    backgroundColor: "#fff",
                                    borderRadius: '10px',
                                    my: 2
                                }}
                            >
                                <Typography onClick={(id) => handelChecked(id)} sx={{
                                    width: '20px',
                                    height: '20px',
                                    mr: 2,
                                    border: checked ? '2px solid #bb1f2a' : 'none',
                                    background: checked ? '#fff' : '#e1e8ee',
                                    borderRadius: '50%',
                                    boxShadow: '0 0.08rem 0 rgba(20, 28, 35, 0.25) inset',
                                    transition: 'background 0.3s ease',
                                    cursor: 'pointer',
                                }} />
                                <Box
                                    sx={{
                                        padding: 2,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '10px',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        textAlign: { xs: 'center', sm: 'left' }
                                    }}
                                >
                                    <Box>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            Or split in 3 payments of <strong>AED 53.00</strong> - No late fees,
                                        </Typography>
                                        <Typography sx={{ fontSize: "14px" }}>
                                            Sharia compliant! Tamara <strong><a href='https://www.tamara.com/' className='text-black'>Learn more</a></strong>
                                        </Typography>
                                    </Box>
                                    <img src={tamaraImg} loading="lazy" alt="tamaraImg" />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Checkbox
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#bb1f2a",
                                        },
                                    }}
                                />
                                <Typography onClick={navigateToTermsCondactions} sx={{ fontSize: { sm: "16px", xs: "14px" }, cursor: "pointer" }}> Terms & Conditions</Typography>
                            </Box>
                            <Grid item xs={12} sx={{ my: 2 }}>
                                <Button fullWidth variant="contained" sx={{ backgroundColor: "#bb1f2a" }}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default Checkout;
