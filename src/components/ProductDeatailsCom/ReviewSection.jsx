import { Box, Grid, Rating, Typography, Avatar, } from '@mui/material'
import React, { useState } from 'react'
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { showToast } from '../../utils/helper';
import data from "../../product.json";
const ReviewSection = () => {
    const review = data.review;
    const [count, setCount] = useState(0);
    const [likes, setLikes] = useState([]);
    const handleLike = (id) => {
        if (likes.includes(id)) {
            setLikes((prevLikes) => prevLikes.filter((likeId) => likeId !== id));
            showToast("error", "Dislike");
            if (count !== 0) {
                setCount(count - 1);
            }
        } else {
            setLikes((prevLikes) => [...prevLikes, id]);
            showToast("success", "Like Successfully 😍");
            if (count !== 0) {
                setCount(count + 1);
            }
        }
    };
    return (
        <>
            <Box id="Reviews" sx={{ width: "100%" }}>
                <Box
                    sx={{
                        my: { sm: 6, xs: 3 },
                        textAlign: "left",
                        display: "flex",
                        alignItems: "flex-start",
                    }}
                >
                    <Grid container spacing={2} display="flex" alignItems="center">
                        <Grid item xs={12} >
                            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Customer Reviews</Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Rating value={null} precision={0.5} readOnly />
                        </Grid>
                        <Grid item xs={12} >
                            <Typography sx={{ fontSize: { sm: 16, xs: 14 }, mt: { xs: 1, sm: "4px" } }}>
                                3.3 out of 5
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <hr />
                {/* Reviews List */}
                <Box sx={{ mt: 4, width: "100%" }}>
                    <Grid container spacing={3}>
                        {review.map((review) => (
                            <Grid item xs={12} sm={6} md={4} key={review.id}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        border: "1px solid #ddd",
                                        borderRadius: 2,
                                        p: 2,
                                        height: "100%",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                        <Avatar
                                            src={review.image}
                                            alt={review.name}
                                            sx={{ width: 40, height: 40, mr: 2, objectFit: "cover" }}
                                        />
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="body1"
                                                sx={{ fontWeight: 600, textTransform: "capitalize" }}
                                            >
                                                {review.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: "right" }}>
                                            <Rating
                                                value={review.rating}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    alignItems: "center",
                                                    gap: 1,
                                                    mt: 1,
                                                }}
                                            >
                                                <ThumbUpOffAltIcon
                                                    onClick={() => handleLike(review.id)}
                                                    sx={{
                                                        textAlign: "right",
                                                        cursor: "pointer",
                                                        color: likes.includes(review.id) ? "blue" : "none",
                                                    }}
                                                />
                                                <Typography sx={{ textAlign: "right" }}>
                                                    {likes.includes(review.id) ? count + 1 : count}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 600, textTransform: "capitalize" }}
                                    >
                                        {review.reviewTitle}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 1, textTransform: "capitalize" }}
                                    >
                                        {review.reviewBody}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        sx={{ mt: 2, textAlign: "right" }}
                                    >
                                        {review.date}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default ReviewSection
