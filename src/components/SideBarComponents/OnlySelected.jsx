import { Box, Switch, Typography } from '@mui/material'
import React from 'react'

const OnlySelected = () => {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography
                    variant="h5"
                    sx={{ my: 2, color: "#687188", fontWeight: 600, fontSize: "12px", fontFamily: "Roboto, sans-serif" }}
                >
                    Only selected
                </Typography>
                <Switch
                    defaultChecked
                    sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#bb1f2a",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#bb1f2a",
                        },
                    }}
                />
                <Typography
                    variant="h5"
                    sx={{ my: 2, color: "#687188", fontWeight: 600, fontSize: "12px", fontFamily: "Roboto, sans-serif" }}
                >
                    Any of selected
                </Typography>
            </Box>
        </>
    )
}

export default OnlySelected
