import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import termsData from '../../src/product.json';
const TermsConditions = () => {

    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        {termsData.tremsConditions.map((section, index) => (
                            <Box key={index} mb={4}>
                                <Typography variant="h6" gutterBottom>
                                    {section.title}
                                </Typography>
                                {section.content.map((paragraph, idx) => (
                                    <Typography key={idx} variant="body1" paragraph>
                                        {paragraph}
                                    </Typography>
                                ))}
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default TermsConditions;
