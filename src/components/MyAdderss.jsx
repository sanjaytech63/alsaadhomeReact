import React, { useState, useEffect } from 'react';
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
import { checkOutServices } from '../utils/services/checkOutServices';
import useLoaderStore from '../store/loaderStore';
import Loading from './Loading';
const MyAddress = () => {
  const [open, setOpen] = useState(false);
  const [dailog, setDailog] = useState(false);
  const [data, setData] = useState(null);
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
    address: "",
    appartment: "",
    building: "",
    pincode: "",
    area: "",
    country_code: "",
    country_id: 2,
    city_id: 1,
    area_id: "50",
    is_default: false,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const handleLocationChange = (latLng) => {
    setCurrentLocation(latLng);
  };




  const NewShhipingAddress = async () => {
    // useLoaderStore.getState().setLoading(true);
    
    try {
      let reqBody = {
        "country_id": 2,
        "city_id": 10,
        "area_id": "2648",
        "area": "new",
        "address": "Sha Uae",
        "latitude": "",
        "longitude": "",
        "pincode": "",
        "appartment": "2",
        "building": "2",
        "note": "2",
        "name": "Prahlad Parasara",
        "mobile_number": "89550956",
        "alternate_number": "963963963",
        "email": "kumharprahlad90@gmail.com",
        "is_default": "1",
        "country_code": "+971"
      };
      const response = await checkOutServices.addNewShippingAddress(reqBody);
      if (response && response?.status === 200) {
        // useLoaderStore.getState().setLoading(false);
        console.log(response.data);

        setData(response.data);
      }
    } catch (error) {
      console.log("Error fetching home data:-", error);
    }
  };

  useEffect(() => {
    NewShhipingAddress();
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
                    <TextField fullWidth label="Name" variant="outlined" sx={{ marginBottom: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: { sm: 2, xs: 0 } }}>
                      <Grid container spacing={2}>
                        {/* Select Country Code */}
                        <Grid item xs={5} sm={4}>
                          <FormControl fullWidth>
                            <Select disablePortal
                              MenuProps={{ disableScrollLock: true }}
                              value={""}
                              onChange={""}
                              variant="outlined"
                              sx={{
                                padding: '2px 4px',
                                border: '1px solid #ccc',
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                ".MuiSelect-select": {
                                  padding: "13px 0px",
                                  fontSize: "14px",
                                  color: "#333",
                                },
                              }}
                            >
                              <MenuItem value="Select Country Code" disabled hidden>
                                Select Country
                              </MenuItem>
                              <MenuItem value="+ 971">
                                <img
                                  src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                  alt="UAE"
                                  style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                />
                                + 971
                              </MenuItem>
                              <MenuItem value="+ 968">
                                <img
                                  src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                  alt="Oman"
                                  style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                />
                                + 968
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Mobile Number Input */}
                        <Grid item xs={7} sm={8}>
                          <TextField fullWidth type="number" label="Mobile Number" required />
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
                              value={""}
                              onChange={""}
                              variant="outlined"
                              sx={{
                                border: '1px solid #ccc',
                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                              }}
                            >
                              <MenuItem value="Select Country Code" disabled hidden>
                                Select Country
                              </MenuItem>
                              <MenuItem value="+ 971">
                                <img
                                  src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                  alt="UAE"
                                  style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                />
                                + 971
                              </MenuItem>
                              <MenuItem value="+ 968">
                                <img
                                  src="https://al-saad-home.mo.cloudinary.net/uploads/countries/1609425118.png"
                                  alt="Oman"
                                  style={{ width: "23px", height: "23px", marginRight: "4px" }}
                                />
                                + 968
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        {/* Mobile Number Input */}
                        <Grid item xs={7} sm={8}>
                          <TextField fullWidth type="number" label="Whatsapp Number" required />
                        </Grid>
                      </Grid>
                    </Box>
                    <TextField fullWidth label="Email" variant="outlined" sx={{ my: 2 }} />
                    <Select disablePortal
                      MenuProps={{ disableScrollLock: true }} fullWidth variant="outlined" defaultValue="Select Country" sx={{ marginBottom: 2 }}>
                      <MenuItem value="Select Country">Select City</MenuItem>
                      <MenuItem value="uae">United Arab Emirates</MenuItem>
                    </Select>
                    <Select disablePortal
                      MenuProps={{ disableScrollLock: true }} fullWidth variant="outlined" defaultValue="Select Country" sx={{ marginBottom: 2 }}>
                      <MenuItem value="Select Country">Select Country</MenuItem>
                      <MenuItem value="dubai">Dubai</MenuItem>
                    </Select>
                    <TextField fullWidth label="Appartment No." variant="outlined" sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="Building No." variant="outlined" sx={{ marginBottom: 2 }} />
                    <TextField fullWidth label="Note" variant="outlined" sx={{ marginBottom: 2 }} />
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
                      <Button
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