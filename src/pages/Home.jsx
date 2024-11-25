import { useEffect, useState } from 'react';
import TopSlider from '../components/TopSlider';
import BannderSlider from '../components/BannderSlider';
import FeatureBrandsSlider from '../components/FeatureBrandsSlider';
import DealsSlider from '../components/DealsSlider';
import Products from '../components/Products';
import BannerSection from '../components/BannerSection';
import BannerSection2 from '../components/BannerSection2';
import Newsletter from '../components/Newsletter';
import NewArrivalsSlider from '../components/NewArrivalsSlider';
import RecommendedProducts from '../components/RecommendedProducts';
import RecentlyViewed from '../components/RecentlyViewed';
import BlogCard from '../components/BlogCard';
import { homeApi } from '../utils/services/homeServices';
import Loading from "../components/Loading";
import FlashSale from '../components/FlashSale';
const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await homeApi.getHomeData({}, false);
            setData(response.data);
        } catch (err) {
            setError("Failed to load data. Please try again.");
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <Loading />;
    }


    return (
        <>
            <div className="min-h-screen w-full">
                {data ? (
                    <>
                        <TopSlider topSlider={data.category} />
                        <BannderSlider BannderSliderData={data.slider} />
                        <FeatureBrandsSlider FeaturedBrands={data.featured_brands} />
                        <DealsSlider DealsSlider={data.display_banners} />
                        <FlashSale flashSale={data.flash_sale} />
                        <BannerSection bannerSection={data.banner} />
                        <NewArrivalsSlider productsCard={data.new_product} />
                        <Products products={data.grid_product} />
                        <BannerSection2 bannerSection={data.banner} />
                        <RecommendedProducts productsCard={data.recommended_product} />
                        {/* <RecentlyViewed productsCard={data.recentlyViewedProducts} /> */}
                        <BlogCard />
                        <Newsletter />
                    </>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </>
    );
};

export default Home;
