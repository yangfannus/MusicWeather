// API Service
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

// Weather conditions and icons mapping
const weatherMapping = {
  'Sunny': '☀️',
  'Cloudy': '⛅',
  'Rainy': '🌧️',
  'Light Rain': '🌦️',
  'Thunderstorm': '⛈️',
  'Snowy': '❄️',
  'Misty': '🌫️',
  'Foggy': '🌫️'
};

// GraphQL API address
const GRAPHQL_API_URL = 'http://localhost:5002/graphql';

// Create Apollo Client instance
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_API_URL,
    credentials: 'same-origin'
  }),
  cache: new InMemoryCache()
});

// GraphQL query - get current weather
const GET_CURRENT_WEATHER_QUERY = gql`
  query GetCurrentWeather($lat: Float!, $lon: Float!) {
    getCurrentWeather(lat: $lat, lon: $lon) {
      temperature
      condition
      icon
      city
      country
      weatherId
      description
      windSpeed
      humidity
      pressure
    }
  }
`;

// Get location information using frontend method
export const getLocation = async () => {
  try {
    console.log('Getting location using ipgeolocation.io...');
    
    // Use ipgeolocation.io service to get IP location
    const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=61501013b9614c4ab764003d8d9f9691', {
      method: 'GET',
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get location: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully retrieved location:', data);
    
    return {
      city: data.city || 'Shanghai',
      country: data.country_code2 || 'CN',
      lat: parseFloat(data.latitude) || 31.2304,
      lon: parseFloat(data.longitude) || 121.4737
    };
  } catch (error) {
    console.error('Failed to get location information:', error);
    
    // If API call fails, return default location (Shanghai)
    return {
      city: 'Shanghai',
      country: 'CN',
      lat: 31.2304,
      lon: 121.4737
    };
  }
};

// Get weather data
export const getWeather = async (lat, lon) => {
  try {
    console.log('Getting weather data via GraphQL...');
    
    // Get current weather
    const currentWeatherResult = await client.query({
      query: GET_CURRENT_WEATHER_QUERY,
      variables: { lat, lon }
    });
    
    const currentWeather = currentWeatherResult.data.getCurrentWeather;
    
    return {
      temperature: currentWeather.temperature,
      condition: currentWeather.condition,
      icon: currentWeather.icon,
      description: currentWeather.description,
      city: currentWeather.city,
      country: currentWeather.country,
      weatherId: currentWeather.weatherId,
      humidity: currentWeather.humidity,
      windSpeed: currentWeather.windSpeed,
      pressure: currentWeather.pressure
    };
  } catch (error) {
    console.error('GraphQL failed to get weather data:', error);
    
    // If API call fails, return default/mock data
    return {
      temperature: 25,
      condition: 'Sunny',
      icon: '☀️',
      description: 'Clear sky',
      city: 'Shanghai',
      country: 'CN'
    };
  }
};