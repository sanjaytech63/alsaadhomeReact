import React, { useState, useEffect } from 'react';
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
import { blogApi } from '../utils/services/blogServices';
import BlogShimmer from '../components/ShimerEffect/BlogShimer';

const BlogCard = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchHomeBlogData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await blogApi.getHomeBlogData({});
            setBlog(response.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomeBlogData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <Container>
            <BlogShimmer />
        </Container>;
    }

    return (
        <div className="w-100  my-5,">
            <Container maxWidth="lg" sx={{ padding: 0, my: 4 }}>
                <Box sx={{ px: { xs: 2, sm: "0px" } }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, fontSize: { sm: "24px", xs: "16px" }, mb: 2, textAlign: { sm: "center", xs: "left" } }}>
                        Blogs
                    </Typography>
                    <Typography sx={{ color: "#687188", mb: 4, fontSize: { sm: "16px", xs: "14px" }, textAlign: { sm: "center", xs: "left" } }} variant="body1" align="center" >
                        We are pleased to provide educational information to help you choose your products
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {blog && blog.map((blog) => (
                            <Grid item xs={12} sm={6} md={4} key={blog.id}>
                                <Card onClick={() => navigate(`/blog/${blog.slug}`)} key={blog.id} sx={{ borderRadius: '8px', margin: "5px", cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)", height: "100%", overflow: "hidden" }}>
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
                                            alt={blog.title_blog}
                                            loading="lazy"
                                        />
                                    </Box>
                                    <CardContent>
                                        <Typography variant="h6" sx={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            wordBreak: "break-all",
                                            whiteSpace: "normal",
                                            textOverflow: "ellipsis",
                                            color: "#292b2c",
                                            fontWeight: 600,
                                            fontSize: { xs: "14px", sm: "1rem" },
                                            fontFamily: "Roboto, sans-serif",
                                            ":hover": { color: "#bb1f2a" }
                                        }} component="div">
                                            {blog.title_blog}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: '16px', mr: 1, color: 'gray' }} />
                                            <Typography variant="body2">{blog.created_at}</Typography>
                                            <IconButton size="small" sx={{ ml: 2 }}>
                                                <ChatBubbleOutlineIcon sx={{ fontSize: '16px', color: 'gray' }} /> {blog.comment_count}
                                            </IconButton>
                                        </Box>
                                        <Typography sx={{
                                            display: "-webkit-box",
                                            overflow: "hidden",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 4,
                                            wordBreak: "break-all",
                                            whiteSpace: "normal",
                                            textOverflow: "ellipsis",
                                            lineHeight: "28px",
                                            color: "#687188",
                                            fontSize: { xs: "14px", sm: "16px" },
                                        }} variant="body2">
                                            {blog.short_description}
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
