// Importing necessary dependencies
import React from "react";  // React is the main library for building the UI
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // React Router for handling navigation
import Navbar from "./components/Navbar";  // Importing the Navbar component for consistent site navigation
import HomePage from "./pages/HomePage";  // Importing the HomePage component (the default landing page)
import CustomerPage from "./pages/CustomerPage";  // Importing CustomerPage to manage customers
import OrderPage from "./pages/OrderPage";  // Importing OrderPage for managing orders
import SegmentPage from "./pages/SegmentPage";  // Importing SegmentPage for segment management
import PaymentPage from "./pages/PaymentPage";  // Importing PaymentPage to manage payments
import CampaignHistoryPage from "./pages/CampaignHistoryPage";  // Import CampaignHistoryPage to view campaign history
import MessageSendingPage from "./pages/SendMessagesPage";  // Import SendMessagesPage for sending messages to segments

const App = () => {
  return (
    // Setting up the Router for navigation between pages
    <Router>
      {/* Navbar is displayed on every page, providing navigation links */}
      <Navbar />
      
      {/* Defining the routes for different pages in the application */}
      <Routes>
        {/* Route for the home page, rendered when the URL path is "/" */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route for the customer management page */}
        <Route path="/customers" element={<CustomerPage />} />
        
        {/* Route for the order management page */}
        <Route path="/orders" element={<OrderPage />} />
        
        {/* Route for the segment management page */}
        <Route path="/segments" element={<SegmentPage />} />
        
        {/* Route for the payment management page */}
        <Route path="/payments" element={<PaymentPage />} />
        
        {/* Route for the campaign history page, where users can view the history of campaigns */}
        <Route path="/campaign-history" element={<CampaignHistoryPage />} />  {/* New route */}
        
        {/* Route for the message sending page, where users can send messages to segments */}
        <Route path="/send-message" element={<MessageSendingPage />} />  {/* New route */}
      </Routes>
    </Router>
  );
};

// Exporting the App component as the default export
export default App;
