import React from 'react';
import { useQuery } from 'react-query';
import weatherConfig from '../../config/weatherConfig';
import axios from 'axios';


const fetchWeather = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherConfig.location}&appid=${weatherConfig.apiKey}`);
        const data = response.data;
        console.log(data);

        if(!data || !data.weather || !data.weather[0]){
            throw new Error('Incomplete weather data');
        }

        return data;

  
    } catch (error) {
        console.log('Error Fetching Data', error);
        throw new Error('Error Fetching Data'); // Trigger error state
    }
};

const WeatherAPI = () => {

    //Run the useQuery Hook
    const { data, error, isLoading } = useQuery({ queryKey: ['weatherkey'], queryFn: fetchWeather });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
    
        <div className="weather">
            <h1>Weather</h1>
            <p>{weatherConfig.location}</p>
            <p>Temp: {((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</p>
            <p>{data.weather[0].description}</p>
            <p>Wind Speed: {data.wind.speed}°</p>
                    
        </div>
        
    );
};

export default WeatherAPI;