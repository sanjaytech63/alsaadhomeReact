import React, { useState, useEffect } from 'react';
import ApiService from '../auth/ApiService/ApiService';
import { toast, ToastContainer } from 'react-toastify';
import { Box, Button, Container, TextField, Typography, useMediaQuery } from '@mui/material';
import Todolist from './Todolist';
import todoImg from "../../src/assets/svgtodo.svg";

const Todo = () => {
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState({ title: '', description: '', isComplete: true });
    const [todo, setTodo] = useState([]);
    const [editId, setEditId] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const addTodo = async () => {
        try {
            setLoading(true);
            const response = await ApiService.addTodo(add);
            toast.success(response.data.message);
            setTodo([...todo, response.data.data]);
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add todo.");
        } finally {
            setLoading(false);
        }
    };

    const getTodo = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getTodo();
            setTodo(response.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load todos.");
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id) => {
        try {
            setLoading(true);
            const response = await ApiService.updateTodo(id, add);
            if (response?.data) {
                toast.success(response.data.message);
                setTodo(todo.map((item) =>
                    item._id === id ? { ...response.data.data } : item
                ));
                resetForm();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update todo.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (item) => {
        setEditId(item._id);
        setAdd({ title: item.title, description: item.description, isComplete: item.isComplete });
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await ApiService.deleteTodo(id);
            toast.success(response.data.message);
            setTodo(todo.filter((item) => item._id !== id));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete todo.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAdd((prevAdd) => ({
            ...prevAdd,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editId ? updateTodo(editId) : addTodo();
    };

    const resetForm = () => {
        setAdd({ title: '', description: '', isComplete: false });
        setEditId(null);
    };

    const handleToggle = async (id) => {
        try {
            const updatedTodos = todo.map((item) => {
                if (item._id === id) {
                    return { ...item, isComplete: !item.isComplete };
                }
                return item;
            });
            setTodo(updatedTodos);
        } catch (error) {
            toast.error("Failed to update todo.");
        }
    };

    useEffect(() => {
        getTodo();
    }, []);

    return (
        <Container maxWidth="md" sx={{ minHeight: '100vh', py: 5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img style={{ width: "50%", height: "50%", objectFit: "cover" }} src={todoImg} alt="todoImg" />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2,
                    mb: 4,
                    my: 4,
                }}
            >
                <TextField
                    label="Add Todo Title"
                    variant="outlined"
                    size="small"
                    name="title"
                    onChange={handleChange}
                    value={add.title}
                    sx={{ flex: 1 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    size="small"
                    name="description"
                    onChange={handleChange}
                    value={add.description}
                    sx={{ flex: 1, ml: isMobile ? 0 : 2 }}
                />
                <Button onClick={handleSubmit} variant="contained" sx={{ background: "#333", color: "#fff", padding: "7px 16px" }}>
                    {editId ? "Update Todo" : "Add Todo"}
                </Button>
            </Box>
            <Todolist
                todo={todo}
                loading={loading}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                handleToggle={handleToggle}
            />
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
        </Container>
    );
};

export default Todo;
