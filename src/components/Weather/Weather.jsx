import React from 'react';
import DateAndTime from '../DateAndTime/DateAndTime';
import { useQuery } from 'react-query';
import weatherConfig from '../../config/weatherConfig';
import getWeatherIcon from './WeatherIconLogic';
import WindIcon from './icons/wind.svg';
import Temperature from './icons/temperature.svg';
import axios from 'axios';


// const fetchWeather = async () => {
//     try {
//         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherConfig.location}&appid=${weatherConfig.apiKey}`);
//         const data = response.data;
//         console.log(data);

//         if(!data || !data.weather || !data.weather[0]){
//             throw new Error('Incomplete weather data');
//         }

//         return data;

  
//     } catch (error) {
//         console.log('Error Fetching Data', error);
//         throw new Error('Error Fetching Data'); // Trigger error state
//     }
// };

const fetchWeather = async () =>{

  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=austin&appid=${weatherConfig.apiKey}`);
  return response.data;
    
}

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
      <div className="weather-container-content">
        <h2>Weather</h2>
        <div className="forecast-container">
          <div className="forecast-items">
            {getDailyForecast().map((day, index) => (
              <div key={index} className="forecast-day">
                <h3>{formatDate(day.dt)}</h3>
                <div className="forecast-day-low-and-high">
                  <p>Low: {Math.round((day.main.temp_min - 273.15) * 9/5 + 32)}°F</p> {/* Convert from Kelvin to Fahrenheit */}
                  <p>Hi: {Math.round((day.main.temp_max - 273.15) * 9/5 + 32)}°F</p> {/* Convert from Kelvin to Fahrenheit */}
                </div>  
                <p> {day.weather[0].description}</p>
              </div>
            ))}

          </div>
          
        </div>
      </div>
    );

  };
  

export default Weather;