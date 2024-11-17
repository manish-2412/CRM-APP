import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user profile data

  useEffect(() => {
    // Fetch the user profile after component mounts
    const fetchUserProfile = async () => {
      try {
        // Send GET request to the server to fetch the user profile
        const response = await axios.get('http://localhost:3000/profile', { withCredentials: true });
        setUser(response.data.user); // Set the user data in state
      } catch (err) {
        // Redirect to login page if the user is not authenticated
        window.location.href = '/login';
      }
    };

    fetchUserProfile(); // Call the function to fetch user data
  }, []); // Empty dependency array ensures this runs only once when component mounts

  // Display loading state while user data is being fetched
  if (!user) {
    return <div>Loading...</div>;
  }

  // Render user profile once data is available
  return (
    <div>
      <h2>Welcome, {user.name}!</h2> {/* Display user's name */}
      <p>Email: {user.email}</p> {/* Display user's email */}
    </div>
  );
};

export default ProfilePage;
