import React, { useEffect } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import useUserStore from "../store/user";
import { useSettingsStore } from "../store/useSettingsStore";
import { Formik } from "formik";
import * as Yup from "yup";
import { userService } from "../utils/services/userServices";
import { showToast } from "../utils/helper";

const AccountDeatils = () => {
  const { setUserInfo, userInfo } = useUserStore();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    country_code: Yup.string().required("Country code is required"),
  });

  const getUserInfo = async () => {
    try {
      const response = await userService.profile();
      if (response && response.status === 200) {
        let data = { ...userInfo, ...response.data };
        setUserInfo(data);
      } else {
        showToast("error", response.message, "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const updateProfile = async (values) => {
    const request = {
      name: values.name,
      email: values.email,
      phone: values.phone.toString(),
      country_code: values.country_code,
    }
    try {
      const response = await userService.updateUserProfile(request);
      if (response && response.status === 200) {
        showToast("success", response.message, "success");
        const data = { ...userInfo, ...response.data };
        setUserInfo(data);
      } else{
        showToast("error", response.message, "danger");
      }
    } catch (error) {
      console.log('error in update profile:-',error)
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: "#f7f8fb", py: "30px" }}>
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
              Account Deatils
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
          {/* Sidebar */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: "white", boxShadow: 1 }}>
              <Dashboard selectItem={4} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Formik
              initialValues={{
                name: userInfo?.name,
                phone: userInfo?.phone?.toString(),
                email: userInfo?.email,
                country_code: userInfo?.country_code,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => updateProfile(values)}
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
                  <Box
                    sx={{
                      bgcolor: "white",
                      p: 3,
                      borderRadius: 1,
                      boxShadow: 1,
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
                      Account details
                    </Typography>
                    <hr />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            focused
                            fullWidth
                            label="Your Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            focused
                            fullWidth
                            label="Enter Your Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            required
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        my: 2,
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{ flexDirection: { xs: "column", sm: "row" } }}
                      >
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth>
                            <Select
                              value={
                                useSettingsStore.getState().selectedCountry
                                  ?.code
                              }
                              disablePortal
                              MenuProps={{ disableScrollLock: true }}
                              fullWidth
                              variant="outlined"
                              defaultValue="Select Country Code"
                              sx={{
                                padding: "2px 4px",
                                border: "1px solid #ccc",
                                ".MuiOutlinedInput-notchedOutline": {
                                  border: "none",
                                },
                                ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                                  {
                                    padding: "13px 0px",
                                    fontSize: "14px",
                                    color: "#333",
                                  },
                              }}
                            >
                              <MenuItem
                                sx={{ fontSize: "14px", color: "#333" }}
                                value={
                                  useSettingsStore.getState().selectedCountry
                                    ?.code
                                }
                              >
                                <img
                                  style={{
                                    width: "23px",
                                    height: "23px",
                                    marginRight: "4px",
                                  }}
                                  src={
                                    useSettingsStore.getState().selectedCountry
                                      ?.flag
                                  }
                                  alt={
                                    useSettingsStore.getState().selectedCountry
                                      ?.name
                                  }
                                />
                                {
                                  useSettingsStore.getState().selectedCountry
                                    ?.code
                                }
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                          <TextField
                            focused
                            fullWidth
                            type="number"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            label="Enter Mobile Number"
                            required
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Button
                    onClick={handleSubmit}
                      variant="contained"
                      sx={{
                        color: "#fff",
                        backgroundColor: "#bb1f2a",
                        py: 1.5,
                        px: 4,
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                );
              }}
            </Formik>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountDeatils;
