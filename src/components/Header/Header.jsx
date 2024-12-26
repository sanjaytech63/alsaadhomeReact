import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "../../auth/Login/Login.jsx";
import Register from "../../auth/Register/Register.jsx";
import { useCountryStore } from "../../store/useCountryStore.js";
import { useSettingsStore } from "../../store/useSettingsStore.js";
import { showToast } from "../../utils/helper.js";
import {userService} from "../../utils/services/userServices.js";  
import { encryptData } from "../../utils/services/AlsaadRSA.js";
import useUserStore from "../../store/user.js";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, provider } from "../../utils/firebase.js";
import ForgotPasswordModal from "../../auth/Login/ForgotPasswordModal.jsx";
const Header = () => {
  const [language, setLanguage] = useState("en");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { countries, fetchCountries } = useCountryStore();
  const [openForgotPassword, setOpenForgotPassword] = useState(false);


  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);
  const handleForgotPassword = () => setOpenForgotPassword(true);

  const handleLanguageChange = (event) => setLanguage(event.target.value);

  const selectedCountry = useSettingsStore((state) => state.selectedCountry);
  const setSelectedCountry = useSettingsStore(
    (state) => state.setSelectedCountry
  );
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    document.body.style.direction = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const theme = createTheme({
    direction: language === "ar" ? "rtl" : "ltr",
    typography: {
      fontFamily:
        language === "ar" ? "Tajawal, sans-serif" : "Roboto, sans-serif",
    },
  });

  useEffect(() => {
    fetchCountries();
  }, []);



  const handleRegister = async (values) => {
    const encryptCPass = encryptData(values.confirm_password || "");
    const encryptPass =  encryptData(values.password || "");
    let request = {
      email: values.email,
      phone: values.phone,
      name: values.name,
      country_code: values.countryCode,
      password: encryptPass,
      confirm_password: encryptCPass,
      lang_type:'en',
    };

    try {
      let response = await userService.signUp(request);
      if (response && response.status === 200) {
        setOpenRegister(false);
        setUserInfo(response.data);
        showToast("success", response.message, "success");
      } else {
        console.log(response, 'response');
      }
    } catch (error) {
      showToast("error", error.message, "danger");
      console.log(error);
    } 
  };

  const handleLogin = async (values) => {
    const encrypted = encryptData(values.password || "");
    try {
      const request = {
      "email": values.isEmail ? values.email : values.phone,
      "password": encrypted,
      "lang_type": 'en',
      country_code: values.isEmail ? "" : values.countryCode,

      }
      const response = await userService.signIn(request);
      if(response && response.status === 200){
        setUserInfo(response.data);
        setOpenLogin(false);
        showToast("success", response.message, "success");
      } else {
        showToast("error", response.message, "danger");
        console.log('error', response);
      }
    } catch (error) {
      showToast("error", error.message, "danger");
    }
  }

 const handleGoogleSignIn = async (type) => {
   try {
     let result;
     if (type === "google") {
       result = await signInWithPopup(auth, provider);
     } else if (type === "facebook") {
       result = await signInWithPopup(auth, facebookProvider);
       console.log(result,'====');
     }

     if (!result) throw new Error("No result returned from sign-in");

     const user = result.user;
     const userId = user.uid;
     const encryptedToken = encryptData(userId);

     // Construct data payload
     const data = {
       name:
         user.displayName || result?.additionalUserInfo?.profile?.name || "",
       email: user.email || result?.additionalUserInfo?.profile?.email || "",
       phone: "", 
       social_id: encryptedToken,
       login_by: type,
       lang_type: "en",
       avatar:
         user.photoURL ||
         result?.additionalUserInfo?.profile?.picture?.data?.url ||
         "",
     };

     // Make the API call for social login
     const response = await userService.socialLogin(data);

     if (response && response.status === 200) {
       setOpenLogin(false);
       setUserInfo(response.data); 
       showToast("success", response.message, "success");
     } else {
       showToast("error", response?.message || "Failed to log in", "danger");
       console.error("Login API error:", response);
     }
   } catch (error) {
     console.error("Error during sign-in:", error.message);
     showToast(
       "error",
       error.message || "An error occurred during sign-in",
       "danger"
     );
   }
 };

 const sendOtp = async (phone, code, id) => {
   try {
     const encryptPhone = encryptData(phone || "");
     const encryptCode = code ? encryptData(code || "") : "";
     const req = {
       user_id: id,
       phone: encryptPhone?.toString(),
       type: "phone",
       country_code: encryptCode,
     };
     const res = await userService.sendOtp(req);
     if (res && res?.status === 200) {
       setOpenForgotPassword(false);
       showToast("success", res?.message, "success");
     } else {
       showToast("error", res?.message, "danger");
     }
   } catch (error) {
     console.error("Error sending OTP:", error);
   }
 };


