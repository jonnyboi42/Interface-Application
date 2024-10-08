import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import Weather from '../Weather/Weather';
import News from '../News/News';
import DateAndTime from '../DateAndTime/DateAndTime';
import Reminders from '../Reminders/Reminders';
import Spotify from '../Spotify/Spotify';
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
    <div class="home-container">
      {/* <Header/> */}
      <div className="home-container-content">
        
          
      
        <div className="home-container-modules-content">
          <div className="home-container-modules-content-col-1">
            
            <DateAndTime/> 
            <Reminders/> 
            <Weather/>
            
          </div>  

          <div className="home-container-modules-content-col-2">
            <News/>
            <Spotify/>

          </div>

        </div>
        
      </div>
      
    </div>
  );
};

export default Home;



// .parent {
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: .4fr .3fr repeat(2, 1fr);
//   grid-column-gap: 0px;
//   grid-row-gap: 0px;
//   }
  
//   .grid-header { grid-area: 1 / 1 / 2 / 4; }
//   .grid-date-time { grid-area: 2 / 1 / 3 / 2; }
//   .grid-reminders { grid-area: 3 / 1 / 4 / 2; }
//   .grid-weather{ grid-area: 4 / 1 / 5 / 2; }
//   .grid-news { grid-area: 2 / 2 / 5 / 3; }




