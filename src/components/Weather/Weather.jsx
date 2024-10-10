import React from 'react';
import DateAndTime from '../DateAndTime/DateAndTime';
import { useQuery } from 'react-query';
import weatherConfig from '../../config/weatherConfig';
import getWeatherIcon from './WeatherIconLogic';
import WindIcon from './icons/wind.svg';
import SunIcon from './icons/sun.svg'
import CloudyIcon from './icons/cloudy.svg'
import Temperature from './icons/temperature.svg';
import axios from 'axios';


const fetchWeather = async () =>{

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=austin&appid=${weatherConfig.apiKey}`);
  console.log(response.data);
  return response.data;
    
}


const kelvinToFahrenheit = (kelvin) => {
  return (kelvin - 273.15) * (9 / 5) + 32;
};


const Weather = () => {



    // Run the useQuery Hook
    const { data, error, isLoading } = useQuery({ queryKey: ['weatherkey'], queryFn: fetchWeather });
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    const getDailyForecast = ()=>{
      return data.list.filter((item) => item.dt_txt.includes("12:00:00"));
    }

    // Function to format date from the response
    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000); // Ensure date is properly defined here
      return date.toLocaleDateString('en-US', { weekday: 'long'});
    };

    return (
      <div className="weather-container">
     
        
        <div className="weather-container-content">
          <div className="city-name">
            <h2>{data.name}</h2>
          </div>

          <div className="current-weather-icon-and-temp">
            <div className="current-weather-icon">
              <img src={CloudyIcon} alt="" />
            </div>
            <div className="current-weather-temp">
            <p>{kelvinToFahrenheit(data.main.temp).toFixed(2)} °F</p>
            </div>
          </div>
          
   
          <div className="current-weather-wind">
            <img src={WindIcon} alt="" />
            <p>{data.wind.speed}mph</p>
          </div>

          <div className="weather-description">
            <p>{data.weather[0].description}</p>
          </div>
            
        </div>
        
      </div>
    );  

  };
  

export default Weather;