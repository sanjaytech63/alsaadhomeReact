import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';
import React from 'react'

const BrandSelector = ({ tagsToShow, selectedBrands, toggleBrand, showMore, setShowMore, tags, label }) => {
    return (
        <>
            <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tagsToShow.map((tag) => {
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {tags.length > 5 && (
                    <Typography
                        onClick={() => setShowMore(!showMore)}
                        sx={{
                            mt: 2,
                            color: "#bb1f2a",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                    >
                        {showMore ? "Show Less" : "Show More"}
                    </Typography>
                )}
            </Box >
        </>
    )
}

export default BrandSelector
