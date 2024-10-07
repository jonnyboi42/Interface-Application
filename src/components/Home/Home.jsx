import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import News from '../News/News';
import DateAndTime from '../DateAndTime/DateAndTime';
import Reminders from '../Reminders/Reminders';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthorizationContext/AuthorizationContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Initially loading

  // Use useEffect to check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('User is not signed in');
      navigate('/signin'); // Redirect to sign-in if not authenticated
    } else {
      setLoading(false); // Set loading to false when authenticated
    }
  }, [isAuthenticated, navigate]);

  // Return loading state while authentication is being checked
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the home page if authenticated
  return (
    <div className="home-container">

      <div className="home-container-content">
        <Header />
        <div className="home-module-content">
          <DateAndTime/>
          <Reminders/>
          <Weather />
          
        </div>
 
      </div>

    </div>
  );
};

export default Home;