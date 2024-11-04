import React from 'react';
import {
    Typography,
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Paper,
    Button,
    useMediaQuery
} from '@mui/material';
import Loading from '../components/Loading';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const Todolist = ({ todo, loading, onDelete, handleToggle, onEdit }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Paper elevation={3} sx={{ padding: 3, mt: 3 }}>
                {todo.length > 0 ? (
                    <List>
                        {todo.map((item) => (
                            <ListItem
                                key={item._id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    alignItems: isMobile ? 'flex-start' : 'center',
                                    mb: 2,
                                }}
                                divider
                            >
                                <Box display="flex" alignItems="center">
                                    <input
                                        type="checkbox"
                                        checked={item.isComplete}
                                        onChange={() => handleToggle(item._id)}
                                    />
                                    <ListItemText
                                        sx={{
                                            display: '-webkit-box',
                                            textTransform: 'capitalize',
                                            textDecoration: item.isComplete ? 'line-through' : 'none',
                                            overflow: 'hidden',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            wordBreak: 'break-all',
                                            whiteSpace: 'normal',
                                            textOverflow: 'ellipsis',
                                            marginLeft: 2,
                                            my: { xs: 2, sm: 0 },
                                        }}
                                        primary={<Typography variant="h6">{item.title}</Typography>}
                                        secondary={
                                            <Typography variant="body2" color="textSecondary">
                                                {item.description || 'No description provided'}
                                            </Typography>
                                        }
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" gap={2} justifyContent={ 'flex-end'} sx={{ flexDirection: isMobile ? 'row' : 'row', width: '100%' }}>
                                    <Typography
                                        onClick={() => onDelete(item._id)}
                                        variant="outlined"
                                        color="error"
                                        sx={{
                                            borderRadius: '50%',
                                            boxShadow: 2,
                                            cursor: 'pointer',
                                            padding: 1,
                                            '&:hover': { backgroundColor: '#bb1f2a', color: '#fff' },
                                        }}
                                    >
                                        <RiDeleteBin6Line size={20} />
                                    </Typography>
                                    <Typography
                                        onClick={() => onEdit(item)}
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            boxShadow: 2,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            padding: 1,
                                            '&:hover': { backgroundColor: '#bb1f2a', color: '#fff' },
                                        }}
                                    >
                                        <FaRegEdit size={20} />
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" color="textSecondary" align="center">
                        No todos available.
                    </Typography>
                )}
            </Paper>
        </div>
    );
};

export default Todolist;
