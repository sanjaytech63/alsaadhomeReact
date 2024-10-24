import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, CircularProgress, } from '@mui/material';
import { Close } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../ApiService/ApiService';

const Register = ({ handleClose, open, handleOpenLogin }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
    });

    // const [language, setLanguage] = useState('+ 971');

    // const handleLanguageChange = (event) => {
    //     setLanguage(event.target.value);
    // };

    const switchToLogin = () => {
        handleClose();
        handleOpenLogin();
    };

    const navigate = useNavigate();

    const userRegister = async (event) => {
        event.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required.", { containerId: 'register' });
            return;
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            toast.error("Please enter a valid email address.", { containerId: 'register' });
            return;
        }


        try {
            setLoading(true);
            const response = await ApiService.registerUser(formData);
            console.log('Response:', response);
            if (response.status === 201) {
                toast.success(response.data.message, { containerId: 'register' });
                handleClose();
                navigate('/');
                setFormData({
                    email: "",
                    password: "",
                    username: "",
                });
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400) {
                toast.error("User already exists. Please enter a different username or email.", { containerId: 'register' });
            } else {
                toast.error("Registration failed, please try again.", { containerId: 'register' });
                setFormData({
                    email: "",
                    password: "",
                    username: "",
                });
            }
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };


    return (
        <div>
            <Modal
                sx={{ overflowY: "scroll" }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        width: { xs: '90%', sm: '50%', md: '50%', lg: '40%' },
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        my: 2,
                        px: 4,
                        py: 2,
                        mx: 'auto',
                        mt: '2%',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }} component="h2" gutterBottom>
                            Create an Account
                        </Typography>
                        <Close sx={{ cursor: 'pointer' }} onClick={handleClose} />
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 2 }} variant="body2" color='#6c757d'>Your Name</Typography>
                            <TextField onChange={handleChange} name='username' value={formData.username} fullWidth label="Your Name" required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'>Enter Your Email</Typography>
                            <TextField onChange={handleChange} name='email' value={formData.email} fullWidth label="Enter Your Email" required />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'>Password</Typography>
                            <TextField onChange={handleChange} name='password' value={formData.password} fullWidth label="Password" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                onClick={userRegister}
                                fullWidth
                                variant="contained"
                                sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}
                            >
                                {loading ? (
                                    <>
                                        <CircularProgress size={20} sx={{ color: "#fff", mr: 3 }} /> <span>Loading...</span>
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </Button>
                        </Grid>

                        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
                            <Typography variant="body2" color='#6c757d'>Already have an account?
                                <span onClick={switchToLogin} style={{ cursor: 'pointer', color: '#bb1f2a', fontWeight: 'bold' }}> Log in</span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
            <ToastContainer containerId="register" />
        </div>
    );
};

export default Register;






// import React, { useState } from 'react';
// import { Box, Button, Grid, Modal, TextField, Typography, Select, MenuItem, FormControl, Checkbox, } from '@mui/material';
// import { Close } from '@mui/icons-material';
// const Register = ({ handleClose, open, handleOpenLogin }) => {
//     const baseurl  = "https://api.freeapi.app/api/v1/users/register"
//     const [language, setLanguage] = useState('+ 971');
//     const handleLanguageChange = (event) => {
//         setLanguage(event.target.value);
//     };

//     const switchToLogin = () => {
//         handleClose();
//         handleOpenLogin(); 
//     };

//     return (
//         <div style={{}}>
//             <Modal sx={{overflowY:"scroll"}}
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box
//                     sx={{
//                         width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
//                         bgcolor: 'background.paper',
//                         borderRadius: 2,
//                         boxShadow: 24,
//                         my: 2,
//                         px: 4,
//                         py: 2,
//                         mx: 'auto',
//                         mt: '2%',
//                     }}
//                 >
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
//                         <Typography variant="h6" sx={{ fontSize: { sm: "20px", xs: "16px" }, fontWeight: 600 }} component="h2" gutterBottom>
//                             Create an Account
//                         </Typography>
//                         <Close sx={{ cursor: 'pointer', }} onClick={handleClose} />
//                     </Box>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 2 }} variant="body2" color='#6c757d'> Your Name</Typography>
//                             <TextField fullWidth label="Your Name" required />
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> Mobile Number</Typography>
//                             <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
//                                 <FormControl fullWidth>
//                                     <Select fullWidth
//                                         value={language}
//                                         onChange={handleLanguageChange}
//                                         variant="outlined"
//                                         sx={{
//                                             padding: '1px 4px',
//                                             border: '1px solid #ccc',
//                                             '.MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                             ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
//                                                 padding: "13px 13px",
//                                                 fontSize: "14px",
//                                                 color: "#333",
//                                             }
//                                         }}
//                                     >
//                                         <MenuItem sx={{
//                                             fontSize: "14px",
//                                             color: "#333",
//                                         }} value="+ 971">+ 971</MenuItem>
//                                         <MenuItem sx={{
//                                             fontSize: "14px",
//                                             color: "#333",
//                                         }} value="+ 968">+ 968</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                                 <TextField fullWidth label="Enter Mobile Number" required />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'>Enter Your Email</Typography>
//                             <TextField fullWidth label="Enter Your Email" required />
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'> Password</Typography>
//                             <TextField fullWidth label="Password" required />
//                         </Grid>
//                         <Grid item xs={12} sm={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, my: 1 }} variant="body2" color='#6c757d'> Confirm Password</Typography>
//                             <TextField fullWidth label="Confirm Password" required />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography sx={{ fontSize: { sm: "18px", xs: "14px" }, display: 'flex', alignItems: 'center', }} variant="body2" color='#6c757d'>
//                                 <Checkbox defaultChecked />
//                                 <Typography sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="body2" color='#6c757d'> I agree to terms & Policy. </Typography>
//                             </Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Button fullWidth variant="contained" sx={{ px: 4, py: 1.5, background: "#bb1f2a", color: "#fff" }}>
//                                 Register
//                             </Button>
//                         </Grid>
//                         <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 1 }}>
//                             <Typography variant="body2" color='#6c757d'> Already have an account?
//                                 <span onClick={switchToLogin} style={{ cursor: 'pointer', color: '#bb1f2a', fontWeight: 'bold' }}> Log in</span>
//                             </Typography>
//                         </Grid>
//                     </Grid>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }

// export default Register;
