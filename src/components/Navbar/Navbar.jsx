import React,{useState} from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Container } from '@mui/material';
import { IoSearchOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/biglogo.avif';
import SearchBar from '../SearchBar';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const [openSearch, setSearchOpen] = useState(false);
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
                        <Toolbar sx={{ justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img src={logo} alt="logo" style={{ maxWidth: '100px', objectFit: "cover" }} />
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex', fontFamily: "Poppins, sans-serif" }, alignItems: 'center' }}>
                                {navList.map((item, index) => (
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "active" : "inactive"
                                        }
                                        to={`/${item.slug}`}
                                        style={{ margin: '0 15px', textDecoration: 'none', textTransform: "uppercase", fontSize: '14px', }}
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
                                    <IconButton>
                                        <BsCart3 color='#292b2c' size={20} />
                                    </IconButton>
                                </Link>
                                <IconButton
                                    edge="end"
                                    sx={{ display: { xs: 'block', md: 'none' }, color: '#292b2c', }}
                                    onClick={() => toggleDrawer(true)}
                                >
                                    <IoMenuOutline size={28} />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer anchor="left" sx={{ width: { xs: '100%', md: '40%' } }} open={open} onClose={() => toggleDrawer(false)} PaperProps={{ sx: { width: { xs: '100%', md: '40%' } } }}>
                        <Box
                            sx={{ width: { xs: '100%', md: '40%' }, paddingTop: '0px', }}
                            role="presentation"
                            onClick={() => toggleDrawer(false)}
                            onKeyDown={() => toggleDrawer(false)}
                        >
                            <Box sx={{ textAlign: 'right', paddingRight: '1rem' }}>
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
                                            style={{ margin: '0 15px', textDecoration: 'none', fontSize: '14px', textTransform: "uppercase", }}
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
