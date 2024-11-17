import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Snackbar } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations
import SegmentForm from '../components/SegmentForm';
import SegmentList from '../components/SegmentList';
import api from '../api';

const SegmentPage = () => {
  const [segments, setSegments] = useState([]); // State to store the list of segments
  const [segmentAdded, setSegmentAdded] = useState(false); // State to track if a segment is added

  // Fetch segments when the component mounts
  const fetchSegments = async () => {
    try {
      const response = await api.get('/viewAllSegments'); // Fetch segments from the API
      setSegments(response.segments || []); // Update the state with fetched segments
    } catch (error) {
      console.error('Error fetching segments:', error); // Log error if API request fails
    }
  };

  // Handle adding a new segment and showing the success message
  const handleSegmentAdded = () => {
    setSegmentAdded(true); // Show success message
    setTimeout(() => setSegmentAdded(false), 3000); // Reset the success message after 3 seconds
    fetchSegments(); // Fetch the updated list of segments
  };

  useEffect(() => {
    fetchSegments(); // Fetch segments when the component mounts
  }, []); // Empty dependency array ensures this runs once

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Segments Management
        </Typography>
      </motion.div>

      {/* Segment Form for adding new segments */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper sx={{ padding: 3, marginBottom: 4, boxShadow: 3, borderRadius: 2 }}>
          <SegmentForm onSegmentAdded={handleSegmentAdded} />
        </Paper>
      </motion.div>

      {/* Snackbar for success message when a segment is added */}
      {segmentAdded && (
        <Snackbar
          open={segmentAdded}
          autoHideDuration={3000}
          message="Segment added successfully!"
          sx={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#4caf50',
            color: '#fff',
          }}
        />
      )}

      {/* List of Segments */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <SegmentList segments={segments} />
        </Box>
      </motion.div>
    </Container>
  );
};

export default SegmentPage;
