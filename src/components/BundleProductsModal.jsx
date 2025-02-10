import React from "react";
import {
    Box,
    Typography,
    Modal,
    Button,
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useCartStore from "../store/useCartStore";
import { useSearchParams } from "react-router-dom";

const BundleProductsModal = ({ bundleProduct, open, handleClose }) => {
    const { isItemInCart, addToCart } = useCartStore();
    const [searchParams] = useSearchParams();
    const variantId = searchParams.get("variant_id");

    return (
        <div>
            <Box sx={{ overflow: "hidden" }}>
                <Modal
                    sx={{
                        overflow: "hidden",
                    }}
                    disableScrollLock
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                >
                    <Container maxWidth="md" sx={{ overflowY: "auto" }} maxHeight="100vh">
                        <Box sx={{
                            bgcolor: "background.paper",
                            borderRadius: 2,
                            px: { xs: 1, sm: 2 },
                            py: 2,
                            mx: "auto",
                            mt: "4%",
                        }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} position="sticky" >
                                <Typography variant="h6" id="modal-title">
                                    Bundle Products
                                </Typography>
                                <IconButton onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{
                                    my: 2,
                                    pt: 1,
                                    overflowY: "auto", maxHeight: "70vh",
                                    px: 1,
                                }}
                            >
                                {bundleProduct?.length > 0 &&
                                    bundleProduct?.map((product) => (
                                        <Card
                                            key={product?.id}
                                            sx={{
                                                boxShadow: "0 0 7px rgb(0 0 0 / 10%)",
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 2,
                                                borderRadius: 1,
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    maxWidth: { xs: 80, sm: "200px" },
                                                    minHeight: 'auto',
                                                    mb: { xs: 0, sm: 0 },
                                                    objectFit: "cover",
                                                }}
                                                src={product?.photo}
                                                alt={product?.title}
                                            />

                                            <Box sx={{ display: "flex", flex: 1, flexDirection: { xs: "column", sm: "row" } }}>
                                                <CardContent
                                                    sx={{
                                                        flex: 1,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        textAlign: { xs: "left", sm: "left" },
                                                    }}
                                                >
                                                    <Typography variant="subtitle1">{product?.title}</Typography>

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
                                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                                    <Button onClick={() => {
                                                        if (!isItemInCart(variantId)) {
                                                            addToCart(variantId);
                                                        }
                                                    }}
                                                        sx={{ py: 1, px: 1, mr: 2, background: "#bb1f2a" }}
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
                                                        </IconButton>  {isItemInCart(variantId) ? "Go to Cart" : "Add to Cart"}
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Card>
                                    ))}
                            </Box>
                        </Box>
                    </Container>
                </Modal>
            </Box>
        </div>
    );
};

export default BundleProductsModal;
