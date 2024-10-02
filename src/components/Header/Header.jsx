import React, { useContext } from 'react'
import { AuthContext } from '../AuthorizationContext/AuthorizationContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Header = () => {


  //Sign-out Logic 
  const navigate = useNavigate();
  const {isAuthenticated, signOut} = useContext(AuthContext);

  const handleSignOut = (e)=>{
   
    signOut();  //Sets isAuthenitcated to false
    
  }

  
    // Monitor changes in isAuthenticated and navigate after authentication
    useEffect(() => {
      if (!isAuthenticated) {
          console.log('User credentials no Longer Valid, Signing Out...');
          navigate('/signin');  // Navigate to Home Page upon successful log-in
      }
  }, [isAuthenticated, navigate]); // Only run when isAuthenticated changes

  return (
    <div className="header">
    <p></p>
    <a  href="#" onClick= {handleSignOut } >Sign-Out</a>
        
    </div>
  )
}

export default Header