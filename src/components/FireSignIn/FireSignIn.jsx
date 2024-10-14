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
    <div>
        <form onSubmit={signIn}>
            <input type="email" placeholder='email' value={email} onChange={(e)=> setEmail(e.target.value) }/>
            <input type="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)} />
            <button>Log-In</button>
        </form>
    </div>
  )
}

export default FireSignIn