import React, { useState } from 'react';
import { Grid, Container, Box, Typography, Chip, Pagination, Breadcrumbs, IconButton, Modal, Backdrop, Fade, FormControl, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import ProductListingSideBar from './ProductListingSideBar';
import ProductListingMainContant from './ProductListingMainContant';
import { MdOutlineFilterAlt } from "react-icons/md";
import { BsGrid } from "react-icons/bs";
import { TfiLayoutListThumb } from "react-icons/tfi";
import blogDataJson from "../blogData.json";
import ProductListingMainContant2 from './ProductListingMainContant2';

const ProductListing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridTogal, setGridTogal] = useState(true);
    const jsonData = blogDataJson.newArrivals;
    const tags = blogDataJson.tags;
    const [selectedBrands, setSelectedBrands] = useState([]);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const tagsToggle = (tag) => {
        setSelectedBrands(prev =>
            prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
        );
    };

    const BsGrid2 = (bool) => {
        setGridTogal(bool);
    }

    return (
        <>
            <div style={{ minHeight: "100vh" }}>
                <Box sx={{ bgcolor: "#f7f8fb" }}>
                    <Container>
                        <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: "30px", px: "14px", fontFamily: "Roboto" }}>
                            <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                                Product List & Search
                            </Typography>
                            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/">Home</Link>
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category">Category</Link>
                                <Link style={{ color: '#292b2c', textDecoration: "none" }} to="/category/subcategory">Product List & Search</Link>
                            </Breadcrumbs>
                        </Box>
                    </Container>
                </Box>
                <Container maxWidth="lg" sx={{ py: 5 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ lineHeight: "28px", color: "#687188", fontSize: { xs: "12px", sm: "16px" }, }}>
                            Explore our luxurious collection of king-size comforters, designed to elevate your sleep experience. Choose from a variety of styles, including hotel-inspired comforters, elegant embroidery, classic plain designs, plush velvet, breathable cotton, and soft microfiber. Find the perfect king-size comforter to match your style and comfort needs.
                        </Typography>
                    </Box>
                    {/* Modal component */}
                    <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                    >
                        <Fade in={isModalOpen}>
                            <Box
                                sx={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    px: 2,
                                    py: 1,
                                    outline: 0,
                                    borderRadius: 0,
                                    overflowY: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {/* Close Button */}
                                <IconButton
                                    onClick={handleCloseModal}
                                    sx={{ alignSelf: 'flex-end', mb: 2 }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                {/* Sidebar content */}
                                <ProductListingSideBar />
                            </Box>
                        </Fade>
                    </Modal>

                    <Grid container spacing={4}>
                        {/* Sidebar for desktop */}
                        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <ProductListingSideBar />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            {/* Modal toggle button for mobile */}
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                                <Box
                                    onClick={handleOpenModal}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                        py: "7px",
                                        px: 1.5,
                                        ml: '5px',
                                        backgroundColor: '#bb1f2a',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <MdOutlineFilterAlt color='#fff' />
                                </Box>
                                {/* Select Box */}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                                        <Box
                                            sx={{
                                                display: { xs: 'none', md: 'block' },
                                                py: "13px",
                                                px: "15px",
                                                ml: '5px',
                                                backgroundColor: gridTogal ? '#bb1f2a' : '#292b2c',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => BsGrid2(true)}
                                        >
                                            <BsGrid color='#fff' />
                                        </Box>
                                        <Box
                                            onClick={() => BsGrid2(false)}
                                            sx={{
                                                display: { xs: 'none', md: 'block' },
                                                py: "13px",
                                                px: "15px",
                                                ml: '5px',
                                                backgroundColor: gridTogal ? '#292b2c' : '#bb1f2a',
                                                border: 'solid 1px #ddd',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <TfiLayoutListThumb color='#fff' />
                                        </Box>
                                        <FormControl sx={{}} size="small" variant="outlined">
                                            <Select
                                                sx={{

                                                    '&:focus': { backgroundColor: 'transparent' },
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                id="sortOrder"
                                                value="Showing"
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            outline: 'none',
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="Showing">Showing</MenuItem>
                                                <MenuItem value="Newest">Newest</MenuItem>
                                                <MenuItem value="Oldest">Oldest</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ my: 1, fontSize: '1rem', fontWeight: 600, color: '#292b2c' }}>{jsonData.length}  Total Products </Box>
                            <Box sx={{ display: 'flex', overflowX: 'scroll', gap: 1, mb: 3, }}>
                                {tags.map((tag) => {
                                    const isSelected = selectedBrands.includes(tag.id);
                                    return <Chip
                                        key={tag.id}
                                        label={tag.label}
                                        clickable
                                        onClick={() => tagsToggle(tag.id)}
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
                                })}
                            </Box>
                            {gridTogal ? (
                                <ProductListingMainContant productsCard={jsonData} />
                            ) : (
                                <ProductListingMainContant2 productsCard={jsonData} />
                            )}

                        </Grid>
                    </Grid>
                    {/* Pagination */}
                    <Box sx={{ my: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Pagination
                            size="small"
                            count={10}
                            variant="outlined"
                            shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    "&.Mui-selected": {
                                        backgroundColor: "#bb1f2a",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#a91c26",
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>

                </Container>
            </div>
        </>
    );
};

export default ProductListing;
