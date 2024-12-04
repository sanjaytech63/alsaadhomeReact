import { Box, Typography } from '@mui/material';
import React from 'react';

const PriceRange = ({ price, handlePriceChange }) => (
    <Box sx={{ width: "100%" }}>
        <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}>
            Price
        </Typography>
        <div class="row mobile-row">
            <div class="form-in col-6 pr-0">
                <input style={{ padding: " 10px" }} value={price.min} onChange={handlePriceChange} class="form-control phone" placeholder="Min price" name="min" min="0" type="number" id="sale_low_price" data-gtm-form-interact-field-id="4" />
            </div>
            <div class="form-in col-6">
                <input style={{ padding: " 10px" }} value={price.max} onChange={handlePriceChange} class="form-control phone" placeholder="Max price" name="max" min="0" type="number" id="sale_high_price" />
            </div>
        </div>
    </Box>
);

export default PriceRange;
