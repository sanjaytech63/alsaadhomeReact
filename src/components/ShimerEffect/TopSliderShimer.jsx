import React from 'react';
import { Box, Skeleton, useMediaQuery, useTheme, Container } from '@mui/material';

const TopSliderShimmer = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", }} >
        {Array(8).fill().map((_, idx) => (
          <Box key={idx} sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 1 }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              padding: 1
            }}>
              <Skeleton sx={{ borderRadius: "50%" }} variant="circle" width={matchesSM ? 70 : 97} height={matchesSM ? 70 : 97} />
              <Skeleton variant="text" width={120} height={30} sx={{ marginTop: 1 }} />
            </Box>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default TopSliderShimmer;
