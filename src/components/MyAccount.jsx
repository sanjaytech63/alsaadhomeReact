import React, { useState, useRef } from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const MyAccount = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(URL.createObjectURL(selectedFile));
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            <Box sx={{ bgcolor: '#f7f8fb', py: "30px" }}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                            variant="h5"
                            sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                        >
                            Dashboard
                        </Typography>
                        <Breadcrumbs
                            sx={{ fontSize: '14px', cursor: 'pointer' }}
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/">
                                Home
                            </Link>
                            <Link style={{ color: '#292b2c', textDecoration: 'none' }} to="/my-account">
                                Dashboard
                            </Link>
                        </Breadcrumbs>
                    </Box>
                </Container>
            </Box>

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    {/* Sidebar */}
                    <Grid item xs={12} sm={3}>
                        <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
                            <Dashboard selectItem={1} />
                        </Box>
                    </Grid>

                    {/* Main Content */}
                    <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
                        <Box sx={{ bgcolor: 'white', p: 3, boxShadow: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 500, fontSize: { sm: '24px', xs: '16px' } }}
                            >
                                Dashboard
                            </Typography>
                            <hr />
                            <Box
                                sx={{
                                    p: { sm: 1, xs: 0 },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { sm: 2, xs: 1 },
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    textAlign: { xs: 'center', sm: 'left' }
                                }}
                            >
                                    <Box onClick={handleIconClick}
                                        sx={{
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            width: { sm: '130px', xs: '70px' },
                                            height: { sm: '130px', xs: '70px' }
                                        }}
                                        component={'img'}
                                        src={file ?? 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'}
                                        alt="Profile"
                                        loading="lazy"
                                    />
                                <Box>
                                    <Typography
                                        sx={{
                                            color: '#292b2c',
                                            textTransform: 'capitalize',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            fontSize: { sm: '14px', xs: '12px' },
                                            ':hover': { color: '#bb1f2a' }
                                        }}
                                    >
                                        <PersonOutlineOutlinedIcon /> y2code dev
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#292b2c',
                                            textTransform: 'capitalize',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: { sm: '14px', xs: '12px' },
                                            ':hover': { color: '#bb1f2a' }
                                        }}
                                    >
                                        <MailOutlinedIcon /> y2codedev@gmail.com
                                    </Typography>
                                </Box>
                            </Box>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                            <CameraAltIcon
                                onClick={handleIconClick}
                                sx={{ cursor: 'pointer' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default MyAccount;
