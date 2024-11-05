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
import blogDataJson from "../blogData.json";
import { useEffect, useState } from 'react';
import ApiService from '../auth/ApiService/ApiService';
const Home = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const jsonData = blogDataJson;

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getProducts();
            if (response.statusCode === 200) {
                setProducts(response);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);

        }
    }
    console.log(products);

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <div className='min-h-screen w-100'>
                <TopSlider topSlider={jsonData.topSlider} />
                <BannderSlider BannderSliderData={jsonData.bannerSliderData} />
                <FeatureBrandsSlider FeaturedBrands={jsonData.featureBrands} />
                <DealsSlider DealsSlider={jsonData.dealsSlider} />
                <BannerSection bannerSection={jsonData.bannerSection1} />
                <NewArrivalsSlider productsCard={jsonData.newArrivals} />
                <Products products={jsonData.imageData} />
                <BannerSection2 bannerSection={jsonData.bannerSection2} />
                <RecommendedProducts productsCard={jsonData.recommendedProducts} />
                <RecentlyViewed productsCard={jsonData.recentlyViewedProducts} />
                <BlogCard />
                <Newsletter />
            </div>
        </>
    );
};

export default Home;
