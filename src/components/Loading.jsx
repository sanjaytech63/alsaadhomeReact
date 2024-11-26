import { Box } from '@mui/material';
import React from 'react';
import { RotatingLines } from 'react-loader-spinner';


const Loading = () => {
  return (
    <Box sx={{ height: "87vh", justifyContent: "center", display: "flex", alignItems: "center" }}>
      <p>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#bb1f2a"
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
