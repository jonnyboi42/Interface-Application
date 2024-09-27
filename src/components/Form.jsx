import React from "react"
import { useState } from "react";
const Form = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('email', email);
        console.log('password', password);
        
    }

    return(
        <form onSubmit={handleSubmit} >

            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <button>Submit</button>
            
        </form>
        
    )
}


export default Form