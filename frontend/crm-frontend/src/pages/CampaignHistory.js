import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import apiMethods from '../api';  // Import your apiMethods to interact with the backend

const CampaignHistory = ({ segmentId }) => {
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch campaign history when the component mounts
  useEffect(() => {
    const fetchCampaignHistory = async () => {
      try {
        const response = await apiMethods.getCampaignHistory(segmentId);  // Get campaign history by segmentId
        setHistory(response.history);  // Store history data in state
        setLoading(false);  // Stop loading
      } catch (error) {
        console.error('Error fetching campaign history:', error);
        setLoading(false);
      }
    };

    fetchCampaignHistory();  // Fetch campaign history
  }, [segmentId]);  // Re-fetch if segmentId changes

  // Show loading spinner while data is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  // If no data is available, show a message
  if (!history || history.length === 0) {
    return <div>No campaign history available</div>;
  }

  return (
    <div>
      <h2>Campaign History</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Total Messages</TableCell>
              <TableCell>Sent Messages</TableCell>
              <TableCell>Failed Messages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((entry) => (
              <TableRow key={entry.log_id}>
                <TableCell>{entry.message}</TableCell>
                <TableCell>{entry.status}</TableCell>
                <TableCell>{new Date(entry.timestamp).toLocaleString()}</TableCell>  {/* Format timestamp */}
                <TableCell>{entry.totalMessages}</TableCell>
                <TableCell>{entry.sentMessages}</TableCell>
                <TableCell>{entry.failedMessages}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CampaignHistory;
