import { Box, Pagination } from "@mui/material";

export const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <Box sx={{ my: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={onPageChange}
                shape="rounded"
                size="small"
                variant="outlined"
                sx={{
                    "& .MuiPaginationItem-root": {
                        "&.Mui-selected": {
                            backgroundColor: "#bb1f2a",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#a91c26" },
                        },
                    },
                }}
            />
        </Box>
    );
};
