import React, { useState } from 'react'; // Importing React and useState hook for managing state
import axios from 'axios';  // Importing Axios for making HTTP requests
import {
  TextField,  // MUI TextField for input fields
  Button,  // MUI Button for submitting the form
  Typography,  // MUI Typography for text styling
  Paper,  // MUI Paper for a styled container
  Box,  // MUI Box for layout and styling
  Alert,  // MUI Alert for error messages
} from '@mui/material';

const CustomerForm = ({ onCustomerAdded }) => {
  // Setting up the initial state for form data and error messages
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    total_spending: '',
    last_visit_date: '',
  });
  const [error, setError] = useState('');  // State for storing error messages

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructure name and value from the event target
    setFormData({
      ...formData,  // Keep the previous values intact
      [name]: value,  // Update the field that changed
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior (page reload)
    try {
      // Make the API request to add the customer
      const response = await axios.post('http://localhost:3000/addCustomer', formData);
      alert(response.data.message);  // Show a success message from the API

      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        total_spending: '',
        last_visit_date: '',
      });
      setError('');  // Clear any previous error messages

      // Notify the parent component (if provided) that a customer has been added
      if (onCustomerAdded) onCustomerAdded();
    } catch (err) {
      // If there's an error, set the error message state to display an error alert
      setError(err.response?.data?.message || 'An error occurred while adding the customer.');
    }
  };

  return (
    // Paper component to provide a nice box for the form with a shadow effect
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      {/* Header for the form */}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Add Customer
      </Typography>

      {/* Display error message if there is any error */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      {/* Form container using MUI Box */}
      <Box
        component="form"
        onSubmit={handleSubmit}  // Trigger form submission when the user submits the form
        sx={{
          display: 'flex',
          flexDirection: 'column',  // Stack the form elements vertically
          gap: 2,  // Space between each form element
        }}
      >
        {/* Name Input Field */}
        <TextField
          label="Name"
          name="name"  // The field name for the customer name
          value={formData.name}  // Bind the input value to the state
          onChange={handleChange}  // Update state when input changes
          variant="outlined"  // Outlined style for the text field
          fullWidth  // Makes the field take full width of the container
          required  // This field is required to submit the form
        />

        {/* Email Input Field */}
        <TextField
          label="Email"
          name="email"  // The field name for the email
          value={formData.email}  // Bind the input value to the state
          onChange={handleChange}  // Update state when input changes
          variant="outlined"
          type="email"  // Enforces email validation
          fullWidth
          required
        />

        {/* Phone Input Field */}
        <TextField
          label="Phone"
          name="phone"  // The field name for the phone number
          value={formData.phone}  // Bind the input value to the state
          onChange={handleChange}  // Update state when input changes
          variant="outlined"
          type="tel"  // Enforces phone number validation
          fullWidth
          required
        />

        {/* Total Spending Input Field */}
        <TextField
          label="Total Spending"
          name="total_spending"  // The field name for the total spending
          value={formData.total_spending}  // Bind the input value to the state
          onChange={handleChange}  // Update state when input changes
          variant="outlined"
          type="number"  // Ensures numeric input for spending
          fullWidth
          required
        />

        {/* Last Visit Date Input Field */}
        <TextField
          label="Last Visit Date"
          name="last_visit_date"  // The field name for the last visit date
          value={formData.last_visit_date}  // Bind the input value to the state
          onChange={handleChange}  // Update state when input changes
          variant="outlined"
          type="date"  // Date input type for picking a date
          InputLabelProps={{
            shrink: true,  // Ensures the label doesn't overlap with the date picker
          }}
          fullWidth
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"  // Makes the button styled as a filled button
          color="primary"  // Primary color for the button
          fullWidth  // Makes the button take full width of the container
          sx={{ padding: 1 }}  // Add some padding inside the button
        >
          Add Customer  {/* Text on the submit button */}
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomerForm;  // Export the form component for use in other parts of the application
