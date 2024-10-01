//This will Hold the User Session Logic
//Example, Once a user is signed in, the session becomes valid

import React, {useState, createContext, useContext} from "react";

export const AuthContext = createContext();

export const AuthorizationProvider = ({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState('false');

    const signIn=()=>{
        setIsAuthenticated(true);
    }

    const signOut = ()=>{
        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,signIn,signOut}}>
            {children}
    
        </AuthContext.Provider>
    )
    
}





