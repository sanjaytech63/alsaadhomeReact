import { useState, useEffect, useCallback } from "react";
import { FilterTags } from "./ProductListing/FilterTags";
import { ProdictListingHeader } from "./ProductListing/ProdictListingHeader";
import { ProductGridToggle } from "./ProductListing/ProductGridToggle";
import { ProductListingContent } from "./ProductListing/ProductListingContent";
import Loading from "../components/Loading";
import { homeApi } from "../utils/services/homeServices";
import { Box, Container, FormControl, Grid, MenuItem, Select, Typography, Fade, Modal, IconButton, Backdrop } from "@mui/material";
import { PaginationComponent } from "./ProductListing/PaginationComponent";
import { useLocation, } from "react-router-dom";
import ProductListingSideBar from "../components/ProductListingSideBar";
import { MdOutlineFilterAlt } from "react-icons/md";
import CloseIcon from '@mui/icons-material/Close';
const ProductListing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gridTogal, setGridTogal] = useState(true);
    const [selectedCatlist, setSelectedCatlist] = useState([]);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
     const location = useLocation();
    const pathnames = useLocation().pathname.split('/').filter(Boolean);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [price, setPrice] = useState({ min: "", max: "" });
    const [sortOrder, setSortOrder] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [otherSelectedAttributes, setOtherSelectedAttributes] = useState([])
    const [filterData, setFilterData] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [filterSizes, setFilterSizes] = useState([]);
    const [filterColors, setFilterColors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newest, setNewest] = useState("new");
   
    const { product_id, variant_id,id, type } = location.state || {};

    const toggleSelect = (id, selectAttribute) => {
        selectAttribute(prevSelected => {
            let arrKey = new Set(prevSelected)
            if (!arrKey.has(id)) {
                arrKey.add(id)
            } else {
                arrKey.delete(id)
            }
            return Array.from(arrKey)
        }
        );
    };


    const sortOptions = {
        price: { LTH: "Low to High", HTL: "High to Low" },
        age: { new: "New First", old: "Old First" },
        quantity: { MQ: "Most Quantity", LQ: "Less Quantity" }
    };

    const handleChangeSort = (event) => {
        setSortOrder(event.target.value);
    };


    const handlePriceChange = (event) => {
        setPrice({ ...price, [event.target.name]: event.target.value });
    }

    const ToggleCatList = (tag) => {
        setSelectedCatlist(prev =>
            prev.includes(tag) ? prev.filter(item => item !== tag) : [...prev, tag]
        );
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const handleNewest = (event, id, type) => {
        setNewest(event.target.value);
        fetchData();
    };
    const applyFilters = (e) => {
        e.preventDefault();
        fetchData(1);
        handleCloseModal();
    };

    const handleReset = () => {
        setSelectedBrands([]);
        setSelectedSizes([]);
        setSelectedColor([]);
        setSortOrder('');
        setPrice({ min: "", max: "" });
        setShowMore(false);
        setOtherSelectedAttributes([])
        setTotalPages(1);
        setCurrentPage(1);
        setNewest([]);
        setSearchTerm('');
    }

    const fetchData = async (page = currentPage) => {
        setLoading(true);
        setError(null);
        try {
            const requestBody = {
                // category_id: id,
                sale_high_price: parseInt(price.max || "0", 10) > 0 ? parseInt(price.max || "0", 10) : "",
                sale_low_price: parseInt(price.min || "0", 10) > 0 ? parseInt(price.min || "0", 10) : "",
                filter_type: selectedCatlist.length > 0 ? "OR" : "AND",
                id: id || "",
                "product_id": product_id,
                "product_variant_id": variant_id,
                type: type || "",
                sort_by: sortOrder,
                page: page,
                key: newest,
                title: newest === "new" ? "new_first" : "old_first",
                title: searchTerm,
                size_id: selectedSizes,
                color_id: selectedColor,
                brand_id: selectedBrands,
                attributes_value_id: otherSelectedAttributes,
            };

            const response = await homeApi.getProduct(requestBody);
            if (response && response.status === 200) {
                setData(response.data || []);
                const totalProducts = parseInt(response.data.total_products, 10) || 0;
                const productsPerPage = 40;
                const pages = totalProducts ? Math.ceil(totalProducts / productsPerPage) : 1;
                setTotalPages(pages);
            }

        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        getFilter()
    }, [])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    function getFilterParams() {
        let req = {
            "type": type || "",
            "id": id || "",
        }
        return req
    }

    const getFilter = async () => {
        try {
            const response = await homeApi.getFilter(getFilterParams());
            if (response && response.status === 200) {
                const { data } = response;
                const brands = [];
                const sizes = [];
                const colors = [];
                const remainingAttributes = [];
                data.forEach((attributeGroup) => {
                    if (attributeGroup.attribute_id === "1") {
                        brands.push(attributeGroup.item);
                    } else if (attributeGroup.attribute_id === "3") {
                        sizes.push(attributeGroup.item);
                    } else if (attributeGroup.attribute_id === "2") {
                        colors.push(attributeGroup.item);
                    } else {
                        remainingAttributes.push(attributeGroup);
                    }
                });
                setFilterData(remainingAttributes);
                setFilterBrands(brands.flat());
                setFilterSizes(sizes.flat());
                setFilterColors(colors.flat());
            }
        } catch (error) {
            console.log('Error fetching home data:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <ProdictListingHeader pathnames={pathnames} />
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Modal open={isModalOpen} onClose={handleCloseModal} closeAfterTransition BackdropComponent={Backdrop}>
                    <Fade in={isModalOpen}>
                        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'background.paper', boxShadow: 24, px: 2, py: 1, outline: 0, borderRadius: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <IconButton onClick={handleCloseModal} sx={{ alignSelf: 'flex-end', mb: 2 }}>
                                <CloseIcon />
                            </IconButton>
                            <ProductListingSideBar
                                sortOptions={sortOptions}
                                price={price}
                                handlePriceChange={handlePriceChange}
                                handleChangeSort={handleChangeSort}
                                sortOrder={sortOrder}
                                selectedBrands={selectedBrands}
                                toggleBrand={(id) => toggleSelect(id, setSelectedBrands)}
                                tagsToShow={showMore ? filterBrands : filterBrands?.slice(0, 5)}
                                showMore={showMore}
                                setShowMore={setShowMore}
                                setSelectedBrands={setSelectedBrands}
                                tags={filterBrands}
                                sizes={filterSizes}
                                selectedSizes={selectedSizes}
                                toggleSize={(id) => toggleSelect(id, setSelectedSizes)}
                                otherAttributes={filterData}
                                toggleOtherAttributes={(id) => toggleSelect(id, setOtherSelectedAttributes)}
                                otherSelectedAttributes={otherSelectedAttributes}
                                color={filterColors}
                                selectedColor={selectedColor}
                                toggleColor={(id) => toggleSelect(id, setSelectedColor)}
                                handleSearch={handleSearch}
                                searchTerm={searchTerm}
                                handleReset={handleReset}
                                applyFilters={applyFilters}
                            />
                        </Box>
                    </Fade>
                </Modal>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <ProductListingSideBar
                            sortOptions={sortOptions}
                            price={price}
                            handlePriceChange={handlePriceChange}
                            handleChangeSort={handleChangeSort}
                            sortOrder={sortOrder}
                            selectedBrands={selectedBrands}
                            toggleBrand={(id) => toggleSelect(id, setSelectedBrands)}
                            tagsToShow={showMore ? filterBrands : filterBrands?.slice(0, 5)}
                            showMore={showMore}
                            setShowMore={setShowMore}
                            setSelectedBrands={setSelectedBrands}
                            tags={filterBrands}
                            sizes={filterSizes}
                            selectedSizes={selectedSizes}
                            toggleSize={(id) => toggleSelect(id, setSelectedSizes)}
                            otherAttributes={filterData}
                            toggleOtherAttributes={(id) => toggleSelect(id, setOtherSelectedAttributes)}
                            otherSelectedAttributes={otherSelectedAttributes}
                            color={filterColors}
                            selectedColor={selectedColor}
                            toggleColor={(id) => toggleSelect(id, setSelectedColor)}
                            handleSearch={handleSearch}
                            searchTerm={searchTerm}
                            handleReset={handleReset}
                            applyFilters={applyFilters}
                        />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'space-between', sm: 'flex-end' }, alignItems: 'center' }}>
                            <Box
                                onClick={handleOpenModal}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    py: "7px",
                                    px: 1.5,
                                    ml: '5px',
                                    backgroundColor: '#bb1f2a',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <MdOutlineFilterAlt color='#fff' />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                                <ProductGridToggle gridTogal={gridTogal} onToggle={setGridTogal} />
                                <FormControl size="small" variant="outlined">
                                    <Select
                                        onChange={handleNewest}
                                        value={newest}
                                        inputProps={{ MenuProps: { disableScrollLock: true } }}
                                        sx={{
                                            '&:focus': { backgroundColor: 'transparent' },
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        id="sortOrder"
                                        MenuProps={{
                                            PaperProps: {
                                                sx: { outline: 'none' },
                                            },
                                        }}
                                    >
                                        <MenuItem value="new">Newest</MenuItem>
                                        <MenuItem value="old">Oldest</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>{data?.total_products}  Total Products</Typography>
                        <FilterTags main_category={data?.main_category} selectedCatlist={selectedCatlist} onTagToggle={ToggleCatList} />
                        <ProductListingContent gridTogal={gridTogal} data={data} />
                    </Grid>
                </Grid>
                {
                    totalPages > 1 &&
                    <PaginationComponent totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
                }

            </Container>
        </>
    );
};

export default ProductListing;