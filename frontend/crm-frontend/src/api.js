import axios from 'axios';

const API_URL = 'http://localhost:3000/api';  // Base URL for the backend API, adjust if necessary

// Set up axios instance with common headers and credentials for cross-origin requests
const api = axios.create({
  baseURL: API_URL,  // Set the base URL for the axios instance
  withCredentials: true,  // Enable cookies to be sent with requests (session management)
  headers: {
    'Content-Type': 'application/json',  // Ensure content type is JSON
  },
});

// Customer APIs
// Add a new customer
export const addCustomer = async (customerData) => {
  try {
    const response = await api.post('/addCustomer', customerData);  // POST request to add customer
    return response.data;  // Return the response data (e.g., success/failure message)
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Get all customers
export const getCustomers = async () => {
  try {
    const response = await api.get('/viewAllCustomers');  // GET request to fetch all customers
    return response.data;  // Assuming response contains { customers: [...] }
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Get customer by ID
export const getCustomerById = async (customerId) => {
  try {
    const response = await api.get(`/getCustomer/${customerId}`);  // Fetch customer by ID
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Update customer information
export const updateCustomer = async (customerId, customerData) => {
  try {
    const response = await api.put(`/updateCustomer/${customerId}`, customerData);  // PUT request to update customer
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Delete a customer by ID
export const deleteCustomer = async (customerId) => {
  try {
    const response = await api.delete(`/deleteCustomer/${customerId}`);  // DELETE request to remove customer
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Get customers with pagination (page and limit parameters)
export const getCustomersWithPagination = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/getCustomers?page=${page}&limit=${limit}`);  // Fetch customers with pagination
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Order APIs
// Add a new order
export const addOrder = async (orderData) => {
  try {
    const response = await api.post('/addOrder', orderData);  // POST request to add order
    return response.data;  // Return response from the server
  } catch (error) {
    console.error('Error:', error);  // Log error to console for debugging
    throw error.response?.data || error;  // Throw error to be handled by calling function
  }
};

// Product APIs
// Add a new product
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/addProduct', productData);  // POST request to add product
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Order Item APIs
// Add a new order item
export const addOrderItem = async (orderItemData) => {
  try {
    const response = await api.post('/addOrderItem', orderItemData);  // POST request to add order item
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Payment APIs
// Add a payment
export const addPayment = async (paymentData) => {
  try {
    const response = await api.post('/addPayment', paymentData);  // POST request to add payment
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Segment APIs
// Add a new segment
export const addSegment = async (segmentData) => {
  try {
    const response = await api.post('/addSegment', segmentData);  // POST request to add segment
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Assign a customer to a segment
export const assignToSegment = async (assignmentData) => {
  try {
    const response = await api.post('/assignToSegment', assignmentData);  // POST request to assign customer to segment
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Audience Size Calculation API
// Calculate audience size for a dynamic segment
export const calculateAudienceSize = async (conditions, logic) => {
  try {
    const response = await api.post('/createDynamicSegment', { conditions, logic });  // POST request to create dynamic segment
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Google Authentication APIs
// Trigger Google OAuth authentication
export const googleAuth = async () => {
  try {
    const response = await api.get('/auth/google');  // GET request for Google authentication
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Google OAuth callback handling
export const googleCallback = async (code) => {
  try {
    const response = await api.get(`/auth/google/callback?code=${code}`);  // GET request for Google callback
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Campaign APIs
// Get campaign history for a specific segment
export const getCampaignHistory = async (segmentId) => {
  try {
    const response = await api.get(`/campaignHistory/${segmentId}`);  // GET request to fetch campaign history
    return response.data;  // Return the campaign history data
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Send messages to a segment
export const sendMessage = async (messageData) => {
  try {
    const response = await api.post('/sendMessages', messageData);  // POST request to send messages
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Update delivery status of a message
export const updateDeliveryStatus = async (messageId, status) => {
  try {
    const response = await api.put(`/updateDeliveryReceipt`, { log_id: messageId, status });  // PUT request to update message delivery status
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Get campaign statistics
export const getCampaignStats = async () => {
  try {
    const response = await api.get('/campaign-stats');  // GET request to fetch campaign statistics
    return response.data;
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Order APIs
// Get all orders
export const getOrders = async () => {
  try {
    const response = await api.get('/viewAllOrders');  // GET request to fetch all orders
    return response.data;  // Assuming response contains { orders: [...] }
  } catch (error) {
    throw error.response?.data || error;  // Handle errors properly
  }
};

// Export all API methods as an object
const apiMethods = {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomersWithPagination,
  addOrder,
  addProduct,
  addOrderItem,
  addPayment,
  addSegment,
  assignToSegment,
  calculateAudienceSize,
  googleAuth,
  googleCallback,
  getCampaignHistory,
  sendMessage,
  updateDeliveryStatus,
  getCampaignStats,
  getOrders,  // Added here
};

// Export the apiMethods object as default export
export default apiMethods;
