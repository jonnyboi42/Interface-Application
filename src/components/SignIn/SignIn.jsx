import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthorizationContext/AuthorizationContext';


const SignIn = () => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const navigate = useNavigate(); //Initialize use navigate hook
    const {signIn,SignOut, isAuthenticated} = useContext(AuthContext);

    const handleSignIn = (e) =>{
        e.preventDefault();

        if(localStorage.getItem('username') === enteredUsername && localStorage.getItem('password') === enteredPassword){
            console.log('Successful Credentials Entered');
            signIn();   //Sets isAuthenticated to true comes from AuthorizationContext
            
        }else{
            console.log('Invalid Username Or Password');
        }
    }


    // Monitor changes in isAuthenticated and navigate after authentication
    useEffect(() => {
        if (isAuthenticated) {
            console.log('Is Authenticated:', isAuthenticated);
            navigate('/');  // Navigate to Home Page upon successful log-in
        }
    }, [isAuthenticated, navigate]); // Only run when isAuthenticated changes

  return (
    
    <form onSubmit={handleSignIn}>
        <input type="text" placeholder='username...' value={enteredUsername} onChange={(e) => setEnteredUsername(e.target.value)} />
        <input type="text" placeholder='password....' value={enteredPassword} onChange={(e) => setEnteredPassword(e.target.value)}/>
        <button>Submit</button>
    </form>
  )
}

export default SignIn