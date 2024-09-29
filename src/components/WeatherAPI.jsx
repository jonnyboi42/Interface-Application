import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

// Load Environment Variables from .env file
const weatherKey = import.meta.env.VITE_WEATHER_API;
console.log("The weather Key is", weatherKey);

const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=austin&appid=${weatherKey}`);
        
        console.log(response.data);
        // return response.data;
    } catch (error) {
        console.log('Error Fetching Data', error);
        throw new Error('Error Fetching Data'); // Trigger error state
    }
};

const WeatherAPI = () => {
    // const { data, error, isLoading } = useQuery("weatherData", fetchWeather);
    const {data, error,  isLoading} = useQuery({queryKey: ['weatherkey'], queryFn: fetchWeather})


    return (
        <div style={{ color: 'black', backgroundColor: 'white' }}>
            <h1>Weather </h1>
            <p>Hello</p>
            <p>{JSON.stringify(data)}</p> 
        </div>
    );
};


export default WeatherAPI;