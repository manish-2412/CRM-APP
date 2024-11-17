import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Snackbar, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations
import { getCampaignHistory } from '../api'; // Ensure this is the correct import path

const CampaignHistoryPage = () => {
  const [campaignHistory, setCampaignHistory] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage error state

  // Fetch campaign history from API
  useEffect(() => {
    const fetchCampaignHistory = async () => {
      try {
        const response = await getCampaignHistory();
        setCampaignHistory(response.history || []); // Update state with fetched history
        setOpenSnackbar(true); // Show success Snackbar when data is loaded
      } catch (error) {
        console.error('Error fetching campaign history:', error);
        setError('Failed to load campaign history'); // Set error state
      } finally {
        setLoading(false); // Stop loading state
      }
    };
    fetchCampaignHistory();
  }, []);

  // Handle success message visibility
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#fafafa', borderRadius: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
          Campaign History
        </Typography>
      </motion.div>

      {/* Display the table in a Paper container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper sx={{ padding: 3, boxShadow: 3, borderRadius: 2 }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
              <Typography variant="h6">Loading campaign history...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: 'center', padding: 4 }}>
              <Typography variant="h6" color="error">{error}</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaignHistory.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell>{campaign.message}</TableCell> {/* Display campaign message */}
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell>{new Date(campaign.timestamp).toLocaleString()}</TableCell> {/* Format the timestamp */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </motion.div>

      {/* Snackbar for successful API response or actions */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        message="Campaign History Loaded!"
        onClose={handleSnackbarClose}
        sx={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4caf50',
          color: '#fff',
        }}
      />
    </Container>
  );
};

export default CampaignHistoryPage;
