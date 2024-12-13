import React, { useState } from 'react'
import { Box, Button, Grid, Modal, TextField, Typography, FormControl, Select, MenuItem, } from '@mui/material';
import { Close } from '@mui/icons-material';

const ForgotPasswordModal = ({ open, handleClose, handleOpenLogin }) => {
    const [switchToLogin, setSwitchToLogin] = useState(false);
    const [countryCode, setCountryCode] = useState("+ 968");

    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };
    const handelLoginByEmail = () => {
        setSwitchToLogin(!switchToLogin);
    }

    const switchToRegister = () => {
        handleOpenLogin();
    };

    return (
        <>
            <Modal disableScrollLock
                sx={{ overflowY: "auto", maxHeight: '100vh', pb: "50px" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="forgot-password-title"
                aria-describedby="forgot-password-description"
            >
                <Box
                    sx={{
                        width: { xs: '95%', sm: '50%', lg: '40%' },
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }}>
                            Forgot Password
                        </Typography>
                        <Close onClick={handleClose} sx={{ cursor: 'pointer', margin: "20px" }} />
                    </Box>
                    <Grid container spacing={3}>
                        {
                            switchToLogin ? (<Grid item xs={12} sm={12}>
                                <Typography sx={{ fontSize: { sm: "16px", xs: "14px" }, mb: 2 }} color='#6c757d'> E-Mail</Typography>
                                <TextField type="email" name='email' fullWidth label="E-Email" required />
                            </Grid>) : (
                                <Grid item xs={12} sm={12}>
                                    <Typography sx={{ fontSize: { sm: "16px", xs: "14px" } }} variant="body2" color='#6c757d'> Mobile Number</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
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
                        <Grid item xs={12}>
                            <Typography onClick={handelLoginByEmail} sx={{ fontSize: { sm: "16px", xs: "14px", textAlign: "right" }, cursor: "pointer" }} color='#bb1f2a'>
                                Use another option
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-center justify-content-space-between gap-2'>
                                <span style={{ backgroundColor: "#ddd", height: "1px", width: "100%", }}></span>
                                <span style={{ color: "#687188" }}>OR</span>
                                <span style={{ backgroundColor: "#ddd", height: "1px", width: "100%", }}></span>
                            </div>
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                            <Typography variant="body2" color='#6c757d'>Already have an account?
                                <span onClick={switchToRegister} style={{ cursor: 'pointer', color: '#bb1f2a', fontWeight: 'bold' }}> Log in</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default ForgotPasswordModal
