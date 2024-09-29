import { useState } from 'react'
import Weather from './components/Weather/Weather'
import News from './components/News/News'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
const queryClient = new QueryClient();

const App = ()=>{
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <Weather />
    </QueryClientProvider>
  );
  
}

export default App
