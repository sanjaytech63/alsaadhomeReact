// components/ResultList.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const ResultList = ({ data }) => {
  if (!data || data.length === 0) return <Typography>No results found.</Typography>;

  return (
    <Box>
      {data.map((item) => (
        <Box key={item.id} sx={{ display: 'flex', mb: 2 }}>
          <img src={item.image} alt={item.title} style={{ width: 80, height: 80, marginRight: 16 }} />
          <Typography>{item.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ResultList;
