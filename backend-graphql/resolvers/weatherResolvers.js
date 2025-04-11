const { getCurrentWeather } = require('../utils/weatherUtils');

const weatherResolvers = {
  Query: {
    // Get current weather
    getCurrentWeather: async (_, { lat, lon }) => {
      try {
        return await getCurrentWeather(lat, lon);
      } catch (error) {
        console.error('Error getting current weather:', error.message);
        throw new Error(`Failed to get current weather: ${error.message}`);
      }
    }
  }
};

module.exports = weatherResolvers; 