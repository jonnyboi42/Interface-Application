import React from 'react';
import { useQuery } from 'react-query';
import weatherConfig from '../../config/weatherConfig';
import getWeatherIcon from './WeatherIconLogic';
import WindIcon from './icons/wind.svg';
import Temperature from './icons/temperature.svg';
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
    // Run the useQuery Hook
    const { data, error, isLoading } = useQuery({ queryKey: ['weatherkey'], queryFn: fetchWeather });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
  
    // Extract weather description
    const weatherDescription = data.weather[0].main; // e.g., 'Clouds', 'Clear', etc.
    
    // Get the correct icon based on the weather description
    const WeatherIcon = getWeatherIcon(weatherDescription);
  
    return (
      <div className="weather-container-content">
        <div className="weather-content">
          <h1>Weather</h1>
          <p>{weatherConfig.location.charAt(0).toUpperCase() + weatherConfig.location.slice(1)}</p>
          <div className="temperature-description">
            <img src={Temperature} />
            <p>{((data.main.temp - 273.15) * 9/5 + 32).toFixed(2)}°F</p>
          </div>
         
          <div className="weather-description">
            <img src={WeatherIcon} alt={weatherDescription} />
            <p>{data.weather[0].description}</p>
            
          </div>
          <div className="wind-description">
            <p><img src={WindIcon} /></p>
            <p>{data.wind.speed}km/hr</p> 
          </div>
          
        </div>
      </div>
    );
  };
  

export default WeatherAPI;