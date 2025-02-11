import React, { useRef, useState } from 'react';
import { Grid, TextField, Button, Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import ReCAPTCHA from "react-google-recaptcha";
import { showToast } from '../utils/helper';
import contactApi from '../utils/services/contactEnquireServices';
import { Formik, Form } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
});

const ContactForm = () => {
    const recaptcha = useRef(null);
    const [loading, setLoading] = useState(false);

    const contactEnquiry = async (values, { resetForm }) => {
        if (!recaptcha.current?.getValue()) {
            showToast("error", "Please complete the CAPTCHA");
            return;
        }

        try {
            setLoading(true);
            const response = await contactApi.contactEnquire(values);
            if (response.status === 200) {
                showToast("success", response.message);
                resetForm();
                recaptcha.current?.reset();
            }
        } catch (error) {
            showToast("error", "Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container spacing={4} sx={{ mt: 4 }}>
            {/* Left Side - Contact Form */}
            <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, fontFamily: "Roboto, sans-serif" }}>
                    Get In Touch
                </Typography>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 400, fontSize: "14px", color: "#687188" }}>
                    To raise any order-related queries, please fill out the form below.
                </Typography>

                <Formik
                    initialValues={{ name: "", email: "", phone: "", message: "" }}
                    validationSchema={validationSchema}
                    onSubmit={contactEnquiry}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                {/* Name */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="name"
                                        label="Your Name"
                                        fullWidth
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </Grid>
                                {/* Email */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                {/* Phone */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="phone"
                                        label="Mobile Number"
                                        fullWidth
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phone && Boolean(errors.phone)}
                                        helperText={touched.phone && errors.phone}
                                    />
                                </Grid>
                                {/* Message */}
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        name="message"
                                        label="Message"
                                        fullWidth
                                        value={values.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.message && Boolean(errors.message)}
                                        helperText={touched.message && errors.message}
                                    />
                                </Grid>

                                {/* reCAPTCHA */}
                                <Grid item xs={12}>
                                    <ReCAPTCHA
                                        sitekey="6LfKpIYqAAAAAI_nzop_agYeyO6ef0IzEogfESd-"
                                        ref={recaptcha}
                                    />
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained" sx={{ background: "#bb1f2a", color: "#fff", px: 4, py: 1.5 }}>
                                        {loading ? <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}><CircularProgress color="#333" size={24} /> Loading... </Box> : "Send Message"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>

            {/* Right Side - Contact Info in Box */}
            <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Email Card */}
                    <Card sx={{ boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{
                                    width: 80, height: 80, borderRadius: "50%",
                                    border: "1px solid #bb1f2a", display: "flex",
                                    justifyContent: "center", alignItems: "center",
                                    color: "#bb1f2a", transition: "all 0.3s ease",
                                    "&:hover": { backgroundColor: "#bb1f2a", color: "#fff" }
                                }}>
                                    <Email fontSize="large" />
                                </Box>
                                <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, mt: 1 }}>Email Address</Typography>
                                <Typography variant="body2" sx={{ color: "#687188", lineHeight: "28px" }}>contact@alsaadhome.com</Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Phone Card */}
                    <Card sx={{ boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Box sx={{
                                    width: 80, height: 80, borderRadius: "50%",
                                    border: "1px solid #bb1f2a", display: "flex",
                                    justifyContent: "center", alignItems: "center",
                                    color: "#bb1f2a", transition: "all 0.3s ease",
                                    "&:hover": { backgroundColor: "#bb1f2a", color: "#fff" }
                                }}>
                                    <Phone fontSize="large" />
                                </Box>
                                <Typography variant="h6" sx={{ color: "#333", fontWeight: 600, mt: 1 }}>Phone</Typography>
                                <Typography variant="body2" sx={{ color: "#687188", lineHeight: "28px" }}>+971523509471</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ContactForm;
