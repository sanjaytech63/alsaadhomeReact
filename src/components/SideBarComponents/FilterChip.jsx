import React from 'react';
import { Chip } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const FilterChip = ({ label, isSelected, onClick, }) => (
    <Chip
        label={label}
        clickable
        onClick={onClick}
        icon={isSelected ? <CheckCircle sx={{ fontSize: '15px' }} /> : <RadioButtonUnchecked sx={{ fontSize: '15px' }} />}
        sx={{
            backgroundColor: isSelected ? '#bb1f2a' : '#eee',
            color: isSelected ? '#fff' : '#000',
            borderRadius: '4px',
            fontWeight: '600',
            '& .MuiChip-icon': {
                color: isSelected ? '#fff' : '#292b2c',
            },
            '&:hover': {
                backgroundColor: isSelected ? '#bb1f2a' : '#ddd',
            },
        }}
    />
);

export default FilterChip;
