import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import OtpDialog from "./OtpDialog";

const ForgotPasswordModal = ({
  open,
  handleClose,
  handleOpenLogin,
  countries,
  selectedCountry,
  setSelectedCountry,
  handleForgotPassword,
}) => {

  const switchToRegister = () => {
    handleOpenLogin();
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenOtp = () => setIsDialogOpen(true);
  const handleCloseOtp = () => setIsDialogOpen(false);

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
  });

  return (
    <>
      <Modal
        disableScrollLock
        sx={{ overflowY: "auto", maxHeight: "100vh", pb: "50px" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="forgot-password-title"
        aria-describedby="forgot-password-description"
      >
        <div>
          <Formik
            initialValues={{
              email: "",
              phone: "",
              countryCode: selectedCountry?.code,
              isEmail: true,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleForgotPassword(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => {
              return (
                <Box
                  sx={{
                    width: { xs: "95%", sm: "50%", lg: "40%" },
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
                    >
                      Forgot Password
                    </Typography>
                    <Close
                      onClick={handleClose}
                      sx={{ cursor: "pointer", margin: "20px" }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {values?.isEmail ? (
                      <Grid item xs={12} sm={12}>
                        <Typography
                          sx={{ fontSize: { sm: "16px", xs: "14px" }, mb: 2 }}
                          color="#6c757d"
                        >
                          {" "}
                          E-Mail
                        </Typography>
                        <TextField
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          fullWidth
                          label="E-Email"
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
                            mt: 2,
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
                            <OtpDialog open={isDialogOpen} onClose={handleCloseOtp} />
                          </Grid>
                        </Box>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography
                        onClick={() =>
                          setFieldValue("isEmail", !values.isEmail)
                        }
                        sx={{
                          fontSize: {
                            sm: "16px",
                            xs: "14px",
                            textAlign: "right",
                          },
                          cursor: "pointer",
                        }}
                        color="#bb1f2a"
                      >
                        Use another option
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={() => {
                          handleSubmit();
                          handleOpenOtp();
                        }}
                        fullWidth
                        variant="contained"
                        sx={{
                          px: 4,
                          py: 1.5,
                          background: "#bb1f2a",
                          color: "#fff",
                        }}
                      >
                        {values?.isEmail ? "Submit" : "Send OTP"}
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
                      }}
                    >
                      <Typography variant="body2" color="#6c757d">
                        Already have an account?
                        <span
                          onClick={switchToRegister}
                          style={{
                            cursor: "pointer",
                            color: "#bb1f2a",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
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
    </>
  );
};

export default ForgotPasswordModal;
