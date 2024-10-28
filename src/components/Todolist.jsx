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

const Todolist = ({ todo, loading, onDelete, handleToggle, onEdit }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
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
                                        alignItems: 'center'
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
                                                textTransform: 'capitalize',
                                                textDecoration: item.isComplete ? 'line-through' : 'none',
                                                marginLeft: 2
                                            }}
                                            primary={item.title}
                                            secondary={item.description || 'No description provided'}
                                        />
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={2} sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
                                        <Button onClick={() => onDelete(item._id)} variant="contained" color="error">
                                            Delete
                                        </Button>
                                        <Button onClick={() => onEdit(item)} variant="contained" color="primary">
                                            Update
                                        </Button>
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
            )}
        </div>
    );
};

export default Todolist;
