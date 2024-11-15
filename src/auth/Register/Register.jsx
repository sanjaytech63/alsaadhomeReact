import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, FormControl, Checkbox, } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const Register = ({ handleClose, open, handleOpenLogin }) => {
    const [countryCode, setCountryCode] = useState("+ 968");

    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };

    const switchToLogin = () => {
        handleClose();
        handleOpenLogin();
    };

    const navigate = useNavigate();

    const navigateToTermsCondactions = () => {
        navigate("/terms-of-use")
    }
    return (
        <div style={{}}>
            <Modal  disableScrollLock sx={{ overflowY: "scroll" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        width: { xs: '95%', sm: '80%', md: '60%', lg: '40%' },
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        my: 2,
                        px: { xs: 2, sm: 4 },
                        py: 2,
                        mx: 'auto',
                        mt: '2%',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
                        <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }} component="h2" gutterBottom>
                            Create an Account
                        </Typography>
                        <Close sx={{ cursor: 'pointer', margin: "20px" }} onClick={handleClose} />
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "16px", xs: "14px" }, my: 2 }} variant="body2" color='#6c757d'> Your Name</Typography>
                            <TextField fullWidth label="Your Name" required />
                        </Grid>
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
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "16px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'>Enter Your Email</Typography>
                            <TextField fullWidth label="Enter Your Email" required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "16px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'> Password</Typography>
                            <TextField fullWidth label="Password" required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "16px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'> Confirm Password</Typography>
                            <TextField fullWidth label="Confirm Password" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Checkbox
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#bb1f2a",
                                        },
                                    }}
                                />
                                <Typography onClick={navigateToTermsCondactions} sx={{ fontSize: { sm: "16px", xs: "14px" }, cursor: "pointer" }}> I agree to terms & Policy.</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant="contained" sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}>
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
                            <Typography variant="body2" color='#6c757d'> Already have an account?
                                <span onClick={switchToLogin} style={{ cursor: 'pointer', color: '#bb1f2a', fontWeight: 'bold' }}> Log in</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default Register;
