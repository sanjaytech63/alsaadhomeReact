import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react'

const BrandSelector = ({selectedBrands, toggleBrand, brandShow, setBrandShow, tags, label }) => {
    const tag = brandShow ? tags : tags.slice(0, 5);
    return (
        <>
            <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tag.map((tag) => {
                    const isSelected = selectedBrands.includes(tag.attributes_value_id);
                    return (
                        <Chip
                            key={tag.id}
                            label={tag.attribute_value}
                            clickable
                            onClick={() => toggleBrand(tag.attributes_value_id)}
                            icon={
                                isSelected ? (
                                    <CheckCircle sx={{ fontSize: "15px" }} />
                                ) : (
                                    <RadioButtonUnchecked sx={{ fontSize: "15px" }} />
                                )
                            }
                            sx={{
                                backgroundColor: isSelected ? "#bb1f2a" : "#eee",
                                color: isSelected ? "#fff" : "#000",
                                borderRadius: "4px",
                                fontWeight: "600",
                                "& .MuiChip-icon": {
                                    color: isSelected ? "#fff" : "#292b2c",
                                },
                                "&:hover": {
                                    backgroundColor: isSelected ? "#bb1f2a" : "#ddd",
                                },
                            }}
                        />
                    );
                })}
            </Box>
            {tag?.length > 4 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    <Typography
                        onClick={() => setBrandShow(!brandShow)}
                        sx={{
                            mt: 2,
                            color: "#bb1f2a",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        {brandShow ? "Show Less" : "Show More"}
                    </Typography>
                </Box>
            )}
        </>
    )
}

export default BrandSelector
