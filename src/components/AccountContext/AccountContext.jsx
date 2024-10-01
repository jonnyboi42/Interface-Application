//AccountContext.jsx 
import React, {createContext,useState} from "react";

export const AccountContext = createContext();

export const AccountProvider = ({children}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <AccountContext.Provider value={{username,setUsername, password, setPassword}}>
        {children}

        </AccountContext.Provider>
    );
};