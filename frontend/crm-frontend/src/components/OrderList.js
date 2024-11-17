import React, { useState, useEffect } from 'react';  // Import React and necessary hooks (useState, useEffect)
import { Table, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@mui/material';  // Import Material UI components for table display and loading indicator
import api from '../api';  // Import the API utility for making requests (assumed to be a custom API file)

const OrderList = () => {
  // Define state to store the orders and the loading state
  const [orders, setOrders] = useState([]);  // State to store the fetched orders
  const [loading, setLoading] = useState(true);  // State to track loading status

  // useEffect hook to fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Making an API call to fetch orders using the api utility (assumed to be an axios instance)
        const ordersResponse = await api.getOrders();  // Fetch orders from the backend API
        setOrders(ordersResponse.orders);  // Set the fetched orders to the state
        setLoading(false);  // Once the data is fetched, set loading to false
      } catch (error) {
        console.error('Error fetching orders:', error);  // Handle errors in fetching
        setLoading(false);  // Stop loading in case of an error
      }
    };

    fetchOrders();  // Call the fetchOrders function to fetch data when component mounts
  }, []);  // Empty dependency array ensures the fetch is done only once when the component mounts

  // If the data is still loading, show a CircularProgress (spinner) component
  if (loading) {
    return <CircularProgress />;  // Display a loading spinner while the orders are being fetched
  }

  // Once loading is complete, display the table with orders
  return (
    <Table>
      <TableHead>
        <TableRow>
          {/* Table header with columns: Customer ID, Order Date, and Total Amount */}
          <TableCell>Customer ID</TableCell>
          <TableCell>Order Date</TableCell>
          <TableCell>Total Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Loop through the orders and create a row for each order */}
        {orders.map((order) => (
          <TableRow key={order.order_id}>  {/* Each TableRow should have a unique key (order_id) */}
            <TableCell>{order.customer_id}</TableCell>  {/* Display Customer ID */}
            <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>  {/* Format order date to a readable format */}
            <TableCell>{order.order_amount}</TableCell>  {/* Display order amount */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;  // Export the OrderList component
