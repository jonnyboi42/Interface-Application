
//Make sure your .env holds the correct API Key 
//Replace Location with your own location

const weatherConfig = {
    apiKey: import.meta.env.VITE_WEATHER_API,   
    location: "austin" 
};

export default weatherConfig;