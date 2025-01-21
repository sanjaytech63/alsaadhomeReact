import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import MapDialog from "./Map/MapDialog";
import { useSettingsStore } from "../store/useSettingsStore";
import { shippingApi } from "../utils/services/shippingApi";
import useLoaderStore from "../store/loaderStore";
import { useCountryStore } from "../store/useCountryStore";
import _ from "lodash";
import { google_place_api, showToast } from "../utils/helper";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const MyAddress = () => {
  const [open, setOpen] = useState(false);
  const [dailog, setDailog] = useState(false);
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedArea, setSelectedArea] = useState([]);
  const handleOpenDailog = () => setDailog(true);
  const handleCloseDailog = () => setDailog(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [address, setAddress] = useState("");
   const [searchResult, setSearchResult] =useState();
   const [currentLocation, setCurrentLocation] = useState({
     lat: 0,
     lng: 0,
   });

  const [initialValues, setInitialValues] = useState({
    country_id: '',
    city_id: '',
    area_id: "",
    area: "",
    address: "",
    latitude: "",
    longitude: "",
    pincode: "",
    appartment: "",
    building: "",
    note: "",
    name: "",
    mobile_number: "",
    alternate_number: "",
    email: "",
    is_default: "",
    country_code: selectedCity?.country_code || "",
  });



  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    mobile_number: Yup.string().required('Phone number is required'),
    country_code: Yup.string().required('Country code is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    area: Yup.string().required('Area is required'),
    country: Yup.string().notRequired(),
  });



  function onLoad(autocomplete) {
    if (autocomplete) {
      setSearchResult(autocomplete);
    }
  }


  const locationSelected = () => {
    if (searchResult) {
      const place = searchResult.getPlace();
      console.log(place,place.geometry,'location auto')
      if (place && place.geometry && place.geometry.location) {
        console.log("Place geometry:", place.geometry);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCurrentLocation({ lat, lng });
        fetchAddress(lat, lng);
      }
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const handleLocationChange = (latLng) => {
    setCurrentLocation(latLng);
  };

  const { countries, fetchCountries } = useCountryStore();
  const selectedCountry = useSettingsStore((state) => state.selectedCountry);

  const setSelectedCountry = useSettingsStore(
    (state) => state.setSelectedCountry
  );

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

 
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

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
  if ( isLoaded) {
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
    console.log(
      response.data.results[0].formatted_address,
      "response.data.results[0]"
    );
    
    if (response.data.results.length > 0) {
      setInitialValues((pri) => ({
        ...pri,
        address: response.data.results[0].formatted_address,
      }));
      setAddress(response.data.results[0].formatted_address);
      const isValidCity = city.find(
        (cityName) => cityName.city_name === newCity
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


  const addNewAddress = async (values) => {
    const request = {
      country_id: values.country_id,
      city_id: values.city_id,
      area_id: values.area_id,
      area: values.area,
      address: values.address,
      latitude: currentLocation?.lat,
      longitude: currentLocation?.lng,
      pincode: "",
      appartment: values.appartment,
      building: values.building,
      note: values.note,
      name: values.name,
      mobile_number: values.mobile_number,
      alternate_number: values.alternate_number,
      email:values.email,
      is_default: "1",
      country_code: selectedCountry?.country_code,
    };
    try {
      const response = await shippingApi.addShippingAddress(request);
      if (response && response.status === 200) {
        showToast("success", response.message, "success");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div style={{ minHeight: "100vh" }}>
      <Box sx={{ bgcolor: "#f7f8fb", py: { sm: "30px", xs: "15px" } }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#292b2c",
                fontWeight: 700,
                fontSize: { sm: "24px", xs: "16px" },
              }}
            >
              My Address
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
        </Container>
      </Box>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: "white", boxShadow: 1 }}>
              <Dashboard selectItem={3} />
            </Box>
          </Grid>

          <Grid item sx={{ mb: 10 }} xs={12} sm={9}>
            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "#292b2c",
                    textTransform: "capitalize",
                    fontWeight: 700,
                    fontSize: { sm: "24px", xs: "16px" },
                  }}
                >
                  {open ? "Add Address" : "My Address"}
                </Typography>
                <Button
                  onClick={handleOpen}
                  variant="contained"
                  sx={{ backgroundColor: "#bb1f2a", color: "#fff" }}
                >
                  Add Address
                </Button>
              </Box>
              <Formik
                initialValues={initialValues || {}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  addNewAddress(values);
                }}
                enableReinitialize
              >
             {({
  handleChange,
  handleBlur,
  handleSubmit,
  values,
  errors,
  touched,
  isValid,
}) => {
  return (
    <>
      {open ? (
        <Box>
          <TextField
            name="name"
            value={initialValues.name}
            onChange={handleChange}
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: { sm: 2, xs: 0 },
            }}
          >
            <Grid container spacing={2}>
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

              <Grid item xs={7} sm={8}>
                <TextField
                  name="mobile_number"
                  value={values.mobile_number}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  label="Mobile Number"
                  error={touched.mobile_number && Boolean(errors.mobile_number)}
                  helperText={touched.mobile_number && errors.mobile_number}
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              alignItems: "center",
              gap: { sm: 2, xs: 0 },
            }}
          >
            <Grid container spacing={2}>
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
                    <MenuItem value={selectedCountry.code}>
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.name}
                        style={{
                          width: "23px",
                          height: "23px",
                          marginRight: "4px",
                        }}
                      />
                      {selectedCountry.code}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={7} sm={8}>
                <TextField
                  name="alternate_number"
                  value={values.alternate_number}
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  label="Whatsapp Number"
                  error={
                    touched.alternate_number && Boolean(errors.alternate_number) }
                  helperText={
                    touched.alternate_number && errors.alternate_number
                  }
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            name="email"
            value={values.email}

            onChange={handleChange}
            fullWidth
            label="Email"
            variant="outlined"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ my: 2 }}
          />

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
                  value={country.country_name}
                  sx={{
                    fontSize: 14,
                    ":hover": {
                      backgroundColor: "#bb1f2a",
                      color: "#fff",
                    },
                  }}
                >
                  {country.country_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Select
            disablePortal
            MenuProps={{ disableScrollLock: true }}
            fullWidth
            variant="outlined"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            {city?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.city_name}
              </MenuItem>
            ))}
          </Select>

          <Select
            disablePortal
            MenuProps={{ disableScrollLock: true }}
            fullWidth
            variant="outlined"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="Select City">Select Area</MenuItem>
            {area?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.area_name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            name="appartment"
            value={values.appartment}
            onChange={handleChange}
            type="number"
            fullWidth
            label="Apartment No."
            variant="outlined"
            sx={{ marginBottom: 2 }}
            error={touched.appartment && Boolean(errors.appartment)}
            helperText={touched.appartment && errors.appartment}
          />

          <TextField
            name="building"
            value={values.building}
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
            value={values.note}
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
              value={values.address}
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

          <FormControlLabel
            control={
              <Checkbox
                sx={{
                  "&.Mui-checked": {
                    color: "#bb1f2a",
                  },
                }}
              />
            }
            label="Set as Default Address"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleOpen}
              sx={{ color: "#bb1f2a", borderColor: "#bb1f2a" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => console.log(initialValues)}
              variant="contained"
              sx={{ backgroundColor: "#bb1f2a" }}
            >
              Save Address
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <hr />
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: { sm: "16px", xs: "16px" },
                }}
              >
                Country
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: { sm: "16px", xs: "16px" },
                }}
              >
                City
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: { sm: "16px", xs: "16px" },
                }}
              >
                Address
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: { sm: "16px", xs: "16px" },
                }}
              >
                Actions
              </Typography>
            </Box>
            <hr />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <Typography
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontSize: { sm: "16px", xs: "14px" },
                }}
              >
                United Arab Emirates
              </Typography>
              <Typography
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontSize: { sm: "16px", xs: "14px" },
                }}
              >
                Al Ain
              </Typography>
              <Typography
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontSize: { sm: "16px", xs: "14px" },
                }}
              >
                V3WW+9G Muhayriqah Saudi Arabia
              </Typography>
              <Typography
                sx={{
                  color: "#292b2c",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  textTransform: "capitalize",
                  fontSize: { sm: "16px", xs: "16px" },
                }}
              >
                <Typography
                  sx={{
                    borderRadius: "5px",
                    p: "5px",
                    backgroundColor: "#bb1f2a",
                    color: "#eee",
                    cursor: "pointer",
                  }}
                >
                  <MdEdit size={20} />
                </Typography>
                <Typography
                  sx={{
                    borderRadius: "5px",
                    p: "5px",
                    backgroundColor: "#bb1f2a",
                    color: "#eee",
                    cursor: "pointer",
                  }}
                >
                  <RiDeleteBin5Line size={20} />
                </Typography>
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}}



               
              </Formik>
            </Box>
            <MapDialog
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyAddress;
