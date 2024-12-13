import { Box } from '@mui/material';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';


const Loading = () => {
  return (
    <Box sx={{ height:{sm: "87vh", xs: "70vh"}, justifyContent: "center", display: "flex", alignItems: "center" }}>
      <p>
        <ThreeDots
          visible={true}
          height="96"
          width="96"
          color="#bb1f2a"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </p>
    </Box>
  );
};

export default Loading;
