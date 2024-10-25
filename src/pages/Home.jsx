import React, { useEffect, useState } from 'react';
import TopSlider from '../components/TopSlider';
import BannderSlider from '../components/BannderSlider';
import img1 from '../assets/pro3.jpg';
import img2 from '../assets/pro2.jpg';
import img3 from '../assets/pro1.jpg';
import FeatureBrandsSlider from '../components/FeatureBrandsSlider';
import DealsSlider from '../components/DealsSlider';
import Products from '../components/Products';
import productsimg1 from '../assets/a1.jpg';
import productsimg2 from '../assets/a2.jpg';
import productsimg3 from '../assets/a3.jpg';
import productsimg4 from '../assets/a4.jpg';
import productsimg5 from '../assets/a5.jpg';
import productsimg6 from '../assets/a6.jpg';
import productsimg7 from '../assets/a7.jpg';
import productsimg8 from '../assets/a8.jpg';
import productsimg9 from '../assets/a9.jpg';
import productsimg10 from '../assets/a10.jpeg';
import productsimg11 from '../assets/a11.jpg';
import productsimg12 from '../assets/a12.jpg';
import productsimg13 from '../assets/a13.png';
import productsimg14 from '../assets/a14.jpg';
import productsimg15 from '../assets/a15.jpg';
import productsimg16 from '../assets/a16.jpg';
import productsimg17 from '../assets/a17.jpg';
import productsimg18 from '../assets/a18.jpg';
import BannerSection from '../components/BannerSection';
import BannerSection2 from '../components/BannerSection2';
import Newsletter from '../components/Newsletter';
import NewArrivalsSlider from '../components/NewArrivalsSlider';
import RecommendedProducts from '../components/RecommendedProducts';
import RecentlyViewed from '../components/RecentlyViewed';
import BlogCard from '../components/BlogCard';


const TopSliderData = [
    { id: 1, text: "Bedding", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395825.jpeg", },
    { id: 2, text: "Carpets", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395848.jpeg", },
    {
        id: 3, text: "Lighting ", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395866.jpeg",
    },
    {
        id: 4, text: " Furniture", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395781.jpeg",
    },
    {
        id: 5, text: " Bedding", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395630.jpeg",
    },
    {
        id: 6, text: "Curtains ", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395757.jpeg",
    },
    {
        id: 7, text: " Tableware", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395701.jpeg",
    },
    {
        id: 8, text: "Kitchen Essentials ", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395803.jpeg"
    },
    {
        id: 9, text: "Gardening Supplies ", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395885.jpeg",
    },
    {
        id: 10, text: "Toys ", src: "https://al-saad-home.mo.cloudinary.net/uploads/categories/1618395948.jpeg",
    },
];

const BannderSliderData = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
];

const FeaturedBrands = [
    { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617183227.jpeg" },
    { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171371.jpeg" },
    { id: 3, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171561.jpeg" },
    { id: 4, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171499.jpeg" },
    { id: 5, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171787.jpeg" },
    { id: 6, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171344.jpeg" },
    { id: 7, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171822.jpeg" },
    { id: 8, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171714.jpeg" },
    { id: 9, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171499.jpeg" },
    { id: 10, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171787.jpeg" },
    { id: 11, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171344.jpeg" },
    { id: 12, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171822.jpeg" },
    { id: 13, src: "https://al-saad-home.mo.cloudinary.net/uploads/brands/1617171371.jpeg" },
];

const DealsSliderData = [
    { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/mattress1719324716.png" },
    { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/duvet-cover1723016133.jpg" },
    { id: 3, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/beds1721910782.jpg" },
    { id: 4, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/bathroom-accessories-21719326201.png" },
    { id: 5, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/silk1719324454.png" },
    { id: 6, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/hospitality1719324486.png" },
];


const products = [
    { id: 1, src: productsimg1 },
    { id: 2, src: productsimg2 },
    { id: 3, src: productsimg3 },
    { id: 4, src: productsimg4 },
    { id: 5, src: productsimg5 },
    { id: 6, src: productsimg6 },
    { id: 7, src: productsimg7 },
    { id: 8, src: productsimg8 },
    { id: 9, src: productsimg9 },
    { id: 10, src: productsimg10 },
    { id: 11, src: productsimg11 },
    { id: 12, src: productsimg12 },
    { id: 13, src: productsimg13 },
    { id: 14, src: productsimg14 },
    { id: 15, src: productsimg15 },
    { id: 16, src: productsimg16 },
    { id: 17, src: productsimg17 },
    { id: 18, src: productsimg18 },
]

const bannerSection = [
    { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/whatsapp-image-2024-09-23-at-14-39-28-e30168a61727088375.jpg" },
    { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/mattress-banner-11719125300.jpg" },
]

const bannerSection2 = [
    { id: 1, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/towel-banner1712324714.jpg" },
    { id: 2, src: "https://al-saad-home.mo.cloudinary.net/uploads/percentage_amount_banners/kitchen1719326296.png" },
]

const productsCard = [
    {
        id: 1,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
        price: "199 AED",
        rating: 4,
    },
    {
        id: 2,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "249 AED",
        rating: 5,
    },
    {
        id: 3,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 3,
    },
    {
        id: 4,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 4,
    },

];

const recommendedProducts = [
    {
        id: 1,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
        price: "199 AED",
        rating: 4,
    },
    {
        id: 2,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "249 AED",
        rating: 5,
    },
    {
        id: 3,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 3,
    },
    {
        id: 4,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "179 AED",
        rating: 4,
    },

];

const recentlyViewed = [
    {
        id: 1,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
        price: "199 AED",
        rating: 4,
    },
    {
        id: 2,
        title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
        image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-111728223115.jpg",
        price: "249 AED",
        rating: 5,
    },


];

const Home = () => {

    return (
        <>
            <div className='min-h-screen w-100'>
                <TopSlider sliderItems={TopSliderData} />
                <BannderSlider BannderSliderData={BannderSliderData} />
                <FeatureBrandsSlider FeaturedBrands={FeaturedBrands} />
                <DealsSlider DealsSlider={DealsSliderData} />
                <BannerSection bannerSection={bannerSection} />
                <NewArrivalsSlider productsCard={productsCard} />
                <Products products={products} />
                <BannerSection2 bannerSection={bannerSection2} />
                <RecommendedProducts productsCard={recommendedProducts} />
                <RecentlyViewed productsCard={recentlyViewed} />
                <BlogCard />
                <Newsletter />
            </div>
        </>
    );
};

export default Home;
