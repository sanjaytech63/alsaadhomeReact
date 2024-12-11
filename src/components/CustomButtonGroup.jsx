import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

const CustomButtonGroup = ({ next, previous, isRTL,top }) => {
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            {/* Left Arrow Button */}
            {!matchesSM && (
                <Box
                    className="arrow-box"
                    onClick={isRTL ? next : previous}
                    sx={{
                        position: "absolute",
                        top: top,
                        left: isRTL ? 'auto' : '-45px',
                        right: isRTL ? '-45px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                >
                    <Box className="arrow-hover" sx={{ p: 1 }}>
                        <MdOutlineArrowBackIos fontSize={"20px"} />
                    </Box>
                </Box>
            )}

            {/* Right Arrow Button */}
            {!matchesSM && (
                <Box
                    className="arrow-box"
                    onClick={isRTL ? previous : next}
                    sx={{
                        position: "absolute",
                        top: top,
                        right: isRTL ? 'auto' : '-45px',
                        left: isRTL ? '-45px' : 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 1,
                    }}
                >
                    <Box className="arrow-hover" sx={{ p: 1 }}>
                        <MdOutlineArrowForwardIos fontSize={"20px"} />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CustomButtonGroup;
