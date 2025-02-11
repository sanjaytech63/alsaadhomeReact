import React, { useEffect, useState } from 'react';
import { Avatar, Grid, Typography, Tab, Tabs, Box, } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import jsonData from "../../src/blogData.json";
import AddReviewModal from './AddReviewModal';
import orderServiceApi from '../utils/services/oderServices';
import Loading from './Loading';
import { useParams } from "react-router-dom";

function OrderDetails() {
    const [tabValue, setTabValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const { id: orderId } = useParams();
    const orderDetails = async () => {
        try {
            setLoading(true);
            const req = {
                order_id: orderId
            }
            const response = await orderServiceApi.getOrderDetails(req);
            if (response && response.status === 200) {
                setLoading(false);
                setOrder(response.data);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        orderDetails();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <Box sx={{ boxShadow: 2 }}>
            {/* Order Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1 }}>
                <Box >
                    <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Order Date</Typography>
                    <Typography sx={{ fontSize: "14px", color: "#687188" }}>{order?.order_date}</Typography>
                </Box>
                <Box >
                    <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>Order ID </Typography>
                    <Typography sx={{ fontSize: "14px", color: "#687188" }}>{order?.id}</Typography>
                </Box>
            </Box>
            {/* Tabs for Order Status and Details */}
            <Tabs
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                    padding: 0
                }}
                textColor="#bb1f2a"
                TabIndicatorProps={{
                    sx: { color: "#bb1f2a", background: "#bb1f2a" },
                }}
                value={tabValue}
                onChange={handleTabChange}
                aria-label="order tabs"
            >
                <Tab
                    sx={{
                        color: tabValue === 0 ? "#bb1f2a" : "#292b2c",
                        ":hover": {
                            color: "#bb1f2a",
                        },
                        display: "flex",
                        flex: 1,
                        maxWidth: "100%",
                    }}
                    label="Order Status"
                />
                <Tab
                    sx={{
                        color: tabValue === 1 ? "#bb1f2a" : "#292b2c",
                        ":hover": {
                            color: "#bb1f2a",
                        },
                        maxWidth: "100%",
                        display: "flex",
                        flex: 1
                    }}
                    label="Order Details"
                />
            </Tabs>
            <Box sx={{ padding: { sm: 3, xs: "5px" } }}>
                {tabValue === 0 && (
                    <Grid container spacing={3}>
                        <Grid sx={{ display: "flex", gap: 3, alignItems: "center" }} item xs={12}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Pending Step */}
                                <Avatar
                                    sx={{
                                        bgcolor: order?.status === "Pending" || order?.status === "Ready To Ship" || order?.status === "Store Pickup" || order?.status === "Delivered" ? '#1a5f20' : '#88a785',
                                        width: '30px',
                                        height: '30px',
                                    }}
                                >
                                    {(order?.status === "Pending" || order?.status === "Ready To Ship" || order?.status === "Store Pickup" || order?.status === "Delivered") && (
                                        <DoneIcon sx={{ color: '#fff' }} />
                                    )}
                                </Avatar>
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '50px',
                                        borderLeft: '2px dashed #1a5f20',
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                    }}
                                />

                                {/* Ready To Ship Step */}
                                <Typography
                                    sx={{
                                        bgcolor: order?.status === "Ready To Ship" || order?.status === "Store Pickup" || order?.status === "Delivered" ? '#1a5f20' : '#88a785',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {(order?.status === "Ready To Ship" || order?.status === "Store Pickup" || order?.status === "Delivered") && (
                                        <DoneIcon sx={{ color: '#fff' }} />
                                    )}
                                </Typography>
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '50px',
                                        borderLeft: '2px dashed #1a5f20',
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                    }}
                                />

                                {/* Store Pickup Step */}
                                <Typography
                                    sx={{
                                        bgcolor: order?.status === "Store Pickup" || order?.status === "Delivered" ? '#1a5f20' : '#88a785',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {(order?.status === "Store Pickup" || order?.status === "Delivered") && (
                                        <DoneIcon sx={{ color: '#fff' }} />
                                    )}
                                </Typography>
                                <Box
                                    sx={{
                                        width: '2px',
                                        height: '50px',
                                        borderLeft: '2px dashed #1a5f20',
                                        marginTop: '8px',
                                        marginBottom: '8px',
                                    }}
                                />

                                {/* Delivered Step */}
                                <Typography
                                    sx={{
                                        bgcolor: order?.status === "Delivered" ? '#1a5f20' : '#88a785',
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {order?.status === "Delivered" && (
                                        <DoneIcon sx={{ color: '#fff' }} />
                                    )}
                                </Typography>
                            </Box>

                            <Box display="flex" flexDirection="column" alignItems="center" gap={3} mt={2}>
                                {/* Pending Order */}
                                <Box display="flex" alignItems="center" mb={2}>
                                    <img style={{ maxWidth: "50px" }} src="https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/images/pending-order.png" alt="pending" />
                                    <Box ml={2}>
                                        <Typography variant="body1"><strong>Pending</strong></Typography>
                                        <Typography variant="body2" sx={{ color: "#687188" }}>We have received your order</Typography>
                                    </Box>
                                </Box>

                                {/* Ready to Ship */}
                                <Box display="flex" alignItems="center" mb={2}>
                                    <img style={{ maxWidth: "50px" }} src="https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/front/images/delivery-man.png" alt="pending" />
                                    <Box ml={2}>
                                        <Typography variant="body1"><strong>Order Ready to Ship</strong></Typography>
                                        <Typography variant="body2" sx={{ color: "#687188" }}>Order ready to be picked up</Typography>
                                    </Box>
                                </Box>

                                {/* Picked Up */}
                                <Box display="flex" alignItems="center" mb={2}>
                                    <img style={{ maxWidth: "50px" }} src="https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/front/images/pickup-car.png" alt="Order" />
                                    <Box ml={2}>
                                        <Typography variant="body1"><strong>Order Picked Up</strong></Typography>
                                        <Typography variant="body2" sx={{ color: "#687188" }}>Order is now with the courier</Typography>
                                    </Box>
                                </Box>

                                {/* Delivered */}
                                <Box display="flex" alignItems="center" mb={2}>
                                    <img style={{ maxWidth: "50px" }} src="https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/front/images/delivery.png" alt="Delivered" />
                                    <Box ml={2}>
                                        <Typography variant="body1"><strong>Order Delivered</strong></Typography>
                                        <Typography variant="body2" sx={{ color: "#687188" }}>Your {order?.orderID} order is completed!</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                )}

                {tabValue === 1 && (
                    <Box>
                        {/* Order Details Section */}
                        <Grid item xs={12} >
                            <Typography variant="h6" component="h2" gutterBottom>ITEMS</Typography>
                            {
                                order?.item?.length > 0 &&
                                order?.item.map((item) => (
                                    <Box key={item?.id} sx={{ padding: { xs: 1, sm: 2 }, mb: 2, border: "1px solid #dee2e6" }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item xs={4}>
                                                <img
                                                    // src={item?.image}
                                                    src='https://cdn.pixabay.com/photo/2021/02/18/09/26/coca-cola-6026672_960_720.jpg'
                                                    alt="Cannon Duvet Cover Set"
                                                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography sx={{ xs: "1rem", sm: "1.2rem" }} variant="h6" component="h3">
                                                    {item?.product_name}
                                                </Typography>
                                                <strong>Color:</strong>
                                                {
                                                    item?.colors?.length > 0 ? (
                                                        item?.colors?.map((color) => (
                                                            <Typography variant="body1"><span style={{ backgroundColor: color, borderRadius: '50%', display: 'inline-block', width: 20, height: 20 }} /></Typography>
                                                        ))
                                                    ) : (
                                                        <img
                                                            src={item?.pattern_image}
                                                            alt="Cannon Duvet Cover Set"
                                                            style={{ width: '25px', height: '25px', objectFit: 'cover', borderRadius: '50%', display: 'inline-block' }}
                                                        />
                                                    )

                                                }
                                                <Typography variant="body1"><strong>Size:</strong> {item?.size}</Typography>
                                                <Typography variant="body1"><strong>Model:</strong> {item?.modal_number}</Typography>
                                                <Typography variant="body1"><strong>Quantity:</strong> {item?.qty}</Typography>
                                                <Typography variant="body1"><strong>Price (AED):</strong> {item?.price}</Typography>
                                                <Typography onClick={() => setOpen(true)} color='#222425' sx={{ mt: 1, ":hover": { color: "#bb1f2a" }, cursor: "pointer" }}><StarBorderOutlinedIcon sx={{ fontSize: "18px" }} />  Give Rating and Review</Typography>
                                                <AddReviewModal open={open} setOpen={setOpen} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))
                            }

                            {/* Order Summary */}
                            <Box sx={{ padding: 2 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Sub Total</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography variant="body1">{order?.sub_total} AED</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Shipping Rate</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography variant="body1">{order?.shipping_cost}</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>COD Processing Fee</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography variant="body1">{order?.processing_fee} AED</Typography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Typography variant="body1"><strong>Final Total</strong></Typography>
                                    </Grid>
                                    <Grid item xs={6} textAlign="right">
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{order?.total} AED</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Delivery Address */}
                            <Box mt={1}>
                                <Typography sx={{ fontWeight: 'bold', px: 2, color: "#bb1f2a" }} variant="h6">Delivery Address</Typography>
                                <Box sx={{ px: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "600", mb: 1 }}>Country </Typography>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "600", mb: 1 }}>City</Typography>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "600", mb: 1 }}>Address</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: "14px", mb: 1, textAlign: "right" }}>{order?.country_name}</Typography>
                                        <Typography sx={{ fontSize: "14px", mb: 1, textAlign: "right" }}>{order?.city_name}</Typography>
                                        <Typography sx={{ fontSize: "14px", mb: 1, textAlign: "right" }}>{order?.address}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default OrderDetails;
