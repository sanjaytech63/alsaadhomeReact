import React, { useState, useMemo, Suspense, useCallback, useEffect } from "react";
import {
    Container,
    Grid,
    Box,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import tamaraImg from "../../src/assets/tamara.svg";
import jsonData from "../../src/blogData.json";
import data from "../../src/product.json";
import { homeApi } from "../utils/services/homeServices";
import Loading from "./Loading";

const BreadcrumbsProductDetails = React.lazy(() =>
    import("./ProductDeatailsCom/BreadcrumbsProductDetails")
);
const ImageMagnify = React.lazy(() =>
    import("./ProductDeatailsCom/ImageMagnify")
);
const ImageSlider = React.lazy(() =>
    import("./ProductDeatailsCom/ImageSlider")
);
const BundleCard = React.lazy(() =>
    import("./ProductDeatailsCom/BundleCard")
);
const ReviewSection = React.lazy(() =>
    import("./ProductDeatailsCom/ReviewSection")
);
const RecommendedProducts = React.lazy(() =>
    import("./RecommendedProducts")
);
const MainInfoCom = React.lazy(() =>
    import("./ProductDeatailsCom/ProductInfo/MainInfoCom")
);
const BundleProductsModal = React.lazy(() =>
    import("./BundleProductsModal")
);

const ProductDetails = () => {
    const imageSlider = data.productDetailsImage;
    const bundleCard = data.bundleCard;
    const bundleProduct = jsonData.bundleProduct;
    const productInfo = data.productInfo;
    const products = data.product;

    const [open, setOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(imageSlider.src);
    const [selectedImage, setSelectedImage] = useState(imageSlider.src);
    const [count, setCount] = useState(0);

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
    const isRTL = theme.direction === "rtl";

    const incrementChange = () => setCount((prev) => (prev < 8 ? prev + 1 : prev));
    const decrementChange = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

    const navigate = useNavigate();
    const handleNavigate = () => navigate(`/products/1234`);
    const pathname = useLocation().pathname;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [recentlyProducts, setRecentlyProducts] = useState([]);
    const [proDetails, setProDetails] = useState(null);
    const [variants, setVariants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { product_slug } = useParams();
    const [selectedProductInfo, setSelectedProductInfo] = useState(null);


    const memoizedProps = useMemo(
        () => ({
            imageSlider,
            selectedImage,
            setSelectedImage,
            bundleCard,
            isRTL,
            handleNavigate,
            pathname,
            matchesSM,
            products,
            productInfo,
            selectedColor,
            setSelectedColor,
            count,
            incrementChange,
            decrementChange,
        }),
        [
            imageSlider,
            selectedImage,
            setSelectedImage,
            bundleCard,
            isRTL,
            pathname,
            matchesSM,
            products,
            productInfo,
            selectedColor,
            count,
        ]
    );




    const fetchProductDetails = useCallback(async () => {
        setLoading(true);
        try {
            const requestBody = {
              product_slug: product_slug,
            };
            const response = await homeApi.getProductDetails(requestBody);
            if (response && response.status === 200) {
                setLoading(false);
                const variants = response?.data?.variants || [];
                const selectedProductInfo = variants
                  .flatMap((infoD) => infoD.items)
                  .find(
                    (info) =>
                      info.slug === product_slug
                  );
                const variant = variants.find((variant) =>
                  variant.items?.some((item) => item.slug === product_slug)
                );
                console.log("selectedProductInfo", selectedProductInfo);
                selectedProductInfo && setSelectedProductInfo(selectedProductInfo);
                setRecentlyProducts(response?.data?.similar_product || []);
                setProDetails(response?.data?.product_details || {});
                setVariants(variants);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }, [product_slug]);

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ minHeight: "100vh", margin: 0, padding: 0 }}>
            <Suspense fallback={<Loading />}>
                <BreadcrumbsProductDetails />
                <Container maxWidth="lg" sx={{ my: 5 }}>
                    <Grid container spacing={4}>
                        {/* Image Gallery */}
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <ImageMagnify selectedImage={memoizedProps.selectedImage} />
                                <ImageSlider {...memoizedProps} />
                                <BundleCard {...memoizedProps} />
                            </Box>
                        </Grid>
                        {/* Product Info */}
                        <MainInfoCom {...memoizedProps} proDetails={proDetails} variants={variants}/>
                    </Grid>
                    <ReviewSection />
                    <BundleProductsModal bundleProduct={bundleProduct} open={open} handleClose={handleClose} />
                </Container>
                <div className="mb-5">
                    <RecommendedProducts title="Related Products" productsCard={recentlyProducts} />
                </div>
            </Suspense>
        </div>
    );
};

export default React.memo(ProductDetails);




// import React, { useState } from "react";
// import {
//     Container,
//     Grid,
//     Typography,
//     Button,
//     Box,
//     List,
//     ListItem,
//     Link,
//     Card,
//     CardContent,
//     useTheme,
//     Breadcrumbs,
//     Rating,
//     IconButton,
//     Table,
//     TableBody,
//     TableRow,
//     TableCell,
//     CardMedia,
//     useMediaQuery,
// } from "@mui/material";
// import tamaraImg from "../../src/assets/tamara.svg";
// import { Add, Remove } from "@mui/icons-material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { FaFacebookF } from "react-icons/fa";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import Carousel from "react-multi-carousel";
// import RecommendedProducts from "./RecommendedProducts";
// import ReactImageMagnify from "react-image-magnify";
// import { useLocation, useNavigate } from "react-router-dom";
// import { MdOutlineArrowBackIos } from "react-icons/md";
// import { MdOutlineArrowForwardIos } from "react-icons/md";
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import jsonData from "../../src/blogData.json";
// import BundleProductsModal from "./BundleProductsModal";
// import data from "../../src/product.json";
// import ReviewSection from "./ProductDeatailsCom/ReviewSection";

// const ProductDetails = () => {
//     const recommendedSliderData = data.recommendedSlider;
//     const imageSlider = data.productDetailsImage;
//     const bundleCard = data.bundleCard;
//     const bundleProduct = jsonData.bundleProduct;
//     const productInfo = data.productInfo;
//     const products = data.product;
//     const [open, setOpen] = useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     const [selectedColor, setSelectedColor] = useState(imageSlider.src);
//     const [selectedImage, setSelectedImage] = useState(imageSlider.src);
//     const [count, setCount] = useState(0);
//     const theme = useTheme();
//     const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
//     const isRTL = theme.direction === "rtl";
//     const incrementChange = () => {
//         if (count !== 8) {
//             setCount(count + 1);
//         }
//     };

//     const dicrementChange = () => {
//         if (count !== 1) {
//             setCount(count - 1);
//         }
//     };
//     const CustomButtonGroup = ({ next, previous }) => (
//         <>
//             <Box
//                 onClick={isRTL ? next : previous}
//                 sx={{
//                     position: "absolute",
//                     top: "48%",
//                     left: "0px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     transform: "translateY(-50%)",
//                     direction: isRTL ? "rtl" : "ltr",
//                     cursor: "pointer",
//                 }}
//             >
//                 <MdOutlineArrowBackIos fontSize={"20px"} color="#222" />
//             </Box>
//             <Box
//                 onClick={isRTL ? previous : next}
//                 sx={{
//                     position: "absolute",
//                     top: "48%",
//                     right: "0px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     transform: "translateY(-50%)",
//                     direction: isRTL ? "rtl" : "ltr",
//                     cursor: "pointer",
//                 }}
//             >
//                 <MdOutlineArrowForwardIos fontSize={"20px"} color="#222" />
//             </Box>
//         </>
//     );

//     const navigate = useNavigate();
//     const handleNavigate = () => {
//         navigate(`/products/1234`);
//     };

//     const pathname = useLocation().pathname;

//     const location = useLocation();
//     const pathnames = location.pathname.split("/").filter((x) => x);
 

//     return (
//         <div style={{ minHeight: "100vh", margin: "0px", padding: "0px" }}>
//             <Box sx={{ bgcolor: "#f7f8fb" }}>
//                 <Container>
//                     <Box
//                         sx={{
//                             display: { xs: "block", sm: "flex" },
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             py: "30px",
//                             px: "14px",
//                             fontFamily: "Roboto",
//                         }}
//                     >
//                         <Typography
//                             variant="h5"
//                             sx={{
//                                 color: "#292b2c",
//                                 textTransform: "capitalize",
//                                 fontWeight: "700",
//                                 fontSize: { sm: "24px", xs: "16px" },
//                             }}
//                         >
//                             Product Detail
//                         </Typography>
//                         <Breadcrumbs
//                             sx={{ cursor: "pointer", fontSize: "14px" }}
//                             separator={<NavigateNextIcon fontSize="small" />}
//                             aria-label="breadcrumb"
//                         >
//                             <Link
//                                 className="breadcrumbs-hover"
//                                 style={{
//                                     color: "#292b2c",
//                                     textDecoration: "none",
//                                     textTransform: "capitalize",
//                                     marginRight: "8px",
//                                 }}
//                                 to="/"
//                             >
//                                 Home
//                             </Link>
//                             {pathnames.map((segment, index) => {
//                                 const path = `/${pathnames.slice(0, index + 1).join("/")}`;
//                                 const isLast = index === pathnames.length - 1;

//                                 return isLast ? (
//                                     <span
//                                         key={index}
//                                         style={{ color: "#6c757d", textTransform: "capitalize" }}
//                                     >
//                                         {decodeURIComponent(segment)}
//                                     </span>
//                                 ) : (
//                                     <Link
//                                         className="breadcrumbs-hover"
//                                         key={index}
//                                         style={{
//                                             color: "#292b2c",
//                                             textDecoration: "none",
//                                             textTransform: "capitalize",
//                                         }}
//                                         to={path}
//                                     >
//                                         {decodeURIComponent(segment)}
//                                     </Link>
//                                 );
//                             })}
//                         </Breadcrumbs>
//                     </Box>
//                 </Container>
//             </Box>
//             <Container maxWidth="lg" sx={{ my: 5 }}>
//                 <Grid container spacing={4}>
//                     {/* Image Gallery */}
//                     <Grid item xs={12} sm={6}>
//                         <Box
//                             sx={{
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 alignItems: "center",
//                             }}
//                         >
//                             <Box sx={{ width: "100%", position: "relative" }}>
//                                 <div
//                                     className="image-magnifier-container"
//                                     style={{
//                                         width: "100%",
//                                         height: "300px",
//                                         maxWidth: "800px",
//                                         margin: "0 auto",
//                                         overflow: "hidden",
//                                     }}
//                                 >
//                                     <ReactImageMagnify
//                                         {...{
//                                             smallImage: {
//                                                 alt: "Wristwatch by Ted Baker London",
//                                                 isFluidWidth: true,
//                                                 src:
//                                                     selectedImage ||
//                                                     "https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/12096/thumb/161722603193.jpg",
//                                                 srcSet: selectedImage,

//                                                 className: "magnify-image",
//                                             },
//                                             largeImage: {
//                                                 isFluidWidth: true,
//                                                 src:
//                                                     selectedImage ||
//                                                     "https://staging-alsaadhome.s3.us-east-2.amazonaws.com/uploads/products/12096/thumb/161722603193.jpg",
//                                                 width: 1200,
//                                                 height: 800,
//                                             },
//                                             enlargedImageContainerStyle: {
//                                                 zIndex: 10,
//                                             },
//                                             enlargedImagePosition: "over",
//                                         }}
//                                     />
//                                 </div>
//                             </Box>

//                             <Box sx={{ width: "100%", position: "relative", mt: 2 }}>
//                                 <Carousel
//                                     additionalTransfrom={0}
//                                     autoPlaySpeed={3000}
//                                     renderButtonGroupOutside
//                                     arrows={true}
//                                     draggable={true}
//                                     infinite={true}
//                                     responsive={{
//                                         desktop: {
//                                             breakpoint: { max: 3000, min: 1024 },
//                                             items: 3,
//                                         },
//                                         laptop: {
//                                             breakpoint: { max: 1024, min: 768 },
//                                             items: 3,
//                                         },
//                                         tablet: {
//                                             breakpoint: { max: 768, min: 464 },
//                                             items: 3,
//                                         },
//                                         mobile: {
//                                             breakpoint: { max: 464, min: 0 },
//                                             items: 2,
//                                         },
//                                     }}
//                                     showDots={false}
//                                     slidesToSlide={3}
//                                     swipeable={true}
//                                 >
//                                     {imageSlider &&
//                                         imageSlider.map((img, idx) => (
//                                             <Box sx={{ px: 1 }} key={idx}>
//                                                 <CardMedia
//                                                     component="img"
//                                                     src={img.src}
//                                                     alt={img.alt}
//                                                     loading="lazy"
//                                                     onClick={() => setSelectedImage(img.src)}
//                                                     sx={{
//                                                         width: { sm: "170px", xs: "100%" },
//                                                         height: { sm: "110px", xs: "80px" },
//                                                         objectFit: "cover",
//                                                         cursor: "pointer",
//                                                         border:
//                                                             selectedImage === img.src
//                                                                 ? "2px solid #bb1f2a"
//                                                                 : "1px solid gray",
//                                                         borderRadius: "8px",
//                                                     }}
//                                                 />
//                                             </Box>
//                                         ))}
//                                 </Carousel>
//                             </Box>
//                             <Box sx={{ pt: 4, pb: 4, width: "100%" }}>
//                                 <Box sx={{ mb: 3 }}>
//                                     <Typography
//                                         variant="h5"
//                                         sx={{
//                                             color: "#292b2c",
//                                             textTransform: "capitalize",
//                                             fontWeight: "700",
//                                             fontSize: { sm: "24px", xs: "16px" },
//                                         }}
//                                     >
//                                         {pathname === "/prodect/1234"
//                                             ? "Full Set / Package"
//                                             : "Product"}
//                                     </Typography>
//                                 </Box>
//                                 <Box
//                                     sx={{
//                                         boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
//                                         borderRadius: "8px",
//                                         overflow: "hidden",
//                                         position: "relative",
//                                     }}
//                                 >
//                                     <Carousel
//                                         rtl={isRTL}
//                                         additionalTransfrom={0}
//                                         autoPlaySpeed={3000}
//                                         renderButtonGroupOutside
//                                         arrows={false}
//                                         draggable
//                                         infinite={true}
//                                         responsive={{
//                                             desktop: {
//                                                 breakpoint: { max: 3000, min: 1024 },
//                                                 items: 1,
//                                             },
//                                             laptop: {
//                                                 breakpoint: { max: 1024, min: 768 },
//                                                 items: 1,
//                                             },
//                                             tablet: {
//                                                 breakpoint: { max: 768, min: 464 },
//                                                 items: 1,
//                                             },
//                                             mobile: {
//                                                 breakpoint: { max: 464, min: 0 },
//                                                 items: 1,
//                                             },
//                                         }}
//                                         showDots={false}
//                                         slidesToSlide={1}
//                                         swipeable
//                                         customButtonGroup={
//                                             !matchesSM ? <CustomButtonGroup /> : null
//                                         }
//                                     >
//                                         {bundleCard.map((product) => (
//                                             <Box sx={{ px: 1 }}>
//                                                 <Card
//                                                     sx={{
//                                                         width: "100%",
//                                                         boxShadow: "none",
//                                                         alignItems: "center",
//                                                         padding: { xs: "0px", sm: "12px" },
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             display: "flex",
//                                                             alignItems: "center",
//                                                             justifyContent: "space-between",
//                                                         }}
//                                                     >
//                                                         {/* Product Image */}
//                                                         <CardMedia
//                                                             component="img"
//                                                             sx={{
//                                                                 width: { xs: "100px", sm: "150px" },
//                                                                 height: { xs: "100px", sm: "150px" },
//                                                                 objectFit: "cover",
//                                                                 borderRadius: "8px",
//                                                                 mr: { sm: 2 },
//                                                             }}
//                                                             image={product.imgSrc}
//                                                             alt={product.title}
//                                                         />
//                                                         {/* Product Details */}
//                                                         <CardContent
//                                                             sx={{
//                                                                 display: "flex",
//                                                                 flexDirection: "column",
//                                                                 flexGrow: 1,
//                                                                 p: { xs: 1, sm: 2 },
//                                                             }}
//                                                         >
//                                                             <Typography
//                                                                 onClick={handleNavigate}
//                                                                 variant="h6"
//                                                                 sx={{
//                                                                     textTransform: "capitalize",
//                                                                     mt: 1,
//                                                                     fontWeight: 600,
//                                                                     fontSize: { sm: "16px", xs: "14px" },
//                                                                     "&:hover": { color: "#bb1f2a" },
//                                                                     cursor: "pointer",
//                                                                 }}
//                                                             >
//                                                                 {product.title}
//                                                             </Typography>
//                                                             <Typography
//                                                                 variant="body2"
//                                                                 color="text.secondary"
//                                                                 sx={{ mb: 1 }}
//                                                             >
//                                                                 {product.offerTitle}
//                                                             </Typography>

//                                                             {product.discount && (
//                                                                 <Box sx={{ display: "flex", gap: 1 }}>
//                                                                     <Typography
//                                                                         sx={{
//                                                                             fontWeight: 600,
//                                                                             color: "#bb1f2a",
//                                                                             fontSize: { xs: "14px", sm: "16px" },
//                                                                         }}
//                                                                     >
//                                                                         {product.originalPrice} AED
//                                                                     </Typography>
//                                                                     <Typography sx={{ color: "green" }}>
//                                                                         ({product.discount}% off)
//                                                                     </Typography>
//                                                                 </Box>
//                                                             )}

//                                                             <Typography
//                                                                 variant="body2"
//                                                                 color="text.secondary"
//                                                                 sx={{
//                                                                     textTransform: "capitalize",
//                                                                     mt: 1,
//                                                                     textDecoration: "line-through",
//                                                                 }}
//                                                             >
//                                                                 {product.price} AED
//                                                             </Typography>
//                                                         </CardContent>
//                                                     </Box>
//                                                     {/* Add to Cart Button */}
//                                                     <Box
//                                                         sx={{
//                                                             display: "flex",
//                                                             justifyContent: "flex-end",
//                                                             alignItems: "center",
//                                                         }}
//                                                     >
//                                                         <Button
//                                                             variant="contained"
//                                                             sx={{
//                                                                 color: "#fff",
//                                                                 width: "fit-content",
//                                                                 height: "fit-content",
//                                                                 background: "#bb1f2a",
//                                                                 textTransform: "capitalize",
//                                                                 textAlign: "right",
//                                                                 padding: { xs: "2px 5px", sm: "5px 10px" },
//                                                             }}
//                                                         >
//                                                             Go to cart
//                                                         </Button>
//                                                     </Box>
//                                                 </Card>
//                                             </Box>
//                                         ))}
//                                     </Carousel>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Grid>

//                     {/* Product Details */}
//                     <Grid item xs={12} md={6}>
//                         <Box sx={{}}>
//                             {products.map((product) => (
//                                 <Box key={product.id}>
//                                     <Typography
//                                         variant="h6"
//                                         sx={{
//                                             fontSize: { sm: "1.4rem", xs: "1rem", fontWeight: 600 },
//                                         }}
//                                     >
//                                         {product.title}
//                                     </Typography>
//                                     {/* Price & Rating */}
//                                     <Box
//                                         sx={{ display: { sm: "flex", xs: "block" } }}
//                                         alignItems="center"
//                                         justifyContent="space-between"
//                                         mt={2}
//                                     >
//                                         <Box>
//                                             <Box display="flex" alignItems="center">
//                                                 <Typography
//                                                     sx={{
//                                                         fontSize: { sm: "1.2rem", xs: "1rem" },
//                                                         fontWeight: "500",
//                                                         color: "#bb1f2a",
//                                                     }}
//                                                 >
//                                                     {product.price} AED
//                                                 </Typography>
//                                                 <Typography
//                                                     sx={{
//                                                         fontSize: { sm: "1.2rem", xs: "1rem" },
//                                                         fontWeight: "500",
//                                                         color: "green",
//                                                         textDecoration: "line-through",
//                                                         mx: 2,
//                                                     }}
//                                                 >
//                                                     {product.oldPrice} AED
//                                                 </Typography>
//                                                 <Typography
//                                                     sx={{
//                                                         fontSize: { sm: "1.2rem", xs: "1rem" },
//                                                         fontWeight: "500",
//                                                         color: "green",
//                                                     }}
//                                                 >
//                                                     {product.discount}
//                                                 </Typography>
//                                             </Box>
//                                             <Typography variant="body2" color="textSecondary" mt={1}>
//                                                 {product.vatIncluded ? "(Price includes VAT)" : ""}
//                                             </Typography>
//                                         </Box>
//                                         <Box>
//                                             <Rating disabled value={product.ratings} />
//                                             <Typography component="legend">
//                                                 ({product.ratings}) ratings
//                                             </Typography>
//                                         </Box>
//                                     </Box>

//                                     {/* Color Options */}
//                                     <Box mt={2}>
//                                         <Typography variant="body1" fontWeight="bold">
//                                             Color
//                                         </Typography>
//                                         <Box display="flex" gap={1} mt={1}>
//                                             {product.colorOptions.map((color, index) => (
//                                                 <img
//                                                     key={index}
//                                                     src={color}
//                                                     loading="lazy"
//                                                     alt={`color-${index}`}
//                                                     style={{
//                                                         width: 50,
//                                                         height: 50,
//                                                         border:
//                                                             selectedColor === color
//                                                                 ? "2px solid #bb1f2a"
//                                                                 : "1px solid #ccc",
//                                                         borderRadius: "50%",
//                                                         cursor: "pointer",
//                                                     }}
//                                                     onClick={() => setSelectedColor(color)}
//                                                 />
//                                             ))}
//                                         </Box>
//                                     </Box>

//                                     {/* Size */}
//                                     <Box mt={2} display="flex" alignItems="center" gap={2}>
//                                         <Typography variant="body1" color="#687188">
//                                             Size
//                                         </Typography>
//                                         <Typography
//                                             sx={{
//                                                 backgroundColor: "#bb1f2a",
//                                                 color: "#fff",
//                                                 padding: "3px 10px",
//                                                 borderRadius: "4px",
//                                             }}
//                                         >
//                                             {product.size}
//                                         </Typography>
//                                     </Box>

//                                     {/* Availability */}
//                                     <Box mt={2}>
//                                         <Typography
//                                             variant="body1"
//                                             sx={{ color: "#687188" }}
//                                             fontWeight="bold"
//                                         >
//                                             Availability:{" "}
//                                             <span style={{ color: "green" }}>
//                                                 {product.availability} Item
//                                                 {product.availability > 1 ? "s" : ""} in stock
//                                             </span>
//                                         </Typography>
//                                     </Box>

//                                     {/* Delivery Text */}
//                                     <Box mt={2}>
//                                         <Typography variant="body2" color="#687188">
//                                             {product.deliveryText}{" "}
//                                             <Typography
//                                                 variant="body2"
//                                                 color="#bb1f2a"
//                                                 component="span"
//                                             >
//                                                 Select Area
//                                             </Typography>
//                                         </Typography>
//                                     </Box>
//                                     {pathname === "/prodect/1234" ? (
//                                         <Box sx={{ my: 2 }}>
//                                             <CardMedia
//                                                 component="img"
//                                                 src="https://al-saad-home.mo.cloudinary.net/uploads/products/13090/thumb/pomegranate-soap-31701495948.jpg"
//                                                 loading="lazy"
//                                                 alt="product"
//                                             />
//                                             <Typography
//                                                 sx={{
//                                                     display: "flex",
//                                                     alignItems: "center",
//                                                     my: 2,
//                                                     justifyContent: "flex-end",
//                                                 }}
//                                             >
//                                                 <ErrorOutlineIcon
//                                                     onClick={handleOpen}
//                                                     sx={{ cursor: "pointer" }}
//                                                 />
//                                             </Typography>
//                                         </Box>
//                                     ) : (
//                                         ""
//                                     )}

//                                     {/* Payment Options */}
//                                     <Box
//                                         sx={{
//                                             padding: 2,
//                                             mt: 2,
//                                             border: "1px solid #e0e0e0",
//                                             borderRadius: "8px",
//                                         }}
//                                     >
//                                         <Box>
//                                             <Typography variant="body2" color="textSecondary">
//                                                 {product.paymentText}
//                                             </Typography>
//                                             <img
//                                                 src={tamaraImg}
//                                                 loading="lazy"
//                                                 alt="tamara"
//                                                 style={{ marginTop: "5px" }}
//                                             />
//                                         </Box>
//                                     </Box>

//                                     {/* Quantity and Add to Cart */}
//                                     <Box
//                                         sx={{ display: { xs: "block", sm: "flex" } }}
//                                         alignItems="center"
//                                         gap={2}
//                                         mt={2}
//                                     >
//                                         <Box
//                                             sx={{ display: "flex", alignItems: "center", gap: "5px" }}
//                                         >
//                                             <Typography
//                                                 onClick={dicrementChange}
//                                                 sx={{
//                                                     backgroundColor: "#eee",
//                                                     mr: 1,
//                                                     cursor: "pointer",
//                                                 }}
//                                             >
//                                                 <Remove />
//                                             </Typography>
//                                             <Typography
//                                                 sx={{ border: "solid 1px #ddd", px: 2 }}
//                                                 variant="body1"
//                                             >
//                                                 {count}
//                                             </Typography>
//                                             <Typography
//                                                 onClick={incrementChange}
//                                                 sx={{
//                                                     backgroundColor: "#eee",
//                                                     ml: 1,
//                                                     cursor: "pointer",
//                                                 }}
//                                             >
//                                                 <Add />
//                                             </Typography>
//                                         </Box>

//                                         <Box
//                                             sx={{
//                                                 pt: { xs: 2, sm: 0 },
//                                                 gap: 2,
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                             }}
//                                         >
//                                             <Button
//                                                 variant="contained"
//                                                 sx={{
//                                                     backgroundColor: "#bb1f2a",
//                                                     color: "#fff",
//                                                     display: "flex",
//                                                     gap: 1,
//                                                     alignItems: "center",
//                                                 }}
//                                             >
//                                                 Add to Cart <MdOutlineShoppingCart size={20} />
//                                             </Button>
//                                             <IconButton
//                                                 aria-label="add to favorites"
//                                                 sx={{
//                                                     ":hover": { color: "#bb1f2a" },
//                                                     borderRadius: "50%",
//                                                     backgroundColor: "#eee",
//                                                 }}
//                                             >
//                                                 <FavoriteBorderIcon />
//                                             </IconButton>
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                             ))}
//                         </Box>
//                         <Box sx={{ mb: 4 }}>
//                             {productInfo.map((product, index) => (
//                                 <Box key={index}>
//                                     <List>
//                                         <ListItem>
//                                             <Typography variant="body1">
//                                                 <strong color="#687188">Model:</strong> {product.model}
//                                             </Typography>
//                                         </ListItem>
//                                         <ListItem>
//                                             <Typography variant="body1">
//                                                 <strong color="#687188">Brand:</strong>
//                                                 <Link
//                                                     sx={{ textDecoration: "none", color: "#292b2c" }}
//                                                     href={product.brand.link}
//                                                     color="primary"
//                                                     target="_blank"
//                                                     rel="noopener"
//                                                 >
//                                                     {` ${product.brand.name}`}
//                                                 </Link>
//                                             </Typography>
//                                         </ListItem>
//                                         <ListItem>
//                                             <Typography variant="body1">
//                                                 <strong color="#687188">Tags:</strong>
//                                                 {product.tags.map((tag, idx) => (
//                                                     <React.Fragment key={idx}>
//                                                         <Link
//                                                             href={tag.link}
//                                                             rel="tag"
//                                                             sx={{ textDecoration: "none", color: "#292b2c" }}
//                                                         >
//                                                             {tag.label}
//                                                         </Link>
//                                                         {idx < product.tags.length - 1 && ","}
//                                                     </React.Fragment>
//                                                 ))}
//                                             </Typography>
//                                         </ListItem>
//                                     </List>
//                                     {/* Share Section */}
//                                     <Box mt={3} display="flex" gap={2} alignItems="center">
//                                         <Typography variant="body1" color="#687188">
//                                             <strong>Share:</strong>
//                                         </Typography>
//                                         <span
//                                             style={{
//                                                 backgroundColor: "#1877f2",
//                                                 padding: "4px 8px",
//                                                 borderRadius: "4px",
//                                                 color: "#fff",
//                                             }}
//                                         >
//                                             <FaFacebookF />
//                                         </span>
//                                         <span
//                                             style={{
//                                                 backgroundColor: "#12af0a",
//                                                 padding: "3px",
//                                                 borderRadius: "4px",
//                                                 color: "#fff",
//                                             }}
//                                         >
//                                             <WhatsAppIcon />{" "}
//                                         </span>
//                                     </Box>
//                                     {/* Features */}
//                                     <Typography variant="h6" fontWeight="bold" mt={2}>
//                                         Features
//                                     </Typography>
//                                     <List>
//                                         {product.features.map((feature, idx) => (
//                                             <ListItem key={idx}>
//                                                 <Typography variant="body1">{feature}</Typography>
//                                             </ListItem>
//                                         ))}
//                                     </List>