const handleForgotPass = async(values) => {
  try {
    let request = {
      phone: values.isEmail ? values.email : values.phone,
      type: values.isEmail ? "email" : "phone",
      country_code: values.isEmail ? "" : values.countryCode,
    };
    let response = await userService.forgotPassword(request);
    if(response && response.status === 200){
      if(!values.isEmail){
        sendOtp(values.phone, values.countryCode, response.data.user_id);
      } else {
        setOpenForgotPassword(false);
        showToast("success", response.message, "success");
      }
      
    } else {
      showToast("error", response.message, "danger");
      console.log('error msg:-', response);
    }
  } catch (error) {
    showToast("error", error.message, "danger");
  }
}


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ borderBottom: "1px solid #eee", width: "100%" }}>
        <Container maxWidth="lg" sx={{ px: "0 !important" }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ px: 2 }}>
              <Grid container alignItems="center">
                <Grid
                  item
                  xs={9}
                  sx={{
                    display: "flex",
                    justifyContent:
                      language === "ar" ? "flex-start" : "flex-start",
                  }}
                >
                  <FormControl sx={{ mr: 2 }}>
                    <Select
                      disablePortal
                      MenuProps={{ disableScrollLock: true }}
                      value={language}
                      onChange={handleLanguageChange}
                      sx={{
                        border: "none",
                        textOverflow: "inherit",
                        overflow: "hidden",
                        width: 50,
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        ".MuiSelect-select": {
                          padding: "10px 0",
                          fontSize: 14,
                        },
                      }}
                    >
                      <MenuItem sx={{ fontSize: 14 }} value="en">
                        EN
                      </MenuItem>
                      <MenuItem sx={{ fontSize: 14 }} value="ar">
                        AR
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <Select
                      disablePortal
                      MenuProps={{ disableScrollLock: true }}
                      value={selectedCountry?.country_name || ""}
                      onChange={(event) => {
                        const selectedCountry = countries.find(
                          (country) =>
                            country.country_name === event.target.value
                        );
                        setSelectedCountry(selectedCountry);
                      }}
                      displayEmpty
                      sx={{
                        border: "none",
                        textOverflow: "inherit",
                        overflow: "hidden",
                        minWidth: 170,
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        ".MuiSelect-select": {
                          padding: "10px 0",
                          fontSize: 14,
                        },
                      }}
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
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: language === "ar" ? "start" : "end",
                  }}
                >
                  {useUserStore.getState().isLoggedIn ? (
                    <Typography>
                      {useUserStore.getState().userInfo?.name}
                    </Typography>
                  ) : (
                    <Button
                      onClick={handleOpenLogin}
                      variant="text"
                      sx={{
                        color: "#2b2f4c",
                        textTransform: "capitalize",
                        fontSize: 14,
                        ":hover": {
                          color: "#bb1f2a",
                          background: "#fff",
                        },
                      }}
                    >
                      Login
                    </Button>
                  )}
                  <Login
                    open={openLogin}
                    handleOpenRegister={handleOpenRegister}
                    handleOpenLogin={handleOpenLogin}
                    handleClose={handleCloseLogin}
                    handleCloseRegister={handleCloseRegister}
                    countries={countries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    handleLogin={handleLogin}
                    handleGoogleSignIn={handleGoogleSignIn}
                    handleForgotPassword={handleForgotPassword}
                  />
                  <Register
                    open={openRegister}
                    handleOpenLogin={handleOpenLogin}
                    handleClose={handleCloseRegister}
                    countries={countries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    handleRegister={handleRegister}
                  />
                  <ForgotPasswordModal
                    open={openForgotPassword}
                    handleClose={() => setOpenForgotPassword(false)}
                    handleOpenLogin={handleOpenLogin}
                    // handleCloseLogin={handleCloseLogin}
                    countries={countries}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    handleForgotPassword={handleForgotPass}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
