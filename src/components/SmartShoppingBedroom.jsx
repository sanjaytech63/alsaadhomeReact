import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RecommendedProducts from './RecommendedProducts'
import { Box, Breadcrumbs, Container, Typography, Grid, CardMedia } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { smartShoppingApi } from '../utils/services/smartShopping';
import Loading from './Loading';
import useLoaderStore from '../store/loaderStore';

const SmartShoppingBedroom = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const nevigate = useNavigate();

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(Boolean);

    const { isLoading } = useLoaderStore();

    const smartShoppingSubCategories = async () => {
        try {
            const requestBody = {
                category_id: "2"
            }
            const response = await smartShoppingApi.smartShoppinSubcategory(requestBody);
            if (response && response.status === 200) {
                setSubCategories(response.data?.subcategory)
                setRecommendedProducts(response?.data?.recommended_product)
            }
        } catch (error) {
            console.log(error, "error in smart shopping sub categories")
        }
    }

    useEffect(() => {
        smartShoppingSubCategories();
    }, []);


    if (isLoading && subCategories.length === 0 && recommendedProducts.length === 0) {
        return <Loading />
    }

    return (
        <div>
            <Box sx={{ bgcolor: "#f7f8fb" }}>
                <Container>
                    <Box sx={{ display: { sm: "flex", xs: "block" }, justifyContent: "space-between", alignItems: "center", py: { sm: "30px", xs: "15px" }, fontFamily: "Roboto" }}>
                        <Typography variant="h5" sx={{ color: "#292b2c", textTransform: "capitalize", fontWeight: "700", fontSize: { sm: "24px", xs: "16px" } }} >
                            {pathnames[2].toLocaleLowerCase()}
                        </Typography>
                        <Breadcrumbs sx={{ cursor: "pointer", fontSize: "14px" }} separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link className='breadcrumbs-hover'
                                style={{ color: '#292b2c', textDecoration: 'none', textTransform: 'capitalize', }}
                                to="/"
                            >
                                Home
                            </Link>
                            {pathnames.map((segment, index) => {
                                const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                                const isLast = index === pathnames.length - 1;

                                return isLast ? (
                                    <span
                                        key={index}
                                        style={{ color: '#6c757d', textTransform: "capitalize" }}
                                    >
                                        {decodeURIComponent(segment)}
                                    </span>
                                ) : (
                                    <Link className='breadcrumbs-hover'
                                        key={index}
                                        style={{ color: '#292b2c', textDecoration: "none", textTransform: "capitalize" }}
                                        to={path}
                                    >
                                        {decodeURIComponent(segment)}
                                    </Link>
                                );
                            })}
                        </Breadcrumbs>
                    </Box>

                </Container>
            </Box>

            <Container>
                <Box sx={{ my: 5 }}>
                    <Grid container spacing={2} sx={{ pb: 4 }}>
                        {subCategories && subCategories.map((cat) => (
                            <Grid item xs={12} key={cat?.id}>
                                {/* Title and horizontal line in inline-block */}
                                <Box sx={{ display: "inline-block", mb: 1 }}>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color: "#292b2c",
                                            textTransform: "capitalize",
                                            fontWeight: "700",
                                            fontSize: { sm: "24px", xs: "16px" },
                                            display: "inline-block",
                                            mr: 2,
                                            mb: 2
                                        }}
                                    >
                                        {cat?.name}
                                    </Typography>
                                </Box>

                                <Grid container spacing={2}>
                                    {cat?.engagement_list?.map((engagemen) => (
                                        <Grid item xs={12} sm={4} key={engagemen?.id}>
                                            <Box
                                                onClick={() => nevigate(`/smart-shopping/details/${engagemen?.id}`)}
                                                sx={{
                                                    position: 'relative',
                                                    boxShadow: 3,
                                                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                                                    borderRadius: 2,
                                                    cursor: 'pointer',
                                                    overflow: 'hidden',
                                                    transition: 'transform 0.3s ease',
                                                    '&:hover': { opacity: 0.8, },
                                                }}
                                            >
                                                <CardMedia sx={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                }}
                                                    component="img"
                                                    src={engagemen?.main_image}
                                                    alt={engagemen?.title}
                                                    loading="lazy"
                                                />
                                                {/* Text on image */}
                                                <Box
                                                    sx={{
                                                        position: 'absolute',
                                                        top: "35%",
                                                        width: '100%',
                                                        color: '#fff',
                                                        textAlign: 'center',
                                                        fontSize: "16px",
                                                        py: 1,
                                                    }}
                                                >
                                                    <Typography variant="h6">{engagemen?.title}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            <div className='mb-5'>
                <RecommendedProducts title={"Recommended Products"} productsCard={recommendedProducts} />
            </div>
        </div>
    )
}

export default SmartShoppingBedroom