//                                     {/* Product Details */}
//                                     <Typography variant="h6" fontWeight="bold" mt={2}>
//                                         Product Details
//                                     </Typography>
//                                     <Table sx={{ maxWidth: "100%" }}>
//                                         <TableBody>
//                                             <TableRow>
//                                                 <TableCell>
//                                                     <List>
//                                                         <ListItem>
//                                                             {product.productDetails.comforter}
//                                                         </ListItem>
//                                                         <ListItem>
//                                                             {product.productDetails.fittedSheet}
//                                                         </ListItem>
//                                                         <ListItem>
//                                                             {product.productDetails.pillowShams}
//                                                         </ListItem>
//                                                     </List>
//                                                 </TableCell>
//                                             </TableRow>
//                                             <TableRow>
//                                                 <TableCell>
//                                                     <strong>Color:</strong>
//                                                 </TableCell>
//                                                 <TableCell>{product.productDetails.color}</TableCell>
//                                             </TableRow>
//                                             <TableRow>
//                                                 <TableCell>
//                                                     <strong>Material:</strong>
//                                                 </TableCell>
//                                                 <TableCell>{product.productDetails.material}</TableCell>
//                                             </TableRow>
//                                         </TableBody>
//                                     </Table>
//                                 </Box>
//                             ))}
//                         </Box>
//                     </Grid>
//                 </Grid>
//                 <ReviewSection />
//                 <BundleProductsModal
//                     bundleProduct={bundleProduct}
//                     open={open}
//                     handleClose={handleClose}
//                 />
//             </Container>
//             <div className="mb-5">
//                 <RecommendedProducts productsCard={recommendedSliderData} />
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;
