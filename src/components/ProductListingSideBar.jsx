import React, { useState } from 'react';
import { Box, Typography, Button, Chip, CardMedia, Paper, InputBase, Select, MenuItem, FormControl, InputLabel, } from '@mui/material';
import Switch from '@mui/material/Switch';

import { OptionGroup as BaseOptionGroup } from '@mui/base/OptionGroup';
import jsonData from "../../src/blogData.json";


const ProductListingSideBar = () => {
    const [tags, setTags] = useState(jsonData.tags);
    const [sizes, setSizes] = useState(jsonData.sizes);
    const [thickness, setThickness] = useState(jsonData.thickness);
    const [material, setMaterial] = useState(jsonData.material);
    const [styles, setStyles] = useState(jsonData.styles);
    const [color, setColor] = useState(jsonData.colors);
    const [sortOrder, setSortOrder] = useState('');

    const handleChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <Box sx={{ width: "100%", mb: 3 }}>
            <Box mb={4}>
                <Box sx={{ width: "100%" }}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, padding: " 3px" }}
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search...' }}
                        />
                    </Paper>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}>
                        Sort
                    </Typography>
                    <FormControl sx={{ width: "100%" }} fullWidth size="small" variant="outlined">
                        <InputLabel id="sort-order-label">Sort</InputLabel>
                        <Select
                            sx={{ padding: "3px" }}
                            labelId="sort-order-label"
                            id="sortOrder"
                            value={sortOrder}
                            label="Sort"
                            onChange={handleChange}

                        >
                            <MenuItem value="">
                                <em>Sort</em>
                            </MenuItem>
                            <BaseOptionGroup label="Price" value={'LTH'}>
                                <MenuItem value="LTH">Low to High</MenuItem>
                                <MenuItem value="HTL">High to Low</MenuItem>
                            </BaseOptionGroup>
                            <BaseOptionGroup label="Age">
                                <MenuItem value="new">New First</MenuItem>
                                <MenuItem value="old">Old First</MenuItem>
                            </BaseOptionGroup>
                            <BaseOptionGroup label="Quantity">
                                <MenuItem value="MQ">Most Quantity</MenuItem>
                                <MenuItem value="LQ">Less Quantity</MenuItem>
                            </BaseOptionGroup>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h5" sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}>
                        Price
                    </Typography>
                    <div class="row mobile-row">
                        <div class="form-in col-6 pr-0">
                            <input style={{ padding: " 10px" }} class="form-control phone" placeholder="Min price" name="sale_low_price" min="0" type="number" id="sale_low_price" data-gtm-form-interact-field-id="4" />
                        </div>
                        <div class="form-in col-6">
                            <input style={{ padding: " 10px" }} class="form-control phone" placeholder="Max price" name="sale_high_price" min="0" type="number" id="sale_high_price" />
                        </div>
                    </div>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h5" sx={{ my: 2, color: "#687188", fontWeight: "600", fontSize: "12px", fontFamily: "Roboto, sans-serif" }}>
                        Only selected
                    </Typography>
                    <Switch defaultChecked />
                    <Typography variant="h5" sx={{ my: 2, color: "#687188", fontWeight: "600", fontSize: "12px", fontFamily: "Roboto, sans-serif" }}>
                        Any of selected
                    </Typography>
                </Box>

            </Box>

            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Brand
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tags.map((tag, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "#eee",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#bb1f2a",
                                    color: "#fff",
                                },
                                px: 1,
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById(`radio-${tag}-${index}`).click()}
                        >
                            <input
                                type="radio"
                                id={`radio-${tag}-${index}`}
                                name="brand"
                                style={{ marginRight: "8px" }}
                            />
                            <Chip
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontSize: "14px",
                                    border: "none",
                                    "&:hover": {
                                        color: "#fff",
                                    },
                                }}
                                label={tag}
                                variant="outlined"
                            />
                        </Box>
                    ))}
                </Box>

            </Box>

            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Size
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {sizes.map(({ label }, index) => (

                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "#eee",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#bb1f2a",
                                    color: "#fff",
                                },
                                px: 1,
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById(`radio-${label}-${index}`).click()}
                        >
                            <input
                                type="radio"
                                id={`radio-${label}-${index}`}
                                name="brand"
                                style={{ marginRight: "8px" }}
                            />
                            <Chip
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontSize: "14px",
                                    border: "none",
                                    "&:hover": {
                                        color: "#fff",
                                    },
                                }}
                                label={label}
                                variant="outlined"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Thickness
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {thickness.map(({ label }, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "#eee",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#bb1f2a",
                                    color: "#fff",
                                },
                                px: 1,
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById(`radio-${label}-${index}`).click()}
                        >
                            <input
                                type="radio"
                                id={`radio-${label}-${index}`}
                                name="brand"
                                style={{ marginRight: "8px" }}
                            />
                            <Chip
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontSize: "14px",
                                    border: "none",
                                    "&:hover": {
                                        color: "#fff",
                                    },
                                }}
                                label={label}
                                variant="outlined"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Material
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {material.map(({ text }, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "#eee",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#bb1f2a",
                                    color: "#fff",
                                },
                                px: 1,
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById(`radio-${text}-${index}`).click()}
                        >
                            <input
                                type="radio"
                                id={`radio-${text}-${index}`}
                                name="brand"
                                style={{ marginRight: "8px" }}
                            />
                            <Chip
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontSize: "14px",
                                    border: "none",
                                    "&:hover": {
                                        color: "#fff",
                                    },
                                }}
                                label={text}
                                variant="outlined"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Color
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, }}>
                    {color.map((col, index) => (
                        <Typography key={index} sx={{ boxShadow: 3, padding: "10px", borderRadius: "50%", cursor: "pointer", backgroundColor: col.hex, fontSize: "14px", border: "solid 1px #fff", }}>
                        </Typography>
                    ))}
                </Box>
            </Box>
            <Box mt={4}>
                <Typography
                    variant="h5"
                    sx={{
                        my: 2,
                        color: "#292b2c",
                        fontWeight: "600",
                        fontSize: "1.5rem",
                        fontFamily: "Roboto, sans-serif",
                    }}
                >
                    Styles
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {styles.map(({ name }, index) => (
                        <Box
                            key={index}
                            sx={{
                                backgroundColor: "#eee",
                                color: "#000",
                                display: "flex",
                                alignItems: "center",
                                "&:hover": {
                                    backgroundColor: "#bb1f2a",
                                    color: "#fff",
                                },
                                px: 1,
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                            onClick={() => document.getElementById(`radio-${name}-${index}`).click()}
                        >
                            <input
                                type="radio"
                                id={`radio-${name}-${index}`}
                                name="brand"
                                style={{ marginRight: "8px" }}
                            />
                            <Chip
                                sx={{
                                    cursor: "pointer",
                                    color: "inherit",
                                    fontSize: "14px",
                                    border: "none",
                                    "&:hover": {
                                        color: "#fff",
                                    },
                                }}
                                label={name}
                                variant="outlined"
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 4, alignItems: "center" }}>
                <Button variant="contained" sx={{ backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px", padding: "13px 30px" }}>Apply</Button>
                <Button variant="contained" sx={{ backgroundColor: "#343a40", color: "#fff", borderRadius: "0px", padding: "13px 30px" }}>Reset</Button>
            </Box>
        </Box>
    );
};

export default ProductListingSideBar;

