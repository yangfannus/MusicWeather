const { getLocationByIp, getCurrentWeather, getWeatherForecast } = require('../utils/weatherUtils');

const weatherResolvers = {
  Query: {
    // Get location information by IP
    getLocationByIp: async (_, __, { req }) => {
      try {
        // Get client IP address
        const ip = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress || 
                  (req.connection.socket ? req.connection.socket.remoteAddress : null);
        
        console.log(`Client IP: ${ip}`);
        
        // Get location information
        const location = await getLocationByIp(ip);
        return location;
      } catch (error) {
        console.error('Error getting location:', error.message);
        throw new Error(`Failed to get location: ${error.message}`);
      }
    },
    
    // Get current weather
    getCurrentWeather: async (_, { lat, lon }) => {
      try {
        return await getCurrentWeather(lat, lon);
      } catch (error) {
        console.error('Error getting current weather:', error.message);
        throw new Error(`Failed to get current weather: ${error.message}`);
      }
    },
    
    // Get weather forecast
    getWeatherForecast: async (_, { lat, lon }) => {
      try {
        return await getWeatherForecast(lat, lon);
      } catch (error) {
        console.error('Error getting weather forecast:', error.message);
        throw new Error(`Failed to get weather forecast: ${error.message}`);
      }
    }
  }
};

module.exports = weatherResolvers;