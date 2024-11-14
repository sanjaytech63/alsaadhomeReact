import React, { useState } from 'react';
import { Box, Typography, Button, Chip, CardMedia, Paper, InputBase, Select, MenuItem, FormControl, InputLabel, colors, } from '@mui/material';
import Switch from '@mui/material/Switch';
import CheckIcon from '@mui/icons-material/Check';
import jsonData from "../../src/blogData.json";
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';


const ProductListingSideBar = () => {
    const [tags, setTags] = useState(jsonData.tags);
    const [sizes, setSizes] = useState(jsonData.sizes);
    const [thickness, setThickness] = useState(jsonData.thickness);
    const [material, setMaterial] = useState(jsonData.material);
    const [styles, setStyles] = useState(jsonData.styles);
    const [color, setColor] = useState(jsonData.colors);
    const [sortOrder, setSortOrder] = useState('');
    const [showMore, setShowMore] = useState(false);
    const tagsToShow = showMore ? tags : tags.slice(0, 4);

    const sortOptions = {
        price: { LTH: "Low to High", HTL: "High to Low" },
        age: { new: "New First", old: "Old First" },
        quantity: { MQ: "Most Quantity", LQ: "Less Quantity" }
    };

    const handleChange = (event) => {
        setSortOrder(event.target.value);
        console.log("Selected Sort Order:", event.target.value);
    };

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedThickness, setSelectedThickness] = useState([]);
    const [selectedMetrail, setSelectedMetrail] = useState([]);
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);

    const tagsToggle = (tag) => {
        setSelectedBrands(prev =>
            prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
        );
    };

    const sizesToggle = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
        );
    };

    const thicknessToggle = (think) => {
        setSelectedThickness(prev =>
            prev.includes(think) ? prev.filter(item => item !== think) : [...prev, think]
        );
    };

    const materialToggle = (metrail) => {
        setSelectedMetrail(prev =>
            prev.includes(metrail) ? prev.filter(item => item !== metrail) : [...prev, metrail]
        );
    };
    const stylesToggle = (style) => {
        setSelectedStyles(prev =>
            prev.includes(style) ? prev.filter(item => item !== style) : [...prev, style]
        );
    };

    const toggleColorSelection = (id) => {
        setSelectedColor(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(colorId => colorId !== id)
                : [...prevSelected, id]
        );
    };

    const handleReset = () => {
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedThickness([]);
        setSelectedMetrail([]);
        setSelectedStyles([]);
        setSelectedColor([]);
    }

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
                    <Typography
                        variant="h5"
                        sx={{ my: 2, color: "#292b2c", fontWeight: "600", fontSize: "1.5rem", fontFamily: "Roboto, sans-serif" }}
                    >
                        Sort
                    </Typography>
                    <FormControl sx={{ width: "100%" }} fullWidth size="small" variant="outlined">
                        <InputLabel id="sort-order-label">Sort</InputLabel>
                        <Select
                            sx={{
                                padding: "3px",
                                '&:focus-visible': {
                                    outline: 'none', // Remove focus outline
                                    boxShadow: 'none', // Remove any box shadow
                                },
                                
                            }}
                            labelId="sort-order-label"
                            id="sortOrder"
                            value={sortOrder}
                            label="Sort"
                            onChange={handleChange}
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
                    <Typography
                        variant="h5"
                        sx={{ my: 2, color: "#687188", fontWeight: 600, fontSize: "12px", fontFamily: "Roboto, sans-serif" }}
                    >
                        Only selected
                    </Typography>
                    <Switch
                        defaultChecked
                        sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#bb1f2a",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                backgroundColor: "#bb1f2a",
                            },
                        }}
                    />
                    <Typography
                        variant="h5"
                        sx={{ my: 2, color: "#687188", fontWeight: 600, fontSize: "12px", fontFamily: "Roboto, sans-serif" }}
                    >
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
                    {tagsToShow.map((tag) => {
                        const isSelected = selectedBrands.includes(tag.id);
                        return (
                            <Chip
                                key={tag.id}
                                label={tag.label}
                                clickable
                                onClick={() => tagsToggle(tag.id)}
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
                    {sizes.map((sizes) => {
                        let isSelected = selectedSizes.includes(sizes.id)
                        return (
                            <Chip
                                key={sizes.id}
                                label={sizes.label}
                                clickable
                                onClick={() => sizesToggle(sizes.id)}
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
                                    }
                                }}
                            />
                        )
                    })}
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
                    {thickness.map((thickness, index) => {
                        let isSelected = selectedThickness.includes(index)
                        return (
                            <Chip
                                key={index}
                                label={thickness.label}
                                clickable
                                onClick={() => thicknessToggle(index)}
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
                                    }
                                }}
                            />
                        )
                    })}
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
                    {material.map((material, index) => {
                        let isSelected = selectedMetrail.includes(index)
                        return (
                            <Chip
                                key={index}
                                label={material.text}
                                clickable
                                onClick={() => materialToggle(index)}
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
                                    }
                                }}
                            />
                        )
                    })}
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {color.map((col, index) => {
                        const isSelected = selectedColor.includes(index);
                        return (
                            <Box
                                key={index}
                                onClick={() => toggleColorSelection(index)}
                                sx={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    backgroundColor: col.hex,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    boxShadow: isSelected ? "0 0 0 2px #bb1f2a" : "0 0 0 1px #fff",
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
                    {styles.map(({ name }, index) => {
                        let isSelected = selectedStyles.includes(index)
                        return (
                            <Chip
                                key={index}
                                label={name}
                                clickable
                                onClick={() => stylesToggle(index)}
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
                                    }
                                }}
                            />
                        )
                    })}
                </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 4, alignItems: "center" }}>
                <Button variant="contained" sx={{ backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "0px", padding: "13px 30px" }}>Apply</Button>
                <Button onClick={handleReset} variant="contained" sx={{ backgroundColor: "#343a40", color: "#fff", borderRadius: "0px", padding: "13px 30px" }}>Reset</Button>
            </Box>
        </Box >
    );
};

export default ProductListingSideBar;

