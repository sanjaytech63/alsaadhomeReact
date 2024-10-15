import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ImMap2 } from "react-icons/im";


const ContactCard = ({ location }) => {
    return (
        <Card sx={{ boxShadow: 2 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <Box
                        sx={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            border: "1px solid #bb1f2a",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#bb1f2a",
                                color: "#fff",
                            },
                            transition: "all 0.3s ease",
                            margin: "8px",
                        }}
                    >
                        <ImMap2
                            size={30}
                            sx={{
                                color: '#bb1f2a',
                                '&:hover': {
                                    color: '#fff',
                                },
                            }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ color: "#333", fontWeight: 600, textAlign: "center" }}
                    >
                        {location.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "#687188", lineHeight: "28px", textAlign: "center" }}
                    >
                        {location.location}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ContactCard;
