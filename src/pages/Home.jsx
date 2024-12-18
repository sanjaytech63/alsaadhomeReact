import React, { useEffect, useState } from "react";
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
import useCartStore from "../store/useCartStore";

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {fetchCartProductIds} = useCartStore()
    const { addToCart, createToCart, } =  useCartStore();

   useEffect(() => {
    const fetchCartId = async () => {
      try {
        const cartId = localStorage.getItem("cart_id"); 
        if (!cartId) {
          await createToCart();
        } else {
          await fetchCartProductIds();
        }
      } catch (error) {
        console.error("Error retrieving cart_id:", error);
      }
    };

    fetchCartId();
  }, [fetchCartProductIds, createToCart,]); 

    
    const fetchHomeData = async() => {
        setLoading(true);
        try {
            const response = await homeApi.getHomeData();
            if (response && response?.status === 200) {
                setLoading(false);
                setData(response.data);
                
            }
        } catch (error) {
            setLoading(false);
            console.log("Error fetching home data:-", error)
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchHomeData();
    }, []);
    

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
      <div className="min-vh-100 w-full">
        {data ? (
          <>
            {data.category ? (
              <TopSlider topSlider={data.category} />
            ) : (
              <TopSliderShimmer />
            )}
            {data.slider ? (
              <BannderSlider BannderSliderData={data.slider} />
            ) : (
              <BannerSliderShimmer />
            )}
            {data.featured_brands ? (
              <FeatureBrandsSlider FeaturedBrands={data.featured_brands} />
            ) : (
              <TopSliderShimmer />
            )}
            {data.display_banners ? (
              <DealsSlider DealsSlider={data.display_banners} />
            ) : (
              <DealsSliderShimmer />
            )}
            {data.flash_sale ? (
              <FlashSale flashSale={data.flash_sale} />
            ) : (
              <FlashSaleShimmer />
            )}
            {data.banner ? (
              <BannerSection bannerSection={data.banner} />
            ) : (
              <BannerSectionShimer />
            )}
            {data.new_product ? (
              <NewArrivalsSlider productsCard={data.new_product} />
            ) : (
              <NewArrivalsShimmer />
            )}
            {data.grid_product ? (
              <Products products={data.grid_product} />
            ) : (
              <ProductShimmer />
            )}
            {data?.recommended_product ? (
              <RecommendedProducts
                title="Recommended Products"
                productsCard={data?.recommended_product}
                addToCart={addToCart}
              />
            ) : (
              <NewArrivalsShimmer />
            )}
            {data?.flash_sale_products &&
              data?.flash_sale_products.map((item,index) => (
                <FlashSaleSlider key={index} item={item} addToCart={addToCart}/>
              ))}
            {/* <RecentlyViewed title="Recently Viewed" productsCard={data.recommended_product} /> */}
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
