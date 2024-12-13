import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Chip, CardMedia, Paper, InputBase, IconButton } from '@mui/material';
import jsonData from "../../src/blogData.json";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
const BlogSideBar = () => {
    const recentPosts = jsonData.recentPosts;
    const archive = jsonData.archive;
    const tags = jsonData.tags;


    return (
        <Box sx={{ width: "100%", mb: 3 }}>
            <Box mb={4}>
                <Box sx={{ width: "100%" }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search...' }}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Box>
                <hr />
                <Typography variant="h6" gutterBottom>Recent Posts</Typography>
                <List>
                    {recentPosts.map(post => (
                        <Box key={post.id} sx={{ display: "flex", alignItems: "center" }}>
                            <CardMedia
                                sx={{ maxWidth: "100%", width: "80px", objectFit: "cover" }}
                                component="img"
                                image={post.image}
                                alt={post.title}
                                loading="lazy"
                            />
                            <ListItem key={post.id}>
                                <ListItemText sx={{ ":hover": { color: "#bb1f2a" }, cursor: "pointer", fontSize: "14px", fowntweight: "600" }} primary={post.title} secondary={post.date} />
                            </ListItem>
                        </Box>
                    ))}
                </List>
            </Box>
            <Divider />
            <Box my={4}>
                <Typography variant="h6" gutterBottom>Archive</Typography>
                <List sx={{ padding: "0px !important" }}>
                    {archive.map((month, index) => (
                        <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0px !important", my: 1, ":hover": { color: "#bb1f2a" }, cursor: "pointer" }} key={index}>
                            <span><KeyboardArrowRightIcon /></span> <ListItemText primary={month} />
                            <span>(1)</span>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Divider />
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>Tags</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, }} >
                    {tags.map((tag) => (
                        <Chip sx={{
                            cursor: "pointer",
                            backgroundColor: "#f7f7f7",
                            color: "#333",
                            border: "none",
                            fontSize: "14px",
                            borderRadius: "0px",
                            padding: "8px 15px",
                            "&:hover": {
                                backgroundColor: "#bb1f2a",
                                color: "#fff",
                            },

                        }}
                            key={tag.id} label={tag.label} variant="outlined" />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default BlogSideBar;
