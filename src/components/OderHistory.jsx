import React from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TableContainer, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
const OderHistory = () => {
  const navigate = useNavigate();

  const navigateToOrder = () => {
    navigate('/oder-details')
  }
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  return (
    <div style={{ minHeight: '100vh', }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb',py: {sm:"30px",xs:"15px"}, }}>
        <Container maxWidth={"lg"}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              Oder History
            </Typography>
            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
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
              <Dashboard selectItem={2} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid item sx={{ mb: { sm: 0, xs: 5 } }} xs={12} sm={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
              >
                Oder History
              </Typography>
              <hr />
              <Box sx={{ width: { sm: "60%", xs: "100%" }, py: 2, my: 2, px: 2, borderRadius: 1, boxShadow: " 0 0 4px 0 #e9e9e9" }}>
                <TableContainer sx={{}} >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            <span className="order-num">124368</span>
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Nov 06, 2024
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={navigateToOrder} variant="contained" sx={{ color: 'white', backgroundColor: "#bb1f2a" }} size="large">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      {/* Order Status */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Order Status</TableCell>
                        <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>Pending</TableCell>
                      </TableRow>
                      {/* Items */}
                      <TableRow >
                        <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Items</TableCell>
                        <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>2 Items</TableCell>
                      </TableRow>
                      {/* Price */}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Price</TableCell>
                        <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>328.33 AED</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OderHistory;
