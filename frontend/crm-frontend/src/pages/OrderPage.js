import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Snackbar } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import api from '../api';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch orders on component mount
  const fetchOrders = async () => {
    try {
      const response = await api.getOrders(); // Fetch orders from the API
      setOrders(response.orders || []); // Update state with fetched orders
    } catch (error) {
      console.error('Error fetching orders:', error);
      setSnackbarMessage('Error fetching orders. Please try again.');
      setSnackbarOpen(true);
    }
  };

  // Handle order added and trigger message display
  const handleOrderAdded = (newOrder) => {
    setSnackbarMessage('Order added successfully!');
    setSnackbarOpen(true); // Open the snackbar
    setTimeout(() => setSnackbarOpen(false), 3000); // Close snackbar after 3 seconds
    fetchOrders(); // Fetch updated list of orders
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders when component mounts
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Orders Management
        </Typography>
      </motion.div>

      {/* Order Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper sx={{ padding: 3, marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
          <OrderForm onOrderAdded={handleOrderAdded} />
        </Paper>
      </motion.div>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: snackbarMessage.includes('Error') ? '#f44336' : '#4caf50', // Red for errors, Green for success
          color: '#fff',
        }}
      />

      {/* List of Orders */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <OrderList orders={orders} />
        </Box>
      </motion.div>
    </Container>
  );
};

export default OrderPage;
