import React from 'react';
import { FormControl, InputLabel, Select, MenuItem , Box, Typography} from '@mui/material';

const SortSelect = ({ sortOptions, sortOrder, handleChangeSort }) => (
    <Box sx={{ width: "100%" }}>
        <Typography
            variant="h5"
            sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}
        >
            Sort
        </Typography>
        <FormControl sx={{ width: "100%" }} fullWidth size="small" variant="outlined">
            <InputLabel id="sort-order-label">Sort</InputLabel>
            <Select inputProps={{ MenuProps: { disableScrollLock: true } }}
                sx={{
                    padding: "3px",
                    '&:focus-visible': {
                        outline: 'none',
                        boxShadow: 'none',
                    },
                }}
                labelId="sort-order-label"
                id="sortOrder"
                value={sortOrder}
                label="Sort"
                onChange={handleChangeSort}
            >
                <MenuItem value="">
                    <em>Sort</em>
                </MenuItem>

                <MenuItem disabled>Price</MenuItem>
                {Object.entries(sortOptions.price).map(([key, label]) => (
                    <MenuItem sx={{ marginLeft: "30px" }} key={key} value={key}>
                        {label}
                    </MenuItem>
                ))}

                <MenuItem disabled>Age</MenuItem>
                {Object.entries(sortOptions.age).map(([key, label]) => (
                    <MenuItem sx={{ marginLeft: "30px" }} key={key} value={key}>
                        {label}
                    </MenuItem>
                ))}

                <MenuItem disabled>Quantity</MenuItem>
                {Object.entries(sortOptions.quantity).map(([key, label]) => (
                    <MenuItem sx={{ marginLeft: "30px" }} key={key} value={key}>
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
);

export default SortSelect;


