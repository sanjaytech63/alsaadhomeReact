import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Container, Badge, Divider, Button, Typography } from '@mui/material';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/biglogo.avif';
import SearchBar from '../SearchBar';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [openSearch, setSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const data = [
        { id: 1, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Luxury Faux Cashmere Digital Carpet", price: 249, },
        { id: 2, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, },
        { id: 3, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, },
        { id: 4, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, },
        { id: 5, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, },
        { id: 6, img: "https://al-saad-home.mo.cloudinary.net/uploads/products/14594/thumb/belmond-091726558208.jpg", name: "Belmond Comforter Bedding Set 6 PCS", price: 249, },
    ]

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const navList = [
        { name: "Home", slug: "" },
        { name: "Category", slug: "category" },
        { name: "Smart Shopping", slug: "smart-shopping" },
        { name: "Unboxing Challenge", slug: "unboxing-challenge" },
        { name: "Blog", slug: "blog" },
        { name: "Contact Us", slug: "contact-us" },
    ];

    const handleClickOpen = () => {
        setSearchOpen(true);
    };
    const toggleDrawer = () => {
        setOpen(!open);
    };


    const handleScroll = () => {
        if (window.scrollY > 110) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();

    const navigateToChekout = () => {
        navigate("/chekout");
    }

    const navigateToCart = () => {
        navigate("/cart");
    }

    return (
        <>
            <div style={{ borderBottom: "1px solid #eee", }} className="w-100 py-1">
                <AppBar sx={{
                    minHeight: "65px",
                    position: isScrolled ? "fixed" : "sticky",
                    top: 0,
                    backgroundColor: 'white',
                    boxShadow: isScrolled ? 2 : 'none',
                    transition: 'all 0.3s ease',
                    transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
                }}>
                    <Container maxWidth="lg">
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IoSearchOutline className='search_icon' onClick={handleClickOpen} color='#292b2c' size={20} />
                                <SearchBar setSearchOpen={setSearchOpen} openSearch={openSearch} />
                                {/* <Link to="/cart"> */}
                                <Typography onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave} color="inherit">
                                    <Badge badgeContent={data.length} color="error">
                                        <div
                                            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
                                            <BsCart3 cursor={"pointer"} className='cart_icon' color='#292b2c' size={20} />
                                        </div>
                                    </Badge>
                                </Typography>
                                {/* </Link> */}
                                <Box
                                    edge="end"
                                    sx={{ display: { xs: 'block', md: 'none' }, color: '#292b2c', ml: "10px" }}
                                    onClick={() => toggleDrawer(true)}
                                >
                                    <IoMenuOutline size={28} />
                                </Box>
                            </Box>
                        </Toolbar>

                    </Container>
                    <Container maxWidth="xl" alignItems="flex-start" sx={{ display: "flex", flexDirection: "column" }} >
                        {isHovered && (
                            <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
                                sx={{
                                    position: 'absolute',
                                    top: '42px',
                                    // [theme.direction === 'rtl' ? 'left' :  'right']: '0',
                                    alignSelf: 'flex-end',
                                    width: { sm: '400px', xs: "289px" },
                                    padding: '10px',
                                    backgroundColor: 'white',
                                    boxShadow: 3,
                                    zIndex: 999,
                                }}
                            >
                                <Typography sx={{ fontSize: '16px', fontWeight: '600', color: '#292b2c' }}>Your Cart</Typography>
                                <Divider />
                                <List sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    {data.map((item) => (
                                        <Box
                                            key={item.id}
                                            sx={{ display: 'flex', gap: 3, my: 1, justifyContent: 'space-between', alignItems: 'center' }}
                                        >
                                            <img style={{ width: '50px', height: '50px' }} src={item.img} alt="cart-img" />
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    WebkitBoxOrient: 'vertical',
                                                    WebkitLineClamp: 1,
                                                    display: '-webkit-box',
                                                    overflow: 'hidden',

                                                    wordBreak: 'break-all',
                                                    whiteSpace: 'normal',
                                                    textOverflow: 'ellipsis',
                                                    color: '#292b2c',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                {item.quantity}  {item.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#292b2c', display: 'flex', alignItems: 'center', gap: "4px" }}><span>AED</span> <span>{item.price}</span></Typography>
                                        </Box>
                                    ))}
                                </List>
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Button onClick={() => {
                                        navigateToCart();
                                        handleMouseLeave();
                                    }} variant="contained" sx={{ backgroundColor: '#000' }}>
                                        View Cart
                                    </Button>
                                    <Button onClick={() => { navigateToChekout(); handleMouseLeave(); }} variant="contained" sx={{ backgroundColor: '#bb1f2a' }}>
                                        Checkout
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Container>
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
                                    <NavLink onClick={() => toggleDrawer(false)}
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
            </div >
        </>
    );
};

export default Navbar;
