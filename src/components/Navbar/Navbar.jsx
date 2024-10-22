import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Container, ListItemText, Badge, Popover, Divider, Button, Typography } from '@mui/material';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/biglogo.avif';
import SearchBar from '../SearchBar';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openSearch, setSearchOpen] = useState(false);

    const data = [

        { id: 1, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Luxury Faux Cashmere Digital Carpet", price: 249, quantity: 1 },
        { id: 2, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, quantity: 1 },
        { id: 3, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Al Saad Home Tencel 300", price: 300, quantity: 1 },
        { id: 4, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Al Saad Home Tencel 300", price: 300, quantity: 1 },
        { id: 5, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Al Saad Home Tencel 300", price: 300, quantity: 1 },
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const openCart = Boolean(anchorEl);
    const id = openCart ? 'simple-popover' : undefined;
    const handleOpenCart = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseCart = () => {
        setAnchorEl(null);
    };
    const navList = [
        { name: "Home", slug: "" },
        { name: "Category", slug: "category" },
        { name: "Smart Shopping", slug: "smart-shopping" },
        { name: "Unboxing Challenge", slug: "unboxing-challenge" },
        { name: "Blog", slug: "blog" },
        { name: "Contact Us", slug: "contact-us" }
    ];

    const handleClickOpen = () => {
        setSearchOpen(true);
    };
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <div style={{ borderBottom: "1px solid #ccc", }} className="w-100 py-1">
                <Container>
                    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                        <Toolbar sx={{ justifyContent: 'space-between', padding: "0px !important" }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Link to="/">
                                    <img src={logo} alt="logo" loading="lazy" style={{ maxWidth: '100px', objectFit: "cover" }} />
                                </Link>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex', }, alignItems: 'center' }}>
                                {navList.map((item, index) => (
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "active" : "inactive"
                                        }
                                        to={`/${item.slug}`}
                                        style={{ margin: '0 15px', fontWeight: '500', fontFamily: "Poppins, sans-serif", textDecoration: 'none', textTransform: "uppercase", fontSize: '14px', }}
                                        key={index}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton>
                                    <IoSearchOutline onClick={handleClickOpen} color='#292b2c' size={20} />
                                    <SearchBar setSearchOpen={setSearchOpen} openSearch={openSearch} />
                                </IconButton>
                                <Link to="/cart">
                                    <IconButton onClick={handleOpenCart} aria-describedby={id} color="inherit">
                                        <Badge badgeContent={data.length} color="error">
                                            <BsCart3 color='#292b2c' size={20} />
                                        </Badge>
                                    </IconButton>
                                </Link>
                                <IconButton
                                    edge="end"
                                    sx={{ display: { xs: 'block', md: 'none' }, color: '#292b2c', }}
                                    onClick={() => toggleDrawer(true)}
                                >
                                    <IoMenuOutline size={28} />
                                </IconButton>
                                <Popover sx={{ top: "15px" }}
                                    id={id}
                                    open={openCart}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseCart}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    PaperProps={{
                                        style: { width: '300px' }
                                    }}
                                >
                                    <Box p={2}>
                                        <Typography variant="h6">Your Cart</Typography>
                                        <Divider />
                                        <List sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {data.map((item) => (
                                                <Box key={item.id} sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                                                    <img style={{ width: "50px", marginBottom: "5px", height: "50px" }} src={item.img} alt="cart-img" />
                                                    <ListItemText sx={{
                                                        fontSize: "14px", fontWeight: "500",
                                                        display: "-webkit-box",
                                                        overflow: "hidden",
                                                        WebkitBoxOrient: "vertical",
                                                        WebkitLineClamp: 2,
                                                        wordBreak: "break-all",
                                                        whiteSpace: "normal",
                                                        textOverflow: "ellipsis"
                                                    }} primary={`${item.quantity}x ${item.name}`} />
                                                    <Typography>{item.price}AED</Typography>
                                                </Box>
                                            ))}
                                        </List>
                                        <Box display="flex" justifyContent="space-between" mt={2}>
                                            <Button variant="contained" sx={{ backgroundColor: "#444" }} >View Cart</Button>
                                            <Button variant="contained" sx={{ backgroundColor: "#bb1f2a" }}>Checkout</Button>
                                        </Box>
                                    </Box>
                                </Popover>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" sx={{ width: { xs: '100%', md: '40%' }, padding: "0px !important" }} open={open} onClose={() => toggleDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', md: '40%' } } }}>
                        <Box
                            sx={{ width: { xs: '100%', md: '40%' }, paddingTop: '0px', }}
                            role="presentation"
                            onClick={() => toggleDrawer(false)}
                            onKeyDown={() => toggleDrawer(false)}
                        >
                            <Box sx={{ textAlign: 'right', }}>
                                <IconButton onClick={() => toggleDrawer(false)}>
                                    <IoCloseOutline color='#292b2c' size={28} />
                                </IconButton>
                            </Box>
                            <List>
                                {navList.map((item, index) => (
                                    <ListItem button key={index}>
                                        <NavLink
                                            className={({ isActive }) =>
                                                isActive ? "active" : "inactive"
                                            }
                                            to={`/${item.slug}`}
                                            style={{ margin: '0 15px', fontWeight: '500', fontFamily: "Poppins", textDecoration: 'none', fontSize: '14px', textTransform: "uppercase", }}
                                            key={index}
                                        >
                                            {item.name}
                                        </NavLink>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Drawer>
                </Container>
            </div>
        </>
    );
};

export default Navbar;
