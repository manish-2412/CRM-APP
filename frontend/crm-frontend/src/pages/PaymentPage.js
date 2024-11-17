import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Snackbar } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations
import PaymentForm from '../components/PaymentForm';
import PaymentList from '../components/PaymentList';
import api from '../api';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch payments on component mount
  const fetchPayments = async () => {
    try {
      const response = await api.get('/viewAllPayments'); // API call to fetch payments
      setPayments(response.payments || []); // Update state with fetched payments
    } catch (error) {
      console.error('Error fetching payments:', error);
      setSnackbarMessage('Error fetching payments. Please try again.');
      setSnackbarOpen(true);
    }
  };

  // Handle payment added success message and refresh list
  const handlePaymentAdded = () => {
    setSnackbarMessage('Payment added successfully!');
    setSnackbarOpen(true); // Open the snackbar
    setTimeout(() => setSnackbarOpen(false), 3000); // Close snackbar after 3 seconds
    fetchPayments(); // Fetch updated list of payments
  };

  useEffect(() => {
    fetchPayments(); // Fetch payments when component mounts
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Payments Management
        </Typography>
      </motion.div>

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper sx={{ padding: 3, marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
          <PaymentForm onPaymentAdded={handlePaymentAdded} />
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

      {/* List of Payments */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <PaymentList payments={payments} />
        </Box>
      </motion.div>
    </Container>
  );
};

export default PaymentPage;
