import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <div className="my-5">
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Grid container spacing={2}>
          {products &&
            products.map((product, index) => (
              <Grid
                sx={{ cursor: "pointer" }}
                item
                xs={6}
                sm={6}
                md={3}
                key={index}
              >
                <Box
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <Link
                    className="link-none"
                    to={`/products/${product.product_slug}`}
                  >
                    <Box
                      component={"img"}
                      sx={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      src={product.image}
                      alt="product-image"
                      loading="lazy"
                    />
                  </Link>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Products;
