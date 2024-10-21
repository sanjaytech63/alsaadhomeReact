import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { FavoriteBorder } from '@mui/icons-material';



const Dashboard = ({ selectItem }) => {
    const navigate = useNavigate();

    const handleNavigation = (item) => {
        navigate(item.path);
    };

    const menuItems = [
        {
            id: 1,
            text: 'Dashboard',
            icon: <GridViewOutlinedIcon sx={{ color: selectItem === 1 ? '#fff' : '#2b2f4c' }} />,
            path: '/my-account'
        },
        {
            id: 2,
            text: 'Order History',
            icon: <ShoppingCartOutlinedIcon sx={{ color: selectItem === 2 ? '#fff' : '#2b2f4c' }} />,
            path: '/order-history'
        },
        {
            id: 3,
            text: 'My Address',
            icon: <LocationOnOutlinedIcon sx={{ color: selectItem === 3 ? '#fff' : '#2b2f4c' }} />,
            path: '/my-address'
        },
        {
            id: 4,
            text: 'Account Details',
            icon: <PermIdentityOutlinedIcon sx={{ color: selectItem === 4 ? '#fff' : '#2b2f4c' }} />,
            path: '/account-details'
        },
        {
            id: 5,
            text: 'Wishlist',
            icon: <FavoriteBorder sx={{ color: selectItem === 5 ? '#fff' : '#2b2f4c' }} />,
            path: '/wishlist'
        },
        {
            id: 6,
            text: 'Change Password',
            icon: <LockOutlinedIcon sx={{ color: selectItem === 6 ? '#fff' : '#2b2f4c' }} />,
            path: '/change-password'
        },
        {
            id: 7,
            text: 'Logout',
            icon: <LogoutIcon sx={{ color: selectItem === 7 ? '#fff' : '#2b2f4c' }} />,
            path: '/'
        },
    ];

    return (
        <Box  >
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        component={Link}
                        to={item.path}
                        key={item.id}
                        onClick={() => handleNavigation(item)}
                        sx={{
                            bgcolor: selectItem === item.id ? '#bb1f2a' : '#fff',
                            color: selectItem === item.id ? '#fff' : '#2b2f4c',
                            ":hover": {
                                bgcolor: selectItem === item.id ? '#bb1f2a' : '#fff',
                                color: selectItem === item.id ? '#fff' : '#2b2f4c',
                            }
                        }}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            sx={{
                                fontSize: '14px',
                                textTransform: 'capitalize',
                                fontWeight: '500',
                                color: selectItem === item.id ? '#fff' : '#2b2f4c'
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Dashboard;
