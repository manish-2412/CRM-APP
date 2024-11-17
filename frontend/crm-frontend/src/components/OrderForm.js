import React, { useEffect, useState } from 'react';  // Import React and hooks for state and effect
import { Field, Form, Formik } from 'formik';  // Import Formik components for form handling
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, CircularProgress } from '@mui/material';  // Import Material UI components for styling
import axios from 'axios';  // Import axios for making HTTP requests

const OrderForm = ({ onOrderAdded }) => {
  // State for holding the list of customers and loading state
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect hook to fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetching customer data from the backend
        const response = await axios.get('http://localhost:3000/viewAllCustomers');
        setCustomers(response.data.customers);  // Set the customers in state
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching customers:', error);  // Handle errors in fetching customers
        setLoading(false);  // Set loading to false if there is an error
      }
    };

    fetchCustomers();  // Call fetchCustomers function on mount
  }, []);  // Empty dependency array ensures this runs only once, when the component mounts

  // Initial form values for Formik
  const initialValues = {
    customerId: '',  // The selected customer's ID
    orderDate: '',    // The order date
    orderAmount: '',  // The amount for the order
  };

  // Function to handle form submission
  const handleSubmit = async (values) => {
    try {
      // Sending the form data to the server to add an order
      const response = await axios.post('http://localhost:3000/addOrder', {
        customer_id: values.customerId,
        order_date: values.orderDate,
        order_amount: values.orderAmount,
      });

      // Extract the newly added order from the response
      const newOrder = response.data.order;
      onOrderAdded(newOrder);  // Notify the parent component about the new order
    } catch (error) {
      console.error('Error adding order:', error);  // Log any errors that occur during the order submission
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      {/* Formik Form component, which manages the form state and submission */}
      {({ setFieldValue, values }) => (
        <Form>
          {/* Box component is used to layout the form elements */}
          <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 400, margin: 'auto' }}>
            
            {/* Customer selection dropdown */}
            <FormControl margin="normal" fullWidth>
              <InputLabel>Customer</InputLabel>
              <Field
                as={Select}  // Use Material-UI Select component for dropdown
                name="customerId"
                disabled={loading}  // Disable the field while customers are loading
                value={values.customerId}
                onChange={(e) => {
                  const customerId = e.target.value;  // Get the selected customer ID
                  setFieldValue('customerId', customerId);  // Update the Formik field value for customerId

                  // Find the selected customer from the list and update the order amount
                  const selectedCustomer = customers.find(customer => customer.customer_id === customerId);
                  if (selectedCustomer) {
                    setFieldValue('orderAmount', selectedCustomer.total_spending || '');  // Set order amount based on customer’s spending
                  }
                }}
              >
                {/* If still loading customers, show a loading spinner */}
                {loading ? (
                  <MenuItem disabled>
                    <CircularProgress size={24} />
                  </MenuItem>
                ) : (
                  // Map over the customers and display them in the dropdown
                  customers.map((customer) => (
                    <MenuItem key={customer.customer_id} value={customer.customer_id}>
                      {`${customer.name} (ID: ${customer.customer_id})`}
                    </MenuItem>
                  ))
                )}
              </Field>
            </FormControl>

            {/* Order date input field */}
            <Field
              name="orderDate"
              label="Order Date"
              type="date"
              component={TextField}
              variant="outlined"
              margin="normal"
              InputLabelProps={{ shrink: true }}  // Prevents label from overlapping with date picker
              fullWidth
            />

            {/* Order amount input field */}
            <Field
              name="orderAmount"
              label="Order Amount"
              type="number"
              component={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
            />

            {/* Submit button */}
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Add Order
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
