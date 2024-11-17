import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Hook for navigation
import axios from 'axios';  // Axios for making HTTP requests

const SignUpPage = () => {
  // State for managing form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();  // Hook for redirecting to another page after successful signup

  // Handle input changes and update corresponding state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value  // Dynamically set the value for each field based on its name
    });
  };

  // Handle form submission (signup request)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    try {
      // Make a POST request to the backend to register the user
      const response = await axios.post('http://localhost:3000/api/signup', formData);
      if (response.data.success) {  // If registration is successful
        alert('Registration successful!');  // Display success message
        navigate('/login');  // Redirect to the login page
      }
    } catch (error) {
      // Handle errors during the signup process
      console.error('Error signing up:', error);
      alert('Error during signup. Please try again!');  // Display error message
    }
  };

  return (
    <Container>  {/* Main container for the signup page */}
      <Paper sx={{ padding: 2 }}>  {/* Paper component for background styling */}
        <Typography variant="h4" gutterBottom>
          Sign Up  {/* Title of the page */}
        </Typography>
        <form onSubmit={handleSubmit}>  {/* Form element for handling submission */}
          {/* Username input */}
          <TextField
            label="Username"
            name="username"
            value={formData.username}  // Bind value to state
            onChange={handleChange}  // Update state on input change
            fullWidth
            required  // Make field mandatory
            sx={{ marginBottom: 2 }}  // Apply spacing below the input
          />
          {/* Email input */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}  // Bind value to state
            onChange={handleChange}  // Update state on input change
            fullWidth
            required  // Make field mandatory
            sx={{ marginBottom: 2 }}  // Apply spacing below the input
          />
          {/* Password input */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}  // Bind value to state
            onChange={handleChange}  // Update state on input change
            fullWidth
            required  // Make field mandatory
            sx={{ marginBottom: 2 }}  // Apply spacing below the input
          />
          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth>
            Sign Up  {/* Button text */}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
