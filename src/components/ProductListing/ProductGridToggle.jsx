import { Box } from "@mui/material";
import { BsGrid } from "react-icons/bs";
import { TfiLayoutListThumb } from "react-icons/tfi";

export const ProductGridToggle = ({ gridTogal, onToggle }) => {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box
                sx={{
                    py: "13px",
                    px: "15px",
                    backgroundColor: gridTogal ? '#bb1f2a' : '#292b2c',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={() => onToggle(true)}
            >
                <BsGrid color="#fff" />
            </Box>
            <Box
                sx={{
                    py: "13px",
                    px: "15px",
                    backgroundColor: gridTogal ? '#292b2c' : '#bb1f2a',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
                onClick={() => onToggle(false)}
            >
                <TfiLayoutListThumb color="#fff" />
            </Box>
        </Box>
    );
};
