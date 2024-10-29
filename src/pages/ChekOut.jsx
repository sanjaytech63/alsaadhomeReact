import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Container, Box, Select, MenuItem, Checkbox, FormControlLabel, useMediaQuery, FormControl, Radio, Dialog, DialogTitle, IconButton, DialogContent } from '@mui/material';
import { FaRegCreditCard } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import tamaraImg from "../../src/assets/tamara.svg"
const Checkout = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const orderData = [
        {
            id: 1,
            name: "Al Saad Home Microgel Pillow - ( 50  X 75 ) cm - Super Soft x 1",
            price: "349 AED",
            imgSrc: "https://al-saad-home.mo.cloudinary.net/uploads/products/14682/thumb/micro-gel-pillow-11727870637.jpg"
        },
        {
            id: 2,
            name: "Al Saad Home Microgel Pillow - ( 50  X 75 ) cm - Super Soft x 1",
            price: "99 AED",
            imgSrc: "https://al-saad-home.mo.cloudinary.net/uploads/products/14682/thumb/micro-gel-pillow-11727870637.jpg"
        }
    ];

    const total = 448.00;
    const shipping = 10.00;
    const finalTotal = total + shipping;

    return (
        <Box sx={{ padding: isMobile ? 2 : 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} >
                        <Box sx={{ my: 2, py: 2, backgroundColor: "#f7f7f7", px: 3, display: "flex", alignItems: "center", gap: 1 }}>
                            <LocalOfferIcon sx={{ color: "#bb1f2a" }} />
                            <Typography color='#687188' sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="h6">Do you have a coupon?</Typography>
                        </Box>
                        <Box sx={{ border: '1px solid #e0e0e0', padding: 3 }}>
                            <Grid container alignItems="stretch" gap={2}>
                                <Grid item xs={7}>
                                    <TextField
                                        fullWidth
                                        label="Enter Coupon Code"
                                        variant="outlined"
                                        sx={{
                                            height: '52px',
                                            '& .MuiOutlinedInput-root': {
                                                height: '100%',

                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            height: '52px',
                                            padding: 0,
                                            backgroundColor: "#bb1f2a",
                                        }}
                                    >
                                        Apply Coupon
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center' }}>
                            <div className='row d-flex align-items-center justify-content-between my-4 px-2'>
                                <span className='col-5' style={{ backgroundColor: "#d9d9d9", height: "4px" }}></span>
                                <FaRegCreditCard size={30} className='col-2' color="#d9d9d9" />
                                <span className='col-5' style={{ backgroundColor: "#d9d9d9", height: "4px" }}></span>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography sx={{ color: "#292b2c", fontSize: "22px", fontWeight: "700", mb: 4 }} variant="h6" gutterBottom>
                            Billing Details
                        </Typography>
                        <Box sx={{}}>
                            <TextField fullWidth label="Name" variant="outlined" sx={{ marginBottom: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                <FormControl fullWidth>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        defaultValue="Select Country Code"
                                        sx={{
                                            padding: '1px 4px',
                                            border: '1px solid #ccc',
                                            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: "13px 13px",
                                                fontSize: "14px",
                                                color: "#333",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Select Country Code" disabled hidden>
                                            Select Country Code
                                        </MenuItem>
                                        <MenuItem
                                            sx={{
                                                fontSize: "14px",
                                                color: "#333",
                                            }}
                                            value="+ 971"
                                        >
                                            <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 971
                                        </MenuItem>
                                        <MenuItem
                                            sx={{
                                                fontSize: "14px",
                                                color: "#333",
                                            }}
                                            value="+ 968"
                                        >
                                            <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 968
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField fullWidth label="Enter Mobile Number" required />
                            </Box>

                            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                <FormControl fullWidth>
                                    <Select fullWidth
                                        defaultValue="Select Country Code"
                                        variant="outlined"
                                        sx={{
                                            padding: '1px 4px',
                                            border: '1px solid #ccc',
                                            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                                                padding: "13px 13px",
                                                fontSize: "14px",
                                                color: "#333",
                                            }
                                        }}
                                    >
                                        <MenuItem value="Select Country Code" disabled hidden>
                                            Select Country Code
                                        </MenuItem>
                                        <MenuItem sx={{
                                            fontSize: "14px",
                                            color: "#333",
                                        }} value="+ 971">
                                            <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 971
                                        </MenuItem>
                                        <MenuItem sx={{
                                            fontSize: "14px",
                                            color: "#333",
                                        }} value="+ 968">
                                            <img style={{ width: "30px", height: "30px", marginRight: "4px" }} src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png" alt="img" />  + 968
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField fullWidth label="Whatsapp Mobile Number" required />
                            </Box>
                            <TextField fullWidth label="Email" variant="outlined" sx={{ my: 2 }} />

                            <Button onClick={handleOpen} fullWidth variant="contained" color="error" sx={{ marginBottom: 2 }}>
                                Shipping Address
                            </Button>
                            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    my: 1,
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <Typography sx={{ color: "#292b2c", fontSize: "15px", fontWeight: "600" }}>Photo</Typography> -
                                    <Typography sx={{ color: "#292b2c", fontSize: "15px", fontWeight: "600" }}>Product</Typography> -
                                    <Typography sx={{ color: "#292b2c", fontSize: "15px", fontWeight: "600" }}>Total</Typography>
                                </Box>
                            </Box>
                            <hr />
                            {orderData.map((product) => (
                                <Box
                                    key={product.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{
                                        marginBottom: 1,
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        textAlign: { xs: 'center', sm: 'left' }
                                    }}
                                >
                                    <img
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        src={product.imgSrc}
                                        loading="lazy"
                                        alt="product"
                                    />
                                    <Typography>{product.name}</Typography>
                                    <Typography>{product.price}</Typography>
                                </Box>
                            ))}

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    my: 2,
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Typography>Sub Total:</Typography>
                                <Typography>{total} AED</Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    my: 2,
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Typography>Flat Shipping Rate:</Typography>
                                <Typography>{shipping} AED</Typography>
                            </Box>
                            <hr />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    my: 2,
                                    flexDirection: { xs: 'column', sm: 'row' }
                                }}
                            >
                                <Typography
                                    sx={{ color: "#292b2c", fontSize: { xs: "18px", md: "22px" }, fontWeight: "700" }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    Final Total:
                                </Typography>
                                <Typography
                                    sx={{ color: "#292b2c", fontSize: { xs: "18px", md: "22px" }, fontWeight: "700" }}
                                    variant="h6"
                                    gutterBottom
                                >
                                    {finalTotal} AED
                                </Typography>
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
                                <FormControlLabel value="male" control={<Radio />} label="" />
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
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Terms & Conditions"
                            />
                            <Grid item xs={12} sx={{ my: 2 }}>
                                <Button fullWidth variant="contained" color="error">
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
