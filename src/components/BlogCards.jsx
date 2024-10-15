import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box,  IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
const BlogCards = ({ blog }) => {
    return (
        <>
            <Card key={blog.id} sx={{ borderRadius: '8px', margin: "5px" }}>
                <Box position="relative">
                    <CardMedia
                        sx={{ minHeight: "233px", maxHeight: "233px", objectFit: "cover" }}
                        component="img"
                        image={blog.image}
                        alt={blog.title}
                        loading="lazy"
                    />
                </Box>
                <CardContent>
                    <Typography variant="h6" sx={{ color: "#292b2c", fontWeight: 600, fontSize: "1rem", fontFamily: "Roboto, sans-serif" }} component="div">
                        {blog.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: '16px', mr: 1, color: 'gray' }} />
                        <Typography variant="body2">{blog.date}</Typography>
                        <IconButton size="small" sx={{ ml: 2 }}>
                            <ChatBubbleOutlineIcon sx={{ fontSize: '16px', color: 'gray' }} />
                        </IconButton>
                    </Box>
                    <Typography sx={{ lineHeight: "28px", color: "#687188" }} variant="body2">
                        {blog.description}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default BlogCards;
