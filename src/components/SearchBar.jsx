import React, { useState } from "react";
import {
    Box,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Slide,
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={props.in ? "right" : "left"} ref={ref} {...props} />;
});

const SearchBar = ({ setSearchOpen, openSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleClose = () => {
        setSearchOpen(false);
        setSearchText("");
    };

    const handleSearch = () => {
        console.log("Searching for:", searchText);
    };

    return (
        <div>
            <Dialog disableScrollLock
                open={openSearch}
                onClose={handleClose}
                fullWidth
                maxWidth="md"
                TransitionComponent={Transition}
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                    ".MuiBackdrop-root": {
                        backgroundColor: "rgba(0,0,0,0.8)",
                    },
                }}
            >
                <DialogActions>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            top: { xs: 16, sm: 24 },
                            right: { xs: 16, sm: "16%" },
                        }}
                    >
                        <Close sx={{ color: "#fff" }} />
                    </IconButton>
                </DialogActions>

                <DialogContent sx={{ my: 5 }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 5,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                width: { xs: "100%", sm: "80%", md: "70%" },
                                borderBottom: "2px solid #fff",
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="standard"
                                placeholder="Search..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                InputProps={{
                                    disableUnderline: true,
                                    sx: {
                                        color: "#fff",
                                        "::placeholder": {
                                            color: "#ffffff",
                                        },
                                        fontSize: { xs: "16px", sm: "18px" },
                                    },
                                }}
                            />

                            <IconButton onClick={handleSearch}>
                                <Search sx={{ color: "#fff" }} />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchBar;
