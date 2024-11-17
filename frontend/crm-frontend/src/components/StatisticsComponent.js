import React, { useState, useEffect } from 'react';  // Import React and hooks
import { getCampaignStats } from '../api';  // Importing the API function to fetch campaign stats

const StatisticsComponent = () => {
  // State hook to store campaign statistics
  const [stats, setStats] = useState(null);  // Initial state is null until stats are loaded

  // useEffect hook to fetch the campaign stats when the component is mounted
  useEffect(() => {
    // Async function to fetch stats
    const fetchStats = async () => {
      try {
        // Calling the API method to get campaign statistics
        const data = await getCampaignStats();
        // Setting the fetched data into the state
        setStats(data);
      } catch (error) {
        // Handling any potential errors
        console.error('Error fetching campaign stats:', error);
      }
    };

    fetchStats();  // Trigger the fetchStats function to fetch the data when the component mounts
  }, []);  // Empty dependency array means the effect will run only once (on mount)

  return (
    <div>
      <h2>Campaign Statistics</h2>  {/* Heading for the stats section */}
      
      {/* Conditional rendering based on whether stats have been fetched or not */}
      {stats ? (
        // If stats are available, display the statistics
        <div>
          <p>Audience Size: {stats.audienceSize}</p>  {/* Display Audience Size */}
          <p>Messages Sent: {stats.messagesSent}</p>  {/* Display Messages Sent */}
          <p>Messages Failed: {stats.messagesFailed}</p>  {/* Display Messages Failed */}
        </div>
      ) : (
        // If stats are not available (still loading), display a loading message
        <p>Loading stats...</p>
      )}
    </div>
  );
};

export default StatisticsComponent;  // Exporting the component to be used elsewhere
