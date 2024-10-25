import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, FormControl, Checkbox, CircularProgress, } from '@mui/material';
import { FaFacebookF } from "react-icons/fa";
import AppleIcon from '@mui/icons-material/Apple';
import { Close } from '@mui/icons-material';


const Login = ({ handleClose, open, handleOpenRegister, loginUser, loading, handleChange, formData }) => {

    const [language, setLanguage] = useState('+ 971');

    // const handleLanguageChange = (event) => {
    //     setLanguage(event.target.value);
    // };

    const switchToRegister = () => {
        handleClose();
        handleOpenRegister();
    };

    return (
        <div style={{}}>
            <Modal sx={{ overflowY: "auto", maxHeight: '100vh', pb: "50px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        width: { xs: '90%', sm: '50%', md: '50%', lg: '40%' },
                        my: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        px: 4,
                        py: 2,
                        mx: 'auto',
                        mt: '4%',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }} component="h2" gutterBottom>
                            Login
                        </Typography>
                        <Close sx={{ cursor: 'pointer', }} onClick={handleClose} />
                    </Box>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> Mobile Number</Typography>
                            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                                <FormControl fullWidth>
                                    <Select fullWidth
                                        value={language}
                                        onChange={handleLanguageChange}
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
                                        <MenuItem sx={{
                                            fontSize: "14px",
                                            color: "#333",
                                        }} value="+ 971">+ 971</MenuItem>
                                        <MenuItem sx={{
                                            fontSize: "14px",
                                            color: "#333",
                                        }} value="+ 968">+ 968</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField fullWidth label="Enter Mobile Number" required />
                            </Box>
                        </Grid> */}
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, mb: 2 }} variant="body2" color='#6c757d'> Email</Typography>
                            <TextField type="email" name='email' value={formData.email} onChange={handleChange} fullWidth label="Enter Email" required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> Password</Typography>
                                <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#bb1f2a'> Login by Email</Typography>
                            </Box>
                            <TextField type="password" name='password' value={formData.password} onChange={handleChange} fullWidth label="Enter Password" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} variant="body2" color='#6c757d'>
                                    <Checkbox defaultChecked />
                                    <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> Remember me </Typography>
                                </Typography>
                                <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> Forgot Password</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={loginUser}
                                fullWidth
                                variant="contained"
                                sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} sx={{ color: "#fff", mr: 3 }} /> <span>Loading...</span>
                                    </>
                                ) : (
                                    'Login'
                                )}
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

        </div>
    );
}

export default Login;
