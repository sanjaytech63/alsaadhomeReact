import React from 'react';
import { Button,Box } from '@mui/material';

const ResetApplyButtons = ({ handleReset,applyFilters }) => (
    <Box sx={{ display: 'flex', gap: 2, mt: 4, mb: 5, alignItems: 'center' }}>
        <Button onClick={applyFilters} variant="contained" sx={{ backgroundColor: '#bb1f2a', color: '#fff', borderRadius: '0px', padding: '13px 30px' }}>Apply</Button>
        <Button onClick={handleReset} variant="contained" sx={{ backgroundColor: '#343a40', color: '#fff', borderRadius: '0px', padding: '13px 30px' }}>Reset</Button>
    </Box>
);

export default ResetApplyButtons;
