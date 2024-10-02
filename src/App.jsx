import { useState } from 'react'
import Weather from './components/Weather/Weather'
import News from './components/News/News'
import { AccountProvider } from './components/AccountContext/AccountContext'
import { AuthorizationProvider } from './components/AuthorizationContext/AuthorizationContext'
import CreateAccount from './components/CreateAccount/CreateAccount'
import SignIn from './components/SignIn/SignIn'
import Home from './components/Home/Home'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// Create a client
const queryClient = new QueryClient();

const App = ()=>{
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizationProvider>
      <AccountProvider>
      <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
      </AccountProvider>
      </AuthorizationProvider>
    </QueryClientProvider>
  );
  
}

export default App
