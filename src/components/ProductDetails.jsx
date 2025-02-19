import React, { useCallback, useEffect, useState, useRef } from "react";
import { Container, Grid, Typography, Button, Box, List, ListItem, Link, Card, CardContent, useTheme, Breadcrumbs, Rating, IconButton, CardMedia, useMediaQuery, } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Carousel from "react-multi-carousel";
import ReactImageMagnify from "react-image-magnify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import BundleProductsModal from "./BundleProductsModal";
// import ReviewSection from "./ProductDeatailsCom/ReviewSection";
import { homeApi } from "../utils/services/homeServices";
import Loading from "./Loading";
import parse from 'html-react-parser';
import useCartStore from "../store/useCartStore";
import { useWishListStore } from "../store/useWishListStore";
import { FavoriteBorder } from "@mui/icons-material";
import { showToast } from "../utils/helper";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RecommendedProducts from "./RecommendedProducts";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from "react-share";
import useUserStore from "../store/user";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import ForgotPasswordModal from "../auth/Login/ForgotPasswordModal";


const ProductDetails = () => {
  const { isItemInCart, addToCart, incrementQuantity, decrementQuantity, getCart, cartItems } = useCartStore();
  const { toggleWishlist, isItemInWishlist } = useWishListStore();
  const { isLoggedIn } = useUserStore();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [productData, setProductData] = useState([]);
  const [sizes, setSizes] = useState([])
  const [selectedColorIndex, setSelectedColorIndex] = useState('')
  const [selectedProductInfo, setSelectedProductInfo] = useState(null);
  const [details, setDetails] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [bundleDetails, setBundleDetails] = useState(null);
  const [getDetails, setGetDetails] = useState(null);
  const [getSimilar, setGetSimilar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);


  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const handleForgotPassword = () => setOpenForgotPassword(true);
  const switchToRegister = () => {
    handleCloseLogin();
    handleOpenRegister();
  };

  const switchToLogin = () => {
    handleCloseRegister();
    handleOpenLogin();
  };

  useEffect(() => {
    if (selectedProductInfo?.photo?.length > 0) {
      const firstImage = selectedProductInfo?.photo?.map((item) => item?.src);
      if (firstImage) {
        setSelectedImage(firstImage[0]);
      }
    }
  }, [images]);


  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleSelectImage = (src) => {
    setSelectedImage(src);
  };

  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const isRTL = theme.direction === "rtl";
  const pathname = useLocation().pathname;
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const CustomButtonGroup = ({ next, previous }) => (
    <>
      <Box
        onClick={isRTL ? next : previous}
        sx={{
          position: "absolute",
          top: "48%",
          left: "0px",
          display: "flex",
          justifyContent: "space-between",
          transform: "translateY(-50%)",
          direction: isRTL ? "rtl" : "ltr",
          cursor: "pointer",
        }}
      >
        <MdOutlineArrowBackIos fontSize={"20px"} color="#222" />
      </Box>
      <Box
        onClick={isRTL ? previous : next}
        sx={{
          position: "absolute",
          top: "48%",
          right: "0px",
          display: "flex",
          justifyContent: "space-between",
          transform: "translateY(-50%)",
          direction: isRTL ? "rtl" : "ltr",
          cursor: "pointer",
        }}
      >
        <MdOutlineArrowForwardIos fontSize={"20px"} color="#222" />
      </Box>
    </>
  );

  // api call logic
  const storedUserInfo = JSON.parse(localStorage.getItem("USER") || "{}");
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");
  const variantId = searchParams.get("variant_id");

  let inCart = isItemInCart(selectedProductInfo?.variant_id);
  const handleIncrement = (product_variant_id, maxQuantity, qty) => {
    let inCart = isItemInCart(product_variant_id);
    if (maxQuantity > qty) {
      if (inCart) {
        setSelectedQuantity(selectedQuantity + 1)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          debouncedIncrement(product_variant_id, qty + 1);
        }, 500);
      } else {
        setSelectedQuantity(selectedQuantity + 1)
      }
    } else {
      showToast("error", ('You have booked all the products'));
    }
  };

  const debouncedIncrement = useCallback((productI, qty) => {
    incrementQuantity(productI, qty);
  }, []);

  const handleDecrement = (variant_id, maxQuantity, qty) => {
    if (qty > 1) {
      let inCart = isItemInCart(variant_id);
      if (inCart) {
        setSelectedQuantity(selectedQuantity - 1)
        debouncedDecrement(variant_id, qty - 1);
      } else {
        setSelectedQuantity(selectedQuantity - 1)
      }
    } else {
      showToast("error", 'Minimum quantity is 1');
    }
  };


  const getCartQuantityByVariantId = (variantId) => {
    if (cartItems && cartItems?.branch) {
      for (let branch of cartItems?.branch) {
        const foundItem = branch?.item.find(item => item?.product_variant_id == variantId);
        if (foundItem) {
          return foundItem?.cart_quantity;
        }
      }
    }
    return 1;
  };

  useEffect(() => {
    if (cartItems && selectedProductInfo) {
      let qty = getCartQuantityByVariantId(Number(selectedProductInfo?.variant_id))
      setSelectedQuantity(qty || 1)
    }
  }, [selectedProductInfo, cartItems])



  const debouncedDecrement = useCallback((productI, qty) => {
    decrementQuantity(productI, qty);
  }, []);


  useEffect(() => {
    getCart();
  }, [])

  const handleColorChange = (variantId, variantItemInfo) => {
    if (selectedColorIndex?.toString() == variantId) return;
    const selectedVariant = variantItemInfo?.items?.find(item => item?.variant_id == variantId);

    if (selectedVariant) {
      setSelectedProductInfo(selectedVariant);
      if (variantItemInfo?.sizes) {
        setSizes(variantItemInfo?.sizes || []);
      }
      setSelectedColorIndex(variantId);
      fetchProductDetails(variantId);
    }
  };

  const fetchProductDetails = useCallback(async (variantId) => {
    setLoading(true)
    if (!productId || !variantId) {
      return;
    }
    try {
      const res = await homeApi.getProductDetails({
        customer_id: storedUserInfo.id,
        product_id: productId,
        variant_id: variantId,
      });
      if (res && res.status === 200) {
        setLoading(false)
        const variants = res?.data?.variants || [];
        setImages(variants);
        if (variants && variants?.length > 0) {
          const flattenedItems = variants.flatMap((variant) => variant?.items || []);
          const selectedProductInfo = flattenedItems.find((info) =>
            info?.variant_id?.toString() === variantId
          );

          if (selectedProductInfo) {
            const selectedVariantIndex = variants?.findIndex((variant) =>
              variant.items.some((item) => item?.variant_id === selectedProductInfo?.variant_id)
            );
            const selectedSizes = variants[selectedVariantIndex]?.sizes || [];
            const size = selectedSizes?.find((size) => size?.variant_id == selectedProductInfo?.variant_id);
            setSizes(size);
            setSelectedColorIndex(selectedProductInfo?.variant_id);
            setProductData(variants);
            if (selectedProductInfo) {
              setSelectedProductInfo(selectedProductInfo);
            }
            setDetails(res?.data?.product_details);
          } else {
            console.error('Selected variant not found');
          }
        } else {
          console.error('No variants found');
        }
      }
    }
    catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false)
    }
  }, [productId]);

  useEffect(() => {
    if (variantId) {
      fetchProductDetails(variantId);
    }
  }, [fetchProductDetails, variantId]);


  const fetchBundleDetails = async () => {
    setLoading(true)
    let reqBody = {
      bundle_product_variant_id: variantId
    };

    try {
      const res = await homeApi.getBundleProductItemApi(reqBody);
      if (res && res.status === 200) {
        setLoading(false)
        setBundleDetails(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bundle details:", error);
      setLoading(false)
    }
  };


  useEffect(() => {
    fetchBundleDetails();
  }, []);

  const getBunddel = async () => {
    setLoading(true)
    let reqBody = {
      product_id: 13683,
      product_variant_id: 30290
    };

    try {
      const res = await homeApi.getBundleProductApi(reqBody);
      if (res && res.status === 200) {
        setLoading(false)
        setGetDetails(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bundle details:", error);
    }
  };


  useEffect(() => {
    getBunddel();
  }, []);


  const getSimilarProduct = async () => {
    setLoading(true)
    let reqBody = {
      customer_id: storedUserInfo.id,
      product_id: productId,
      product_varaint_id: variantId
    };

    try {
      const res = await homeApi.getSimilarProductApi(reqBody);
      if (res && res.status === 200) {
        setLoading(false)
        setGetSimilar(res?.data);
      }
    } catch (error) {
      console.error("Error fetching bundle details:", error);
    }
  };


  useEffect(() => {
    getSimilarProduct();
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", margin: "0px", padding: "0px" }}>
        <Box sx={{ bgcolor: "#f7f8fb" }}>
          <Container>
            <Box sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              py: "30px",
              px: "14px",
              fontFamily: "Roboto",
            }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: "700",
                  fontSize: { sm: "24px", xs: "16px" },
                }}
              >
                Product Detail
              </Typography>
              <Breadcrumbs
                sx={{ cursor: "pointer", fontSize: "14px" }}
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link
                  className="breadcrumbs-hover"
                  style={{
                    color: "#292b2c",
                    textDecoration: "none",
                    textTransform: "capitalize",
                    marginRight: "8px",
                  }}
                  to="/"
                >
                  Home
                </Link>
                {pathnames.map((segment, index) => {
                  const path = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames?.length - 1;

                  return isLast ? (
                    <span
                      key={index}
                      style={{ color: "#6c757d", textTransform: "capitalize" }}
                    >
                      {decodeURIComponent(segment)}
                    </span>
                  ) : (
                    <Link
                      className="breadcrumbs-hover"
                      key={index}
                      style={{
                        color: "#292b2c",
                        textDecoration: "none",
                        textTransform: "capitalize",
                      }}
                      to={path}
                    >
                      {decodeURIComponent(segment)}
                    </Link>
                  );
                })}
              </Breadcrumbs>
            </Box>
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ my: 5 }}>
          <Grid container spacing={4}>
            {/* Image Gallery */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >

                <Box sx={{ width: "100%", position: "relative" }}>
                  <div className="image-magnifier-container">
                    {selectedImage && (
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Product Image",
                            isFluidWidth: true,
                            src: selectedImage,
                            srcSet: selectedImage,
                            className: "magnify-image",
                          },
                          largeImage: {
                            isFluidWidth: true,
                            src: selectedImage,
                            width: 1200,
                            height: 400,
                          },
                          enlargedImageContainerStyle: {
                            zIndex: 10,
                          },
                          enlargedImagePosition: "over",
                        }}
                      />
                    )}
                  </div>
                </Box>
                <Box sx={{ minHeight: "150px", mt: 3, width: "100%" }}>
                  <Carousel
                    rtl={isRTL}
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    renderButtonGroupOutside
                    arrows={true}
                    draggable
                    infinite={true}
                    responsive={{
                      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
                      laptop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
                      tablet: { breakpoint: { max: 768, min: 464 }, items: 3 },
                      mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
                    }}
                    showDots={false}
                    slidesToSlide={1}
                    swipeable
                    customButtonGroup={matchesSM ? <CustomButtonGroup /> : null}
                  >
                    {
                      selectedProductInfo?.photo?.length > 0 && selectedProductInfo?.photo?.map((p) => (
                        <Box sx={{ px: 1 }} key={p?.id}>
                          <CardMedia
                            onClick={() => handleSelectImage(p?.src)}
                            component="img"
                            src={p?.src}
                            alt="Product Image"
                            loading="lazy"
                            sx={{
                              width: { sm: "170px", xs: "100%" },
                              height: { sm: "110px", xs: "80px" },
                              objectFit: "cover",
                              cursor: "pointer",
                              borderRadius: "8px",
                              border: selectedImage === p?.src ? "2px solid #bb1f2a" : "none",
                            }}
                          />
                        </Box>
                      ))
                    }


                  </Carousel>
                </Box>
                {selectedProductInfo?.is_bundle_product === true && (
                  <>
                    <Box sx={{ pt: 4, pb: 4, width: "100%" }}>
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#292b2c",
                            textTransform: "capitalize",
                            fontWeight: "700",
                            fontSize: { sm: "24px", xs: "16px" },
                          }}
                        >
                          {selectedProductInfo?.is_bundle_product === true && pathname === "/prodect/1234"
                            ? "Full Set / Package"
                            : "Product"}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                          borderRadius: "8px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <Carousel
                          rtl={isRTL}
                          additionalTransfrom={0}
                          autoPlaySpeed={3000}
                          renderButtonGroupOutside
                          arrows={true}
                          draggable
                          infinite={true}
                          responsive={{
                            desktop: {
                              breakpoint: { max: 3000, min: 1024 },
                              items: 1,
                            },
                            laptop: {
                              breakpoint: { max: 1024, min: 768 },
                              items: 1,
                            },
                            tablet: {
                              breakpoint: { max: 768, min: 464 },
                              items: 1,
                            },
                            mobile: {
                              breakpoint: { max: 464, min: 0 },
                              items: 1,
                            },
                          }}
                          showDots={false}
                          slidesToSlide={1}
                          swipeable
                          customButtonGroup={
                            !matchesSM ? <CustomButtonGroup /> : null
                          }
                        >
                          {bundleDetails?.length > 0 &&
                            bundleDetails?.map((product, index) => (
                              <Box key={index} sx={{ px: 1 }}>
                                <Card
                                  sx={{
                                    width: "100%",
                                    boxShadow: "none",
                                    alignItems: "center",
                                    padding: { xs: "0px", sm: "12px" },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <CardMedia
                                      component="img"
                                      sx={{
                                        width: { xs: "100px", sm: "150px" },
                                        height: { xs: "100px", sm: "150px" },
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        mr: { sm: 2 },
                                      }}
                                      image={product?.image}
                                      alt={"bundel item"}
                                    />
                                    <CardContent
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flexGrow: 1,
                                        p: { xs: 1, sm: 2 },
                                      }}
                                    >
                                      <Typography
                                        variant="h6"
                                        sx={{
                                          textTransform: "capitalize",
                                          mt: 1,
                                          fontWeight: 600,
                                          fontSize: { sm: "16px", xs: "14px" },
                                          "&:hover": { color: "#bb1f2a" },
                                          cursor: "pointer",
                                        }}
                                      >
                                        {product?.title}
                                      </Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography sx={{ fontSize: "20px", fontWeight: "600", color: "#bb1f2a" }}>
                                          {product?.sale_price > 0 ? product?.sale_price : product?.list_price} AED
                                        </Typography>

                                        {product?.sale_price > 0 && (
                                          <Typography sx={{ fontSize: "14px", color: "gray", textDecoration: "line-through" }}>
                                            {product?.list_price} AED
                                          </Typography>
                                        )}

                                        {product?.discount_label && (
                                          <Typography sx={{ fontSize: "14px", color: "green" }}>
                                            {product?.discount_label}
                                          </Typography>
                                        )}
                                      </Box>
                                    </CardContent>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                      <IconButton
                                        sx={{
                                          py: 1,
                                          px: 1,
                                          mr: 2,
                                          gap: 2,
                                          fontSize: "15px",
                                          borderRadius: "5px",
                                          background: "#bb1f2a",
                                          color: "#fff",
                                          '&:hover': { background: "#a61c25" }
                                        }}
                                        onClick={() => {
                                          if (!isItemInCart(product?.product_variant_id)) {
                                            addToCart(product?.product_variant_id);
                                          } else {
                                            navigate("/cart");
                                          }
                                        }}
                                        aria-label="add to cart"
                                      >
                                        <svg
                                          className="cart-svg-icon"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 1024 1024"
                                        >
                                          <path
                                            fill="#fff"
                                            d="M1015.66 284a31.82 31.82 0 0 0-25.999-13.502h-99.744L684.78 95.666c-24.976-24.976-65.52-25.008-90.495 0L392.638 270.498h-82.096l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.568 0-31.776 14.224-31.776 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.592 23.183h431.968c13.408 0 25.376-8.4 29.904-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM639.537 140.93l152.032 129.584H487.457zm175.488 579.263H429.538L328.386 334.065h616.096zm-63.023 127.936c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80m-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80"
                                          />
                                        </svg>
                                        <Typography> {isItemInCart(product?.product_variant_id) ? "Go to Cart" : "Add to Cart"}</Typography>
                                      </IconButton>
                                    </Box>

                                  </Box>
                                </Card>
                              </Box>
                            ))}
                        </Carousel>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box >
                  <Typography sx={{ fontSize: "20px", fontWeight: "600" }}>
                    {selectedProductInfo?.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "600", color: "#bb1f2a" }}>
                          {selectedProductInfo?.sale_price > 0 ? selectedProductInfo?.sale_price : selectedProductInfo?.list_price} AED
                        </Typography>

                        {selectedProductInfo?.sale_price > 0 && (
                          <Typography sx={{ fontSize: "14px", color: "gray", textDecoration: "line-through" }}>
                            {selectedProductInfo?.list_price} AED
                          </Typography>
                        )}

                        {selectedProductInfo?.discount_label && (
                          <Typography sx={{ fontSize: "14px", color: "green" }}>
                            {selectedProductInfo?.discount_label}
                          </Typography>
                        )}
                      </Box>
                      <Typography sx={{ fontSize: "14px", color: "#687188" }}>(Price includes VAT)</Typography>
                    </Box>
                    <Box>
                      <Rating defaultValue={selectedProductInfo?.average_rating} />
                      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#687188" }}>
                        ({selectedProductInfo?.total_rating}) ratings
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 2 }}>
                  Pattern:
                  {productData?.length > 0 &&
                    productData.map((variantItemInfo, index) => {
                      const { pattern, colors, sizes } = variantItemInfo;
                      const patternVariantId = pattern?.variant_id;
                      const colorVariantId = colors?.variant_id;

                      const isActive =
                        selectedProductInfo?.variant_id == patternVariantId ||
                        selectedProductInfo?.variant_id == colorVariantId ||
                        sizes?.some(size => size.variant_id === selectedProductInfo?.variant_id);
                      const borderColor = isActive ? "#bb1f2a" : "gray";
                      if (patternVariantId) {
                        return (
                          <Box key={index}
                            sx={{
                              cursor: 'pointer',
                              display: "flex"
                            }}
                          >
                            {/* <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#687188",display:"inline-block" }}>Pattern:</Typography> */}
                            <CardMedia onClick={() => handleColorChange(patternVariantId, variantItemInfo)}
                              component={"img"}
                              src={variantItemInfo?.pattern?.image}
                              sx={{
                                width: 35,
                                height: 35,
                                borderRadius: '50%',
                                border: isActive ? `solid 1px ${borderColor}` : `solid 1px ${borderColor}`,
                              }}
                            />
                          </Box>
                        );
                      } else {
                        return (
                          <Box key={index}   >
                            {/* <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#687188" }}>Color:</Typography> */}
                            {variantItemInfo?.colors?.all_colors?.map((c, i) => (
                              <Box key={i} onClick={() => handleColorChange(colorVariantId, variantItemInfo)} sx={{ backgroundColor: c, width: "25px", height: "25px", borderRadius: "50%", border: isActive ? `solid 1px ${borderColor}` : `solid 1px ${borderColor}`, }} />
                            ))}
                          </Box>
                        );
                      }
                    })}
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 3 }}>
                <Typography sx={{}} >
                  {selectedProductInfo?.size_group_name}
                </Typography>
                <Typography sx={{ px: 1, py: 0.5, backgroundColor: "#bb1f2a", color: "#fff", borderRadius: "4px", cursor: "pointer" }} >
                  {selectedProductInfo?.size_name}
                </Typography>
              </Box>

              <Typography sx={{ color: "green", fontSize: "18px", fontWeight: "bold", my: 2 }}>
                {selectedProductInfo?.quantity > 0 ? `Available: ${selectedProductInfo?.quantity} Items in stock` : "Out of Stock"}
              </Typography>

              <Box>
                <Typography sx={{ color: "gray", fontSize: "15px", my: 2 }}>
                  Check your area to see if we delivery this product on same day or tomorrow. <span style={{ color: "#bb1b2a" }}>Select Area</span>
                </Typography>
                {
                  selectedProductInfo?.is_bundle_product === true && (
                    <Box onClick={handleOpen} sx={{ display: "flex", justifyContent: "flex-end" }} >
                      <ErrorOutlineIcon />
                    </Box>
                  )
                }

              </Box>

              <Box display="flex" flexDirection="column" my={2} alignItems="flex-start" gap={4}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box sx={{ backgroundColor: "#eee", px: 1, cursor: "pointer" }} onClick={() => handleDecrement(selectedProductInfo?.variant_id, selectedProductInfo?.quantity, selectedQuantity)} size="small" >
                    -
                  </Box>
                  {
                    selectedQuantity
                  }
                  {productData && (
                    <Box sx={{ backgroundColor: "#eee", px: 1, cursor: "pointer" }} onClick={() => handleIncrement(selectedProductInfo?.variant_id, selectedProductInfo?.quantity, selectedQuantity)}>
                      +
                    </Box>
                  )}

                  <Button onClick={() => {
                    if (!isItemInCart(selectedProductInfo?.variant_id)) {
                      addToCart(variantId?.toString());
                    } else {
                      navigate("/cart")
                    }
                  }}
                    sx={{ py: 1, px: 4, background: "#bb1f2a" }}
                    variant="contained"
                  >
                    <IconButton
                      aria-label="add to cart"
                    >
                      <svg
                        className="cart-svg-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          fill="#fff"
                          d="M1015.66 284a31.82 31.82 0 0 0-25.999-13.502h-99.744L684.78 95.666c-24.976-24.976-65.52-25.008-90.495 0L392.638 270.498h-82.096l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.568 0-31.776 14.224-31.776 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.592 23.183h431.968c13.408 0 25.376-8.4 29.904-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM639.537 140.93l152.032 129.584H487.457zm175.488 579.263H429.538L328.386 334.065h616.096zm-63.023 127.936c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80m-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80s80-35.808 80-80s-35.808-80-80-80"
                        />
                      </svg>
                    </IconButton> {isItemInCart(selectedProductInfo?.variant_id) ? "Go to Cart" : "Add to Cart"}
                  </Button>
                  <IconButton

                    sx={{
                      p: { xs: "4px", sm: "8px" },
                      boxShadow: 2,
                      "& .css-1wdc28j-MuiSvgIcon-root": {
                        fill: isItemInWishlist(variantId)
                          ? "#fff"
                          : "#292b2c",
                        transition: "fill 0.3s ease",
                      },

                      backgroundColor: isItemInWishlist(variantId)
                        ? "#bb1f2a"
                        : "#fff",
                      ":hover": {
                        backgroundColor: "#bb1f2a",
                        color: "#fff !important",
                        transition: "fill 0.3s ease",
                      },
                      color: "#292b2c",
                    }}

                    onClick={() => {
                      if (isLoggedIn === true) {
                        toggleWishlist(productId, variantId)
                      } else {
                        handleOpenLogin();
                      }
                    }}
                    aria-label="add to wishlist"
                  >
                    <FavoriteBorder sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </Box>
              </Box>
              <hr />
              <Box sx={{ mb: 4 }}>
                <Box sx={{ color: "#687188" }}>
                  <List sx={{ p: 0 }}>
                    <ListItem sx={{ p: 0 }}>
                      <Typography variant="body1">
                        <strong >Model:</strong> {details?.group}
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <Typography variant="body1">
                        <strong >Brand:</strong>
                        <Link
                          sx={{ textDecoration: "none", color: "#292b2c" }}
                          color="primary"
                          target="_blank"
                          rel="noopener"
                        >
                          {` ${details?.brand}`}
                        </Link>
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <Typography variant="body1">
                        <strong >Tags: </strong>
                        {details?.tags}
                      </Typography>
                    </ListItem>
                  </List>
                  {/* Share Section */}
                  <Box mt={3} display="flex" gap={2} alignItems="center">
                    <Typography variant="body1" color="#687188">
                      <strong>Share:</strong>
                    </Typography>
                    <FacebookShareButton url={window.location.href} >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={window.location.href}
                      separator=":: "
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </Box>
                </Box>
              </Box>
              {selectedProductInfo?.description && (
                <Box sx={{ color: "#687188" }}>
                  <Typography>{parse(selectedProductInfo?.description)}</Typography>
                </Box>
              )}

            </Grid>
          </Grid>
          {/* <ReviewSection /> */}
          {
            selectedProductInfo?.is_bundle_product === true && (
              <BundleProductsModal
                bundleProduct={getDetails}
                open={open}
                handleClose={handleClose}
              />
            )
          }

          <Box>
            {
              getSimilar?.length > 0 && (
                <RecommendedProducts
                  productsCard={getSimilar}
                  title={"Realted Produts"}
                />
              )
            }
          </Box>

        </Container>
      </div >
      <Login
        open={openLogin}
        handleOpenRegister={handleOpenRegister}
        handleOpenLogin={handleOpenLogin}
        handleClose={handleCloseLogin}
        handleCloseRegister={handleCloseRegister}
        switchToRegister={switchToRegister}
        handleForgotPassword={handleForgotPassword}
      />
      <Register
        open={openRegister}
        handleOpenLogin={handleOpenLogin}
        switchToLogin={switchToLogin}
        handleClose={handleCloseRegister}
        handleCloseLogin={handleCloseLogin}
        handleOpenRegister={handleOpenRegister}
      />
      <ForgotPasswordModal
        open={openForgotPassword}
        handleClose={() => setOpenForgotPassword(false)}
        handleOpenLogin={handleOpenLogin}
      />
    </>
  );
};

export default ProductDetails;
