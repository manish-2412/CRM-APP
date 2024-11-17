import React, { useState } from 'react';  // Importing React and useState hook for managing state
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation after form submission
import { addSegment, calculateAudienceSize } from '../api';  // Importing API methods for adding segment and calculating audience size
import { Button, TextField, Box, Typography, Container, Grid, IconButton } from '@mui/material';  // Import Material UI components
import AddIcon from '@mui/icons-material/Add';  // Importing AddIcon from Material UI for adding conditions
import { motion } from 'framer-motion';  // Importing Framer Motion for animations

const SegmentForm = () => {
  // State hooks to manage the segment name, conditions, and audience size
  const [segmentName, setSegmentName] = useState('');
  const [conditions, setConditions] = useState([]);  // Array to hold the conditions for the segment
  const [audienceSize, setAudienceSize] = useState(0);  // To store the calculated audience size
  const navigate = useNavigate();  // Hook for navigating after form submission

  // Function to add a new condition to the conditions array
  const handleAddCondition = () => {
    // Adding a new condition with empty fields for "field", "operator", and "value"
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  // Function to handle changes in any condition (field, operator, or value)
  const handleConditionChange = (index, field, value) => {
    // Creating a new array with updated condition values
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;  // Update the specific field (field, operator, or value)
    setConditions(updatedConditions);  // Update the conditions state with the modified conditions array
  };

  // Function to handle the form submission (save segment)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submission behavior
    const segmentData = { segmentName, conditions };  // Create an object to send to the API
    await addSegment(segmentData);  // Call the API to add the segment to the database
    navigate('/segments');  // Redirect to the "Segments" page after successfully saving the segment
  };

  // Function to calculate the audience size based on the current conditions
  const handleCalculateAudience = async () => {
    const size = await calculateAudienceSize(conditions, "AND");  // Call the API with conditions and logical operator "AND"
    setAudienceSize(size);  // Update the audience size state with the calculated value
  };

  return (
    // Container for the form, with styling for padding, background color, border radius, and shadow
    <Container maxWidth="sm" sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
      {/* Motion component from Framer Motion for fade-in animation */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        {/* Heading for the form */}
        <Typography variant="h4" gutterBottom textAlign="center">
          Create Audience Segment
        </Typography>

        {/* Form for creating the segment */}
        <form onSubmit={handleSubmit}>
          {/* Input field for Segment Name */}
          <TextField
            label="Segment Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={segmentName}  // Bind the value of the segment name to the state
            onChange={(e) => setSegmentName(e.target.value)}  // Update the state on input change
            sx={{ backgroundColor: '#f9f9f9' }}  // Styling for background color
          />

          {/* Box to contain conditions */}
          <Box sx={{ marginTop: 2 }}>
            {/* Render each condition dynamically based on the conditions array */}
            {conditions.map((condition, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                {/* TextField for "Field" of the condition */}
                <TextField
                  label="Field"
                  variant="outlined"
                  value={condition.field}  // Bind the value to the specific condition's field
                  onChange={(e) => handleConditionChange(index, 'field', e.target.value)}  // Update the condition when changed
                  fullWidth
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
                {/* TextField for "Operator" of the condition */}
                <TextField
                  label="Operator"
                  variant="outlined"
                  value={condition.operator}  // Bind the value to the specific condition's operator
                  onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}  // Update the condition when changed
                  fullWidth
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
                {/* TextField for "Value" of the condition */}
                <TextField
                  label="Value"
                  variant="outlined"
                  value={condition.value}  // Bind the value to the specific condition's value
                  onChange={(e) => handleConditionChange(index, 'value', e.target.value)}  // Update the condition when changed
                  fullWidth
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Box>
            ))}

            {/* IconButton to add new condition */}
            <IconButton color="primary" onClick={handleAddCondition} sx={{ marginBottom: 2 }}>
              <AddIcon />  {/* AddIcon from Material UI */}
            </IconButton>
          </Box>

          {/* Button to calculate the audience size based on the conditions */}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCalculateAudience}
            sx={{ width: '100%', marginBottom: 2, transition: 'all 0.3s ease' }}
            whileHover={{ scale: 1.05 }}  // Framer Motion hover effect for scaling
            whileTap={{ scale: 0.95 }}  // Framer Motion tap effect for scaling
          >
            Calculate Audience Size
          </Button>

          {/* Display the calculated audience size */}
          <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
            Audience Size: {audienceSize}
          </Typography>

          {/* Button to submit the form and save the segment */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: '100%', padding: '10px 0', transition: 'all 0.3s ease' }}
            whileHover={{ scale: 1.05 }}  // Framer Motion hover effect for scaling
            whileTap={{ scale: 0.95 }}  // Framer Motion tap effect for scaling
          >
            Save Segment
          </Button>
        </form>
      </motion.div>
    </Container>
  );
};

export default SegmentForm;
