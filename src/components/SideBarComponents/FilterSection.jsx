import React from 'react';
import { Box, Typography } from '@mui/material';
import FilterChip from './FilterChip';

const FilterSection = ({ label, items, selectedItems, toggleItem, styleShowMore, setStyleShowMore, id }) => {
    const tags = styleShowMore?.includes(id) ? items : items.slice(0, 5);
    return (
        <Box mt={4}>
            <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tags.map((item) => {
                    const isSelected = selectedItems?.includes(item?.attributes_value_id) || false;
                    return (
                        <FilterChip
                            key={item.attributes_value_id}
                            label={item.attribute_value}
                            isSelected={isSelected}
                            onClick={() => toggleItem(item.attributes_value_id)}
                        />
                    );
                })}
            </Box>
            {items.length > 5 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Typography
                        onClick={() =>
                        {
                            console.log(id, 'showMore id')
                            setStyleShowMore((prev) =>
                                prev.includes(id)
                                    ? prev.filter(id => id !== id)
                                    : [...prev, id]
                            )
                        }
                        }

                        sx={{
                            mt: 2,
                            color: "#bb1f2a",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        {styleShowMore?.includes(id) ? "Show Less" : "Show More"}
                    </Typography>
                </Box>
            )}
        </Box>
    );
}

export default FilterSection;
