import React, { useEffect } from 'react';
import { Box, Breadcrumbs, Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { RiDeleteBin5Line } from 'react-icons/ri';
import useCartStore from '../store/useCartStore';
import { useWishListStore } from '../store/useWishListStore';

const WishList = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);
  const navigate = useNavigate();

  const { isItemInCart, addToCart } = useCartStore();
  const { wishList, getWishList, removeWishList, } = useWishListStore();

  const navigateToCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
    const getWishListItem = async () => {
      await getWishList();
    }
    getWishListItem();
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#f7f8fb', py: { sm: '30px', xs: '15px' } }}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              variant="h5"
              sx={{ color: '#292b2c', fontWeight: 700, fontSize: { sm: '24px', xs: '16px' } }}
            >
              WishList
            </Typography>
            <Breadcrumbs
              sx={{ cursor: 'pointer', fontSize: '14px' }}
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link
                className="breadcrumbs-hover"
                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize' }}
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
                    style={{ color: '#6c757d', textTransform: 'capitalize' }}
                  >
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link
                    className="breadcrumbs-hover"
                    key={index}
                    style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize' }}
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

      <Container sx={{ my: 4, py: 4, pb: '50px' }}>
        <Grid container spacing={2}>
          {/* Sidebar */}
          <Grid item xs={12} sm={3}>
            <Box sx={{ bgcolor: 'white', boxShadow: 1 }}>
              <Dashboard selectItem={5} />
            </Box>
          </Grid>

          {/* Main Content */}
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              mb: { sm: 0, xs: 5 },
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {wishList?.map((item, index) => {
              return (
                <Card
                  key={index}
                  sx={{
                    mb: 4,
                    borderTopLeftRadius: '8px',
                    mx: { sm: '10px', xs: '5px' },
                    width: '233.33px',
                    borderTopRightRadius: '8px',
                    borderBottomLeftRadius: '0px',
                    borderBottomRightRadius: '0px',
                    cursor: 'pointer',
                    boxShadow: '0 0 7px rgb(0 0 0 / 10%)',
                  }}
                >
                  <Box position="relative">
                    <Typography
                      onClick={() => {
                        if (item?.wishlist_id?.toString()) {
                          removeWishList(item?.wishlist_id?.toString());
                        } else {
                          console.log('Invalid wishlist_id:', item);
                        }
                      }}
                      sx={{
                        borderRadius: '5px',
                        p: '5px',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: '#bb1f2a',
                        color: '#eee',
                      }}
                    >
                      <RiDeleteBin5Line size={20} />
                    </Typography>
                    <CardMedia
                      sx={{
                        minHeight: { sm: '276.37px', xs: '175px' },
                        maxHeight: { sm: '400px', xs: '175px' },
                        objectFit: 'cover',
                      }}
                      component="img"
                      // src={item?.image || '/placeholder.jpg'}
                      src='https://cdn.pixabay.com/photo/2020/09/13/14/24/coffee-5568374_1280.jpg'
                      alt={item?.title || 'Product Image'}
                      loading="lazy"
                    />
                  </Box>
                  <CardContent sx={{ p: { xs: '8px', sm: '16px' } }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#292b2c',
                        fontWeight: 600,
                        fontSize: { xs: '15px', sm: '1rem' },
                        alignSelf: 'flex-start',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer',
                        ':hover': {
                          color: '#bb1f2a',
                        },
                      }}
                      component="div"
                    >
                      {item.title || 'Untitled'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button
                        onClick={() => {
                          if (!isItemInCart(item?.product_variant_id?.toString())) {
                            addToCart(item?.product_variant_id?.toString());
                          } else {
                            navigateToCart();
                          }
                        }}
                        variant="contained"
                        sx={{
                          color: '#fff',
                          backgroundColor: '#bb1f2a',
                          fontSize: { sm: '16px', xs: '11px' },
                        }}
                      >
                        {isItemInCart(item?.product_variant_id?.toString())
                          ? 'Go to Cart'
                          : 'Add to Cart'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )

            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default WishList;
