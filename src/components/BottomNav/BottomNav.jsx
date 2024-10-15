import React from 'react';
import { BottomNavigation, BottomNavigationAction, Typography, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { FaGripVertical } from "react-icons/fa";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { BsFillHandIndexThumbFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const location = useLocation();

    if (!isMobile) return null;

    const getActiveLink = (path) => location.pathname === path;

    return (
        <BottomNavigation
            showLabels
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: 2, zIndex: 100 }}
        >
            {[
                { to: "/", label: "Home", icon: <HomeIcon /> },
                { to: "/category", label: "Category", icon: <FaGripVertical /> },
                { to: "/smart-shopping", label: "Smart S...", icon: <BsFillHandIndexThumbFill /> },
                { to: "/unboxing-challenge", label: "Cart", icon: <FaShoppingCart /> },
                { to: "/login", label: "Account", icon: <AccountCircleIcon /> },
            ].map(({ to, label, icon }) => (
                <Link 
                    to={to} 
                    key={to} 
                    style={{ 
                        textDecoration: "none", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        justifyContent: "center",
                        width: "100%", 
                    }}
                >
                    <BottomNavigationAction 
                        sx={{ 
                            fontWeight: "600", 
                            color: getActiveLink(to) ? "#bb1f2a" : "#292b2c" 
                        }}
                        icon={icon}
                    />
                    <Typography 
                        sx={{ 
                            fontWeight: "600", 
                            fontSize: "15px", 
                            color: getActiveLink(to) ? "#bb1f2a" : "#292b2c" 
                        }}
                    >
                        {label}
                    </Typography>
                </Link>
            ))}
        </BottomNavigation>
    );
};

export default BottomNav;
