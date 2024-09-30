import { useState } from 'react'
import Weather from './components/Weather/Weather'
import News from './components/News/News'
import { AccountProvider } from './components/AccountContext/AccountContext'
import CreateAccount from './components/CreateAccount/CreateAccount'
import Home from './components/Home/Home'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
const queryClient = new QueryClient();

const App = ()=>{
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <AccountProvider>
        <Home/>
      </AccountProvider>
    </QueryClientProvider>
  );
  
}

export default App
