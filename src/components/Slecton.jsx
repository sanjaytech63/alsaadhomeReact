import { Box, Skeleton } from '@mui/material'
import React from 'react'

const Slecton = () => {
    return (
        <Box sx={{ borderRadius: '8px', mb: 4 }}>
            <Skeleton variant="rectangular" animation="wave" height="233px" width="100%" sx={{ borderRadius: '8px 8px 0 0' }} />
            <Box sx={{ padding: '16px' }}>
                <Skeleton animation="wave" height="30px" width="80%" sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Skeleton animation="wave" variant="circular" width={20} height={20} sx={{ mr: 1 }} />
                    <Skeleton animation="wave" height="20px" width="20%" />
                    <Skeleton animation="wave" variant="circular" width={20} height={20} sx={{ ml: 2, mr: 1 }} />
                    <Skeleton animation="wave" height="20px" width="10%" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Skeleton animation="wave" height="20px" width="30%" />
                    <Skeleton animation="wave" height="20px" width="30%" />
                </Box>
                <Skeleton animation="wave" height="20px" width="20%" sx={{ mb: 1 }} />
                <Skeleton animation="wave" height="20px" width="100%" sx={{ mb: 1 }} />
                <Skeleton animation="wave" height="20px" width="100%" />
            </Box>
        </Box>
    )
}

export default Slecton