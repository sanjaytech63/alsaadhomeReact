import React, { useRef } from 'react';
import { Grid, TextField, Button, Box, Typography, Card, CardContent, } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import ReCAPTCHA from "react-google-recaptcha";
import { showToast } from '../utils/helper';
const ContactForm = ({ location }) => {
    const recaptcha = useRef(null);

    const handleRecaptcha = (e) => {
        e.preventDefault();
        if (!recaptcha.current.getValue()) {
            showToast("error", 'Please Submit Captcha')
        }
    }
    return (
        <Box component="form">
            <Typography variant="h4" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}>
                Get In touch
            </Typography>
            <Typography variant="h6" sx={{ my: 2, color: "#687188", fontWeight: "600", fontSize: "14px", fontFamily: "Roboto, sans-serif" }}>
                To raise any order related query,
            </Typography>
            <Grid container spacing={3}>

                {/* Left Side: Text Input Fields */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Your Name" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Enter Email Email" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Mobile Number" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Subject" required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Message" required />
                            </Grid>
                            {/* reCAPTCHA (Placeholder) */}
                            <Grid item xs={12} sx={{ px: 2 }}>
                                <form onSubmit={handleRecaptcha}>
                                    <ReCAPTCHA style={{ width: "100%" }}
                                        sitekey="6LfKpIYqAAAAAI_nzop_agYeyO6ef0IzEogfESd-"
                                        ref={recaptcha}
                                        o
                                    />
                                </form>
                            </Grid>
                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Box display="flex" alignSelf={"start"}>
                                    <Button variant="contained" sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}>
                                        Send Message
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                {/* Right Side: Contact Info */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 2, mb: 2 }}>
                        <CardContent>
                            <Box className="contact-card"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                sx={{
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    "&:hover .contact-box": {
                                        backgroundColor: "#bb1f2a",
                                        color: "#fff",
                                    },
                                    "&:hover .contact-icon": {
                                        color: "#fff",
                                    },
                                }}>
                                <Box className="contact-box"
                                    sx={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        border: "1px solid #bb1f2a",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        color: "#bb1f2a",
                                        transition: "all 0.3s ease",
                                        margin: "8px",
                                    }}
                                >
                                    <Email className='contact-icon' size={30} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}
                                >
                                    Email Address
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#687188", lineHeight: "28px", textAlign: "center" }}
                                >
                                    contact@alsaadhome.com
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card sx={{ boxShadow: 2 }}>
                        <CardContent>
                            <Box className="contact-card"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                sx={{
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    "&:hover .contact-box": {
                                        backgroundColor: "#bb1f2a",
                                        color: "#fff",
                                    },
                                    "&:hover .contact-icon": {
                                        color: "#fff",
                                    },
                                }}>
                                <Box className="contact-box"
                                    sx={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        border: "1px solid #bb1f2a",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        color: "#bb1f2a",
                                        transition: "all 0.3s ease",
                                        margin: "8px",
                                    }}
                                >
                                    <Phone className='contact-icon' size={30} />
                                </Box>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}
                                >
                                    Phone
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#687188", lineHeight: "28px", textAlign: "center" }}
                                >
                                    +971523509471
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactForm;
