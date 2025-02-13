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
    setBrandShow,
    setStyleShowMore,
    styleShowMore,
    brandShow,
    tags,
    sizes,
    selectedSizes,
    toggleSize,
    color,
    selectedColor,
    toggleColor,
    handleReset,
    applyFilters,
    searchTerm,
    handleSearch,
    otherAttributes,
    toggleOtherAttributes,
    otherSelectedAttributes,

}) => {



    return (
        <Box sx={{ width: "100%", mb: 3 }}>
            <Box mb={4}>
                <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
                <SortSelect sortOptions={sortOptions} sortOrder={sortOrder} handleChangeSort={handleChangeSort} />
                <PriceRange price={price} handlePriceChange={handlePriceChange} />
                <OnlySelected />
                {otherAttributes && otherAttributes.length > 0 && otherAttributes.map((attribute, index) => (
                    <FilterSection setStyleShowMore={setStyleShowMore}
                        styleShowMore={styleShowMore} id={attribute.attribute_id} label={attribute?.attribute_title} items={attribute?.item || []} selectedItems={otherSelectedAttributes} toggleItem={toggleOtherAttributes} />
                ))}

                {tags && tags.length > 0 && (
                    <BrandSelector label="Brand" id={'brand'} tagsToShow={tagsToShow} selectedBrands={selectedBrands} toggleBrand={toggleBrand} brandShow={brandShow} setBrandShow={setBrandShow} tags={tags} />
                )}

                {sizes && sizes.length > 0 && (
                    <FilterSection label="Size" id={'size'} items={sizes} selectedItems={selectedSizes} toggleItem={toggleSize} sizes={sizes}  setStyleShowMore={setStyleShowMore}
                    styleShowMore={styleShowMore}  />
                )}

                {color && color.length > 0 && (
                    <ColorSelector label="Color"  colors={color} selectedColors={selectedColor} toggleColor={toggleColor} />
                )}
                <ResetApplyButtons handleReset={handleReset} applyFilters={applyFilters} />
            </Box>
        </Box >
    );
};

export default ProductListingSideBar;


