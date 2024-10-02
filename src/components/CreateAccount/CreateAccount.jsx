import React from 'react'
import { useState, useContext} from 'react';
import { AccountContext } from '../AccountContext/AccountContext';
import { useNavigate } from 'react-router-dom';
const CreateAccount = () => {

  const navigate = useNavigate();

  const {password, setPassword} = useContext(AccountContext);
  const {username, setUsername} = useContext(AccountContext);
    
  const handleCreateAccount = (e)=>{
    e.preventDefault();

    localStorage.setItem('username', username);
    localStorage.setItem('password',password);

    console.log('Created Username', username);
    console.log('Created Password', password);
    console.log("Account has been Created, username and password updated")

    navigate('/signin');

  }

  const handleExistingAccount = (e)=>{
    e.preventDefault();
    navigate('/signin');
  }

  return (
    <div className="account-container">
       <form onSubmit={handleCreateAccount}>
        <div className="create-username">
            <input type="text" placeholder='...' value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </div>
        <div className="create-password">
            <input type="text" placeholder='...' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <button>Submit</button>

       </form>
       <div className="existing-account">
        <p>Already Have an Account?</p>
        <a href="#" onClick={handleExistingAccount}>Sign-In</a>
       </div>
    </div>
  )
}

export default CreateAccount