import { Box, Chip } from "@mui/material";

export const FilterTags = ({ main_category, selectedCatlist, onTagToggle }) => {
    return (
        <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, mb: 3, pb: 1 }}>
            {main_category.map(tag => (
                <Chip
                    key={tag.id}
                    label={tag.title}
                    clickable
                    onClick={() => onTagToggle(tag.id)}
                    sx={{
                        backgroundColor: selectedCatlist.includes(tag.id) ? "#bb1f2a" : "#eee",
                        color: selectedCatlist.includes(tag.id) ? "#fff" : "#000",
                        borderRadius: "4px",
                        fontWeight: "600",
                        "&:hover": {
                            backgroundColor: selectedCatlist.includes(tag.id) ? "#bb1f2a" : "#ddd",
                        },
                    }}
                />
            ))}
        </Box>
    );
};
