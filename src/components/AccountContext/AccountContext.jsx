//AccountContext.jsx 
import React, {createContext,useState} from "react";

export const AccountContext = createContext();

export const AccountProvider = ({children}) => {
    const [username, setUsername] = useState('');

    return(
        <AccountContext.Provider value={{username,setUsername}}>
        {children}

        </AccountContext.Provider>
    );
};