import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ResultList = ({ data, handleClose }) => {

  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        No results found.
      </Typography>
    );
  }

  console.log(data, "data");

  return (
    <Box
      sx={{
        width: '100%',
        mt: 1,
        bgcolor: 'white',
        overflow: 'hidden',
        height: 'calc(100vh - 300px)',
        overflowY: 'auto',
        px: { xs: '8px', sm: '15px' },
        py: { xs: '8px', sm: '15px' },

      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          overflow: 'auto',
          height: '100%',
        }}
      >
        {data?.map((item) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            key={item.id}
            sx={{
              pb: 2,
            }}
          >
            <Link
              className="link-none"
              to={`/products/${item?.slug}?product_id=${item?.product_id?.toString()}&variant_id=${item?.product_variant_id?.toString()}`}
            >
              <Card
                onClick={() => {
                  handleClose();
                }}
                sx={{
                  height: "100%",
                  overflow: "hidden",
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  borderBottomLeftRadius: '0px',
                  padding: '0px !impotant',
                  borderBottomRightRadius: '0px',
                  boxShadow: '0 0 7px rgb(0 0 0 / 10%)',
                  cursor: 'pointer',
                }}
              >
                <Box position="relative">
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.title}
                    loading="lazy"
                    sx={{
                      minHeight: { sm: '276px', xs: '150px' },
                      maxHeight: { sm: '276px', xs: '150px' },
                      objectFit: 'cover',
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    p: { xs: "8px", sm: "16px", },
                    mb: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#292b2c',
                      fontWeight: 600,
                      fontSize: { xs: '14px', sm: '1rem' },
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textOverflow: 'ellipsis',
                      ':hover': {
                        color: '#bb1f2a',
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#bb1f2a',
                      fontWeight: 600,
                      fontSize: { xs: '14px', sm: '1rem' },
                      mt: 1,
                    }}
                  >
                    {item.list_price} AED
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultList;
