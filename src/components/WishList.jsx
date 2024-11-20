import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { RiDeleteBin5Line } from 'react-icons/ri';
const WishList = () => {
  const data = [{
    id: 1,
    title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
    image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
  },
  {
    id: 1,
    title: "Jack Velvet Kids Comforter Bedding Set 4 PCS - L.Beige",
    image: "https://al-saad-home.mo.cloudinary.net/uploads/products/14702/thumb/jack-161728223117.jpg",
  }
  ]


  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate("/cart");
  }
  return (
    <div style={{ minHeight: '100vh', }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb', py: {sm:"30px",xs:"15px"}, }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              WishList
            </Typography>
            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize',  }}
                to="/"
              >
                Home
              </Link>
              {pathnames.map((segment, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return isLast ? (
                  <span
                    key={index}
                    style={{ color: '#6c757d', textTransform: "capitalize" }}
                  >
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link className='breadcrumbs-hover'
                    key={index}
                    style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }}
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
            <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <Dashboard selectItem={5} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 }, display: "flex", alignItems: "center", }} xs={12} sm={9}>
            {data && data.map((item) => (
              <Card onClick={navigateToCart} key={item.id} sx={{ borderTopLeftRadius: '8px', mx: { sm: "10px", xs: "5px" }, width: "233.33px", borderTopRightRadius: '8px', borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", cursor: "pointer", boxShadow: "0 0 7px rgb(0 0 0 / 10%)" }}>
                <Box position="relative">
                  <Typography sx={{ borderRadius: "5px", p: "5px", position: 'absolute', top: 10, right: 10, backgroundColor: "#bb1f2a", color: "#eee" }}>
                    <RiDeleteBin5Line size={20} />
                  </Typography>
                  <CardMedia
                    sx={{ minHeight: { sm: "276.37px", xs: "175px" }, maxHeight: { sm: "400px", xs: "175px" }, objectFit: "cover" }}
                    component="img"
                    image={item.image}
                    alt={item.title}
                    loading="lazy"
                  />
                </Box>
                <CardContent sx={{ p: { xs: "8px", sm: "16px" } }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#292b2c",
                      fontWeight: 600,
                      fontSize: { xs: "15px", sm: "1rem" },
                      alignSelf: "flex-start",
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      wordBreak: "break-all",
                      whiteSpace: "normal",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                      ":hover": {
                        color: "#bb1f2a"
                      }
                    }}
                    component="div"
                  >
                    {item.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      variant='contained'
                      sx={{
                        color: "#fff",
                        backgroundColor: "#bb1f2a",
                        fontSize: { sm: "16px", xs: "11px" }
                      }}
                    >
                      Move To Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </div >
  );
};

export default WishList;
