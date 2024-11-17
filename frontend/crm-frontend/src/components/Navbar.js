import React from 'react';  // Import React
import { Link } from 'react-router-dom';  // Import Link from react-router-dom for navigation
import { AppBar, Toolbar, Button, Typography } from '@mui/material';  // Import Material UI components

const Navbar = () => {
  return (
    // AppBar component creates the navigation bar at the top of the page
    <AppBar position="sticky">
      {/* Toolbar provides a flexible container for the navigation elements */}
      <Toolbar>
        {/* Home Button ("CRM Campaign") */}
        <Button 
          color="inherit"  // Sets the text color of the button to inherit from its parent (AppBar)
          component={Link}  // Makes the button behave like a Link component for navigation
          to="/"  // Specifies the route to navigate to when clicked (Home page)
          style={{ marginRight: 'auto' }}  // Pushes this button to the leftmost side of the AppBar
        >
          {/* Typography component is used to style the text */}
          <Typography variant="h6">CRM Campaign</Typography> 
        </Button>

        {/* Other Navbar Links */}
        <Button color="inherit" component={Link} to="/customers">
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/orders">
          Orders
        </Button>
        <Button color="inherit" component={Link} to="/segments">
          Segments
        </Button>
        {/* Button to navigate to the "Send Messages" page */}
        <Button color="inherit" component={Link} to="/send-message">
          Send Messages
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
