const { getLocationByIp, getCurrentWeather, getWeatherForecast } = require('../utils/weatherUtils');

const weatherResolvers = {
  Query: {
    // 通过 IP 获取位置信息
    getLocationByIp: async (_, __, { req }) => {
      try {
        // 获取客户端 IP 地址
        const ip = req.headers['x-forwarded-for'] || 
                  req.connection.remoteAddress || 
                  req.socket.remoteAddress || 
                  (req.connection.socket ? req.connection.socket.remoteAddress : null);
        
        console.log(`客户端 IP: ${ip}`);
        
        // 获取位置信息
        const location = await getLocationByIp(ip);
        return location;
      } catch (error) {
        console.error('获取位置信息错误:', error.message);
        throw new Error(`获取位置信息失败: ${error.message}`);
      }
    },
    
    // 获取当前天气
    getCurrentWeather: async (_, { lat, lon }) => {
      try {
        return await getCurrentWeather(lat, lon);
      } catch (error) {
        console.error('获取当前天气错误:', error.message);
        throw new Error(`获取当前天气失败: ${error.message}`);
      }
    },
    
    // 获取天气预报
    getWeatherForecast: async (_, { lat, lon }) => {
      try {
        return await getWeatherForecast(lat, lon);
      } catch (error) {
        console.error('获取天气预报错误:', error.message);
        throw new Error(`获取天气预报失败: ${error.message}`);
      }
    }
  }
};

module.exports = weatherResolvers; 