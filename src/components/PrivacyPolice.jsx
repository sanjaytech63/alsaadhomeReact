import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';

const PrivacyPolice = () => {
    const privacyData = [
        {
            introduction: {
                statement: "We respect your privacy and secure your online safety seriously.",
                purpose: "Provide best products, efficient customer service, and fast updates."
            },
            informationCollectionAndUsage: {
                goals: [
                    "Help you sign in without re-entering information.",
                    "Help you find products, services quickly.",
                    "Create relevant content for you.",
                    "Alert you to new products, services."
                ],
                registrationAndOrdering: {
                    purpose: "For billing purposes, order fulfillment, communication, and internal marketing.",
                    collectedInfo: [
                        "name",
                        "address",
                        "gender",
                        "shipping and billing address",
                        "phone number",
                        "email"
                    ]
                },
                emailAddresses: {
                    purposes: [
                        "Receive promotional notices",
                        "Sign up for newsletters",
                        "Participate in contests"
                    ]
                },
                cookiesAndTechnology: {
                    cookies: {
                        description: "Small pieces of information stored as text files by your browser.",
                        purpose: "Enable shopping features, track browsing, etc."
                    },
                    webBeacons: {
                        description: "Assist in delivering cookies and tracking site usage.",
                        purpose: "Help determine if web pages have been viewed."
                    },
                    thirdPartyAdvertising: {
                        purpose: "Tailor site content and serve ads."
                    }
                },
                logFiles: {
                    collectedInfo: [
                        "IP address",
                        "Internet service provider",
                        "date/time stamps"
                    ]
                },
                agePolicy: {
                    policy: "We do not collect personal information from children under age 13.",
                    recommendation: "Users under 13 should rely on a parent or guardian."
                },
                productReviews: {
                    visibleInfo: "Geographic location of reviewer",
                    disclosure: "Do not disclose personal information in reviews."
                }
            },
            informationUseAndDisclosure: {
                internalUse: "Process orders, improve site content and layout, internal marketing.",
                communications: "Send order-related and service-related communications.",
                externalUse: {
                    disclosureToThirdParties: [
                        "Service providers for order delivery",
                        "Required disclosure by law",
                        "Fraud prevention"
                    ]
                }
            },
            dataSecurity: {
                measures: [
                    "SSL encryption",
                    "Restricted access to personal information",
                    "Third-party physical security for computer hardware"
                ],
                disclaimer: "No system is 100% secure, online or offline."
            },
            purposesOfUse: [
                "Personalize experience",
                "Improve website and customer service",
                "Process transactions",
                "Send periodic emails"
            ],
            userRights: {
                optOut: {
                    promotionalEmails: "Option to unsubscribe from emails",
                    cookies: "Control cookie usage via browser settings"
                },
                dataRequests: {
                    accessOrDelete: "Request data access, correction, or deletion via online form or email."
                }
            },
            modifications: {
                policyUpdates: "We may update this policy from time to time."
            }
        }
    ];

    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        {privacyData.map((section, index) => (
                            <Box key={index}  mb={4}>
                                <Typography variant="h6" gutterBottom>
                                    Introduction
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {section.introduction.statement}
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {section.introduction.purpose}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    Information Collection and Usage
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Goals:
                                </Typography>
                                <ul>
                                    {section.informationCollectionAndUsage.goals.map((goal, idx) => (
                                        <li key={idx}>
                                            <Typography variant="body2">{goal}</Typography>
                                        </li>
                                    ))}
                                </ul>

                                <Typography variant="body1" paragraph>
                                    Registration and Ordering:
                                </Typography>
                                <Typography variant="body2">
                                    Purpose: {section.informationCollectionAndUsage.registrationAndOrdering.purpose}
                                </Typography>
                                <Typography variant="body2">
                                    Collected Information: {section.informationCollectionAndUsage.registrationAndOrdering.collectedInfo.join(", ")}
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    Email Addresses:
                                </Typography>
                                <ul>
                                    {section.informationCollectionAndUsage.emailAddresses.purposes.map((purpose, idx) => (
                                        <li key={idx}>
                                            <Typography variant="body2">{purpose}</Typography>
                                        </li>
                                    ))}
                                </ul>

                                <Typography variant="body1" paragraph>
                                    Cookies and Technology:
                                </Typography>
                                <Typography variant="body2">
                                    Cookies: {section.informationCollectionAndUsage.cookiesAndTechnology.cookies.description}
                                </Typography>
                                <Typography variant="body2">
                                    Purpose: {section.informationCollectionAndUsage.cookiesAndTechnology.cookies.purpose}
                                </Typography>

                                <Typography variant="body2">
                                    Web Beacons: {section.informationCollectionAndUsage.cookiesAndTechnology.webBeacons.description}
                                </Typography>
                                <Typography variant="body2">
                                    Purpose: {section.informationCollectionAndUsage.cookiesAndTechnology.webBeacons.purpose}
                                </Typography>

                                <Typography variant="body2">
                                    Third Party Advertising Purpose: {section.informationCollectionAndUsage.cookiesAndTechnology.thirdPartyAdvertising.purpose}
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    Log Files:
                                </Typography>
                                <Typography variant="body2">
                                    Collected Information: {section.informationCollectionAndUsage.logFiles.collectedInfo.join(", ")}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    Age Policy
                                </Typography>
                                <Typography variant="body2">
                                    Policy: {section.informationCollectionAndUsage.agePolicy.policy}
                                </Typography>
                                <Typography variant="body2">
                                    Recommendation: {section.informationCollectionAndUsage.agePolicy.recommendation}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    Information Use and Disclosure
                                </Typography>
                                <Typography variant="body2">
                                    Internal Use: {section.informationUseAndDisclosure.internalUse}
                                </Typography>
                                <Typography variant="body2">
                                    Communications: {section.informationUseAndDisclosure.communications}
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    Disclosure to Third Parties:
                                </Typography>
                                <ul>
                                    {section.informationUseAndDisclosure.externalUse.disclosureToThirdParties.map((disclosure, idx) => (
                                        <li key={idx}>
                                            <Typography variant="body2">{disclosure}</Typography>
                                        </li>
                                    ))}
                                </ul>

                                <Typography variant="h6" gutterBottom>
                                    Data Security
                                </Typography>
                                <ul>
                                    {section.dataSecurity.measures.map((measure, idx) => (
                                        <li key={idx}>
                                            <Typography variant="body2">{measure}</Typography>
                                        </li>
                                    ))}
                                </ul>
                                <Typography variant="body2">
                                    Disclaimer: {section.dataSecurity.disclaimer}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    User Rights
                                </Typography>
                                <Typography variant="body2">
                                    Opt-out from Promotional Emails: {section.userRights.optOut.promotionalEmails}
                                </Typography>
                                <Typography variant="body2">
                                    Control Cookies: {section.userRights.optOut.cookies}
                                </Typography>
                                <Typography variant="body2">
                                    Data Requests: {section.userRights.dataRequests.accessOrDelete}
                                </Typography>

                                <Typography variant="h6" gutterBottom>
                                    Modifications
                                </Typography>
                                <Typography variant="body2">
                                    Policy Updates: {section.modifications.policyUpdates}
                                </Typography>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default PrivacyPolice;
