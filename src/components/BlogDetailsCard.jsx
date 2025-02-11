import { Box, Typography, TextField, Grid, Button, CardMedia, ListItem, ListItemText, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import { BsGrid } from "react-icons/bs";
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/helper';
import { Formik } from "formik";
import * as Yup from "yup";
import { blogApi } from '../utils/services/blogServices';

const BlogDetailsCard = ({ blog }) => {
    const [userComment, setUserComment] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        message: Yup.string().required('Message is required'),
    });

    const addBlogComment = async (values) => {
        try {
            const reqBody = {
                name: values.name,
                email: values.email,
                message: values.message
            }
            setLoading(true);
            const response = await blogApi.addBlogCommentApi(reqBody);
            if (response && response.status === 200) {
                setLoading(false);
                showToast("success", response.message, "success");
                setUserComment({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            console.log(error, "error in add blog comment")
            setLoading(false);
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserComment((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    return (
        <div>
            {blog?.blogs && (
                <Typography
                    sx={{
                        fontSize: { xs: "22px", md: "30px" },
                        color: "#292b2c",

                        fontWeight: "600",
                    }}
                >
                    {blog.blogs?.title_blog}
                </Typography>
            )}
            {blog?.blogs && (
                <Box className='d-flex  gap-3 m-0 p-0 my-4'>
                    <Typography sx={{
                        color: "#292b2c", cursor: "pointer", ":hover": {
                            color: "#bb1f2a"
                        }
                    }}>
                        <span style={{ color: "#bb1f2a" }}><DateRangeIcon /></span>  {blog.blogs?.created_at}
                    </Typography>
                    <Typography sx={{
                        color: "#292b2c", cursor: "pointer", ":hover": {
                            color: "#bb1f2a"
                        }
                    }}>
                        <span style={{ color: "#bb1f2a" }}><TextsmsIcon /></span>  {blog.blogs?.comment_count}
                    </Typography>
                </Box>
            )}
            {blog?.blogs && (
                <img
                    src={blog?.blogs?.image}
                    alt={blog?.blogs?.title_blog}
                    style={{
                        width: '100%',
                        maxHeight: '400px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            )}

            <Typography
                sx={{
                    fontSize: "16px",
                    color: "#6c757d !important",
                    mt: 3,
                    fontWeight: "500",
                }}
            >
                {typeof blog?.blogs?.description === 'string' ? parse(blog.blogs.description) : ''}
            </Typography>


            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }} >
                            {blog?.blogs?.tags?.map((tag, index) => (
                                <Link to={`/blog?tag=${tag}`} className="link-none" key={index}>
                                    <ListItem
                                        sx={{
                                            backgroundColor: "#f7f7f7",
                                            display: "flex",

                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            padding: "0px !important",
                                            my: 1,
                                            ":hover": { color: "#bb1f2a" },
                                            cursor: "pointer",
                                        }}
                                    >
                                        <ListItemText sx={{ px: 1, py: "4px", }} primary={tag} />
                                    </ListItem>
                                </Link>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Share Section */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center" }}>
                            <span style={{ backgroundColor: "#1877f2", padding: "4px 8px", borderRadius: "4px", color: "#fff" }}><FaFacebookF /></span>
                            <span style={{ backgroundColor: "#1877f2", padding: "4px 8px", borderRadius: "4px", color: "#fff" }}><FaTwitter /></span>
                            <span style={{ backgroundColor: "#12af0a", padding: "3px", borderRadius: "4px", color: "#fff" }}><WhatsAppIcon /> </span>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ backgroundColor: "#f7f7f7", padding: "1.5rem", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Grid container spacing={3}>
                    {/* Previous Button Section */}
                    <Grid item xs={12} md={5} display="flex" justifyContent="center" alignItems="center">
                        <Box sx={{
                            fontSize: "14px", color: "#292b2c", display: "flex", gap: 1, alignItems: "center", ":hover": {
                                color: "#bb1f2a", cursor: "pointer"
                            }
                        }}>

                            <Link to={`/blog/${blog?.navigation_data?.previous?.slug}`} className='link-none link-hover d-flex gap-4 align-items-center' >
                                <span><WestIcon /></span>
                                <span className="d-sm-block d-none">{blog?.navigation_data?.previous?.title}</span>
                            </Link>
                        </Box>
                    </Grid>

                    {/* Center Section (Grid Icon) */}
                    <Grid item xs={12} md={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography sx={{
                            ":hover": {
                                color: "#bb1f2a", cursor: "pointer"
                            }
                        }}>
                            <BsGrid size={20} />
                        </Typography>
                    </Grid>

                    {/* Next Button Section */}
                    <Grid item xs={12} md={5} display="flex" justifyContent="center" alignItems="center">
                        <Box sx={{
                            fontSize: "14px", color: "#292b2c", display: "flex", gap: 1, alignItems: "center", ":hover": {
                                color: "#bb1f2a", cursor: "pointer"
                            }
                        }}>
                            <Link to={`/blog/${blog?.navigation_data?.next?.slug}`} className='link-none link-hover  d-flex  align-items-center' >
                                <span className="d-sm-block d-none align-self-end">{blog?.navigation_data?.next?.title}</span>
                                <span><EastIcon /></span>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ border: "solid 1px #eee", my: 4, padding: "1.5rem", display: "flex", alignItems: "center", gap: 2 }}>
                <img style={{ maxWidth: "100px" }} src="https://staging-alsaadhome.s3.us-east-2.amazonaws.com/assets/images/user.png" alt="blog-avtar" />
                <span style={{ color: "#687188", fontSize: "14px" }} >{blog?.author_name || "Author"}</span>
            </Box>
            <Typography sx={{ my: 4, color: "#292b2c", fontWeight: "600" }}>
                ({blog?.comment})  comment
            </Typography >
            <Box sx={{ my: 1 }}>
                {blog?.blog_comment && blog?.blog_comment.map((comment, index) => (
                    <>
                        <Grid container spacing={2} >
                            {/* Avatar */}
                            <Grid item>
                                <CardMedia
                                    sx={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    loading="lazy"
                                    component="img"
                                    src="https://cdn.pixabay.com/photo/2021/11/25/09/27/building-6822998_1280.jpg"
                                    alt="blog-avatar"
                                />
                            </Grid>

                            {/* Text Content */}
                            <Grid item xs>
                                <Typography
                                    sx={{
                                        color: "#292b2c",
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        ":hover": { color: "#bb1f2a", cursor: "pointer" },
                                    }}
                                >
                                    {comment?.coustmer_name}
                                </Typography>
                                <Typography
                                    sx={{
                                        my: 1,
                                        color: "#687188",
                                        fontSize: "14px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {comment?.comment_date}
                                </Typography>
                                <Typography
                                    sx={{ my: 1, color: "#687188", fontSize: "16px" }}
                                >
                                    {comment?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                    </>
                ))}
            </Box >
            <Formik
                initialValues={userComment}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    await addBlogComment(values);
                    resetForm();
                }}
                enableReinitialize
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    handleSubmit,
                }) => (
                    <Box component="form" onSubmit={handleSubmit}>  
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    name="name"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    label="Your Name"
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    label="Enter Email"
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="message"
                                    type="text"
                                    value={values.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    label="Enter Message"
                                    error={touched.message && Boolean(errors.message)}
                                    helperText={touched.message && errors.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"  
                                    sx={{
                                        backgroundColor: "#bb1f2a",
                                        color: "#fff",
                                        py: 2,
                                        px: 4,
                                    }}
                                >
                                    {loading ? (
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
                                            <CircularProgress color="#333" size={24} /> Submitting...
                                        </Box>
                                    ) : "Submit"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Formik>

        </div>
    );
}

export default BlogDetailsCard;
