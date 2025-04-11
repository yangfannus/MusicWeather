import { useState, useEffect } from 'react';
import { 
  getLocation, 
  getWeather 
} from '../components/ApiService';
import Head from 'next/head';
import Loading from '../components/Loading';

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get weather and location
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get location information
        const locationData = await getLocation();
        setLocation(locationData);
        
        // Get weather information
        const weatherData = await getWeather(locationData.lat, locationData.lon);
        setWeather(weatherData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data, please try again later');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Generate background class based on weather
  const getBackgroundClass = () => {
    if (!weather) return 'bg-gradient-to-br from-blue-400 to-indigo-600 bg-cover bg-center bg-no-repeat bg-fixed';
    
    switch (weather.condition) {
      case 'Sunny':
        return 'bg-gradient-to-br from-yellow-300 to-orange-500 bg-cover bg-center bg-no-repeat bg-fixed';
      case 'Cloudy':
        return 'bg-gradient-to-br from-gray-300 to-blue-400 bg-cover bg-center bg-no-repeat bg-fixed';
      case 'Rainy':
        return 'bg-gradient-to-br from-blue-400 to-gray-600 bg-cover bg-center bg-no-repeat bg-fixed';
      case 'Snowy':
        return 'bg-gradient-to-br from-blue-100 to-indigo-200 bg-cover bg-center bg-no-repeat bg-fixed';
      default:
        return 'bg-gradient-to-br from-blue-400 to-indigo-600 bg-cover bg-center bg-no-repeat bg-fixed';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
        <div className="flex flex-col items-center animate-pulse-slow">
          <div className="w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin mb-4"></div>
          <div className="text-xl text-white font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getBackgroundClass()} text-white`}>
      <Head>
        <title>Simple Weather App</title>
        <meta name="description" content="Get current weather information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fadeIn">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Simple Weather App</h1>
        </header>
        
        {weather && location && (
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 shadow-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="text-9xl mb-4">{weather.icon}</div>
              <h2 className="text-3xl font-bold">{location.city}, {location.country}</h2>
              <p className="text-5xl font-bold mt-4">{weather.temperature}°C</p>
              <p className="text-xl mt-2 capitalize">{weather.condition}</p>
              <p className="text-md mt-1">{weather.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{weather.humidity}%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm opacity-80">Wind Speed</p>
                <p className="text-xl font-semibold">{weather.windSpeed} m/s</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p className="text-sm opacity-80">Pressure</p>
                <p className="text-xl font-semibold">{weather.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 text-center mt-8">
            <p className="text-xl">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
} 