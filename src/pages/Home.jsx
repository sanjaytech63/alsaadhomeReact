import React, { useEffect, useState } from "react";
import { homeApi } from "../utils/services/homeServices";
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
import useCartStore from "../store/useCartStore";
import useLoaderStore from "../store/loaderStore";
import { useWishListStore } from "../store/useWishListStore";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState(null);
  const [getRec, setGetRec] = useState(null);
  const [getNewPro, setGetNewPro] = useState(null);
  const { fetchCartProductIds } = useCartStore();
  const { addToCart, createToCart } = useCartStore();
  const { getWishList } = useWishListStore();

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
  }, [fetchCartProductIds, createToCart]);

  const fetchHomeData = async () => {
    try {
      const response = await homeApi.getHomeData();
      if (response && response?.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Error fetching home data:-", error);
    }
  };

  const getRecommendedProducts = async () => {
    try {
      const response = await homeApi.getRecommended();
      if (response && response?.status === 200) {
        setGetRec(response.data);
      }
    } catch (error) {
      console.log("Error fetching home data:-", error);
    }
  };


  const getNewProducts = async () => {
    try {
      const response = await homeApi.getNewProductsApi();
      if (response && response?.status === 200) {
        setGetNewPro(response.data);
      }
    } catch (error) {
      console.log("Error fetching home data:-", error);
    }
  };


  useEffect(() => {
    fetchHomeData();
  }, []);


  useEffect(() => {
    getRecommendedProducts();
  }, []);


  useEffect(() => {
    getNewProducts();
  }, []);

  if (useLoaderStore.getState().isLoading || data === null) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flex: 1,
        }}
      ></div>
    );
  }



  return (
    <div className="min-vh-100 w-full">
      {data ? (
        <>
          {data && data.category && <TopSlider topSlider={data.category} />}
          {data.slider && <BannderSlider BannderSliderData={data.slider} />}
          {data.featured_brands && (
            <FeatureBrandsSlider FeaturedBrands={data.featured_brands} />
          )}
          {data.display_banners && (
            <DealsSlider DealsSlider={data.display_banners} />
          )}
          {data.flash_sale && <FlashSale flashSale={data.flash_sale} />}
          {data.banner && <BannerSection bannerSection={data.banner} />}
          {getNewPro && (
            <NewArrivalsSlider
              productsCard={getNewPro}
              addToCart={addToCart}
            />
          )}
          {data.grid_product && <Products products={data.grid_product} />}
          {getRec && (
            <RecommendedProducts
              title="Recommended Products"
              productsCard={getRec}
              addToCart={addToCart}
            />
          )}
          {data?.flash_sale_products &&
            data?.flash_sale_products.map((item, index) => (
              <FlashSaleSlider
                key={index}
                item={item}
                addToCart={addToCart}
                length={data?.flash_sale_products?.length}
              />
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
