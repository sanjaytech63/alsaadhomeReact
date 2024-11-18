import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, Button, Container } from '@mui/material';
import Login from '../../auth/Login/Login.jsx';
import Register from '../../auth/Register/Register.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Header = () => {
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('United Arab Emirates');
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.direction = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const theme = createTheme({
    direction: language === 'ar' ? 'rtl' : 'ltr',
    typography: {
      fontFamily: language === 'ar' ? 'Tajawal, sans-serif' : 'Roboto, sans-serif',
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ borderBottom: "1px solid #eee" }} className="w-100 ">
        <Container>
          <div className="row align-items-center">
            <div className={`header_left_sec col-9 d-flex ${language === 'ar' ? 'justify-content-start' : 'justify-content-start'}`}>
              <FormControl>
                <Select
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                  value={language}
                  onChange={handleLanguageChange}
                  variant="outlined"
                  defaultValue="en"
                  sx={{
                    border: 'none',
                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                      padding: "13px 0px",
                      fontSize: "14px",
                      color: "#333",
                    },
                  }}
                >
                  <MenuItem sx={{ alignItems: "center", fontSize: "14px" }} value="en">
                    <img
                      style={{ maxWidth: "20px", height: "16px", marginRight: "10px" }}
                      src="https://al-saad-home.mo.cloudinary.net/assets/front/images/english.svg"
                      alt="flag-icon"
                    />
                    EN
                  </MenuItem>
                  <MenuItem sx={{ alignItems: "center", fontSize: "14px" }} value="ar">
                    <img
                      style={{ maxWidth: "20px", height: "14px", marginRight: "10px" }}
                      src="https://al-saad-home.mo.cloudinary.net/assets/front/images/united-arab-emirates.png"
                      alt="flag-icon"
                    />
                    AR
                  </MenuItem>
                </Select>
              </FormControl>

              <div>
                <FormControl>
                  <Select
                    value={country}
                    inputProps={{ MenuProps: { disableScrollLock: true } }}
                    onChange={handleCountryChange}
                    variant="outlined"
                    sx={{
                      border: 'none',
                      ".MuiSelect-select": {
                        padding: "13px 0px",
                        fontSize: "14px",
                        color: "#333",
                      },
                      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="Oman">Oman</MenuItem>
                    <MenuItem value="United Arab Emirates">United Arab</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={`col-3 ${language === 'ar' ? 'text-start' : 'text-end'}`}>
              <Button
                onClick={handleOpenLogin}
                variant
                sx={{
                  color: '#2b2f4c',
                  textTransform: "capitalize",
                  fontSize: { sm: "14px", xs: "14px" },
                  ":hover": {
                    color: '#bb1f2a',
                    background: '#fff',
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
