import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Grid,
    IconButton,
    Container
} from '@mui/material';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

const blogsData = [
    {
        id: 1,
        image: 'https://al-saad-home.mo.cloudinary.net/uploads/blogs/28/SaveClip.App_403859766_863853121897730_2383937890439857369_n1727595627.jpg',
        title: 'How Does Carpet Change the Atmosphere of Your Home...',
        date: 'Sep 29, 2024',
        description: 'How Does Carpet Change the Atmosphere of Your Home? Tips for Coordinating Carpets with Bedrooms and Living Rooms Choosing the Right...',
    },
    {
        id: 2,
        image: 'https://al-saad-home.mo.cloudinary.net/uploads/blogs/27/_704fe71c-5cb1-4b8d-8af4-72c3d4aa64fc1725968230.jpg',
        title: 'The Ultimate Guide to King Size Bed Dimensions: CM...',
        date: 'Sep 10, 2024',
        description: 'The Ultimate Guide to King Size Bed Dimensions: CM vs Feet vs inches Importance of Knowing Bed Dimensions for Space Planning Why...',
    },
    {
        id: 3,
        image: 'https://al-saad-home.mo.cloudinary.net/uploads/blogs/26/Folded%20Matress%20-31725948186.jpg',
        title: 'Foldable mattresses : A Perfect Solution for Small...',
        date: 'Sep 09, 2024',
        description: '-The benefits of folding mattresses for small spaces -Types of folding mattresses -Materials and comfort considerations -Benefits of folding...',
    },
];

const BlogCard = () => {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();


    return (
        <div className="w-100 sm:my-5 my-3">
            <Container maxWidth="lg" sx={{ padding: 0 }}>
                <Box sx={{ px: { xs: 2, sm: "0px" } }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { sm: "24px", xs: "16px" }, mb: 2, textAlign: { sm: "center", xs: "left" } }}>
                        Blogs
                    </Typography>
                    <Typography sx={{ color: "#687188", mb: 4, fontSize: { sm: "16px", xs: "14px" }, textAlign: { sm: "center", xs: "left" } }} variant="body1" align="center" >
                        We are pleased to provide educational information to help you choose your products
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {blogsData.map((blog) => (
                            <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <Card onClick={() => navigate(`/blog/${blog.title}`)} key={blog.id} sx={{ borderRadius: '8px', margin: "5px", cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)"  }}>
                                    <Box position="relative">
                                        <CardMedia
                                            sx={{
                                                minHeight: "233px",
                                                maxHeight: "233px",
                                                objectFit: "cover",
                                                overflow: "hidden",
                                                transition: "transform 0.3s ease-in-out",
                                                "&:hover": {
                                                    transform: "scale(1.1)",
                                                },
                                            }}
                                            component="img"
                                            image={blog.image}
                                            alt={blog.title}
                                            loading="lazy"
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: "#292b2c", fontWeight: 600, fontSize: { xs: "15px", sm: "1rem" }, fontFamily: "Roboto, sans-serif" }} component="div">
                                            {blog.title}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: '16px', mr: 1, color: 'gray' }} />
                                            <Typography variant="body2">{blog.date}</Typography>
                                            <IconButton size="small" sx={{ ml: 2 }}>
                                                <ChatBubbleOutlineIcon sx={{ fontSize: '16px', color: 'gray' }} />
                                            </IconButton>
                                        </Box>
                                        <Typography sx={{ lineHeight: "28px", color: "#687188", fontSize: { xs: "12px", sm: "15px" }, }} variant="body2">
                                            {blog.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default BlogCard;
