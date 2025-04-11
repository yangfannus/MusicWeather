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


// Spotify API - 这部分仍使用模拟数据，后续可以集成真实Spotify API
export const getRecommendedTracks = async (weatherCondition) => {
  // 模拟API调用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 根据天气条件推荐不同的音乐
      const tracksByWeather = {
        'Sunny': [
          { id: '1', name: 'Sunny Day', artists: ['Jay Chou'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '2', name: 'Walking On Sunshine', artists: ['Katrina & The Waves'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273c4f4c553c93c9c8d80d7e0af', url: '#' },
          { id: '3', name: 'Here Comes The Sun', artists: ['The Beatles'], albumArt: 'https://i.scdn.co/image/ab67616d0000b2732c0ed1d96f8e42eb4bfea6a2', url: '#' }
        ],
        'Cloudy': [
          { id: '4', name: 'Cloudy Day', artists: ['Karen Mok'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '5', name: 'Sheep on Clouds', artists: ['Fang Dong de Mao'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273a6c78c03ac02a8c8fef61c5a', url: '#' },
          { id: '6', name: 'Riders on the Storm', artists: ['The Doors'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273a7e91f30e3aa92b86e97c9b5', url: '#' }
        ],
        'Rainy': [
          { id: '7', name: 'Listen to Mom', artists: ['Jay Chou'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '8', name: 'Rainy Day', artists: ['Stefanie Sun'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273f2f663ef535c5c0c7c99a73c', url: '#' },
          { id: '9', name: 'Set Fire to the Rain', artists: ['Adele'], albumArt: 'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300', url: '#' }
        ],
        'Snowy': [
          { id: '10', name: 'Let It Snow', artists: ['Dean Martin'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '11', name: 'Snowflakes', artists: ['Priscilla Chan'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273e4f3c7f701c1c2eef96b27e1', url: '#' },
          { id: '12', name: 'Snowman', artists: ['Sia'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273a7bc469fc5c2921c4cfc7172', url: '#' }
        ],
        'Foggy': [
          { id: '13', name: 'Fog', artists: ['Eason Chan'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '14', name: 'City in the Mist', artists: ['Sandy Lam'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273a6c78c03ac02a8c8fef61c5a', url: '#' },
          { id: '15', name: 'The Foggy Dew', artists: ['The Chieftains'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273a7e91f30e3aa92b86e97c9b5', url: '#' }
        ],
        'Thunderstorm': [
          { id: '16', name: 'Thunderstruck', artists: ['AC/DC'], albumArt: 'https://c-ssl.dtstatic.com/uploads/blog/202203/22/20220322193453_8997f.thumb.400_0.jpg', url: '#' },
          { id: '17', name: 'Thunderstorm', artists: ['Li Yuchun'], albumArt: 'https://i.scdn.co/image/ab67616d0000b273f2f663ef535c5c0c7c99a73c', url: '#' },
          { id: '18', name: 'Thunder', artists: ['Imagine Dragons'], albumArt: 'https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300', url: '#' }
        ]
      };
      
      resolve(tracksByWeather[weatherCondition] || tracksByWeather['Sunny']);
    }, 300);
  });
};