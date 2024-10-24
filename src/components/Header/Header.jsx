import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, Button, Container } from '@mui/material';
import Login from '../../auth/Login.jsx/Login';
import Register from '../../auth/Register/Register.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../auth/RegisterEndPoint';

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('United Arab Emirates');
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

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

  const userLogout = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      toast.error("Unauthorized request. Please log in again.", { containerId: 'login' });
      return;
    }

    try {
      // Attach the token to the Authorization header
      const response = await axiosInstance.post(`/logout`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      if (response.data.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setToken(null);

        toast.success(response.data.message || "Logout successful.", { containerId: 'login' });
      } else {
        throw new Error("Logout failed.");
      }

    } catch (error) {

      console.error("Logout Error:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request. Please log in again.", { containerId: 'login' });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setToken(null);

      } else {
        toast.error("Failed to log out. Please try again.", { containerId: 'login' });
      }
    }
  };



  const loginUser = async (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required.", { containerId: 'login' });
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address.", { containerId: 'login' });
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(`/login`, formData);
      if (response.data.success) {
        handleCloseLogin();
        const { accessToken, refreshToken } = response.data.data;
        setToken(accessToken);
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

        toast.success(response.data.message, { containerId: 'login' });
        navigate('/');
        setFormData({
          email: "",
          password: "",
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || 'User does not exist.', { containerId: 'login' });
      } else {
        toast.error('Login failed, please try again.', { containerId: 'login' });
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ borderBottom: "1px solid #ccc" }} className="w-100 py-2">
        <Container>
          <div className="row align-items-center">
            <div className={`col-9 d-flex ${language === 'ar' ? 'justify-content-start' : 'justify-content-start'}`}>
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
                    },
                  }}
                >
                  <MenuItem sx={{ alignItems: "center", fontSize: "14px", }} value="en">
                    <img style={{ maxWidth: "20px", height: "16px", marginRight: "10px" }} src="https://al-saad-home.mo.cloudinary.net/assets/front/images/english.svg" alt="flag-icon" /> EN
                  </MenuItem>
                  <MenuItem sx={{ alignItems: "center", fontSize: "14px", }} value="ar">
                    <img style={{ maxWidth: "20px", height: "14px", marginRight: "10px" }} src="https://al-saad-home.mo.cloudinary.net/assets/front/images/united-arab-emirates.png" alt="flag-icon" /> AR
                  </MenuItem>
                </Select>
              </FormControl>
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
                      },
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
                onClick={token ? userLogout : handleOpenLogin}
                sx={{
                  color: 'black',
                  fontWeight: 'bold',
                  ":hover": {
                    color: '#bb1f2a',
                    background: '#fff',
                  },
                }}
              >
                {token ? "Logout" : "Login"}
              </Button>
              <Login
                open={openLogin}
                handleOpenRegister={handleOpenRegister}
                handleClose={handleCloseLogin}
                loginUser={loginUser}
                loading={loading}
                handleChange={handleChange}
                formData={formData}
              />
              <Register
                open={openRegister}
                handleOpenLogin={handleOpenLogin}
                handleClose={handleCloseRegister}
              />
            </div>
          </div>
        </Container>
        <ToastContainer containerId="login" />
      </div>
    </ThemeProvider>
  );
};

export default Header;
