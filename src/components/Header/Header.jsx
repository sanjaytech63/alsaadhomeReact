import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Container,
} from "@mui/material";
import Login from "../../auth/Login/Login.jsx";
import Register from "../../auth/Register/Register.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useCountryStore } from "../../store/useCountryStore.js";
import Loading from "../Loading.jsx";

const Header = () => {
  const [language, setLanguage] = useState("en");
  const [country, setCountry] = useState("United Arab Emirates");
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const { countries, loading, fetchCountries } = useCountryStore();

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.direction = language === "ar" ? "rtl" : "ltr";
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
  }, [fetchCountries]);

 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ borderBottom: "1px solid #eee" }} className="w-100 ">
        <Container>
          <div className="row align-items-center">
            <div
              className={`header_left_sec col-9 d-flex ${language === "ar"
                ? "justify-content-start"
                : "justify-content-start"
                }`}
            >
              <FormControl>
                <Select
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                  value={language}
                  onChange={handleLanguageChange}
                  variant="outlined"
                  defaultValue="en"
                  sx={{
                    border: "none",
                    textOverflow: "inherit",
                    overflow: 'hidden',
                    overflow: 'hidden',
                    width: '50px',
                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                    ".MuiSelect-select": { padding: "10px 0", fontSize: "14px" },
                  }}
                >
                  <MenuItem sx={{ fontSize: "14px" }} value="en">
                    EN
                  </MenuItem>
                  <MenuItem sx={{ fontSize: "14px" }} value="ar">
                    AR
                  </MenuItem>
                </Select>
              </FormControl>
              {/* Country Dropdown */}
              <FormControl>
                <Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  displayEmpty
                  sx={{
                    border: "none",
                    textOverflow: "inherit",
                    overflow: "hidden",
                    width: "auto",
                    minWidth: "170px",
                   
                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                    ".MuiSelect-select": { padding: "10px 0", fontSize: "14px" },
                  }}
                >
                  {countries.map((c) => (
                    <MenuItem value={c.country_name}
                      key={c.id}
                      sx={{
                        fontSize: "14px",
                        ":hover": {
                          backgroundColor: "#bb1f2a",
                          color: "#fff",
                        },
                      }}
                    >
                      {c.country_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

            </div>
            <div
              className={`col-3 ${language === "ar" ? "text-start" : "text-end"
                }`}
            >
              <Button
                onClick={handleOpenLogin}
                variant
                sx={{
                  color: "#2b2f4c",
                  textTransform: "capitalize",
                  fontSize: { sm: "14px", xs: "14px" },
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
              />
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Header;
