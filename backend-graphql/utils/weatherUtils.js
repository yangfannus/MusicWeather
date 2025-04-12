const axios = require('axios');

// OpenWeatherMap API Configuration
// Use environment variables to get API key, avoid hardcoding
const API_KEY = process.env.OPENWEATHER_API_KEY; // Please configure your API key in .env file
console.log('Weather Utils Initialization - Using API_KEY:', API_KEY || 'Not Set');

// If API_KEY is not set, use hardcoded fallback key
const FALLBACK_KEY = '2639d8f150e48b5fb7c6fb59ca20a783';
const FINAL_API_KEY = API_KEY || FALLBACK_KEY;
console.log('Final API_KEY in use:', FINAL_API_KEY.substring(0, 3) + '...');

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Check if API_KEY is configured
if (!API_KEY) {
  console.warn('Warning: OPENWEATHER_API_KEY environment variable not set, using fallback key');
}

// Weather condition mapping to descriptions and icons
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

// Get location information by IP
const getLocationByIp = async (ip) => {
  // Default location (Shanghai)
  const defaultLocation = {
    city: "Shanghai",
    country: "CN", 
    lat: 31.2304,
    lon: 121.4737
  };

  try {
    // Process IP address format
    const cleanIp = ip === '::1' ? '127.0.0.1' : ip.replace(/^.*:/, '');
    
    console.log(`Processed IP: ${cleanIp}`);
    
    // For internal IPs, return default location
    if (cleanIp === '127.0.0.1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.') || cleanIp.startsWith('172.')) {
      console.log('Internal IP detected, using default location');
      return defaultLocation;
    }
    
    // Use ip-api service to get location information
    console.log(`Requesting ip-api: http://ip-api.com/json/${cleanIp}`);
    const response = await axios.get(`http://ip-api.com/json/${cleanIp}`);
    const data = response.data;
    
    if (data.status === 'success') {
      return {
        city: data.city,
        country: data.countryCode,
        lat: data.lat,
        lon: data.lon
      };
    } else {
      return defaultLocation;
    }
  } catch (error) {
    console.error('IP location failed:', error.message);
    return defaultLocation;
  }
};

// Get current weather data
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: FINAL_API_KEY,
        units: 'metric',
        lang: 'en'
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

// Get weather forecast
const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: FINAL_API_KEY,
        units: 'metric',
        lang: 'en',
        cnt: 8  // Return 24-hour forecast (every 3 hours, 8 times total)
      }
    });
    
    const data = response.data;
    
    // Convert to our own data format
    const forecast = data.list.map(item => {
      const weatherCondition = item.weather[0].main;
      const mappedWeather = weatherMapping[weatherCondition] || { condition: weatherCondition, icon: '🌡️' };
      
      return {
        datetime: item.dt * 1000, // Convert to milliseconds timestamp
        hour: new Date(item.dt * 1000).getHours(),
        temperature: Math.round(item.main.temp),
        condition: mappedWeather.condition,
        icon: mappedWeather.icon,
        description: item.weather[0].description,
        windSpeed: item.wind.speed,
        humidity: item.main.humidity
      };
    });
    
    return {
      city: data.city.name,
      country: data.city.country,
      forecast
    };
  } catch (error) {
    console.error('Error getting weather forecast:', error.message);
    throw new Error(`Failed to get weather forecast: ${error.message}`);
  }
};

module.exports = {
  getLocationByIp,
  getCurrentWeather,
  getWeatherForecast,
  weatherMapping
};