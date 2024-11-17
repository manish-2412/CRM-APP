import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';  // Animation library for smoother transitions
import api from '../api';  // Correct relative path for API calls

const SendMessageComponent = () => {
  // State hooks for managing input fields and response handling
  const [segmentId, setSegmentId] = useState('');  // Stores the Segment ID
  const [messageTemplate, setMessageTemplate] = useState('');  // Stores the message template
  const [responseMessage, setResponseMessage] = useState('');  // Stores the response message (success/error)
  const [openSnackbar, setOpenSnackbar] = useState(false);  // Manages snackbar visibility
  const [loading, setLoading] = useState(false);  // Manages loading state during API call

  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (!segmentId || !messageTemplate) {  // Check if inputs are filled
      setResponseMessage('Please fill in both fields');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);  // Set loading to true while API call is in progress
    try {
      const response = await api.post('/sendMessages', {  // Send POST request to the backend
        segment_id: segmentId,
        messageTemplate: messageTemplate,
      });
      setResponseMessage(response.data.message || 'Message sent successfully!');
      setOpenSnackbar(true);  // Show success message
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Error sending message');
      setOpenSnackbar(true);  // Show error message if request fails
    } finally {
      setLoading(false);  // Set loading to false after request completes
    }
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);  // Close snackbar when the timeout is reached
  };

  return (
    <Container maxWidth="sm" sx={{ padding: 4 }}>
      {/* Animated header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
          Send Message to Segment
        </Typography>
      </motion.div>

      <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
        {/* Segment ID input */}
        <TextField
          fullWidth
          label="Segment ID"
          value={segmentId}
          onChange={(e) => setSegmentId(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Message template input */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Message Template"
          value={messageTemplate}
          onChange={(e) => setMessageTemplate(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Send message button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            disabled={loading}  // Disable button when loading
            sx={{ width: '50%' }}
          >
            {loading ? 'Sending...' : 'Send Message'}  {/* Display loading state */}
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for displaying success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={responseMessage}  // Display response message
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: responseMessage.includes('Error') ? '#f44336' : '#4caf50',  // Red for error, green for success
          color: '#fff',
        }}
      />
    </Container>
  );
};

export default SendMessageComponent;
