import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';  // Importing Formik for form management
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';  // Material UI components
import apiMethods from '../api';  // Import your API methods to interact with the backend

const PaymentForm = ({ onPaymentAdded }) => {
  // State to store the list of orders fetched from the API
  const [orders, setOrders] = useState([]);
  // State to track loading status (whether the orders are being fetched)
  const [loading, setLoading] = useState(true);

  // Initial values for the form fields
  const initialValues = {
    orderId: '',  // Will hold the selected order ID
    amount: '',  // Will hold the payment amount
    paymentDate: '',  // Will hold the date when the payment is made
    paymentMethod: '',  // Will hold the selected payment method (credit card or PayPal)
  };

  // Fetch all orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Call API to fetch orders
        const response = await apiMethods.getOrders();  // This will fetch the orders using your API method
        setOrders(response.orders);  // Store the fetched orders in state
        setLoading(false);  // Set loading to false once the orders are fetched
      } catch (error) {
        console.error('Error fetching orders:', error);  // Log any errors during fetch
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchOrders();  // Execute the fetchOrders function when the component mounts
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Call API to add payment with the values from the form
      const response = await apiMethods.addPayment(values);
      // Notify the parent component that a payment has been added by passing the paymentId
      onPaymentAdded(response.data.paymentId);
    } catch (error) {
      console.error('Error adding payment:', error);  // Log any errors during form submission
    }
  };

  return (
    // Formik handles form state and validation
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
            {/* Dropdown for Order ID - Display a loading spinner while orders are being fetched */}
            {loading ? (
              <CircularProgress />  // Show loading spinner while fetching orders
            ) : (
              // FormControl to wrap the Select component (Order ID dropdown)
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel>Order ID</InputLabel>
                {/* Field from Formik for Order ID dropdown */}
                <Field
                  name="orderId"  // Name of the field that will be used in Formik state
                  label="Order ID"  // Label for the dropdown
                  component={Select}  // Using Material UI's Select component for the dropdown
                  variant="outlined"  // Outlined style for the dropdown
                  fullWidth  // Make the dropdown take the full width of the container
                >
                  {/* If there are orders, render each one in the dropdown */}
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <MenuItem key={order.order_id} value={order.order_id}>
                        {/* Display Order ID and Amount in the dropdown */}
                        Order ID: {order.order_id} - Amount: ${order.order_amount}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">
                      {/* If no orders are available, display this option */}
                      No Orders Available
                    </MenuItem>
                  )}
                </Field>
              </FormControl>
            )}

            {/* Amount field - Allows the user to enter the payment amount */}
            <Field
              name="amount"  // Name of the field that will be used in Formik state
              label="Amount"  // Label for the input field
              type="number"  // Type set to "number" for numeric input
              component={TextField}  // Use Material UI's TextField component
              variant="outlined"  // Outlined style for the input
              margin="normal"  // Normal margin for the field
            />

            {/* Payment Date field - Date input for the date when the payment is made */}
            <Field
              name="paymentDate"  // Name of the field that will be used in Formik state
              label="Payment Date"  // Label for the input field
              type="date"  // Type set to "date" for date selection
              component={TextField}  // Use Material UI's TextField component
              variant="outlined"  // Outlined style for the input
              margin="normal"  // Normal margin for the field
              InputLabelProps={{ shrink: true }}  // Ensure the label doesn't overlap with the date input
            />

            {/* Payment Method dropdown - Dropdown to select the payment method */}
            <Field
              name="paymentMethod"  // Name of the field that will be used in Formik state
              label="Payment Method"  // Label for the dropdown
              component={Select}  // Use Material UI's Select component
              variant="outlined"  // Outlined style for the dropdown
              margin="normal"  // Normal margin for the dropdown
            >
              {/* Payment method options */}
              <MenuItem value="creditCard">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
            </Field>

            {/* Submit button to submit the form */}
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Add Payment  {/* Button label */}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentForm;
