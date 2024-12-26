import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "../../auth/Login/Login.jsx";
import Register from "../../auth/Register/Register.jsx";
import { useCountryStore } from "../../store/useCountryStore.js";
import { useSettingsStore } from "../../store/useSettingsStore.js";

const Header = () => {
  const [language, setLanguage] = useState("en");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { countries, fetchCountries } = useCountryStore();

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleLanguageChange = (event) => setLanguage(event.target.value);

  const selectedCountry = useSettingsStore((state) => state.selectedCountry);
  const setSelectedCountry = useSettingsStore(
    (state) => state.setSelectedCountry
  );

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
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
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
                  <Login
                    open={openLogin}
                    handleOpenRegister={handleOpenRegister}
                    handleOpenLogin={handleOpenLogin}
                    handleClose={handleCloseLogin}
                    handleCloseRegister={handleCloseRegister}
                  />
                  <Register
                    open={openRegister}
                    handleOpenLogin={handleOpenLogin}
                    handleClose={handleCloseRegister}
                    countries={countries}
                    selectedCountry={selectedCountry}
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
