import React, { useState, useRef } from "react";
import { Box, Breadcrumbs, Container, Typography, Grid } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useUserStore from "./../store/user";
import { userService } from "../utils/services/userServices";
import { showToast } from "../utils/helper";
const MyAccount = () => {
  const { setUserInfo, userInfo } = useUserStore();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      const formData = new FormData();
      formData.append("profile_img", selectedFile);
      try {
        const response = await userService.updateProfileImage(formData);
        if (response && response.status === 200) {
          showToast("success", response.message, "success");
          const data = { ...userInfo, ...response.data };
          setUserInfo(data);
        } else {
          showToast("error", response.message, "danger");
        }
      } catch (error) {
        console.log("error in update profile:-", error);
      }
    }
  };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div style={{ minHeight: "100vh" }}>
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
              Dashboard
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
              <Dashboard selectItem={1} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Box sx={{ bgcolor: "white", p: 3, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#292b2c",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: { sm: "24px", xs: "16px" },
                }}
              >
                Dashboard
              </Typography>
              <hr />
              <Box
                sx={{
                  p: { sm: 1, xs: 0 },
                  display: "flex",
                  alignItems: "center",
                  gap: { sm: 2, xs: 1 },
                  flexDirection: { xs: "column", sm: "row" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Box
                  onClick={handleIconClick}
                  sx={{
                    border: "1px solid #dee2e6",
                    borderRadius: "50%",
                    cursor: "pointer",
                    objectFit: "cover",
                    width: { sm: "130px", xs: "70px" },
                    height: { sm: "130px", xs: "70px" },
                  }}
                  component={"img"}
                  src={file ?? userInfo?.photo}
                  alt="Profile"
                  loading="lazy"
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#292b2c",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: { sm: "14px", xs: "12px" },
                      ":hover": { color: "#bb1f2a" },
                    }}
                  >
                    <PersonOutlineOutlinedIcon /> {userInfo?.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#292b2c",
                      textTransform: "capitalize",
                      cursor: "pointer",
                      fontWeight: 500,
                      fontSize: { sm: "14px", xs: "12px" },
                      ":hover": { color: "#bb1f2a" },
                    }}
                  >
                    <MailOutlinedIcon />
                    {userInfo?.email}
                  </Typography>
                </Box>
              </Box>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <CameraAltIcon
                onClick={handleIconClick}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyAccount;
