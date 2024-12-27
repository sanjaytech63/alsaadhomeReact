import React from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import { userService } from "../utils/services/userServices";
import useUserStore from "../store/user";
import * as Yup from "yup";
import { showToast } from "../utils/helper";
import { Formik } from "formik";

const ChangePassword = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .min(6, "Old Password must be at least 6 characters long")
      .required("Old password is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handlePasswordChange = async (value) => {
    const request = {
      user_id: useUserStore.getState().userInfo.id,
      old_password: value.old_password,
      password: value.password,
      confirm_password: value.confirm_password,
    };
    try {
      const response = await userService.resetPassword(request);
      if (response && response.status === 200) {
        showToast("success", response.message, "success");
      } else {
        showToast("error", response.message, "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Header Section */}
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
              Change Password
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
          {/* Sidebar */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: "white", boxShadow: 1 }}>
              <Dashboard selectItem={6} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Box sx={{ bgcolor: "white", p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: { sm: "24px", xs: "16px" },
                }}
              >
                Change Password
              </Typography>
              <hr />
              <Formik
                initialValues={{
                  old_password: "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(value) => handlePasswordChange(value)}
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
                    <Box>
                      <TextField
                        sx={{ my: 1.5 }}
                        fullWidth
                        label="Old Password"
                        name="old_password"
                        value={values.old_password}
                        onChange={handleChange}
                        error={
                          touched.old_password && Boolean(touched.old_password)
                        }
                        helperText={touched.old_password && errors.old_password}
                        required
                      />
                      <TextField
                        sx={{ my: 1.5 }}
                        fullWidth
                        label="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(touched.password)}
                        helperText={touched.password && errors.password}
                        required
                      />
                      <TextField
                        sx={{ my: 1.5 }}
                        fullWidth
                        label="Confirm Password"
                        name="confirm_password"
                        value={values.confirm_password}
                        onChange={handleChange}
                        error={
                          touched.confirm_password &&
                          Boolean(touched.confirm_password)
                        }
                        helperText={
                          touched.confirm_password && errors.confirm_password
                        }
                        required
                      />
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
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ChangePassword;
