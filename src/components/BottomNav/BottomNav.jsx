import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { IoHomeOutline } from "react-icons/io5";
import { LiaGripVerticalSolid } from "react-icons/lia";
import { CiUser } from "react-icons/ci";
import { BsHandIndexThumb } from "react-icons/bs";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const location = useLocation();
    if (!isMobile) return null;

    const getActiveLink = (path) => location.pathname === path;

    const links = [
        { to: "/", label: "Home", icon: <IoHomeOutline /> },
        { to: "/category", label: "Category", icon: <LiaGripVerticalSolid /> },
        { to: "/smart-shopping", label: "Smart S...", icon: <BsHandIndexThumb /> },
        { to: "/unboxing-challenge", label: "Cart", icon: <BsCart3 /> },
        { to: "/my-account", label: "Account", icon: <CiUser /> },
    ];


    return (
        <Box
            sx={{
                width: "100%",
                position: 'fixed',
                display: "flex",
                alignItems: "center",
                bottom: 0,
                boxShadow: 2,
                backgroundColor: "#fff",
                zIndex: 9999,
            }}
        >
            {links.map(({ to, label, icon }) => (
                <Box key={to} sx={{ flex: 1, textAlign: 'center' }}>
                    <Link 
                        to={to}
                        style={{
                            textDecoration: "none",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px 0",
                        }}
                    >
                        <div
                            style={{
                                fontWeight: "600",
                                color: getActiveLink(to) ? "#bb1f2a" : "#292b2c"
                            }}
                        >
                            {icon}
                        </div>
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: "13px",
                                color: getActiveLink(to) ? "#bb1f2a" : "#292b2c"
                            }}
                        >
                            {label}
                        </Typography>
                    </Link>
                </Box>
            ))}
        </Box>
    );
};

export default BottomNav;
