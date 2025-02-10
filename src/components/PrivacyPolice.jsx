import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import privacyData from '../../src/product.json';

const PrivacyPolice = () => {
    const { privecyPolicy } = privacyData;
    
    const renderSection = (section, title) => (
        <Box mb={4}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            {Array.isArray(section) ? (
                <ul>
                    {section.map((item, idx) => (
                        <li key={idx}>
                            <Typography variant="body2">{item}</Typography>
                        </li>
                    ))}
                </ul>
            ) : (
                <Typography variant="body2">{section}</Typography>
            )}
        </Box>
    );

    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        {privecyPolicy.map((section, index) => (
                            <Box key={index}>
                                {renderSection(section.introduction.statement, "Introduction")}
                                {renderSection(section.introduction.purpose, "Purpose")}
                                {renderSection(section.informationCollectionAndUsage.goals, "Information Collection and Usage: Goals")}
                                {renderSection(section.informationCollectionAndUsage.registrationAndOrdering.purpose, "Registration and Ordering Purpose")}
                                {renderSection(section.informationCollectionAndUsage.registrationAndOrdering.collectedInfo, "Collected Information")}
                                {renderSection(section.informationCollectionAndUsage.emailAddresses.purposes, "Email Addresses Purposes")}
                                {renderSection([section.informationCollectionAndUsage.cookiesAndTechnology.cookies.description, section.informationCollectionAndUsage.cookiesAndTechnology.cookies.purpose], "Cookies and Technology")}
                                {renderSection([section.informationCollectionAndUsage.cookiesAndTechnology.webBeacons.description, section.informationCollectionAndUsage.cookiesAndTechnology.webBeacons.purpose], "Web Beacons")}
                                {renderSection([section.informationCollectionAndUsage.cookiesAndTechnology.thirdPartyAdvertising.purpose], "Third Party Advertising")}
                                {renderSection(section.informationCollectionAndUsage.logFiles.collectedInfo, "Log Files")}
                                {renderSection(section.informationUseAndDisclosure.internalUse, "Internal Use")}
                                {renderSection(section.informationUseAndDisclosure.communications, "Communications")}
                                {renderSection(section.informationUseAndDisclosure.externalUse.disclosureToThirdParties, "Disclosure to Third Parties")}
                                {renderSection(section.dataSecurity.measures, "Data Security Measures")}
                                {renderSection(section.dataSecurity.disclaimer, "Disclaimer")}
                                {renderSection(section.purposesOfUse, "Purposes of Use")}
                                {renderSection(section.userRights.optOut.promotionalEmails, "Opt-out from Promotional Emails")}
                                {renderSection(section.userRights.optOut.cookies, "Control Cookies")}
                                {renderSection(section.userRights.dataRequests.accessOrDelete, "Data Requests")}
                                {renderSection(section.modifications.policyUpdates, "Policy Updates")}
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default PrivacyPolice;
