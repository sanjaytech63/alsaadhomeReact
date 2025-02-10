import React, { useRef, useState } from 'react';
import { Grid, TextField, Button, Box, Typography, Card, CardContent, CircularProgress, } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import ReCAPTCHA from "react-google-recaptcha";
import { showToast } from '../utils/helper';
import contactApi from '../utils/services/contactEnquireServices';
const ContactForm = () => {
    const recaptcha = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleRecaptcha = (e) => {
        e.preventDefault();
        if (!recaptcha.current.getValue()) {
            showToast("error", 'Please Submit Captcha')
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }))
    }


    const contactEnquiry = async () => {
        try {
            setLoading(true);
            const reqBody = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            }
            const responses = await contactApi.contactEnquire(reqBody);
            if (responses.status === 200) {
                setLoading(false)
                showToast("success", responses.message, "success");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
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
                                <TextField name='name' type='text' onChange={handleChange} value={formData?.name} fullWidth label="Your Name" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name='email' type='email' onChange={handleChange} value={formData?.email} fullWidth label="Enter Email Email" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name='phone' type='number' onChange={handleChange} value={formData.phone} fullWidth label="Mobile Number" required />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name='message' type='text' onChange={handleChange} value={formData.message} fullWidth label="Message" required />
                            </Grid>
                            {/* reCAPTCHA (Placeholder) */}
                            <Grid item xs={12} sx={{ px: 2 }}>
                                <form onSubmit={handleRecaptcha}>
                                    <ReCAPTCHA style={{ width: "100%" }}
                                        sitekey="6LfKpIYqAAAAAI_nzop_agYeyO6ef0IzEogfESd-"
                                        ref={recaptcha}
                                    />
                                </form>
                            </Grid>
                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Box display="flex" alignSelf={"start"}>
                                    <Button variant="contained" onClick={contactEnquiry} sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}>
                                        {loading ? <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
                                            <CircularProgress color="#333" size={24} />
                                            Loading...
                                        </Box>
                                            : "Send Message"}
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
