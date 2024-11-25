import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, Checkbox, FormControlLabel, FormControl, Select, MenuItem, } from '@mui/material';
import { FaFacebookF } from "react-icons/fa";
import AppleIcon from '@mui/icons-material/Apple';
import { Close } from '@mui/icons-material';
import ForgotPasswordModal from './ForgotPasswordModal';

const Login = ({ handleClose, open, handleOpenRegister, handleOpenLogin,handleCloseRegister }) => {
    const [countryCode, setCountryCode] = useState("+ 968");
    const [loginByEmail, setLoginByEmail] = useState(false);
    const [openForgotPassword, setOpenForgotPassword] = useState(false);
    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };

    const handelLoginByEmail = () => {
        setLoginByEmail(!loginByEmail);
    }
    const switchToRegister = () => {
        handleClose();
        handleOpenRegister();
    };

    const handleForgotPasswordOpen = () => {
        handleClose()
        setOpenForgotPassword(true)
        handleCloseRegister()
    }
    const handleForgotPasswordClose = () => setOpenForgotPassword(false);

    return (
        <div>
            <Modal disableScrollLock sx={{ overflowY: "auto", maxHeight: '100vh', pb: "50px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              
            >
                <Box
                    sx={{
                        width: { xs: '95%', sm: '50%', md: '50%', lg: '40%' },
                        my: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        px: { xs: 2, sm: 4 },
                        py: 2,
                        mx: 'auto',
                        mt: '4%',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }} component="h2" gutterBottom>
                            Login
                        </Typography>
                        <Close sx={{ cursor: 'pointer', margin: "20px" }} onClick={handleClose} />
                    </Box>
                    <Grid container spacing={3}>
                        {
                            loginByEmail ? (<Grid item xs={12} sm={12}>
                                <Typography sx={{ fontSize: { sm: "16px", xs: "14px" },}} color='#6c757d'> Email</Typography>
                                <TextField type="email" name='email' fullWidth label="Enter Email" required />
                            </Grid>) : (
                                <Grid item xs={12} sm={12}>
                                    <Typography sx={{ fontSize: { sm: "16px", xs: "14px" } }} variant="body2" color='#6c757d'> Mobile Number</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                        <Grid container spacing={2}>
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
                                            <Grid item xs={7} sm={8}>
                                                <TextField fullWidth label="Mobile Number" required />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            )
                        }
                        <Grid item xs={12} sm={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography sx={{ fontSize: { sm: "16px", xs: "14px" } }} color='#6c757d'> Password</Typography>
                                <Typography onClick={handelLoginByEmail} sx={{ fontSize: { sm: "16px", xs: "14px", cursor: "pointer" } }} color='#bb1f2a'>{loginByEmail ? "Login by Mobile Number" : "Login by Email"} </Typography>
                            </Box>
                            <TextField type="password" name='password' fullWidth label="Enter Password" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <FormControlLabel
                                    control={<Checkbox sx={{
                                        "&.Mui-checked": {
                                            color: "#bb1f2a",
                                        },
                                    }} />}
                                    label="Remember me"
                                />
                                <Typography onClick={handleForgotPasswordOpen} sx={{ fontSize: { sm: "16px", xs: "14px", cursor: "pointer" } }} variant="body2" color='#6c757d'> Forgot Password</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-center justify-content-space-between gap-2'>
                                <span style={{ backgroundColor: "#ddd", height: "1px", width: "100%", }}></span>
                                <span style={{ color: "#687188" }}>OR</span>
                                <span style={{ backgroundColor: "#ddd", height: "1px", width: "100%", }}></span>
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
                            <div style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", background: "#3b5998", borderRadius: "50%" }} >
                                <FaFacebookF color='#fff' />
                            </div>
                            <div style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", borderRadius: "50%", boxShadow: "0 0 10px rgb(0 0 0 / 20%)" }} >
                                <img src="https://al-saad-home.mo.cloudinary.net/assets/front/images/google-logo.png" loading='lazy' alt="google-login" />
                            </div>
                            <div style={{ width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center", background: "#000", borderRadius: "50%" }} >
                                <AppleIcon sx={{ fontSize: "30px", color: "#fff" }} />
                            </div>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
                            <Typography variant="body2" color='#6c757d'> Don't have an account?
                                <span onClick={switchToRegister} style={{ cursor: 'pointer', color: '#bb1f2a', fontWeight: 'bold' }}> Sign up now</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <ForgotPasswordModal handleCloseLogin={handleClose} open={openForgotPassword} handleClose={handleForgotPasswordClose} handleOpenLogin={handleOpenLogin} />
        </div >
    );
}

export default Login;


