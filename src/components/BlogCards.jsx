import { Card, CardContent, CardMedia, Typography, Box, IconButton, Rating, Skeleton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import Slecton from './Slecton';

const BlogCards = ({ blog, loading }) => {


    const navigate = useNavigate();

    const handleNavigative = () => {
        navigate("/blog-details");
    }

  

    return (
        <>
            {loading ? (<Slecton />) : (
                <Card onClick={handleNavigative} key={blog.id} sx={{ borderRadius: '8px', mb: 4 }}>
                    <Box position="relative">
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
                            image={blog.images}
                            alt={blog.title}
                            loading="lazy"
                        />
                    </Box>
                    <CardContent>
                        <Typography variant="h6" sx={{
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            wordBreak: "break-all",
                            whiteSpace: "normal",
                            textOverflow: "ellipsis", color: "#292b2c", fontWeight: 600, fontSize: { xs: "12px", sm: "15px" }, fontFamily: "Roboto, sans-serif"
                        }} component="div">
                            {blog.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <CalendarTodayIcon sx={{ fontSize: '16px', mr: 1, color: 'gray' }} />
                            <Typography variant="body2">4 June 2024</Typography>
                            <IconButton size="small" sx={{ ml: 2 }}>
                                <ChatBubbleOutlineIcon sx={{ fontSize: '16px', color: 'gray' }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body2"> Price: {blog.price}</Typography>
                            <Typography variant="body2"> Discount: {blog.discountPercentage}</Typography>
                        </Box>
                        <Rating name="no-value" value={blog.rating} />
                        <Typography sx={{
                            lineHeight: "28px", color: "#687188",
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            wordBreak: "break-all",
                            whiteSpace: "normal",
                            textOverflow: "ellipsis"
                        }} variant="body2">
                            {blog.description}
                        </Typography>
                    </CardContent>
                </Card>
            )
            }
        </>
    );
};

export default BlogCards;
