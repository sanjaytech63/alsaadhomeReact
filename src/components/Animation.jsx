import React from 'react';
import { Box } from '@mui/material';


const Animation = () => {
  return (
    <Box sx={{ height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center',my:5 ,bgcolor:"lightgray" }}>
      <div className="sky">
        <div className="helicopter">
          <div className="body"></div>
          <div className="tail"></div>
          <div className="rotor"></div>
        </div>
      </div>
    </Box>
  );
};

export default Animation;
