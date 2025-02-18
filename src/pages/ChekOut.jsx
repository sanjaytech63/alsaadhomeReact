import React, { useEffect, useState, useCallback } from 'react';
import { Grid, TextField, Button, Typography, Container, Box, Select, MenuItem, Checkbox, FormControl, Dialog, DialogTitle, IconButton, DialogContent, CardMedia, InputAdornment, CircularProgress, selectClasses } from '@mui/material';
import { FaRegCreditCard } from "react-icons/fa6";
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import tamaraImg from "../../src/assets/tamara.svg"
import { useNavigate } from 'react-router-dom';
import { useAddressStore } from '../store/useAddressStore';
import { checkOutServices } from '../utils/services/checkOutServices';
import { google_place_api, showToast } from '../utils/helper';
import { useSettingsStore } from '../store/useSettingsStore';
import { useCountryStore } from '../store/useCountryStore';
import { shippingApi } from '../utils/services/shippingApi';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
    useLoadScript,
} from "@react-google-maps/api";
import axios from 'axios';
import { Formik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import ChekOutMap from '../components/Map/ChekOutMap';
import placeOrderApi from '../utils/services/placeOrder';
import { decryptData, encryptData } from '../utils/services/AlsaadRSA';
import useCartStore from '../store/useCartStore';
import { Done, Close } from "@mui/icons-material";
const Checkout = () => {
    const [countryCode, setCountryCode] = useState("+ 968");
    const [open, setOpen] = useState(false);
    const [opneShhipingAddress, setOpenShhipingAddress] = useState(false);
    const [checked, setChecked] = useState(false);
    const { addresses, getShipping } = useAddressStore();
    const [dailog, setDailog] = useState(false);
    const handleOpenDailog = () => setDailog(true);
    const handleCloseDailog = () => setDailog(false);
    const selectedCountry = useSettingsStore((state) => state.selectedCountry);
    const [city, setCity] = useState(null);
    const [area, setArea] = useState(null);
    const [selectedCity, setSelectedCity] = useState("Select City");
    const [selectedArea, setSelectedArea] = useState("Select Area");
    const [checkout, setCheckOut] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [initialValues, setInitialValues] = useState({
        country_id: selectedCountry?.id,
        city_id: selectClasses?.city_id,
        area_id: selectClasses?.area_id,
        area: selectedAddress?.area,
        address: selectedAddress?.address,
        latitude: "",
        longitude: "",
        appartment: selectedAddress?.appartment,
        building: selectedAddress?.building,
        note: selectedAddress?.note,
        name: selectedAddress?.name,
        mobile_number: selectedAddress?.mobile_number,
        alternate_number: selectedAddress?.alternate_number,
        email: selectedAddress?.email,
        is_default: selectedAddress?.is_default,
        country_code: selectedCity?.country_code || "",
    });
    const [cuoponCode, setCuoponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const { getCart } = useCartStore();

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                await getShipping();
            } catch (error) {
                console.log(error);
            }
        }
        fetchAddress();
    }, [])
    const handleChange = (event) => {
        setCountryCode(event.target.value);
    };

    const handelChecked = (id) => {
        setChecked(id);
    }

    const handleCloseShhipingAddress = () => {
        setOpenShhipingAddress(false);
    }

    const handleOpenShhipingAddress = () => {
        setOpenShhipingAddress(true);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const navigateToTermsCondactions = () => {
        navigate("/terms-of-use")
    }


    const addCuoponCode = async (id, cuoponCode) => {
        if (!cuoponCode) return;

        setLoading(true);
        try {
            const req = {
                code: cuoponCode,
                checkout_id: id
            };
            const response = await checkOutServices.addCoupon(req);

            if (response && response.status === 200) {
                showToast("success", response.message, "success");
                setAppliedCoupon(cuoponCode);
                setCuoponCode(cuoponCode);
            }
        } catch (error) {
            console.error("Error in addCuoponCode:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCoupon = () => {
        if (cuoponCode.trim()) {
            addCuoponCode(checkout?.checkout_id, cuoponCode);
        }
    };

    const handleRemoveCoupon = () => {
        setCuoponCode("");
        setAppliedCoupon(null);
    };


    // balling address
    const { countries, fetchCountries } = useCountryStore();
    const [address, setAddress] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [currentLocation, setCurrentLocation] = useState({
        lat: 0,
        lng: 0,
    });

    function onLoad(autocomplete) {
        if (autocomplete) {
            setSearchResult(autocomplete);
        }
    }

    const setSelectedCountry = useSettingsStore(
        (state) => state?.setSelectedCountry
    );

    const locationSelected = () => {
        if (searchResult) {
            const place = searchResult.getPlace();
            if (place && place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                setCurrentLocation({ lat, lng });
                fetchAddress(lat, lng);
            }
        }
    };

    const storedUserInfo = JSON.parse(localStorage.getItem("USER") || "{}");
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        mobile_number: Yup.string()
            .matches(/^\d+$/, 'Only numbers are allowed')
            .required('Phone number is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        address: Yup.string().notRequired(),
        city_id: Yup.string().notRequired(),
        area_id: Yup.string().notRequired(),
        country_id: Yup.string().notRequired(),
    });

    const getCity = async () => {
        try {
            let req = { country_id: selectedCountry?.id };
            const response = await shippingApi.getCity(req);
            if (response && response.status === 200) {
                setCity(response.data);
            } else {
                console.log("Error fetching city data:-", response);
            }
        } catch (error) {
            console.log("Error fetching city data:-", error);
        }
    };

    useEffect(() => {
        getCity();
    }, [selectedCountry]);

    const getArea = async () => {
        if (selectedCity === "Select City") return;
        try {
            let req = { country_id: selectedCountry?.id, city_id: selectedCity };
            const response = await shippingApi.getArea(req);
            if (response && response.status === 200) {
                setArea(response.data);
            } else {
                console.log("Error fetching area data:-", response);
            }
        } catch (error) {
            console.log("Error fetching area data:-", error);
        }
    };

    const debouncedGetArea = useCallback(_.debounce(getArea, 300), [
        selectedCity,
    ]);

    useEffect(() => {
        debouncedGetArea();
    }, [selectedCity]);


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: google_place_api,
        libraries: ["places"],
    });

    const getLocation = useCallback(() => {
        if (navigator.geolocation) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setCurrentLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });

                        fetchAddress(position.coords.latitude, position.coords.longitude);
                    },
                    (error) => {
                        console.log("Error getting current location:", error);
                    }
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        } else {
            alert("Geolocation is not supported in your browser.");
        }
    }, []);

    useEffect(() => {
        if (isLoaded) {
            getLocation();
        }
    }, [getLocation, isLoaded]);

    const handleDragEnd = (e) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            fetchAddress(lat, lng);
            setCurrentLocation({ lat, lng });
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK" && results && results[0]) {
                    fetchAddress(lat, lng);
                    setAddress(results[0].formatted_address);
                }
            });
        }
    };

    const fetchAddress = async (lat, lng) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${google_place_api}`
            );

            let newCity = "";
            for (let component of response.data.results[0].address_components) {
                for (let type of component.types) {
                    if (type === "locality" || type === "administrative_area_level_1") {
                        newCity = component.long_name;
                        break;
                    }
                }
                if (newCity) break;
            }

            if (response?.data?.results?.length > 0) {
                setInitialValues((pri) => ({
                    ...pri,
                    address: response?.data?.results[0]?.formatted_address,
                }));
                setAddress(response?.data?.results[0]?.formatted_address);
                const isValidCity = city?.find(
                    (cityName) => cityName?.city_name === newCity
                );
                if (isValidCity) {
                    setInitialValues((prev) => ({
                        ...prev,
                        city: newCity,
                    }));
                } else {
                    setInitialValues((prev) => ({
                        ...prev,
                        city: "",
                    }));
                }
            } else {
                console.log("Address not found");
            }
        } catch (error) {
            console.log("Error fetching address:", error);
        }
    };

    function getDefaultAddress() {
        if (addresses && addresses?.length > 0) {
            const isDefault = addresses?.find((item) => item.is_default === 0);
            if (isDefault) {
                setSelectedAddress(isDefault);
                fetchCheckOut(isDefault)
                setInitialValues(isDefault);
            } else {
                fetchCheckOut(addresses[0])
                setSelectedAddress(addresses[0]);
                setInitialValues(addresses[0]);
            }
        }
    }

    useEffect(() => {
        getDefaultAddress()
    }, [addresses])

    const fetchCheckOut = async (selectedAddress) => {

        const add = selectedAddress;

        let cart_id = localStorage.getItem("cart_id");
        let checkoutData = {
            "address": add?.address,
            "device_type": "web",
            "whatsapp_number": add?.alternate_number,
            "city_id": add?.city_id ?? selectedCity,
            "area_id": add?.area_id ?? selectedArea,
            country_code: selectedCountry?.country_code,
            "token": "",
            "is_coupon_applied": cuoponCode,
            "email": add?.email,
            customer_id: storedUserInfo.id,
            "applied_coupon": cuoponCode,
            cart_id: cart_id,
            "version": "36",
            "userName": add?.name,
            "currency": "AED",
            country_id: selectedCountry?.id,
            "mobile_number": add?.mobile_number,
            "is_wallet": "0",
            "area_name": add?.area_name,
            "appartment": add?.appartment,
            "building": add?.building,
            "order_shipping_type": "standard",
            "note": add?.note
        }
        try {
            const response = await checkOutServices.checkOut(checkoutData);
            if (response && response.status === 200) {
                setCheckOut(response?.data);
                showToast("success", response?.data?.message, "success");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addPlaceOrder = async () => {
        if (!checkout?.checkout_id) {
            console.error("checkout_id is undefined");
            return;
        }

        const encryptedCheckoutId = encryptData(checkout?.checkout_id?.toString());

        try {
            const req = {
                order_delivery_type_id: "standard",
                checkout_id: encryptedCheckoutId,
                payment_method: "1",
                customer_id: storedUserInfo?.id?.toString(),
            };
            const response = await placeOrderApi?.placeOreder(req);
            if (response && response.status === 200) {
                await getCart();
                showToast("success", response.message, "success");
                navigate("/checkout/success");
            }
        } catch (error) {
            console.log(error, "error in place order");
        }
    };


    return (
        <Box sx={{ my: 4, py: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} >
                        <Box sx={{ my: 2, py: 2, backgroundColor: "#f7f7f7", px: 3, display: "flex", alignItems: "center", gap: 1 }}>
                            <LocalOfferIcon sx={{ color: "#bb1f2a" }} />
                            <Typography color='#687188' sx={{ fontSize: { sm: "18px", xs: "14px" } }} variant="h6">Do you have a coupon?</Typography>
                        </Box>
                        <Box
                            sx={{
                                border: { sm: '1px solid #e0e0e0', xs: 'none' },
                                padding: { sm: 3, xs: 0 },
                            }}
                        >
                            <Grid
                                container
                                alignItems="stretch"
                                sx={{ gap: { sm: 2, xs: 0 } }}
                            >
                                <Grid item xs={6} sm={7}>
                                    <TextField
                                        value={cuoponCode}
                                        onChange={(e) => setCuoponCode(e.target.value)}
                                        fullWidth
                                        name="coupon"
                                        label="Enter Coupon"
                                        variant="outlined"
                                        sx={{
                                            height: "52px",
                                            "& .MuiOutlinedInput-root": {
                                                height: "100%",
                                                borderRadius: { sm: 0, xs: "8px 0 0 8px" },
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: appliedCoupon ? (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleRemoveCoupon} size="small">
                                                        <Close color="error" />
                                                    </IconButton>
                                                    <Done color="success" />
                                                </InputAdornment>
                                            ) : null,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <Button
                                        onClick={handleApplyCoupon}
                                        fullWidth
                                        disabled={!cuoponCode?.trim() || appliedCoupon}
                                        variant="contained"
                                        sx={{
                                            borderRadius: { sm: 0, xs: "0 8px 8px 0" },
                                            height: "52px",
                                            padding: 0,
                                            backgroundColor: appliedCoupon ? "green" : "#bb1f2a",
                                        }}
                                    >
                                        {loading ? (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
                                                <CircularProgress color="#fff" size={24} /> Loading...
                                            </Box>
                                        ) : appliedCoupon ? "Applied" : "Apply Coupon"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', my: { xs: 2, sm: 4 } }}>
                            <Box sx={{ flex: 1, height: '4px', backgroundColor: '#d9d9d9' }}></Box>
                            <FaRegCreditCard size={30} color="#d9d9d9" style={{ margin: '0 16px' }} />
                            <Box sx={{ flex: 1, height: '4px', backgroundColor: '#d9d9d9' }}></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography sx={{ color: "#292b2c", fontSize: "22px", fontWeight: "700", mb: 4 }} variant="h6" gutterBottom>
                            Billing Details
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async ({ values, resetForm }) => {
                                await fetchCheckOut(values);
                                resetForm();
                            }}
                            enableReinitialize
                        >
                            {({ handleChange,
                                handleBlur,
                                handleSubmit,
                                errors,
                                values,
                                touched,
                                isValid, }) => (

                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        name="name"
                                        type="text"
                                        value={values?.name}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Name"
                                        variant="outlined"
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                                        <Grid container spacing={2}>
                                            {/* Select Country Code */}
                                            <Grid item xs={5} sm={4}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        disablePortal
                                                        MenuProps={{ disableScrollLock: true }}
                                                        value={selectedCountry?.code || ""}
                                                        variant="outlined"
                                                        sx={{
                                                            padding: "2px 4px",
                                                            border: "1px solid #ccc",
                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                border: "none",
                                                            },
                                                            ".MuiSelect-select": {
                                                                padding: "13px 0px",
                                                                fontSize: "14px",
                                                                color: "#333",
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value={selectedCountry?.code || ""}>
                                                            <img
                                                                src={selectedCountry?.flag}
                                                                alt={selectedCountry?.name}
                                                                style={{
                                                                    width: "23px",
                                                                    height: "23px",
                                                                    marginRight: "4px",
                                                                }}
                                                            />
                                                            {selectedCountry?.code}
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            {/* Mobile Number Input */}
                                            <Grid item xs={7} sm={8}>
                                                <TextField
                                                    name="mobile_number"
                                                    value={values?.mobile_number}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type="number"
                                                    label="Mobile Number"
                                                    error={touched?.mobile_number && Boolean(errors?.mobile_number)}
                                                    helperText={touched?.mobile_number && errors?.mobile_number}
                                                    required
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                                        <Grid container spacing={2}>
                                            {/* Select Country Code */}
                                            <Grid item xs={5} sm={4}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        disablePortal
                                                        MenuProps={{ disableScrollLock: true }}
                                                        value={selectedCountry?.code || ""}
                                                        variant="outlined"
                                                        sx={{
                                                            padding: "2px 4px",
                                                            border: "1px solid #ccc",
                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                border: "none",
                                                            },
                                                            ".MuiSelect-select": {
                                                                padding: "13px 0px",
                                                                fontSize: "14px",
                                                                color: "#333",
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value={selectedCountry?.code}>
                                                            <img
                                                                src={selectedCountry?.flag}
                                                                alt={selectedCountry?.name}
                                                                style={{
                                                                    width: "23px",
                                                                    height: "23px",
                                                                    marginRight: "4px",
                                                                }}
                                                            />
                                                            {selectedCountry?.code}
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            {/* Mobile Number Input */}
                                            <Grid item xs={7} sm={8}>
                                                <TextField
                                                    name="alternate_number"
                                                    value={values?.alternate_number}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    type="number"
                                                    label="Whatsapp Number"
                                                    error={
                                                        touched?.alternate_number && Boolean(errors?.alternate_number)}
                                                    helperText={
                                                        touched?.alternate_number && errors?.alternate_number
                                                    }
                                                    required
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <TextField
                                        name="email"
                                        value={values?.email}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        error={touched?.email && Boolean(errors?.email)}
                                        helperText={touched?.email && errors?.email}
                                        sx={{ my: 2 }}
                                    />

                                    <Button fullWidth onClick={handleOpenShhipingAddress} variant="contained" sx={{ marginBottom: 2, backgroundColor: "#bb1f2a" }}>
                                        Shipping Address
                                    </Button>

                                    <FormControl fullWidth>
                                        <Select
                                            disablePortal
                                            MenuProps={{ disableScrollLock: true }}
                                            fullWidth
                                            variant="outlined"
                                            value={selectedCountry?.country_name || ""}
                                            onChange={(event) => {
                                                const selectedCountry = countries.find(
                                                    (country) =>
                                                        country.country_name === event.target.value
                                                );
                                                setSelectedCountry(selectedCountry);
                                            }}
                                            sx={{ marginBottom: 2 }}
                                        >
                                            {countries.map((country, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={country?.country_name}
                                                    sx={{
                                                        fontSize: 14,
                                                        ":hover": {
                                                            backgroundColor: "#bb1f2a",
                                                            color: "#fff",
                                                        },
                                                    }}
                                                >
                                                    {country?.country_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth >
                                        <Select
                                            disablePortal
                                            MenuProps={{ disableScrollLock: true }}
                                            fullWidth
                                            variant="outlined"
                                            value={selectedCity}
                                            onChange={(e) => setSelectedCity(e.target.value)}
                                            sx={{ marginBottom: 2 }}
                                        >
                                            <MenuItem disabled value="Select City">Select City</MenuItem>
                                            {city?.map((item) => (
                                                <MenuItem key={item?.id} value={item?.id}>
                                                    {item?.city_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth >
                                        <Select
                                            disablePortal
                                            MenuProps={{ disableScrollLock: true }}
                                            fullWidth
                                            variant="outlined"
                                            value={selectedArea}
                                            onChange={(e) => setSelectedArea(e.target.value)}
                                            sx={{ marginBottom: 2 }}
                                        >
                                            <MenuItem value="Select Area">Select Area</MenuItem>
                                            {area?.map((item) => (
                                                <MenuItem key={item?.id} value={item?.id}>
                                                    {item?.area_name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        name="appartment"
                                        value={values?.appartment}
                                        onChange={handleChange}
                                        type="text"
                                        fullWidth
                                        label="Apartment No."
                                        variant="outlined"
                                        sx={{ marginBottom: 2 }}
                                        error={touched?.appartment && Boolean(errors?.appartment)}
                                        helperText={touched?.appartment && errors?.appartment}
                                    />

                                    <TextField
                                        name="building"
                                        value={values?.building}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Building No."
                                        variant="outlined"
                                        sx={{ marginBottom: 2 }}
                                        error={touched.building && Boolean(errors.building)}
                                        helperText={touched.building && errors.building}
                                    />

                                    <TextField
                                        name="note"
                                        value={values?.note}
                                        onChange={handleChange}
                                        fullWidth
                                        label="Note"
                                        variant="outlined"
                                        sx={{ marginBottom: 2 }}
                                        error={touched.note && Boolean(errors.note)}
                                        helperText={touched.note && errors.note}
                                    />
                                    <Box>
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            variant="outlined"
                                            name="address"
                                            value={values?.address}
                                            error={touched.address && Boolean(errors.address)}
                                            helperText={touched.address && errors.address}
                                            sx={{ marginBottom: 2 }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment
                                                        onClick={handleOpenDailog}
                                                        sx={{ cursor: "pointer" }}
                                                        position="end"
                                                    >
                                                        <LocationOnIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        disabled={!isValid}
                                        sx={{ backgroundColor: "#bb1f2a" }}
                                    >
                                        Save Address
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </Grid>

                    <ChekOutMap
                        dailog={dailog}
                        handleCloseDailog={handleCloseDailog}
                        onLoad={onLoad}
                        onPlaceChanged={locationSelected}
                        address={address}
                        setAddress={setAddress}
                        currentLocation={currentLocation}
                        handleDragEnd={handleDragEnd}
                        selectedCountry={selectedCountry}
                    />

                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                padding: 2,
                                backgroundColor: "#f7f8fb"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#292b2c",
                                    fontSize: { xs: "18px", md: "22px" },
                                    fontWeight: "700",
                                    mb: 2
                                }}
                                variant="h6"
                            >
                                Your Orders
                            </Typography>
                            <hr />
                            <Grid container sx={{ alignItems: 'center', padding: 1, }}>
                                {/* Photo Header */}
                                <Grid item xs={3} sm={2}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Photo
                                    </Typography>
                                </Grid>
                                {/* Product Header */}
                                <Grid item xs={6} sm={8}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600",

                                        }}
                                    >
                                        Product
                                    </Typography>
                                </Grid>
                                {/* Total Header */}
                                <Grid item xs={3} sm={2} sx={{ textAlign: 'right' }}>
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            fontSize: "15px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        Total
                                    </Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            {checkout?.item?.map((product, index) => (
                                <Grid
                                    key={index}
                                    container
                                    spacing={2}
                                    sx={{
                                        alignItems: 'center',
                                        marginBottom: 2,
                                        textAlign: { xs: 'center', sm: 'left' },
                                    }}
                                >
                                    {/* Product Image */}
                                    <Grid item xs={3} sm={2}>
                                        <img
                                            src={product?.image}
                                            alt="product"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                            }}
                                            loading="lazy"
                                        />
                                    </Grid>
                                    {/* Product Name */}
                                    <Grid item xs={6} sm={8}>
                                        <Typography sx={{ ":hover": { color: "#bb1f2a" }, fontSize: { xs: '14px', sm: '16px' }, }}>
                                            {product?.title}
                                        </Typography>
                                    </Grid>
                                    {/* Product Price */}
                                    <Grid item xs={3} sm={2} sx={{ textAlign: 'right' }}>
                                        <Typography sx={{ fontSize: { xs: '14px', sm: '16px' }, }}>
                                            {product?.list_price} AED
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}


                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Sub Total</Typography>
                                <Typography>{checkout?.sub_total} AED</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Flat Shipping Rate</Typography>
                                <Typography>{checkout?.convert_shipping_cost} AED</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography>Cod Processing Fee</Typography>
                                <Typography>{checkout?.convert_processing_fees} AED</Typography>
                            </Box>
                            {/* Discount and Shipping Info Section */}
                            {
                                cuoponCode && <Grid item xs={12} sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                            Discount: <span style={{ color: '#00a859' }}>{checkout?.discount_percentage} %</span>
                                        </Typography>
                                        <Typography> - {checkout?.discount_amount} AED</Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        {/* Shipping Fee:{" "}
                                <span style={{ color: '#bb1f2a' }}>
                                    {shippingFree ? "Free" : `$${shippingFree}`}
                                </span> */}
                                    </Typography>
                                </Grid>
                            }

                            <hr />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                                <Typography sx={{ fontWeight: 700 }}>Final Total</Typography>
                                <Typography sx={{ fontWeight: 700 }}>{checkout?.final_order_total_price} AED</Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                my: 4,
                                padding: 2,
                                backgroundColor: "#f7f8fb"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#292b2c",
                                    fontSize: { xs: "18px", md: "22px" },
                                    fontWeight: "700"
                                }}
                                gutterBottom
                                variant="h6"
                            >
                                Payment Method
                            </Typography>
                            <Box
                                sx={{
                                    boxShadow: 2,
                                    padding: 1,
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    backgroundColor: "#fff",
                                    borderRadius: '10px',
                                    my: 2
                                }}
                            >
                                <Typography onClick={(id) => handelChecked(id)} sx={{
                                    width: '20px',
                                    height: '20px',
                                    mr: 2,
                                    my: 1,
                                    border: checked ? '2px solid #bb1f2a' : 'none',
                                    background: checked ? '#fff' : '#e1e8ee',
                                    borderRadius: '50%',
                                    boxShadow: '0 0.08rem 0 rgba(20, 28, 35, 0.25) inset',
                                    transition: 'background 0.3s ease',
                                    cursor: 'pointer',
                                }} />
                                <Box
                                    sx={{
                                        padding: 2,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '10px',
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        textAlign: { xs: 'left', sm: 'left' }
                                    }}
                                >
                                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                                        <Typography sx={{ fontSize: "14px", textAlign: { xs: 'left', sm: 'left' } }}>
                                            Or split in 3 payments of <strong>AED 53.00</strong> - No late fees,
                                        </Typography>
                                        <Typography sx={{ fontSize: "14px", textAlign: { xs: 'left', sm: 'left' } }}>
                                            Sharia compliant! Tamara <strong><a href='https://www.tamara.com/' className='text-black'>Learn more</a></strong>
                                        </Typography>
                                    </Box>
                                    <CardMedia component="img" src={tamaraImg} sx={{ display: "flex", justifyContent: "start", width: "100px", mt: { xs: 1, sm: 0 }, objectFit: "contain" }} loading="lazy" alt="tamaraImg" />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Checkbox
                                    sx={{
                                        "&.Mui-checked": {
                                            color: "#bb1f2a",
                                        },
                                    }}
                                />
                                <Typography onClick={navigateToTermsCondactions} sx={{ fontSize: { sm: "16px", xs: "14px" }, cursor: "pointer" }}> Terms & Conditions</Typography>
                            </Box>
                            <Grid item xs={12} sx={{ my: 2 }}>
                                <Button onClick={async () => {
                                    await addPlaceOrder();
                                }} fullWidth variant="contained" sx={{ backgroundColor: "#bb1f2a" }}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                {/* shhipping address */}
                <Dialog disablePortal
                    MenuProps={{ disableScrollLock: true }} open={opneShhipingAddress} onClose={handleCloseShhipingAddress} fullWidth maxWidth="md">
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h6">Shipping Address</Typography>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleCloseShhipingAddress}
                            aria-label="close"
                            sx={{ position: 'absolute', right: "20px", }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ height: '400px', width: '100%', overflow: 'auto', }}>
                            {/* Header */}
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(5, 1fr)",
                                    gap: 2,
                                    alignItems: "center",
                                }}
                            >
                                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>Country</Typography>
                                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>City</Typography>
                                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>Area</Typography>
                                <Typography sx={{ fontWeight: "600", fontSize: "16px" }}>Address</Typography>
                                <Typography sx={{ fontWeight: "600", fontSize: "16px", textAlign: "center" }}>
                                    Select
                                </Typography>
                            </Box>

                            {/* Data Rows */}
                            {addresses.map((item) => (
                                <Box
                                    key={item?.id}
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(5, 1fr)",
                                        gap: 2,
                                        my: 1,
                                        alignItems: "center",
                                        borderBottom: '1px solid #eee'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            textTransform: "capitalize",
                                            fontSize: { sm: "16px", xs: "14px" },
                                        }}
                                    >
                                        {item?.country}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            textTransform: "capitalize",
                                            fontSize: { sm: "16px", xs: "14px" },
                                        }}
                                    >
                                        {item?.city}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            textTransform: "capitalize",
                                            fontSize: { sm: "16px", xs: "14px" },
                                        }}
                                    >
                                        {item?.area || "N/A"}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#292b2c",
                                            textTransform: "capitalize",
                                            fontSize: { sm: "16px", xs: "14px" },
                                        }}
                                    >
                                        {item?.address.split(" ").slice(0, 5).join(" ")}
                                        {item?.address.split(" ").length > 5 ? "..." : ""}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#bb1f2a",
                                            color: "#fff",
                                            textTransform: "capitalize",
                                            fontSize: { sm: "16px", xs: "14px" },
                                            justifySelf: "center",
                                        }}
                                    >
                                        Select
                                    </Button>
                                </Box>

                            ))}
                        </Box>
                    </DialogContent>


                </Dialog>
                {/* google maps */}
                <Dialog disablePortal
                    MenuProps={{ disableScrollLock: true }} open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>
                        <TextField label="Enter a location" variant="outlined" sx={{ width: '90%', marginBottom: 2 }} />
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            sx={{ position: 'absolute', right: "20px", top: "20px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ height: '400px', width: '100%' }}>
                            <iframe
                                src="https://www.google.com/maps?q=Shanghai+location&output=embed"
                                style={{ border: 0, width: '100%', height: '100%' }}
                                allowFullScreen
                                loading="lazy"
                                title="Google Maps"
                            />
                        </Box>
                    </DialogContent>
                </Dialog>
            </Container>
        </Box>
    );
};

export default Checkout;
