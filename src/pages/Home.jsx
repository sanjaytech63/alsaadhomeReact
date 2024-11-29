import React, { useEffect, useState, useCallback, Suspense } from "react";
import { homeApi } from "../utils/services/homeServices";
import Loading from "../components/Loading";
import TopSliderShimmer from "../components/ShimerEffect/TopSliderShimer";
import BannerSliderShimmer from "../components/ShimerEffect/BannerSliderShimmer";
import DealsSliderShimmer from "../components/ShimerEffect/DealsSliderShimmer";
import FlashSaleShimmer from "../components/ShimerEffect/FlashSaleShimmer";
import BannerSectionShimer from "../components/ShimerEffect/BannerSectionShimer";
import NewArrivalsShimmer from "../components/ShimerEffect/NewArrivalsShimmer";
import ProductShimmer from "../components/ShimerEffect/ProductShimmer";
import BlogShimer from "../components/ShimerEffect/BlogShimer";
import NewsletterShimmer from "../components/ShimerEffect/NewsletterShimmer";
const TopSlider = React.lazy(() => import("../components/TopSlider"));
const BannderSlider = React.lazy(() => import("../components/BannderSlider"));
const FeatureBrandsSlider = React.lazy(() => import("../components/FeatureBrandsSlider"));
const DealsSlider = React.lazy(() => import("../components/DealsSlider"));
const FlashSale = React.lazy(() => import("../components/FlashSale"));
const FlashSaleSlider = React.lazy(() => import("../components/FlashSaleSlider"));
const BannerSection = React.lazy(() => import("../components/BannerSection"));
const NewArrivalsSlider = React.lazy(() => import("../components/NewArrivalsSlider"));
const Products = React.lazy(() => import("../components/Products"));
const RecommendedProducts = React.lazy(() => import("../components/RecommendedProducts"));
const BlogCard = React.lazy(() => import("../components/BlogCard"));
const Newsletter = React.lazy(() => import("../components/Newsletter"));

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
                    <Suspense fallback={<TopSliderShimmer />}>
                        <TopSlider topSlider={data.category} />
                    </Suspense>
                    <Suspense fallback={<BannerSliderShimmer />}>
                        <BannderSlider BannderSliderData={data.slider} />
                    </Suspense>
                    <Suspense fallback={<TopSliderShimmer />}>
                        <FeatureBrandsSlider FeaturedBrands={data.featured_brands} />
                    </Suspense>
                    <Suspense fallback={<DealsSliderShimmer />}>
                        <DealsSlider DealsSlider={data.display_banners} />
                    </Suspense>
                    <Suspense fallback={<FlashSaleShimmer />}>
                        <FlashSale flashSale={data.flash_sale} />
                    </Suspense>
                    <Suspense fallback={<BannerSectionShimer />}>
                        <BannerSection bannerSection={data.banner} />
                    </Suspense>
                    <Suspense fallback={<NewArrivalsShimmer />}>
                        <NewArrivalsSlider productsCard={data.new_product} />
                    </Suspense>
                    <Suspense fallback={<ProductShimmer />}>
                        <Products products={data.grid_product} />
                    </Suspense>
                    <Suspense fallback={<NewArrivalsShimmer />}>
                        <RecommendedProducts productsCard={data.recommended_product} />
                    </Suspense>
                    {data.flash_sale_products &&
                        data.flash_sale_products.map((item) => (
                            <Suspense key={item.id} fallback={<NewArrivalsShimmer />}>
                                <FlashSaleSlider item={item} />
                            </Suspense>
                        ))}
                    <Suspense fallback={<BlogShimer />}>
                        <BlogCard />
                    </Suspense>
                    <Suspense fallback={<NewsletterShimmer />}>
                        <Newsletter />
                    </Suspense>
                </>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default Home;
