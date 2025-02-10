import { Card, CardContent, CardMedia, Typography, Box, IconButton, Rating } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Link } from 'react-router-dom';
import BlogShimmer from '../components/ShimerEffect/BlogShimer';

const BlogCards = ({ blog, loading }) => {
    if (loading) {
        return <BlogShimmer />
    }

    return (
        <>
            <Card sx={{ borderRadius: '8px', mb: 4, cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)" }}>
                <Box position="relative">
                    <Link to={`/blog/${blog?.slug}`} className='link-none' >
                        <CardMedia
                            sx={{
                                minHeight: "233px", maxHeight: "233px", objectFit: "cover", overflow: "hidden",
                                transition: "transform 0.3s ease-in-out",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                            component="img"
                            // src={blog?.image}
                            src='https://cdn.pixabay.com/photo/2021/11/25/09/27/building-6822998_1280.jpg'
                            alt={blog?.title_blog}
                            loading="lazy"
                        />
                    </Link>
                </Box>
                <CardContent>
                    <Typography variant="h6" sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        wordBreak: "break-all",
                        whiteSpace: "normal",
                        ":hover": {
                            color: "#bb1f2a"
                        },
                        textOverflow: "ellipsis", color: "#292b2c", fontWeight: 600, fontSize: { xs: "12px", sm: "15px" },
                    }} component="div">
                        {blog?.title_blog}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', lineHeight: "28px", }}>
                        <CalendarTodayIcon sx={{ fontSize: '16px', mr: 1, color: 'gray' }} />
                        <Typography variant="body2">{blog?.created_at}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, }} >
                            <ChatBubbleOutlineIcon sx={{ fontSize: '16px', color: 'gray', mr: 1, }} />
                            <Typography variant="body2"> {blog?.comment_count}</Typography>
                        </Box>
                    </Box>
                    <Typography sx={{
                        lineHeight: "28px", color: "#687188",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        wordBreak: "break-all",
                        whiteSpace: "normal",
                        textOverflow: "ellipsis"
                    }} variant="body2">
                        {blog?.short_description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default BlogCards;
