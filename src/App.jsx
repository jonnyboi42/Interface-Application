import { useState } from 'react'
import Form from './components/Form'
import Props from './components/Props'
import WeatherAPI from './components/WeatherAPI'
import { QueryClient, QueryClientProvider } from 'react-query'

// Create a client
const queryClient = new QueryClient();

const App = ()=>{
  
  
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherAPI />
    </QueryClientProvider>
  );
  
}

export default App
