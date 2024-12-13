import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const ColorSelector = ({ colors, selectedColors, toggleColor, label }) => {
    return (
        <Box mt={4}>
            <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem" }}>
                {label}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {colors && colors.length > 0 && colors.map((color, index) => {
                    const isSelected = selectedColors.includes(color.attributes_value_id);
                    return (
                        <Box
                            key={index}
                            onClick={() => toggleColor(color.attributes_value_id)}
                            sx={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                cursor: "pointer",
                                backgroundColor: color.attribute_value,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                boxShadow: isSelected
                                    ? "0 0 0 2px #bb1f2a"
                                    : "0 0 0 1px #fff",
                            }}
                        >
                            {isSelected && (
                                <CheckIcon
                                    sx={{
                                        color: "#fff",
                                        fontSize: "20px",
                                        position: "absolute",
                                    }}
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ColorSelector;
