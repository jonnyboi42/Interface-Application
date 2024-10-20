import React, { useState } from 'react'
import { auth } from '../../../firebase'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
const FireSignIn = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const signIn = async ()=> {
    try{
      signInWithEmailAndPassword(auth, email, password)
    } catch(error){
      console.log('There was an error signing in', error)
    }
  }


    
  return (
    <div className="signin-container">
            
      <form className='signin-content' onSubmit={handleSignIn}>
          <p>Sign-in</p>

          <div className="username-and-password-content">
            <div className="username-content">
            <svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"></path></svg>
            <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value) }/>
            </div>
            

            <div className="password-content">
            <svg stroke="currentColor" fill="white" stroke-width="0" viewBox="0 0 16 16" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 00-1 1v5a1 1 0 001 1h7a1 1 0 001-1V9a1 1 0 00-1-1zm-7-1a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2V9a2 2 0 00-2-2h-7zm0-3a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"></path></svg>
            <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            </div>
              
          </div>

          <button className='signin-submit-button'>Submit</button>
          <button className='create-account-button'>Create Account</button>

      </form>
      
    </div>

  )
}

export default FireSignIn



   