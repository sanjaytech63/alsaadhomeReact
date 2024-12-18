import React, { useState, useCallback, useEffect } from "react";
import {
    Box,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Slide,
    Typography,
    Container
} from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import Loading from './Loading';
import { searchApi } from '../utils/services/searchService';
import useDebounce from '../hooks/useDebounce';
import ResultList from './SearchFliter/ResultList';
import useSearchStore from '../store/useSearchStore';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction={props.in ? "right" : "left"} ref={ref} {...props} />;
});

const SearchBar = ({ setSearchOpen, openSearch }) => {
    const { searchData, loading, error, setSearchData, setLoading, setError } = useSearchStore();
    const [searchText, setSearchText] = useState('');
    const debouncedSearchText = useDebounce(searchText, 300);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await searchApi.getSearchData(debouncedSearchText);
            setSearchData(response?.data);
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchText, setLoading, setError, setSearchData]);

    useEffect(() => {
        if (debouncedSearchText.trim().length >= 1) {
            fetchData();
        }
    }, [debouncedSearchText, fetchData]);

    const handleClose = () => {
        setSearchText('');
        setSearchData([]);
        setSearchOpen(false);
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <div>
            <Container maxWidth="lg" >
                <Dialog
                    disableScrollLock
                    open={openSearch}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="lg"

                    TransitionComponent={Transition}
                    sx={{
                        overflow: "hidden",
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
                                top: { xs: 2, sm: 45 },
                                right: { xs: 1, sm: "2%" },
                            }}
                        >
                            <Close sx={{ color: "#fff" }} />
                        </IconButton>
                    </DialogActions>

                    <DialogContent sx={{ my: 5, overflow: "hidden", height: 'calc(100vh - 100px)' }}>
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
                                    width: { xs: "100%", sm: "100%", },
                                    borderBottom: "2px solid #fff",
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    placeholder="Search..."
                                    value={searchText}
                                    onChange={handleChange}
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

                                <IconButton>
                                    <Search sx={{ color: "#fff" }} />
                                </IconButton>
                            </Box>
                            {loading ? (
                                <Loading />
                            ) : error ? (
                                <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>
                            ) : (Array.isArray(searchData) && searchData.length > 0 ?
                                <ResultList data={searchData} handleClose={handleClose} /> : <Typography sx={{ color: '#fff', mt: 2 }}>No results found.</Typography>
                            )}

                        </Box>
                    </DialogContent>
                </Dialog>
            </Container>
        </div>
    );
};

export default SearchBar;





