import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

const ProductInfo = ({ proDetails }) => {
  return (
    <Box>
      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>Model :</strong> {proDetails.group}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <strong>Brand :</strong>
            <Typography sx={{ color: '#292b2c' }}> {proDetails.brand} </Typography>
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <strong>Tags :</strong>
            <Typography sx={{ color: '#292b2c' }}> {proDetails.tags} </Typography>
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
};

export default ProductInfo;