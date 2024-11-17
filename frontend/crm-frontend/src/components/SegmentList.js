import React, { useState, useEffect } from 'react';  // Importing React and hooks
import axios from 'axios';  // Importing Axios for HTTP requests
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';  // Importing Material UI components for table layout

const SegmentList = () => {
  // State hook to store the segments data
  const [segments, setSegments] = useState([]);

  // useEffect hook to fetch segments when the component mounts
  useEffect(() => {
    const fetchSegments = async () => {
      try {
        // Making an API call to fetch segments from the backend
        const response = await axios.get('http://localhost:3000/api/getSegments');
        // Setting the response data to the segments state
        setSegments(response.data.segments); 
      } catch (error) {
        // Handling any errors that may occur during the API call
        console.error('Error fetching segments:', error);
      }
    };
    fetchSegments();  // Triggering the API call
  }, []);  // Empty dependency array means the effect will run only once when the component mounts

  return (
    <Table>
      {/* Table header containing column names */}
      <TableHead>
        <TableRow>
          <TableCell>Segment Name</TableCell>
          <TableCell>Min Spending</TableCell>
          <TableCell>Max Spending</TableCell>
        </TableRow>
      </TableHead>

      {/* Table body rendering each segment in the segments array */}
      <TableBody>
        {segments.map((segment) => (
          // Rendering a row for each segment
          <TableRow key={segment.segment_id}>
            {/* Rendering the segment name, min spending, and max spending */}
            <TableCell>{segment.name}</TableCell>
            <TableCell>{segment.min_spending}</TableCell>
            <TableCell>{segment.max_spending}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SegmentList;
