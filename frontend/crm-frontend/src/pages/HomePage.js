import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion for animations

const HomePage = () => {
  return (
    <Container sx={{ maxWidth: 'lg', mt: 6, minHeight: '100vh', paddingBottom: '80px' }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Initial animation state (faded in and moved up)
        animate={{ opacity: 1, y: 0 }}    // Final animation state (fully visible and moved into place)
        transition={{ duration: 0.7 }}    // Duration of the animation
      >
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          Welcome to the CRM System
        </Typography>
        <Typography variant="h6" paragraph align="center" sx={{ color: 'text.secondary', maxWidth: 700, margin: '0 auto' }}>
          Manage your customers, orders, segments, campaigns, and more—all in one place.
        </Typography>
      </motion.div>

      {/* Main Buttons Section (Grid layout for the feature cards) */}
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
        {/* Customer Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Initial animation state (slide in from left)
            animate={{ opacity: 1, x: 0 }}    // Final animation state (fully visible and in place)
            transition={{ duration: 0.6 }}     // Duration of the animation
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Manage Customers
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/customers"
                  sx={{
                    width: '100%',
                    mt: 2,
                    fontWeight: 'bold',
                    padding: '12px',
                    boxShadow: 2,
                    '&:hover': { backgroundColor: 'primary.main', boxShadow: 6 },
                  }}
                >
                  Go to Customers
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Order Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Initial animation state (slide in from right)
            animate={{ opacity: 1, x: 0 }}    // Final animation state (fully visible and in place)
            transition={{ duration: 0.6 }}     // Duration of the animation
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  Manage Orders
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/orders"
                  sx={{
                    width: '100%',
                    mt: 2,
                    fontWeight: 'bold',
                    padding: '12px',
                    boxShadow: 2,
                    '&:hover': { backgroundColor: 'secondary.main', boxShadow: 6 },
                  }}
                >
                  Go to Orders
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Segment Management Card */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 100 }} // Initial animation state (slide up from bottom)
            animate={{ opacity: 1, y: 0 }}    // Final animation state (fully visible and in place)
            transition={{ duration: 0.6 }}     // Duration of the animation
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Manage Segments
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/segments"
                  sx={{
                    width: '100%',
                    mt: 2,
                    fontWeight: 'bold',
                    padding: '12px',
                    boxShadow: 2,
                    '&:hover': { backgroundColor: 'primary.main', boxShadow: 6 },
                  }}
                >
                  Go to Segments
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Send Campaign Messages Card */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Initial animation state (slide in from left)
            animate={{ opacity: 1, x: 0 }}    // Final animation state (fully visible and in place)
            transition={{ duration: 0.6 }}     // Duration of the animation
          >
            <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
              <CardContent>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
                  Send Campaign Messages
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/send-messages"
                  sx={{
                    width: '100%',
                    mt: 2,
                    fontWeight: 'bold',
                    padding: '12px',
                    boxShadow: 2,
                    '&:hover': { backgroundColor: 'secondary.main', boxShadow: 6 },
                  }}
                >
                  Send Campaigns
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Footer (Fixed at Bottom) */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '12px 0',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          color: 'text.secondary',
          boxShadow: 3,
        }}
      >
        <Typography variant="body2">
          © 2024 CRM System. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
