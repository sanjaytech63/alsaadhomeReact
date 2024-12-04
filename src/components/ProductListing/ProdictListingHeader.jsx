import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router-dom";

export const ProdictListingHeader = ({ pathnames }) => {
    return (
        <Box sx={{ bgcolor: "#f7f8fb" }}>
            <Container>
                <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                    <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }}>
                        Product List & Search
                    </Typography>
                    <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link className="breadcrumbs-hover" style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize' }} to="/">Home</Link>
                        {pathnames.map((segment, index) => {
                            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;
                            return isLast ? (
                                <span key={index} style={{ color: '#6c757d', textTransform: "capitalize" }}>{decodeURIComponent(segment)}</span>
                            ) : (
                                <Link key={index} className="breadcrumbs-hover" style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }} to={path}>{decodeURIComponent(segment)}</Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Container>
        </Box>
    );
};
