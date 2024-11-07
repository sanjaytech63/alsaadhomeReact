import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Button, IconButton, Modal } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import { MdCloudUpload } from "react-icons/md";
import { showToast } from '../utils/helper';

const AddReviewModal = ({ open, setOpen }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        headline: "",
        review: "",
        images: [],
    });
    const fileInputRef = useRef(null);

    const handleRatingClick = (value) => {
        setFormData((prevData) => ({ ...prevData, rating: value }));
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const fileURLs = selectedFiles.map((file) => URL.createObjectURL(file));
        if (formData.images.length + fileURLs.length <= 4) {
            setFormData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...fileURLs],
            }));
        } else {
            showToast('error', "You can only select up to 4 images!");
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        setFormData({
            rating: 0,
            headline: "",
            review: "",
            images: [],
        });
    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleCloge = (e) => {
        const imageURL = e;
        const updatedImages = formData.images.filter((image) => image !== imageURL);
        setFormData({
            ...formData,
            images: updatedImages,
        });
    };


    return (
        <div>
            <Modal sx={{ width: '100%', maxHeight: '90vh', overflowY: 'auto' }} open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 'auto' },
                        bgcolor: 'background.paper',
                        my: 5,
                        boxShadow: 24,
                        px: 4,
                        py: 2,
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
                            Add A Review
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpen(false)}
                            sx={{ color: "#292b2c" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Star Rating */}
                        <Box className="star_rating" sx={{ display: 'flex', mb: 2 }}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <IconButton
                                    key={value}
                                    onClick={() => handleRatingClick(value)}
                                    color={value <= formData.rating ? 'warning' : 'default'}
                                >
                                    {value <= formData.rating ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            ))}
                        </Box>

                        {/* Headline */}
                        <TextField
                            label="Headline"
                            name="headline"
                            fullWidth
                            variant="outlined"
                            value={formData.headline}
                            onChange={handleChange}
                            inputProps={{ maxLength: 25 }}
                            sx={{ mb: 2 }}
                        />

                        {/* Review Text */}
                        <TextField
                            label="Your review"
                            name="review"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={formData.review}
                            onChange={handleChange}
                            inputProps={{ maxLength: 250 }}
                            sx={{ mb: 2 }}
                        />

                        {/* Image Upload */}
                        <Box sx={{ mb: 2, width: "100% ", }}>
                            <Typography variant="body1" gutterBottom>
                                Image (Drag and Drop files here or click to browse)
                            </Typography>
                            <input
                                type="file"
                                id="images"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none', width: "100%" }}
                                onChange={handleFileChange}
                                multiple
                            />
                            <Box

                                sx={{
                                    border: '1px dashed #ccc',
                                    justifyContent: "center",
                                    display: "flex",
                                    padding: "35px ",
                                    width: "100%",
                                    cursor: 'pointer',
                                }}
                            >
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    {
                                        formData.images.length > 0 ? (
                                            formData.images.map((image, index) => (
                                                <Box sx={{ position: "relative" }}>
                                                    <IconButton sx={{ cursor: 'pointer',padding:"4px" ,backgroundColor: "#eee", borderRadius: "50%", position: "absolute", top: "-13px", right: "-10px", }} onClick={() =>handleCloge(image)}>
                                                        <CloseIcon sx={{ color: "#292b2c", fontSize: "15px" }} />
                                                    </IconButton>
                                                    <img key={index} src={image} alt="Selected Image" style={{ width: "50px", height: "50px", objectFit: "cover", }} />
                                                </Box>
                                            ))
                                        ) : (<Box>
                                            <MdCloudUpload onClick={handleIconClick} style={{ color: "#bb1f2a", }} size={40} />
                                        </Box>)
                                    }
                                </Box>

                            </Box>
                        </Box>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ color: "#fff", background: "#bb1f2a" }}
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
