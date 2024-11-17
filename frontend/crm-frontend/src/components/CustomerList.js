import React, { useState, useEffect } from 'react';  // Import React and hooks for state and side effects
import axios from 'axios';  // Import Axios for making HTTP requests
import { Container, Typography, Paper, List, ListItem, ListItemText, IconButton, Snackbar } from '@mui/material';  // Import MUI components
import DeleteIcon from '@mui/icons-material/Delete';  // Import DeleteIcon for the delete button

const CustomerList = () => {
  // State management
  const [customers, setCustomers] = useState([]);  // Stores the list of customers
  const [error, setError] = useState('');  // Stores any error message that might occur
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Controls the visibility of the success Snackbar

  // useEffect hook to fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch customers from the API
        const response = await axios.get('http://localhost:3000/viewAllCustomers');
        setCustomers(response.data.customers);  // Store customers in state
      } catch (err) {
        setError('Error fetching customers');  // Set error message if the API call fails
      }
    };

    fetchCustomers();  // Call the function to fetch customers
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  // Handle the delete action for a customer
  const handleDelete = async (customerId) => {
    try {
      // Make an API call to delete the customer by their ID
      await axios.delete(`http://localhost:3000/deleteCustomer/${customerId}`);
      
      // Remove the deleted customer from the list of customers in the state
      setCustomers(customers.filter(customer => customer.customer_id !== customerId));

      // Show success Snackbar after deletion
      setOpenSnackbar(true);
    } catch (err) {
      setError('Error deleting customer');  // Set error message if the API call fails
    }
  };

  return (
    // Container to hold the entire component
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      {/* Title for the customer list page */}
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Customer List
      </Typography>

      {/* Display any error message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Paper component for styling the customer list */}
      <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
        {/* MUI List to display the customers */}
        <List>
          {/* Map through the customers array and create a ListItem for each customer */}
          {customers.map(customer => (
            <ListItem
              key={customer.customer_id}  // Unique key for each customer
              sx={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid #ddd' }}
            >
              {/* Display customer name and their total spending */}
              <ListItemText 
                primary={`${customer.name}`}
                secondary={`ID: ${customer.customer_id} | Total Spending: $${customer.total_spending}`}  // Display customer ID and total spending
              />
              {/* IconButton for deleting a customer */}
              <IconButton
                color="error"  // Set the button color to red (error color)
                onClick={() => handleDelete(customer.customer_id)}  // Call handleDelete when the button is clicked
                aria-label="delete"  // Accessibility label
              >
                <DeleteIcon />  {/* Delete icon */}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Snackbar to show a success message after deletion */}
      <Snackbar
        open={openSnackbar}  // Controlled by openSnackbar state
        autoHideDuration={3000}  // Snackbar will hide after 3 seconds
        message="Customer deleted successfully"  // The message displayed in the Snackbar
        onClose={() => setOpenSnackbar(false)}  // Close Snackbar when the timer ends
        sx={{ bottom: 20, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#4caf50' }}  // Positioning and styling
      />
    </Container>
  );
};

export default CustomerList;
