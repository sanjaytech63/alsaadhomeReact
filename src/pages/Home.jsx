import React, { useEffect, useState, useCallback } from "react";
import { homeApi } from "../utils/services/homeServices";
import Loading from "../components/Loading";
import TopSlider from "../components/TopSlider";
import BannderSlider from "../components/BannderSlider";
import FeatureBrandsSlider from "../components/FeatureBrandsSlider";
import DealsSlider from "../components/DealsSlider";
import FlashSale from "../components/FlashSale";
import FlashSaleSlider from "../components/FlashSaleSlider";
import BannerSection from "../components/BannerSection";
import NewArrivalsSlider from "../components/NewArrivalsSlider";
import Products from "../components/Products";
import RecommendedProducts from "../components/RecommendedProducts";
import BlogCard from "../components/BlogCard";
import Newsletter from "../components/Newsletter";
import TopSliderShimmer from "../components/ShimerEffect/TopSliderShimer";
import BannerSliderShimmer from "../components/ShimerEffect/BannerSliderShimmer";
import DealsSliderShimmer from "../components/ShimerEffect/DealsSliderShimmer";
import FlashSaleShimmer from "../components/ShimerEffect/FlashSaleShimmer";
import BannerSectionShimer from "../components/ShimerEffect/BannerSectionShimer";
import NewArrivalsShimmer from "../components/ShimerEffect/NewArrivalsShimmer";
import ProductShimmer from "../components/ShimerEffect/ProductShimmer";
import BlogShimer from "../components/ShimerEffect/BlogShimer";
import NewsletterShimmer from "../components/ShimerEffect/NewsletterShimmer";

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await homeApi.getHomeData({});
            setData(response.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="min-h-screen w-full">
            {data ? (
                <>
                    {data.category ? <TopSlider topSlider={data.category} /> : <TopSliderShimmer />}
                    {data.slider ? <BannderSlider BannderSliderData={data.slider} /> : <BannerSliderShimmer />}
                    {data.featured_brands ? <FeatureBrandsSlider FeaturedBrands={data.featured_brands} /> : <TopSliderShimmer />}
                    {data.display_banners ? <DealsSlider DealsSlider={data.display_banners} /> : <DealsSliderShimmer />}
                    {data.flash_sale ? <FlashSale flashSale={data.flash_sale} /> : <FlashSaleShimmer />}
                    {data.banner ? <BannerSection bannerSection={data.banner} /> : <BannerSectionShimer />}
                    {data.new_product ? <NewArrivalsSlider productsCard={data.new_product} /> : <NewArrivalsShimmer />}
                    {data.grid_product ? <Products products={data.grid_product} /> : <ProductShimmer />}
                    {data.recommended_product ? (
                        <RecommendedProducts productsCard={data.recommended_product} />
                    ) : (
                        <NewArrivalsShimmer />
                    )}
                    {data.flash_sale_products &&
                        data.flash_sale_products.map((item) => <FlashSaleSlider key={item.id} item={item} />)}
                    <BlogCard />
                    <Newsletter />
                </>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default Home;
