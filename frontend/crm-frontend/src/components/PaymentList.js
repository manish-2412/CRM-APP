import React, { useState, useEffect } from 'react';  // Import React, useState and useEffect hooks
import axios from 'axios';  // Import axios to make HTTP requests
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';  // Import Material UI components for Table

const PaymentList = () => {
  // State hook to store the fetched payments data
  const [payments, setPayments] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch payments from the backend API
    const fetchPayments = async () => {
      try {
        // Send GET request to API endpoint to fetch payment data
        const response = await axios.get('http://localhost:3000/api/getPayments');
        
        // If the request is successful, update the state with the received payment data
        setPayments(response.data.payments);  // Assuming the response contains a 'payments' field
      } catch (error) {
        // Handle errors if the request fails
        console.error('Error fetching payments:', error);  // Log the error to the console
      }
    };

    // Call the fetchPayments function on component mount
    fetchPayments();
  }, []);  // Empty dependency array to ensure the effect runs only once on mount

  return (
    // Table component to display payment data
    <Table>
      {/* Table Header */}
      <TableHead>
        <TableRow>
          {/* Column headers */}
          <TableCell>Order ID</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Payment Date</TableCell>
          <TableCell>Payment Method</TableCell>
        </TableRow>
      </TableHead>

      {/* Table Body */}
      <TableBody>
        {/* Map through the payments array to display each payment in a row */}
        {payments.map((payment) => (
          <TableRow key={payment.payment_id}>
            {/* Display payment details in respective columns */}
            <TableCell>{payment.order_id}</TableCell>  {/* Order ID */}
            <TableCell>{payment.amount}</TableCell>  {/* Payment Amount */}
            <TableCell>{payment.payment_date}</TableCell>  {/* Payment Date */}
            <TableCell>{payment.payment_method}</TableCell>  {/* Payment Method */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentList;
