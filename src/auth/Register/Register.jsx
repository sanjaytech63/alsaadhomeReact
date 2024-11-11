import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography, CircularProgress, } from '@mui/material';
import { Close } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/helper';
import useAuthStore from '../../store/authStore';

const Register = ({ handleClose, open, handleOpenLogin }) => {
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
    const { loading } = useAuthStore();
    const userRegister = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!formData.username || !formData.email || !formData.password) {
            showToast("error", "All fields are required.");
            return;
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(formData.email)) {
            showToast("error", "Please enter a valid email address.");
            return;
        }

        const { registerUser, loading } = useAuthStore.getState();
        await registerUser(formData);

        if (loading === false) {
            handleClose();
            navigate('/');
            setFormData({ email: "", password: "", username: "" });
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
            <Modal sx={{ overflowY: "auto", maxHeight: '100vh', pb: "50px" }}
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
                        <Close sx={{ cursor: 'pointer', margin: "20px" }} onClick={handleClose} />
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
