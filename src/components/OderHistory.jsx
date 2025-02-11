import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, TableContainer, Table, TableBody, TableRow, TableCell, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import orderServiceApi from '../utils/services/oderServices';
import Loading from './Loading';

const OderHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const getOderHistory = async () => {
    try {
      setLoading(true);
      const response = await orderServiceApi.getOrders();
      if (response && response.status === 200) {
        setLoading(false);
        setData(response.data);
      }
    } catch (error) {
      console.log(error, " error in oder history")
      setLoading(false);
    }
  };

  useEffect(() => {
    getOderHistory();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb', py: { sm: "30px", xs: "15px" } }}>
        <Container maxWidth={"lg"}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              Order History
            </Typography>
            <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link className='breadcrumbs-hover'
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize' }}
                to="/"
              >
                Home
              </Link>
              {pathnames.map((segment, index) => {
                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                  <span key={index} style={{ color: '#6c757d', textTransform: "capitalize" }}>
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
          <Grid item xs={12} sm={9}>
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography
                variant="h5"
                sx={{ color: '#292b2c', textTransform: 'capitalize', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
              >
                Order History
              </Typography>
              <hr />

              {/* Order Lists */}
              <Box sx={{
                display: 'flex',
                overflowX: 'auto',
                gap: 2,
                pb: 2,
                maxWidth: "100%",
                '&::-webkit-scrollbar': { height: 6 },
                '&::-webkit-scrollbar-thumb': { background: "#ccc", borderRadius: 3 }
              }}>
                {data?.length > 0 &&
                  data?.map((item) => (
                    <Box
                      key={item?.id}
                      sx={{
                        width: "50%",
                        minWidth: "300px",
                        p: 2,
                        borderRadius: 1,
                        boxShadow: "0 0 4px 0 #e9e9e9",
                        bgcolor: "white",
                        flexShrink: 0
                      }}
                    >
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                  <span className="order-num">#{item?.id}</span>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {item?.order_date}
                                </Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  onClick={() => navigate(`/order-details/${item.id}`)}
                                  variant="contained"
                                  sx={{ color: 'white', backgroundColor: "#bb1f2a" }}
                                  size="large"
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Order Status</TableCell>
                              <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>
                                {item.status}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Items</TableCell>
                              <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>
                                {item?.item_count} Items
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 700, borderBottom: "none" }}>Price</TableCell>
                              <TableCell sx={{ borderBottom: "none", display: "flex", justifyContent: "flex-end" }}>
                                {item?.total} AED
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default OderHistory;
