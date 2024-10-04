import CloudIcon from './icons/cloudy.svg'
import SunIcon from './icons/sun.svg'

const weatherIcons = {
    sun: SunIcon,
    Clouds: CloudIcon
} 


const getWeatherIcon = (weatherDescription)=>{
    // Check if the description exists in the weatherIcons object
  // If found, return the corresponding icon, otherwise return a default icon
  return weatherIcons[weatherDescription] || SunIcon; // Default to SunIcon if no match

}

export default getWeatherIcon;
