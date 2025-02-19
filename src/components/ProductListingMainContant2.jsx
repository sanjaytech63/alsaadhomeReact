import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FavoriteBorder } from "@mui/icons-material";
import useCartStore from "../store/useCartStore";
import { useWishListStore } from "../store/useWishListStore";
import { showToast } from "../utils/helper";
import useUserStore from "../store/user";
import Login from "../auth/Login/Login";
import Register from "../auth/Register/Register";
import ForgotPasswordModal from "../auth/Login/ForgotPasswordModal";

const ProductListingMainContant2 = ({ productsCard }) => {
  const { isItemInCart, addToCart } = useCartStore();
  const { toggleWishlist, isItemInWishlist } = useWishListStore();
  const { isLoggedIn } = useUserStore();


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


  return (
    <>
      {productsCard?.products?.length > 0 ? (
        productsCard.products &&
        productsCard?.products.map((item) => (
          <Grid key={item.id} mb={4}>
            <Card
              sx={{
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                margin: "5px",
                display: "flex",
                overflow: "hidden",
              }}
            >
              <Box>
                <Link
                  className="link-none"
                  to={`/products/${item?.slug}?product_id=${item?.product_id?.toString()}&variant_id=${item?.product_variant_id?.toString()}`}
                >
                  <CardMedia
                    sx={{
                      maxWidth: { sm: "275.37px", xs: "175px" },
                      minHeight: "100%",
                      objectFit: "cover",
                    }}
                    component="img"
                    image={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </Link>
              </Box>
              <CardContent sx={{ p: { xs: "8px", sm: "16px" } }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#292b2c",
                    fontWeight: 600,
                    fontSize: "15px",
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    wordBreak: "break-all",
                    textOverflow: "ellipsis",
                    ":hover": { color: "#bb1f2a" },
                  }}
                >
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Box
                    sx={{
                      displayDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {item.sale_price > 0 &&
                      item.sale_price !== item.list_price && (
                        <Typography
                          noWrap
                          sx={{
                            color: "#bb1f2a",
                            fontWeight: 600,
                            fontSize: { xs: "14px", sm: "1rem" },
                          }}
                        >
                          {item.sale_price} AED
                        </Typography>
                      )}

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        noWrap
                        sx={{
                          fontWeight:
                            item.sale_price > 0 &&
                              item.sale_price !== item.list_price
                              ? "0"
                              : "600",
                          color:
                            item.sale_price > 0 &&
                              item.sale_price !== item.list_price
                              ? "gray"
                              : "#bb1f2a",
                          textDecoration:
                            item.sale_price > 0 &&
                              item.sale_price !== item.list_price
                              ? "line-through"
                              : "none",
                          fontSize: { xs: "14px", sm: "1rem" },
                        }}
                      >
                        {item.list_price} AED
                      </Typography>
                      {item.sale_price > 0 &&
                        item.sale_price !== item.list_price && (
                          <Typography
                            noWrap
                            sx={{
                              color: "green",
                              fontSize: { xs: "14px", sm: "1rem" },
                            }}
                          >
                            {item.discount_label}
                          </Typography>
                        )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    mt: 8,
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button sx={{ py: 1, px: 2, display: "flex", gap: 2, background: "#bb1f2a" }}
                    variant="contained"
                    onClick={() => {
                      if (!isItemInCart(item?.product_variant_id?.toString())) {
                        addToCart(item?.product_variant_id?.toString());
                      }
                    }}
                  >
                    <IconButton
                      sx={{
                        p: { xs: "4px", sm: "8px", },
                        backgroundColor: "#bb1f2a",
                        color: "#fff",
                        "& .cart-svg-icon path": {
                          fill: "#fff",
                          transition: "fill 0.3s ease",
                        },
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
                    </IconButton>
                    <Typography>{isItemInCart(item?.product_variant_id?.toString()) ? "Go to Cart" : "Add to Cart"}</Typography>
                  </Button>
                  <IconButton

                    sx={{
                      p: { xs: "4px", sm: "8px" },
                      boxShadow: 2,
                      "& .css-1wdc28j-MuiSvgIcon-root": {
                        fill: isItemInWishlist(item?.product_variant_id?.toString())
                          ? "#fff"
                          : "#292b2c",
                        transition: "fill 0.3s ease",
                      },

                      backgroundColor: isItemInWishlist(item?.product_variant_id?.toString())
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
                        toggleWishlist(item?.product_id?.toString(), item?.product_variant_id?.toString())
                      } else {
                        handleOpenLogin();
                      }
                    }}
                    aria-label="add to wishlist"
                  >
                    <FavoriteBorder sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>

          </Grid>
        ))
      ) : (
        <Box
          sx={{
            display: { sm: "flex", xs: "none" },
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              width: "100%",
              color: "gray",
              textAlign: "center",
              position: "absolute",
              top: 100,
            }}
          >
            No Product Found
          </Typography>
        </Box>
      )}
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

export default ProductListingMainContant2;
