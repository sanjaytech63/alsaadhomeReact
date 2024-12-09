import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Grid, Container, CardMedia } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const FlashSale = ({ flashSale }) => {
    const [timers, setTimers] = useState([]);
    const navigate = useNavigate();

    const saudiTimeOffset = -2 * 45 * 60 * 1000;

    const calculateTimeLeft = (endDate) => {
        const saudiTime = new Date(new Date().getTime() + saudiTimeOffset);
        const end = new Date(endDate).getTime();
        const distance = end - saudiTime.getTime();

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

    const memoizedTimers = useMemo(() => timers, [timers]);

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    textTransform: "capitalize",
                    textAlign: "left",
                    mx: 2,
                    fontSize: { xs: "18px", sm: "24px" },
                }}
            >
                Flash Sale
            </Typography>
            <hr />
            {/* Flash Sale Items */}
            <Grid container spacing={3}>
                {flashSale &&
                    flashSale.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Link state={{
                                id: item.id,
                                type: 'flash_sale'
                            }} to={`/search?type=flash-sale&id=${item.id}`} className="link-none">
                                <Box
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
                                        loading="lazy"
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
                                            {String(memoizedTimers[index]?.days || 0).padStart(2, "0")} D
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                        >
                                            {String(memoizedTimers[index]?.hours || 0).padStart(2, "0")} H
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                        >
                                            {String(memoizedTimers[index]?.minutes || 0).padStart(2, "0")} M
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 600, backgroundColor: "#bb1f2a", px: 1, py: 1 }}
                                        >
                                            {String(memoizedTimers[index]?.seconds || 0).padStart(2, "0")} S
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default React.memo(FlashSale);

