import React from "react";
import { Dialog, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const OtpDialog = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="otp-dialog-title"
            aria-describedby="otp-dialog-description"
            PaperProps={{
                sx: {
                    px: "20px",
                    py: "20px",
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "400px",
                },
            }}
        >
            <Box sx={{ position: "relative" }}>
                {/* Close Icon */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 1,
                        right: 1,
                        color: "#000",
                    }}
                >
                    <Close />
                </IconButton>

                {/* Dialog Content */}
                <Typography
                    variant="h6"
                    id="otp-dialog-title"
                    sx={{ fontWeight: "bold", mt: 1, fontSize: "20px", textAlign: "left" }}
                >
                    Enter OTP
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    id="otp-dialog-description"
                    sx={{ mb: 2, textAlign: "left" }}
                >
                    Enter the code sent to your mobile
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 1,
                        mt: 2,
                    }}
                >
                    {Array.from({ length: 6 }).map((_, index) => (
                        <TextField
                            key={index}
                            variant="outlined"
                            inputProps={{
                                maxLength: 1,
                                style: {
                                    textAlign: "center",
                                    fontSize: "18px",
                                    width: "50px",
                                    height: "50px",
                                },
                            }}
                        />
                    ))}
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: "#000",
                        color: "#fff",
                        width: "100%",
                        fontSize: "16px",
                    }} >
                    Verify OTP
                </Button>
            </Box>
        </Dialog>
    );
};

export default OtpDialog;
