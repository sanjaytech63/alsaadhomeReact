import React from 'react';
import { Box } from '@mui/material';
import SearchInput from './SideBarComponents/SearchInput';
import SortSelect from './SideBarComponents/SortSelect';
import PriceRange from './SideBarComponents/PriceRange';
import ResetApplyButtons from './SideBarComponents/ResetApplyButtons';
import FilterSection from './SideBarComponents/FilterSection';
import ColorSelector from './SideBarComponents/ColorSelector';
import BrandSelector from './SideBarComponents/BrandSelector';
import OnlySelected from './SideBarComponents/OnlySelected';

const ProductListingSideBar = ({
    sortOptions,
    price,
    handlePriceChange,
    handleChangeSort,
    sortOrder,
    selectedBrands,
    toggleBrand,
    tagsToShow,
    showMore,
    setShowMore,
    tags,
    sizes,
    selectedSizes,
    toggleSize,
    color,
    selectedColor,
    toggleColor,
    otherAttributes,
    toggleOtherAttributes,
    otherSelectedAttributes,
    handleReset,
    applyFilters,
    searchTerm,
    handleSearch,

}) => {



    return (
        <Box sx={{ width: "100%", mb: 3 }}>
            <Box mb={4}>
                <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                <SortSelect sortOptions={sortOptions} sortOrder={sortOrder} handleChangeSort={handleChangeSort} />
                <PriceRange price={price} handlePriceChange={handlePriceChange} />
                <OnlySelected />
                {otherAttributes && otherAttributes.length > 0 && otherAttributes.map((attribute, index) => (
                    <FilterSection label={attribute?.attribute_title} items={attribute?.item || []} selectedItems={otherSelectedAttributes} toggleItem={toggleOtherAttributes} />
                ))}
                {tags && tags.length > 0 && (
                    <BrandSelector label="Brand" tagsToShow={tagsToShow} selectedBrands={selectedBrands} toggleBrand={toggleBrand} showMore={showMore} setShowMore={setShowMore} tags={tags} />
                )}

                {sizes && sizes.length > 0 && (
                    <FilterSection label="Size" items={sizes} selectedItems={selectedSizes} toggleItem={toggleSize} />
                )}

                {color && color.length > 0 && (
                    <ColorSelector label="Color" colors={color} selectedColors={selectedColor} toggleColor={toggleColor} />
                )}
                <ResetApplyButtons handleReset={handleReset} applyFilters={applyFilters} />
            </Box>
        </Box >
    );
};

export default ProductListingSideBar;


