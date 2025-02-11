import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, CardMedia, Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
const BlogSideBar = ({ data }) => {

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
                    {data?.recent_blogs?.map(post => (
                        <Box key={post?.id} sx={{ display: "flex", gap: 2, my: 2, alignItems: "center" }}>
                            <CardMedia
                                sx={{ maxWidth: "100%", width: "80px", objectFit: "cover" }}
                                component="img"
                                src={post?.image}
                                alt={post?.title_blog}
                                loading="lazy"
                            />
                            <Box>
                                <Link to={`/blog/${post?.slug}`} className='link-none link-hover'>
                                    <Typography sx={{
                                        ":hover": { color: "#bb1f2a" },
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        color: "#292b2c",
                                        fowntweight: "600",
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                        wordBreak: "break-all",
                                        whiteSpace: "normal",
                                    }}
                                    >
                                        {post?.title_blog}
                                    </Typography>
                                </Link>
                                <Typography sx={{ fontSize: "14px", color: "#687188" }}>{post?.created_at}</Typography>
                            </Box>
                        </Box>
                    ))}
                </List>
            </Box>
            <Divider />
            <Box my={4}>
                <Typography variant="h6" gutterBottom>Archive</Typography>
                <List sx={{ padding: "0px !important" }}>
                    {data?.archive?.map((item, index) => {
                        const date = new Date(item?.month);
                        const year = date.getFullYear(); 
                        const month = String(date.getMonth() + 1).padStart(2, '0'); 
                        const formattedDate = `${year}-${month}`; 
                        return (
                            <Link to={`/blog?dates=${formattedDate}`} className="link-none" key={index}>
                                <ListItem
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        padding: "0px !important",
                                        my: 1,
                                        ":hover": { color: "#bb1f2a" },
                                        cursor: "pointer",
                                    }}
                                >
                                    <span>
                                        <KeyboardArrowRightIcon />
                                    </span>
                                    <ListItemText primary={formattedDate} />
                                    <span>({item?.total_blog})</span>
                                </ListItem>
                            </Link>
                        );
                    })}
                </List>

            </Box>
            <Divider />
            <Box mt={4}>
                <Typography variant="h6" gutterBottom>Tags</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, }} >
                    {data?.tags?.map((tag, index) => {
                        return (
                            (
                                <Link to={`/blog?tag=${tag}`} className='link-none'>
                                    <Typography key={index} sx={{ fontSize: "14px", backgroundColor: "#f7f7f7", p: 1, color: "#333", textTransform: "capitalize", cursor: "pointer", ":hover": { backgroundColor: "#bb1f2a", color: "#fff" } }}>
                                        {tag}
                                    </Typography>
                                </Link>
                            )
                        )
                    }
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default BlogSideBar;