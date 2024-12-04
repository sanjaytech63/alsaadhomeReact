import React from 'react';

import { Box, Typography } from '@mui/material';
import FilterChip from './FilterChip';

const FilterSection = ({ label, items, selectedItems, toggleItem, tagsToShow }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {items && items.map((item) => {
                    const isSelected = selectedItems?.includes(item?.attributes_value_id) || false;
                    return (
                        <FilterChip
                            key={item.attributes_value_id}
                            label={item.attribute_value}
                            tagsToShow={tagsToShow}
                            isSelected={isSelected}
                            onClick={() => toggleItem(item.attributes_value_id)}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}

export default FilterSection;
