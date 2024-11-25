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

const BundleProductsModal = ({ bundleProduct, open, handleClose }) => {
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

                                {bundleProduct.map((product) => (
                                    <Card
                                        key={product.id}
                                        sx={{
                                            boxShadow: 2,
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
                                            image={product.image}
                                            alt={product.name}
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
                                                <Typography variant="subtitle1">{product.name}</Typography>

                                                <Typography sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, fontSize: "14px" }}>
                                                    Price:  <strong style={{ color: "#bb1f2a" }}> {product.price}</strong>
                                                    <span style={{ textDecoration: "line-through" }}>
                                                        {product.originalPrice}
                                                    </span>
                                                    <span style={{ color: "green" }}> ({product.discount})</span>
                                                </Typography>
                                                <Typography variant="body2">Color: {product.color}</Typography>
                                                {product.size && <Typography variant="body2">Size: {product.size}</Typography>}
                                                <Typography variant="body2">Quantity: {product.quantity}</Typography>
                                            </CardContent>
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        color: "#fff",
                                                        width: "fit-content",
                                                        height: "fit-content",
                                                        background: "#bb1f2a",
                                                        textTransform: "capitalize",
                                                        textAlign: "right",
                                                        padding: { xs: "2px 5px", sm: "5px 10px" },
                                                        mx: 2,
                                                        mt: { xs: 0, sm: 15 },
                                                        mb: 1,
                                                    }}
                                                >
                                                    Add To Cart
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
