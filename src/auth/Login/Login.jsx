import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import AppleIcon from "@mui/icons-material/Apple";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = ({
  handleClose,
  open,
  handleOpenRegister,
  handleOpenLogin,
  handleCloseRegister,
  countries,
  selectedCountry,
  setSelectedCountry,
  handleLogin,
  handleGoogleSignIn,
  handleForgotPassword,
}) => {
  const switchToRegister = () => {
    handleClose();
    handleOpenRegister();
  };

  const handleForgot = () => {
    handleClose();
    handleCloseRegister();
    handleForgotPassword();
  };

  const validationSchema = Yup.object({
    isEmail: Yup.boolean(),
    email: Yup.string().when("isEmail", ([isEmail], schema) => {
      if (isEmail)
        return Yup.string()
          .email("Invalid email address")
          .required("Email is required");
      return schema.notRequired();
    }),
    phone: Yup.string().when("isEmail", ([isEmail], schema) => {
      if (!isEmail) return Yup.string().required("Phone number is required");
      return schema.notRequired();
    }),
    countryCode: Yup.string().when("isEmail", ([isEmail], schema) => {
      if (!isEmail) return Yup.string().required("Country code is required");
      return schema.notRequired();
    }),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
  });

  return (
    <div>
      <Modal
        disableScrollLock
        sx={{ overflowY: "auto", maxHeight: "100vh", pb: "50px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Formik
            initialValues={{
              isEmail: true,
              email: "",
              password: "",
              phone: "",
              countryCode: selectedCountry?.code,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleLogin(values)}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => {
              return (
                <Box
                  sx={{
                    width: { xs: "95%", sm: "50%", md: "50%", lg: "40%" },
                    my: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    px: { xs: 2, sm: 4 },
                    py: 2,
                    mx: "auto",
                    mt: "4%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { sm: "20px", xs: "16px" },
                        fontWeight: 600,
                      }}
                      component="h2"
                      gutterBottom
                    >
                      Login
                    </Typography>
                    <Close
                      sx={{ cursor: "pointer", margin: "20px" }}
                      onClick={handleClose}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {values?.isEmail ? (
                      <Grid item xs={12} sm={12}>
                        <Typography
                          sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                          color="#6c757d"
                        >
                          {" "}
                          Email
                        </Typography>
                        <TextField
                          type="email"
                          fullWidth
                          label="Enter Email"
                          name="email"
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          onChange={handleChange}
                          value={values.email}
                          required
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12}>
                        <Typography
                          sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                          variant="body2"
                          color="#6c757d"
                        >
                          {" "}
                          Mobile Number
                        </Typography>
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
                            <Grid item xs={7} sm={8}>
                              <TextField
                                fullWidth
                                label="Mobile Number"
                                name="phone"
                                value={values.phone}
                                error={touched.phone && Boolean(errors.phone)}
                                helperText={touched.phone && errors.phone}
                                onChange={handleChange}
                                required
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12} sm={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                          color="#6c757d"
                        >
                          {" "}
                          Password
                        </Typography>
                        <Typography
                          onClick={() =>
                            setFieldValue("isEmail", !values.isEmail)
                          }
                          sx={{
                            fontSize: {
                              sm: "16px",
                              xs: "14px",
                              cursor: "pointer",
                            },
                          }}
                          color="#bb1f2a"
                        >
                          {values?.isEmail
                            ? "Login by Mobile Number"
                            : "Login by Email"}{" "}
                        </Typography>
                      </Box>
                      <TextField
                        type="password"
                        name="password"
                        value={values.password}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        onChange={handleChange}
                        fullWidth
                        label="Enter Password"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
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
                          label="Remember me"
                        />
                        <Typography
                          onClick={() => {
                            handleForgot();
                          }}
                          sx={{
                            fontSize: {
                              sm: "16px",
                              xs: "14px",
                              cursor: "pointer",
                            },
                          }}
                          variant="body2"
                          color="#6c757d"
                        >
                          {" "}
                          Forgot Password
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: "#bb1f2a",
                          color: "#fff",
                        }}
                      >
                        Login
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <div className="d-flex align-items-center justify-content-space-between gap-2">
                        <span
                          style={{
                            backgroundColor: "#ddd",
                            height: "1px",
                            width: "100%",
                          }}
                        ></span>
                        <span style={{ color: "#687188" }}>OR</span>
                        <span
                          style={{
                            backgroundColor: "#ddd",
                            height: "1px",
                            width: "100%",
                          }}
                        ></span>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#3b5998",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleGoogleSignIn("facebook");
                        }}
                      >
                        <FaFacebookF color="#fff" />
                      </div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#fff",
                          borderRadius: "50%",
                          boxShadow: "0 0 10px rgb(0 0 0 / 20%)",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleGoogleSignIn("google");
                        }}
                      >
                        <img
                          src="https://al-saad-home.mo.cloudinary.net/assets/front/images/google-logo.png"
                          loading="lazy"
                          alt="google-login"
                        />
                      </div>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: "#000",
                          borderRadius: "50%",
                          cursor: "pointer",
                        }}
                      >
                        <AppleIcon sx={{ fontSize: "30px", color: "#fff" }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        my: 1,
                      }}
                    >
                      <Typography variant="body2" color="#6c757d">
                        {" "}
                        Don't have an account?
                        <span
                          onClick={switchToRegister}
                          style={{
                            cursor: "pointer",
                            color: "#bb1f2a",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          Sign up now
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
