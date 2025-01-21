import React, { useState, useEffect, useCallback } from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, Button, Dialog, DialogTitle, TextField, IconButton, DialogContent, FormControl, Select, MenuItem, FormControlLabel, Checkbox, InputAdornment } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MdEdit } from "react-icons/md";
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import MapDialog from './Map/MapDialog';
import { useSettingsStore } from '../store/useSettingsStore';
import { shippingApi } from '../utils/services/shippingApi';
import useLoaderStore from '../store/loaderStore';
import { useCountryStore } from '../store/useCountryStore';
import _ from 'lodash'; 

const MyAddress = () => {
  const [open, setOpen] = useState(false);
  const [dailog, setDailog] = useState(false);
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [area, setArea] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Select City");
  const [selectedArea, setSelectedArea] = useState("Select Area");
  const handleOpenDailog = () => setDailog(true);
  const handleCloseDailog = () => setDailog(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [initialValues, setInitialValues] = useState({
    name: "",
    mobile_number: "",
    alternate_number: "",
    email: "",
    appartment: "",
    building: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };




  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
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

  const debouncedGetArea = useCallback(_.debounce(getArea, 300), [selectedCity]);
  useEffect(() => {
    debouncedGetArea();
  }, [selectedCity]);


  const NewShhipingAddress = async () => {
    // useLoaderStore.getState().setLoading(true);
    try {
      let reqBody = {
        "country_id": selectedCountry?.id,
        "city_id": selectedCity,
        "area_id": selectedArea,
        "area": "",
        "address": "",
        "latitude": "",
        "longitude": "",
        "pincode": "",
        "appartment": initialValues.appartment,
        "building": initialValues.building,
        "note": initialValues.note,
        "name": initialValues.name,
        "mobile_number": initialValues.mobile_number,
        "alternate_number": initialValues.alternate_number,
        "email": initialValues.email,
        "is_default": "",
        "country_code": selectedCountry.code
      };

      const response = await shippingApi.addShippingAddress(reqBody);
      if (response && response?.status === 200) {
        // useLoaderStore.getState().setLoading(false);
        setData(response.data);
      }
    } catch (error) {
      console.log("Error fetching home data:-", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    NewShhipingAddress();
  };


  useEffect(() => {
    NewShhipingAddress();
  }, [selectedArea]);

  useEffect(() => {
    fetchCountries();
  }, []);

  // if (useLoaderStore.getState().isLoading || data === null) {
  //   return (
  //     <Loading />
  //   );
  // }



  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  return (
    <div style={{ minHeight: '100vh', }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb', py: { sm: "30px", xs: "15px" }, }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              My Address
            </Typography>
            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
                to="/"
              >
                Home
              </Link>
              {pathnames.map((segment, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                  <span
                    key={index}
                    style={{ color: '#6c757d', textTransform: "capitalize" }}
                  >
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link className='breadcrumbs-hover'
                    key={index}
                    style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }}
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
          {/* Sidebar */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <Dashboard selectItem={3} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: 10 }} xs={12} sm={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
                >
                  {open ? "Add Address" : "My Address"}
                </Typography>
                <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: "#bb1f2a", color: "#fff" }}>Add Address</Button>
              </Box>
              {
                open ? (
                  <Box sx={{}}>
                    <TextField name='name' value={initialValues.name} onChange={handleChange} fullWidth label="Name" variant="outlined" sx={{ marginBottom: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                      <Grid container spacing={2}>
                        {/* Select Country Code */}
                        <Grid item xs={5} sm={4}>
                          <FormControl fullWidth>
                            <Select
                              value={selectedCountry?.code || ""}
                              onChange={(event) => {
                                const selectedCountry = countries.find(
                                  (country) =>
                                    country.code === event.target.value
                                );
                                setSelectedCountry(selectedCountry);
                              }}
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
                              {countries.map((country, index) => (
                                <MenuItem key={index} value={country.code}>
                                  <img
                                    src={country.flag}
                                    alt={country.name}
                                    style={{
                                      width: "23px",
                                      height: "23px",
                                      marginRight: "4px",
                                    }}
                                  />
                                  {country.code}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Mobile Number Input */}
                        <Grid item xs={7} sm={8}>
                          <TextField name='mobile_number' value={initialValues.mobile_number} onChange={handleChange} fullWidth type="number" label="Mobile Number" required />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                      <Grid container spacing={2}>
                        {/* Select Country Code */}
                        <Grid item xs={5} sm={4}>
                          <FormControl fullWidth>
                            <Select
                              value={selectedCountry?.code || ""}
                              onChange={(event) => {
                                const selectedCountry = countries.find(
                                  (country) =>
                                    country.code === event.target.value
                                );
                                setSelectedCountry(selectedCountry);
                              }}
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
                              {countries.map((country, index) => (
                                <MenuItem key={index} value={country.code}>
                                  <img
                                    src={country.flag}
                                    alt={country.name}
                                    style={{
                                      width: "23px",
                                      height: "23px",
                                      marginRight: "4px",
                                    }}
                                  />
                                  {country.code}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Mobile Number Input */}
                        <Grid item xs={7} sm={8}>
                          <TextField name='alternate_number' value={initialValues.alternate_number} onChange={handleChange} fullWidth type="number" label="Whatsapp Number" required />
                        </Grid>
                      </Grid>
                    </Box>
                    <TextField name='email' value={initialValues.email} onChange={handleChange} fullWidth label="Email" variant="outlined" sx={{ my: 2 }} />
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
                        sx={{ marginBottom: 2 }} >
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
                      sx={{ marginBottom: 2 }} >
                      <MenuItem value="Select City">Select City</MenuItem>
                      {city && city?.map((item) => (
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
                      sx={{ marginBottom: 2 }} >
                      <MenuItem value="Select City">Select Area</MenuItem>
                      {area && area?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.area_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField name='appartment' value={initialValues.appartment} onChange={handleChange} type="number" fullWidth label="Apartment No." variant="outlined" sx={{ marginBottom: 2 }} />
                    <TextField name='building' value={initialValues.building} onChange={handleChange} fullWidth label="Building No." variant="outlined" sx={{ marginBottom: 2 }} />
                    <TextField name='note' value={initialValues.note} onChange={handleChange} fullWidth label="Note" variant="outlined" sx={{ marginBottom: 2 }} />
                    <Box>
                      <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        sx={{ marginBottom: 2 }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment onClick={handleOpenDailog} sx={{ cursor: "pointer", }} position="end">
                              <LocationOnIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    {/* google maps dailog */}
                    {
                      dailog ? (
                        <MapDialog dailog={dailog} handleCloseDailog={handleCloseDailog} />
                      ) : (
                        ""
                      )
                    }

                    <FormControlLabel
                      control={<Checkbox sx={{
                        "&.Mui-checked": {
                          color: "#bb1f2a",
                        },
                      }} />}
                      label="Set as Default Address"
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={handleOpen}
                        sx={{ color: '#bb1f2a', borderColor: '#bb1f2a' }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit}
                        variant="contained"
                        sx={{ backgroundColor: '#bb1f2a' }}
                      >
                        Save Address
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <hr />
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                          Country
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                          City
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                          Address
                        </Typography>

                        <Typography variant="h6" sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '16px', xs: '16px' } }} >
                          Actions
                        </Typography>
                      </Box>
                      <hr />
                      <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}>
                        <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                          United Arab Emirates
                        </Typography>
                        <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                          Al Ain
                        </Typography>
                        <Typography sx={{ color: '#292b2c', textTransform: 'capitalize', fontSize: { sm: '16px', xs: '14px' } }} >
                          V3WW+9G Muhayriqah Saudi Arabia
                        </Typography>
                        <Typography sx={{ color: '#292b2c', display: "flex", alignItems: "center", gap: "10px", textTransform: 'capitalize', fontSize: { sm: '16px', xs: '16px' } }} >
                          <Typography sx={{ borderRadius: "5px", p: "5px", backgroundColor: "#bb1f2a", color: "#eee", cursor: "pointer" }}>
                            <MdEdit size={20} />
                          </Typography>
                          <Typography sx={{ borderRadius: "5px", p: "5px", backgroundColor: "#bb1f2a", color: "#eee", cursor: "pointer" }}>
                            <RiDeleteBin5Line size={20} />
                          </Typography>
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )
              }
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div >
  );
};

export default MyAddress;