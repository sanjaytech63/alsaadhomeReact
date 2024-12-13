import React from 'react';
import { Paper, InputBase, IconButton, Divider, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({ searchTerm, handleSearch }) => (
    <>
        <Box sx={{ width: "100%" }}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
                <InputBase
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search...' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Box>
        <hr />
    </>
);

export default SearchInput;
