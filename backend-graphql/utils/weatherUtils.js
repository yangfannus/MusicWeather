const axios = require('axios');

// OpenWeatherMap API Configuration
// Use environment variables to get API key, avoid hardcoding
const API_KEY = process.env.OPENWEATHER_API_KEY; // Please configure your API key in the .env file
console.log('Weather Utils initializing - using API_KEY:', API_KEY || 'Not set');

// If API_KEY is not set, use hardcoded fallback key
const FALLBACK_KEY = '2639d8f150e48b5fb7c6fb59ca20a783';
const FINAL_API_KEY = API_KEY || FALLBACK_KEY;
console.log('Final API_KEY being used:', FINAL_API_KEY.substring(0, 3) + '...');

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API_KEY is configured
if (!API_KEY) {
  console.warn('Warning: OPENWEATHER_API_KEY environment variable not set, using fallback key');
}

// Weather conditions mapped to descriptions and icons
const weatherMapping = {
  'Clear': { condition: 'Sunny', icon: '☀️' },
  'Clouds': { condition: 'Cloudy', icon: '⛅' },
  'Rain': { condition: 'Rainy', icon: '🌧️' },
  'Drizzle': { condition: 'Light Rain', icon: '🌦️' },
  'Thunderstorm': { condition: 'Thunderstorm', icon: '⛈️' },
  'Snow': { condition: 'Snowy', icon: '❄️' },
  'Mist': { condition: 'Misty', icon: '🌫️' },
  'Smoke': { condition: 'Smoky', icon: '🌫️' },
  'Haze': { condition: 'Hazy', icon: '🌫️' },
  'Dust': { condition: 'Dusty', icon: '🌫️' },
  'Fog': { condition: 'Foggy', icon: '🌫️' },
  'Sand': { condition: 'Sandy', icon: '🌫️' },
  'Ash': { condition: 'Ashy', icon: '🌫️' },
  'Squall': { condition: 'Squally', icon: '🌬️' },
  'Tornado': { condition: 'Tornado', icon: '🌪️' }
};

// Get current weather data
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: FINAL_API_KEY,
        units: 'metric', // Use Celsius
        lang: 'en'       // Return results in English
      }
    });
    
    const data = response.data;
    
    // Convert to our own data format
    const weatherCondition = data.weather[0].main;
    const mappedWeather = weatherMapping[weatherCondition] || { condition: weatherCondition, icon: '🌡️' };
    
    return {
      temperature: Math.round(data.main.temp),
      condition: mappedWeather.condition,
      icon: mappedWeather.icon,
      city: data.name,
      country: data.sys.country,
      weatherId: data.weather[0].id,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      humidity: data.main.humidity,
      pressure: data.main.pressure
    };
  } catch (error) {
    console.error('Error getting weather data:', error.message);
    throw new Error(`Failed to get weather data: ${error.message}`);
  }
};

module.exports = {
  getCurrentWeather,
  weatherMapping
}; 