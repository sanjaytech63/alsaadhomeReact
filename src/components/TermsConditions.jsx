import React from 'react';
import { Container, Grid, Typography,  Box } from '@mui/material';

const TermsConditions = () => {

    const termsData = [
        {
            "title": "Who Are We",
            "content": [
                "Al-Saad Home Company is a company established under the laws of the United Arab Emirates. It manages the website and the Al-Saad Home application for smartphones, enabling users to browse the company's products and request purchases. Al-Saad Home reserves the right to delete, add, or amend any content in the application and website for any reason without referring users, and the company will make every effort to provide the information as accurately as possible.",
                "All terms and conditions of banking transactions, refunds, or disputes apply under the laws of the United Arab Emirates."
            ]
        },
        {
            "title": "Terms and Conditions",
            "content": [
                "This page contains the policy and terms of use of the Al-Saad Home application, and users will be notified in the event of an update or any amendment. The website and application policies and terms and conditions may be changed or updated from time to time to meet requirements and standards. Customers are encouraged to frequently visit these sections for updates regarding website changes."
            ]
        },
        {
            "title": "Privacy Policy",
            "content": [
                "In order to buy any product, the site or application will require your registration and entering your information or registering as a guest without creating an account. This requires entering your information such as contact number, name, address, and credit card. Once you complete the purchase, this means your agreement to the terms and conditions of the website and the smartphone application.",
                "If the purchase is made from your account or as a guest, you are responsible for the accuracy of the information provided and the purchase process.",
                "You are responsible for maintaining the confidentiality of your account and password and preserving the information recorded with us when using your personal computer, electronic device, or smartphone.",
                "Users' data will be used only for the purposes of providing our services, delivering our goods, and informing them of our marketing offers.",
                "The customer may not use the application if they are a minor (less than 18 years old).",
                "All credit/debit card details and personally identifiable information will NOT be stored, sold, shared, rented, or leased to any third parties."
            ]
        },
        {
            "title": "Payment and Purchase",
            "content": [
                "Al-Saad Home provides multiple payment methods: cash on delivery, bank transfer, or electronic payment and installment.",
                "The application and website do not keep any bank data related to the customer at all. The saved data relates only to the name, contact number, address, and email.",
                "If an amount above the amount requested for the purchase was transferred by mistake, Al-Saad Home will refund the excess amount within 14 days after investigating the purchase process.",
                "Once the purchase order is completed by the user, the user must pay all required amounts, including the price of the requested products, VAT, and shipping (if applicable)."
            ]
        },
        {
            "title": "Products and Merchandise",
            "content": [
                "Al-Saad Home seeks to provide the products on the website and the application to be as close to reality as possible in terms of colors, images, and description.",
                "The prices of products, such as events, offers, and discounts, may vary from time to time, so users should visit the website and application to view the latest goods and prices.",
                "If the purchased goods are unavailable in stock, the customer will be contacted to inform them of the unavailability and to obtain approval to replace or delete the item from the invoice."
            ]
        },
        {
            "title": "Shipping",
            "content": [
                "To complete the purchase process, you are responsible for providing all required data correctly and accurately.",
                "Al-Saad Home is not responsible for delays in shipping caused by inaccurate information or lack of customer response.",
                "Orders typically take 2 to 4 working days to arrive, though it may extend longer for certain products like mattresses.",
                "If any issue arises with the product during shipping, Al-Saad Home will replace the product at no additional cost.",
                "Products are carefully inspected before being packed and shipped to ensure there are no deficiencies.",
                "Al-Saad Home offers various shipping methods: same-day shipping, next-day shipping, and normal shipping (2-4 days). Some orders may take up to 7 days depending on the products."
            ]
        },
        {
            "title": "Return & Exchange Policies",
            "content": [
                "Al-Saad Home provides both return & exchange services according to the company's policy.",
                "Return is accepted within 3 days, and exchange is accepted within 7 days of purchase, provided that:",
                "The original invoice is available.",
                "The products are in their original condition, unopened, and unused.",
                "The original purchase invoice must be presented for either a return or exchange.",
                "If return conditions are met, the amount will be refunded as credit to the customer's e-wallet, which can be used within 6 months of the return date.",
                "For health and safety reasons, pillows and towels cannot be exchanged or returned."
            ]
        }
    ]

    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
            <Container maxWidth="lg" sx={{ py: 5 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12}>
                        {termsData.map((section, index) => (
                            <Box key={index} mt={2} mb={4}>
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
