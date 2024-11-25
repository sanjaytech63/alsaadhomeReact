import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Container, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlashSale = ({ flashSale }) => {
    const [timers, setTimers] = useState([]);

    const calculateTimeLeft = (endDate) => {
        const now = new Date().getTime();
        const end = new Date(endDate).getTime();
        const distance = end - now;

        if (distance > 0) {
            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTimers = flashSale.map((item) => calculateTimeLeft(item.end_date));
            setTimers(updatedTimers);
        }, 1000);

        return () => clearInterval(interval);
    }, [flashSale]);

    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {/* Section Title */}
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                Flash Sale
            </Typography>
            <hr />
            {/* Flash Sale Items */}
            <Grid container spacing={3}>
                {flashSale.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Box onClick={() => navigate(`/search?type=display-banner&id=${item.id}`)}
                            sx={{
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                                boxShadow: 2,
                            }}
                        >
                            {/* Image */}
                            <CardMedia
                                component="img"
                                src={item.image}
                                alt={item.banner_name}
                                style={{
                                    width: "100%",
                                    height: "200px",
                                    objectFit: "cover",
                                }}
                            />
                            {/* Sale Timer */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 28,
                                    width: "100%",
                                    color: "#fff",
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                >
                                    {String(timers[index]?.days || 0).padStart(2, "0")} D
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                >
                                    {String(timers[index]?.hours || 0).padStart(2, "0")} H
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                >
                                    {String(timers[index]?.minutes || 0).padStart(2, "0")} M
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                >
                                    {String(timers[index]?.seconds || 0).padStart(2, "0")} S
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FlashSale;