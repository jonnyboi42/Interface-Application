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
    <div className="header-container">
      <div className="header-container-content">
        <div className="header-user-content">
        <svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"></path></svg>
        <p>{localStorage.getItem('username')}</p>
        
        </div>
        
        <a  href="#" onClick= {handleSignOut } >Sign-Out</a>
      </div>

        
    </div>
  )
}

export default Header