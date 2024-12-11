import React from 'react';
import { Box, Typography } from '@mui/material';

const ColorOptions = ({ colorOptions, selectedColor, setSelectedColor }) => {
  return (
    <Box mt={2}>
      <Typography variant="body1" fontWeight="bold">
        Color
      </Typography>
      <Box display="flex" gap={1} mt={1}>
        {colorOptions.map((colorOption) => (
          <Box
            key={colorOption.colors.color_id}
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: colorOption.colors.all_colors[0],
              border:
                selectedColor === colorOption.colors.color_id
                  ? '2px solid #bb1f2a'
                  : '2px solid transparent',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedColor(colorOption.colors.color_id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ColorOptions;
