import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Modal } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const AddReviewModal = ({ open, setOpen }) => {

    const [rating, setRating] = useState(0);
    const [headline, setHeadline] = useState('');
    const [review, setReview] = useState('');
    const [images, setImages] = useState([]);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('headline', headline);
        formData.append('review', review);
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
    };

    return (
        <div>
            <Modal sx={{width: '100%'}}  open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" component="h3" gutterBottom>
                        Add A Review
                    </Typography>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Star Rating */}
                        <Box className="star_rating" sx={{ display: 'flex', mb: 2 }}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <IconButton
                                    key={value}
                                    onClick={() => handleRatingClick(value)}
                                    color={value <= rating ? 'warning' : 'default'}
                                >
                                    {value <= rating ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            ))}
                        </Box>

                        {/* Headline */}
                        <TextField
                            label="Headline"
                            fullWidth
                            variant="outlined"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            inputProps={{ maxLength: 25 }}
                            sx={{ mb: 2 }}
                        />

                        {/* Review Text */}
                        <TextField
                            label="Your review"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            inputProps={{ maxLength: 250 }}
                            sx={{ mb: 2 }}
                        />

                        {/* Image Upload */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                Image (Drag and Drop files here or click to browse)
                            </Typography>
                            <input
                                type="file"
                                id="images"
                                name="images[]"
                                accept=".jpg,.jpeg,.png,.gif,.svg"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="images">
                                <Box
                                    sx={{
                                        border: '1px dashed #ccc',
                                        padding: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Drag and Drop files here or click to browse
                                </Box>
                            </label>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ color: "#fff", background: "#bb1f2a", }}
                            onClick={() => setOpen(false)}
                        >
                            Submit Review
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default AddReviewModal;
