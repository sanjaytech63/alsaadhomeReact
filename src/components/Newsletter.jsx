import { Container } from '@mui/material';
import React from 'react';

const Newsletter = () => {
    return (
        <div style={{ backgroundColor: "#bb1f2a" }} className="text-white py-5">
             <Container maxWidth="lg" sx={{ px: 2 }}>
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h3 style={{fontWeight:"700"}} className="mb-0 text-white text-capitalize">Subscribe to Our Newsletter</h3>
                    </div>
                    <div className="col-md-6">
                        <form
                            className="d-flex mt-3 mt-md-0"
                            method="POST"
                            action="https://www.alsaadhome.com/en/aed/newsletter"
                            acceptCharset="UTF-8"
                            id="newsletter"
                        >
                            <input
                                type="email"
                                name="email"
                                required
                                className="form-control rounded-0 py-3 "
                                placeholder="Enter Email Address"
                            />
                            <button
                                type="submit"
                                className="btn btn-dark rounded-0"
                                name="submit"
                                value="Submit"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Newsletter;
