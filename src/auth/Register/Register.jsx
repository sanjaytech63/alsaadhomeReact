import React from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
const Register = ({
  handleClose,
  open,
  handleOpenLogin,
  countries,
  selectedCountry,
  setSelectedCountry,
  handleRegister,
}) => {
  const switchToLogin = () => {
    handleClose();
    handleOpenLogin();
  };

  const navigate = useNavigate();

  const navigateToTermsCondactions = () => {
    navigate("/terms-of-use");
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    phone: Yup.string().required("Phone number is required"),
    countryCode: Yup.string().required("Country code is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    name: Yup.string().required("Name is required"),
  });

  return (
    <div style={{}}>
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
              confirm_password: "",
              phone: "",
              countryCode: selectedCountry?.code ?? "",
              name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleRegister(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              resetForm,
              setFieldValue,
            }) => {
              return (
                <Box
                  sx={{
                    width: { xs: "95%", sm: "80%", md: "60%", lg: "40%" },
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    my: 2,
                    px: { xs: 2, sm: 4 },
                    py: 2,
                    mx: "auto",
                    mt: "2%",
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
                      Create an Account
                    </Typography>
                    <Close
                      sx={{ cursor: "pointer", margin: "20px" }}
                      onClick={handleClose}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                        variant="body2"
                        color="#6c757d"
                      >
                        Your Name
                      </Typography>
                      <TextField
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
                    <Grid item xs={12} sm={12}>
                      <Typography
                        sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                        variant="body2"
                        color="#6c757d"
                      >
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
                              onChange={handleChange}
                              error={touched.phone && Boolean(errors.phone)}
                              helperText={touched.phone && errors.phone}
                              required
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                        variant="body2"
                        color="#6c757d"
                      >
                        Enter Your Email
                      </Typography>
                      <TextField
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
                    <Grid item xs={12} sm={12}>
                      <Typography
                        sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                        variant="body2"
                        color="#6c757d"
                      >
                        Password
                      </Typography>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        sx={{ fontSize: { sm: "16px", xs: "14px" } }}
                        variant="body2"
                        color="#6c757d"
                      >
                        Confirm Password
                      </Typography>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        error={
                          touched.confirm_password &&
                          Boolean(errors.confirm_password)
                        }
                        helperText={
                          touched.confirm_password && errors.confirm_password
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Checkbox
                          sx={{
                            "&.Mui-checked": {
                              color: "#bb1f2a",
                            },
                          }}
                        />
                        <Typography
                          onClick={navigateToTermsCondactions}
                          sx={{
                            fontSize: { sm: "16px", xs: "14px" },
                            cursor: "pointer",
                          }}
                        >
                          I agree to terms & Policy.
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: "#bb1f2a",
                          color: "#fff",
                        }}
                      >
                        Register
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="#6c757d">
                        Already have an account?
                        <span
                          onClick={switchToLogin}
                          style={{
                            cursor: "pointer",
                            color: "#bb1f2a",
                            fontWeight: "bold",
                          }}
                        >
                          Log in
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

export default Register;
