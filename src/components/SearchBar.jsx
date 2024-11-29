import React, { useState, useCallback, useEffect } from "react";
import {
    Box,
    IconButton,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    Slide,
    Typography
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

    const fetchData = useCallback(async (query) => {
        console.log('Fetching data with query:', query); 
        setLoading(true);
        setError(null);
        try {
            const response = await searchApi.getSearchData({ keywords: query, per_page: 10, page: 1 });
            const { data, total, current_page, last_page } = response.data;

            setSearchData(data);
        } catch (err) {
            setError('Failed to load data. Please try again.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedSearchText) fetchData(debouncedSearchText);
    }, [debouncedSearchText, fetchData]);

    const handleClose = () => setSearchOpen(false);


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

                            <IconButton>
                                <Search sx={{ color: "#fff" }} />
                            </IconButton>
                        </Box>
                        {loading ? (
                            <Loading />
                        ) : error ? (
                            <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>
                        ) : (
                            <ResultList data={searchData} />
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchBar;





