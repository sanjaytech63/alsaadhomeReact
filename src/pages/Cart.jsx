import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Add, Remove } from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import SearchBar from "../components/SearchBar";
import { RiDeleteBin5Line } from "react-icons/ri";
import useCartStore from "../store/useCartStore";
import { showToast } from "../utils/helper";

const Cart = ({
  image,
  title,
  list_price,
  colors,
  sizes,
  pattern_image,
  deleteCartItem,
  cartItemId,
  itmeslug,
  product_id,
  variant_id,
  cart_quantity,
  quantity,
  incrementQuantity,
  decrementQuantity,
  cartItemQuantity,
  index,
  branchIndex,
}) => {
  return (
    <Card
      sx={{ display: "flex", mb: 2, boxShadow: " 0 0 7px rgb(0 0 0 / 10%)" }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src={image}
          alt={title}
          loading="lazy"
          sx={{
            width: "250px",
            height: "200px",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{ width: "100%" }}>
        <CardContent sx={{ lineHeight: "2" }}>
          <Link
            state={{
              product_id: product_id,
              variant_id: variant_id,
            }}
            className="link-none"
            to={`/products/${itmeslug}`}
          >
            <Typography
              sx={{
                fontSize: { sm: "1.1rem", xs: "1rem" },
                fontWeight: 600,
                textTransform: "capitalize",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#292b2c",
                WebkitLineClamp: 2,
                cursor: "pointer",
                lineHeight: "2",
                ":hover": {
                  color: "#bb1f2a",
                },
              }}
            >
              {title}
            </Typography>
          </Link>
          <Typography
            variant="body1"
            sx={{ fontWeight: "500", lineHeight: "2" }}
          >
            Price: {list_price} AED
          </Typography>
          {colors && colors.length > 0 ? (
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", lineHeight: "2" }}
            >
              Color:{" "}
              <span
                style={{
                  backgroundColor: colors,
                  borderRadius: "50%",
                  padding: "0 10px",
                  marginLeft: "10px",
                }}
              >
                {" "}
              </span>
            </Typography>
          ) : null}
          {pattern_image && (
            <Typography
              variant="body1"
              sx={{ fontWeight: "500", lineHeight: "2" }}
            >
              {pattern_image && "Pattern:"}{" "}
              <img
                src={pattern_image}
                alt="pattern"
                loading="lazy"
                style={{ width: "20px", height: "20px", marginLeft: "10px" }}
              />
            </Typography>
          )}
          <Typography variant="body1" sx={{ fontWeight: "500", mb: 1 }}>
            {sizes && "Size:"} {sizes}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Typography
                onClick={() =>
                  decrementQuantity(variant_id,branchIndex, index)
                }
                sx={{ backgroundColor: "#eee", mr: 1, cursor: "pointer" }}
              >
                <Remove />
              </Typography>
              <Typography
                sx={{ border: "solid 1px #ddd", px: 2 }}
                variant="body1"
              >
                {cartItemQuantity}
              </Typography>
              <Typography
                onClick={() =>
                  incrementQuantity(variant_id, quantity,branchIndex, index)
                }
                sx={{ backgroundColor: "#eee", ml: 1, cursor: "pointer" }}
              >
                <Add />
              </Typography>
            </Box>
            <Box
              component="div"
              sx={{
                bgcolor: "#bb1f2a",
                px: 1,
                cursor: "pointer",
                mr: 2,
                color: "#fff",
                borderRadius: "4px",
                ":hover": { bgcolor: "red" },
              }}
            >
              <RiDeleteBin5Line
                onClick={() => deleteCartItem(cartItemId)}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                size={20}
              />
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

// CartPage Component
const CartPage = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(null);
  const debounceRef = useRef(null);
  const {
    cartItems,
    getCart,
    deleteCartItem,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();

  useEffect(() => {
    getCart();
  }, []);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

 useEffect(() => {
   if (cartItems?.branch) {
     const initialQuantities = cartItems.branch.map(
       (branch) =>
         branch.item?.map((item) => parseInt(item.cart_quantity, 10))
     );
     setQuantity(initialQuantities);
   }
 }, [cartItems]);

const handleIncrement = (product_variant_id, maxQuantity, branch, index) => {
  if (branch != null && index !== -1) {
    const currentQuantity = quantity[branch]?.[index] || 0;
    const maxItemQuantity =
      cartItems?.branch?.[branch]?.item?.[index]?.quantity || 0;

    if (currentQuantity < maxQuantity && currentQuantity < maxItemQuantity) {
      const updatedQuantities = [...quantity];
      updatedQuantities[branch][index] = currentQuantity + 1;
      setQuantity(updatedQuantities);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        incrementQuantity(
          product_variant_id,
          maxQuantity,
          updatedQuantities[branch][index]
        );
      }, 500);
    } else {
      showToast("warning", "Maximum quantity reached!", "danger");
    }
  } else {
    console.warn("Invalid branch or index provided.");
  }
};

const handleDecrement = (product_variant_id, branch, index) => {
  if (branch != null && index !== -1) {
    const currentQuantity = quantity[branch]?.[index] || 0;

    if (currentQuantity > 1) {
      const updatedQuantities = [...quantity];
      updatedQuantities[branch][index] = currentQuantity - 1;
      setQuantity(updatedQuantities);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        decrementQuantity(product_variant_id, updatedQuantities[branch][index]);
      }, 500);
    } else {
      showToast("warning", "Minimum quantity is 1!", "danger");
    }
  } else {
    console.warn("Invalid branch or index provided.");
  }
};



 

  return (
    <>
      <div style={{ minHeight: "100vh" }}>
        <Box sx={{ bgcolor: "#f7f8fb" }}>
          <Container>
            <Box
              sx={{
                display: { sm: "flex", xs: "block" },
                justifyContent: "space-between",
                alignItems: "center",
                py: { sm: "30px", xs: "15px" },
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
                Shopping Cart
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
                  }}
                  to="/"
                >
                  Home
                </Link>
                {pathnames.map((segment, index) => {
                  const path = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;

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
            <SearchBar />
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {cartItems?.branch && cartItems?.branch?.length > 0 ? (
                cartItems?.branch?.map(
                  (item, branchIndex) =>
                    item.item &&
                    item.item.map((item, index) => {                    
                    return (
                      <Cart
                        key={index}
                        {...item}
                        cartItemId={item?.cart_item_id}
                        itmeslug={item?.slug}
                        product_id={item?.product_id}
                        variant_id={item?.product_variant_id}
                        deleteCartItem={deleteCartItem}
                        incrementQuantity={handleIncrement}
                        decrementQuantity={handleDecrement}
                        cartItemQuantity={quantity ? quantity?.[branchIndex]?.[index] : 1}
                        index={index}
                        branchIndex={branchIndex}
                      />
                    );})
                )
              ) : (
                <Typography sx={{ fontWeight: "500", color: "#687188", my: 2 }}>
                  No products added to the cart
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              {cartItems?.branch && cartItems?.branch?.length > 0 ? (
                <Box
                  sx={{ p: 2, boxShadow: " 0 0 7px rgb(0 0 0 / 10%)", mb: 1 }}
                >
                  <Typography
                    sx={{
                      mb: 1,
                      color: "#687188",
                      textTransform: "capitalize",
                      fontSize: { sm: "14px", xs: "12px" },
                      textAlign: "center",
                    }}
                  >
                    {cartItems?.free_delivery_title}
                  </Typography>
                  <LinearProgress
                    color="error"
                    variant="determinate"
                    sx={{ height: "6px", borderRadius: "4px" }}
                    value={cartItems?.progress}
                  />
                </Box>
              ) : null}

              {cartItems?.branch && cartItems?.branch?.length > 0 ? (
                <Box sx={{ p: 2, boxShadow: " 0 0 7px rgb(0 0 0 / 10%)" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      my: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#292b2c",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        fontSize: { sm: "18px", xs: "16px" },
                      }}
                    >
                      Sub Total
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#292b2c",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        fontSize: { sm: "18px", xs: "16px" },
                      }}
                    >
                      {cartItems?.total_amount} AED
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => navigate("/chekout")}
                    variant="contained"
                    sx={{ backgroundColor: "#bb1f2a", padding: "10px", mt: 1 }}
                    fullWidth
                  >
                    Proceed To Checkout
                  </Button>
                </Box>
              ) : null}
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center" }}>
            <div className="row d-flex align-items-center justify-content-between my-4 px-2">
              <span
                className="col-5"
                style={{ backgroundColor: "#d9d9d9", height: "4px" }}
              ></span>
              <FaShoppingCart size={30} className="col-2" color="#d9d9d9" />
              <span
                className="col-5"
                style={{ backgroundColor: "#d9d9d9", height: "4px" }}
              ></span>
            </div>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default CartPage;
