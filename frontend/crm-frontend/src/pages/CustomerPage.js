import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm'; // Import the CustomerForm component
import CustomerList from '../components/CustomerList'; // Import the CustomerList component
import { Container, Typography, Paper, Snackbar, Box } from '@mui/material';
import { getCustomers } from '../api'; // Import the function to fetch customers from API
import { motion } from 'framer-motion'; // Import motion for animations

const CustomerPage = () => {
  // State to hold the list of customers
  const [customers, setCustomers] = useState([]);
  
  // State to control the visibility of the success snackbar
  const [customerAdded, setCustomerAdded] = useState(false);

  // Fetch customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await getCustomers(); // Make API call to fetch customers
      setCustomers(response.customers || []); // Update customers state with the response
    } catch (error) {
      console.error('Error fetching customers:', error); // Log any error encountered during fetch
    }
  };

  // Handle the addition of a new customer and update the customer list
  const handleCustomerAdded = async () => {
    try {
      await fetchCustomers(); // Refetch the updated list of customers after adding a new one
      setCustomerAdded(true); // Show success message
      setTimeout(() => setCustomerAdded(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      console.error('Error handling customer added:', error); // Log any error during the process
    }
  };

  // Fetch customers when the component mounts
  useEffect(() => {
    fetchCustomers(); // Fetch customers on component mount
  }, []);

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
      
      {/* Page Title with motion animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial state for animation
        animate={{ opacity: 1, y: 0 }} // Final state for animation
        transition={{ duration: 0.7 }} // Duration of the animation
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Customers Management
        </Typography>
      </motion.div>

      {/* Add Customer Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper sx={{ padding: 3, marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
          <CustomerForm onCustomerAdded={handleCustomerAdded} /> {/* Pass handleCustomerAdded as prop to CustomerForm */}
        </Paper>
      </motion.div>

      {/* Success Snackbar after customer is added */}
      {customerAdded && (
        <Snackbar
          open={customerAdded} // Show the Snackbar if customerAdded is true
          autoHideDuration={3000} // Snackbar auto hides after 3 seconds
          message="Customer added successfully!"
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4caf50', // Green background for success
            color: '#fff', // White text color
          }}
        />
      )}

      {/* List of Customers Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <CustomerList customers={customers} /> {/* Pass customers state to CustomerList */}
        </Box>
      </motion.div>
    </Container>
  );
};

export default CustomerPage;
