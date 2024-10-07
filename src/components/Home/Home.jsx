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
          <News/>
          
        </div>
 
      </div>

    </div>
  );
};

export default Home;



// This will be the layout for the home page
// <div class="parent">
// <div class="div1"> </div>
// <div class="div2"> </div>
// <div class="div3"> </div>
// <div class="div4"> </div>
// <div class="div5"> </div>
// <div class="div6"> </div>
// </div>

// This will be the css for the homepage
// .parent {
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   grid-template-rows: .4fr repeat(3, 1fr);
//   grid-column-gap: 0px;
//   grid-row-gap: 0px;
//   height: 100vh;
// }
  
// .div1 { grid-area: 1 / 1 / 2 / 4; background-color: blue; }
// .div2 { grid-area: 2 / 1 / 3 / 2; background-color: black;}
// .div3 { grid-area: 3 / 1 / 4 / 2; background-color: purple;}
// .div4 { grid-area: 4 / 1 / 5 / 2; background-color: yellow;}
// .div5 { grid-area: 2 / 2 / 5 / 3; background-color: green;}
// .div6 { grid-area: 2 / 3 / 5 / 4; background-color: brown;}