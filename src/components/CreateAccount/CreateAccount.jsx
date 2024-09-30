import React from 'react'
import { useState, useContext} from 'react';
import { AccountContext } from '../AccountContext/AccountContext';
const CreateAccount = () => {

  const {password, setPassword} = useContext(AccountContext);
  const {username, setUsername} = useContext(AccountContext);
    
  const handleCreateAccount = (e)=>{
    e.preventDefault();

    console.log('Created Username', username);
    console.log('Created Password', password);

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
    </div>
  )
}

export default CreateAccount