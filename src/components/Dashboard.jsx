import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box, List, ListItem, ListItemIcon, ListItemText, Dialog, DialogContent, IconButton, useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { useTheme } from '@mui/material/styles';
import { userService } from './../utils/services/userServices';
import { showToast } from '../utils/helper';
import useUserStore from '../store/user';
import Loading from "./Loading"
const Dashboard = ({ selectItem }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleToggleModal = () => setOpen(!open);

    const menuItems = [
        { id: 1, text: 'Dashboard', icon: <GridViewOutlinedIcon />, path: '/my-account' },
        { id: 2, text: 'Order History', icon: <ShoppingCartOutlinedIcon />, path: '/order-history' },
        { id: 3, text: 'My Address', icon: <LocationOnOutlinedIcon />, path: '/my-address' },
        { id: 4, text: 'Account Details', icon: <PermIdentityOutlinedIcon />, path: '/account-details' },
        { id: 5, text: 'Wishlist', icon: <FavoriteBorder />, path: '/wishlist' },
        { id: 6, text: 'Change Password', icon: <LockOutlinedIcon />, path: '/change-password' },
        { id: 7, text: 'Logout', icon: <LogoutIcon />, path: '/' },
    ];


    const handleLogout = async () => {
        try {
            setLoading(true);
            const response = await userService.logout();
            if (response && response.status === 200) {
                setLoading(false);
                useUserStore.getState().logout();
                showToast("success", response.message, "success");
            } else {
                showToast("error", response.message, "danger");
            }
        } catch (error) {
            showToast("error", error.message, "danger");
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <Box>
            {isXs && (
                <IconButton onClick={handleToggleModal} sx={{ margin: '10px' }}>
                    <MenuIcon fontSize="large" />
                </IconButton>
            )}

            <Dialog fullScreen={isXs} open={open} onClose={handleToggleModal}>
                <DialogContent
                    sx={{
                        position: 'relative',
                        padding: '50px 16px',
                        maxHeight: '100vh',
                        overflowY: 'scroll',
                        scrollbarWidth: 'thin',
                    }}
                >
                    <IconButton
                        onClick={handleToggleModal}
                        sx={{ position: 'absolute', right: 2, top: 2 }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <List >
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                component={Link}
                                to={item.path}
                                key={item.id}
                                sx={{
                                    bgcolor: selectItem === item.id ? '#bb1f2a' : '#fff',
                                    color: selectItem === item.id ? '#fff' : '#2b2f4c',
                                    ":hover": {
                                        bgcolor: selectItem === item.id ? '#bb1f2a' : '#f5f5f5',
                                    },
                                    marginBottom: '8px',
                                }}
                                onClick={handleToggleModal}
                            >
                                <ListItemIcon sx={{ color: selectItem === item.id ? '#fff' : '#2b2f4c' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        fontSize: '14px',
                                        textTransform: 'capitalize',
                                        fontWeight: '500',
                                        color: selectItem === item.id ? '#fff' : '#2b2f4c',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            {!isXs && (
                <Box>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                component={Link}
                                to={item.path}
                                key={item.id}
                                sx={{
                                    bgcolor: selectItem === item.id ? '#bb1f2a' : '#fff',
                                    color: selectItem === item.id ? '#fff' : '#2b2f4c',
                                    ":hover": {
                                        bgcolor: selectItem === item.id ? '#bb1f2a' : '#f5f5f5',
                                    },
                                    marginBottom: '8px',
                                }}
                                onClick={item.text === 'Logout' ? handleLogout : null}
                            >
                                <ListItemIcon sx={{ color: selectItem === item.id ? '#fff' : '#2b2f4c' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        fontSize: '14px',
                                        textTransform: 'capitalize',
                                        fontWeight: '500',
                                        color: selectItem === item.id ? '#fff' : '#2b2f4c',
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default Dashboard;