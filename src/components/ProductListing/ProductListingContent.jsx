import ProductListingMainContant from "../../components/ProductListingMainContant";
import ProductListingMainContant2 from "../../components/ProductListingMainContant2";
export const ProductListingContent = ({ gridTogal, data }) => {
    return gridTogal ? <ProductListingMainContant productsCard={data} /> : <ProductListingMainContant2 productsCard={data} />;
};
