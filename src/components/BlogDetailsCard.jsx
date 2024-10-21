import { Box, Typography, TextField, Grid,Chip } from '@mui/material';
import React from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { BsGrid } from "react-icons/bs";

const BlogDetailsCard = ({ blog }) => {
    return (
        <div>
            {blog?.title && (
                <Typography
                    sx={{
                        fontSize: { xs: "22px", md: "30px" },
                        color: "#292b2c",
                        fontFamily: "Roboto",
                        fontWeight: "600",
                    }}
                >
                    {blog?.title}
                </Typography>
            )}
            {blog?.comments && (
                <Box className='d-flex  gap-3 m-0 p-0 my-4'>
                    <Typography sx={{
                        color: "#292b2c", cursor: "pointer", ":hover": {
                            color: "#bb1f2a"
                        }
                    }}>
                        <span style={{ color: "#bb1f2a" }}><DateRangeIcon /></span>  {blog?.dates}
                    </Typography>
                    <Typography sx={{
                        color: "#292b2c", cursor: "pointer", ":hover": {
                            color: "#bb1f2a"
                        }
                    }}>
                        <span style={{ color: "#bb1f2a" }}><TextsmsIcon /></span>  {blog?.comments}
                    </Typography>
                </Box>
            )}
            {blog?.img && (
                <img
                    src={blog?.img}
                    alt={blog?.subtitle}
                    style={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            )}

            <Typography
                sx={{
                    fontSize: { xs: "18px", md: "24px" },
                    color: "#6c757d",
                    mt: 3,
                    fontWeight: "500"
                }}
            >
                {blog?.subtitle}
            </Typography>
            <Typography sx={{ mt: 2, color: "#6c757d", fontSize: { xs: "12px", sm: "15px" }, }}>
                {blog?.introduction}
            </Typography>
            <Box sx={{ mt: 4 }}>
                {blog?.tips && blog?.tips?.map((tip, index) => (
                    <Box key={index} sx={{ mb: 2, display: "flex", alignItems: "center", gap: "10px" }}>
                        <Typography sx={{ color: "#6c757d", fontSize: { xs: "12px", sm: "15px" }, }}>
                            {tip?.text}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
                <Typography sx={{ backgroundColor: "#f7f7f7", p: 1, color: "#292b2c" }}>
                    Mattress
                </Typography>
                {/* Share Section */}
                <Box display="flex" gap={2} alignItems="center">
                    <span style={{ backgroundColor: "#1877f2", padding: "4px 8px", borderRadius: "4px", color: "#fff" }}><FaFacebookF /></span>
                    <span style={{ backgroundColor: "#1877f2", padding: "4px 8px", borderRadius: "4px", color: "#fff" }}><FaTwitter /></span>
                    <span style={{ backgroundColor: "#12af0a", padding: "3px", borderRadius: "4px", color: "#fff" }}><WhatsAppIcon /> </span>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "#f7f8fb", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{
                    fontSize: { sm: "16px", xs: "14px" }, display: "flex", gap: 1, alignItems: "center", ":hover": {
                        color: "#bb1f2a", cursor: "pointer"
                    }
                }}>
                    <span><WestIcon /></span>
                    <span className="d-sm-block d-none">Hotel Bed Comforter</span>
                </Box>
                <Typography sx={{
                    ":hover": {
                        color: "#bb1f2a", cursor: "pointer"
                    }
                }}><BsGrid size={20} /></Typography>
                <Box sx={{
                    fontSize: { sm: "16px", xs: "14px" }, display: "flex", gap: 1, alignItems: "center", ":hover": {
                        color: "#bb1f2a", cursor: "pointer"
                    }
                }}>
                    <span className="d-sm-block d-none">Bed linen Types</span>
                    <span><EastIcon /></span>
                </Box>
            </Box>
            <Box sx={{ border: "solid 1px #eee", my: 4, padding: "1.5rem", display: "flex", alignItems: "center", gap: 2 }}>
                <img style={{ maxWidth: "100px" }} src="https://al-saad-home.mo.cloudinary.net/assets/images/user.png" alt="blog-avtar" />
                <span style={{ color: "#687188", fontSize: "14px" }} >Author</span>
            </Box>
            <Typography sx={{ my: 4, color: "#292b2c", fontFamily: "Roboto", fontWeight: "600" }}>
                (0) Comment
            </Typography >
            <Box component="form" mb={5}>
                <Typography sx={{ my: 4, color: "#292b2c", fontFamily: "Roboto", fontWeight: "600" }}>
                    Write a comment
                </Typography >
                <Grid item>
                    <Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Your Name" required />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth label="Enter Email Email" required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Message" required />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>

        </div>
    );
}

export default BlogDetailsCard;
