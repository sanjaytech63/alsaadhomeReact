import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, Button,Container } from '@mui/material';
import Login from '../../auth/Login.jsx/Login';
import Register from '../../auth/Login.jsx/Register';

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


    if (language === 'ar') {
      body.style.direction = 'rtl';
    } else {
      body.style.direction = 'ltr';
    }


    return () => {
      body.style.backgroundColor = '';
    };
  }, [language]);
  return (
    <div style={{ borderBottom: "1px solid #ccc" }} className="w-100 py-2">
       <Container>
        <div className="row align-items-center">
          <div className="col-6 d-flex">
            <div className="">
              <FormControl>
                <Select
                  value={language}
                  onChange={handleLanguageChange}
                  variant="outlined"
                  sx={{
                    padding: '1px 4px',
                    border: 'none',
                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                      padding: "3.5px 0px",
                      fontSize: "14px",
                      color: "#333",
                    }
                  }}
                >
                  <MenuItem sx={{
                    fontSize: "14px",
                    color: "#333",
                  }} value="en">EN</MenuItem>
                  <MenuItem sx={{
                    fontSize: "14px",
                    color: "#333",
                  }} value="ar">AR</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <Select
                  value={country}
                  onChange={handleCountryChange}
                  variant="outlined"
                  sx={{
                    padding: '1px 4px',
                    border: 'none',
                    '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    ".css-15k6ek6-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input": {
                      padding: "3.5px 0px",
                      fontSize: "14px",
                      color: "#333",
                    }
                  }}
                >
                  <MenuItem sx={{
                    fontSize: "14px",
                    color: "#333",
                  }} value="Oman">Oman</MenuItem>
                  <MenuItem sx={{
                    fontSize: "14px",
                    color: "#333",
                  }} value="United Arab Emirates">United Arab Emirates</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col-6 text-end">
            <Button onClick={handleOpenLogin} sx={{
              color: 'black', fontWeight: 'bold',
              ":hover": {
                color: '#bb1f2a',
                background: '#fff'
              }
            }}>Login</Button>

            <Login
              open={openLogin}
              handleOpenRegister={handleOpenRegister}
              handleClose={handleCloseLogin}
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
  );
};

export default Header;
