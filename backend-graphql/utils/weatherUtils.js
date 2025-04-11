const axios = require('axios');

// OpenWeatherMap API 配置
// 使用环境变量获取 API 密钥，避免硬编码
const API_KEY = process.env.OPENWEATHER_API_KEY; // 请在 .env 文件中配置您的 API 密钥
console.log('Weather Utils 初始化 - 使用 API_KEY:', API_KEY || '未设置');

// 如果 API_KEY 未设置，使用硬编码的备用密钥
const FALLBACK_KEY = '2639d8f150e48b5fb7c6fb59ca20a783';
const FINAL_API_KEY = API_KEY || FALLBACK_KEY;
console.log('最终使用的 API_KEY:', FINAL_API_KEY.substring(0, 3) + '...');

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 检查 API_KEY 是否配置
if (!API_KEY) {
  console.warn('警告: OPENWEATHER_API_KEY 环境变量未设置，使用备用密钥');
}

// 天气状况映射到中英文描述和图标
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

// 获取 IP 定位信息
const getLocationByIp = async (ip) => {
  // 默认值（上海）
  const defaultLocation = {
    city: "Shanghai",
    country: "CN", 
    lat: 31.2304,
    lon: 121.4737
  };

  try {
    // 处理 IP 地址格式
    const cleanIp = ip === '::1' ? '127.0.0.1' : ip.replace(/^.*:/, '');
    
    console.log(`处理后的 IP: ${cleanIp}`);
    
    // 对于内部 IP，直接返回默认位置
    if (cleanIp === '127.0.0.1' || cleanIp.startsWith('192.168.') || cleanIp.startsWith('10.') || cleanIp.startsWith('172.')) {
      console.log('内部 IP，使用默认位置信息');
      return defaultLocation;
    }
    
    // 使用 ip-api 服务获取位置信息
    console.log(`请求 ip-api: http://ip-api.com/json/${cleanIp}`);
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
    console.error('IP 定位失败:', error.message);
    return defaultLocation;
  }
};

// 获取当前天气数据
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: FINAL_API_KEY,
        units: 'metric', // 使用摄氏度
        lang: 'en'       // 返回英语结果
      }
    });
    
    const data = response.data;
    
    // 转换为我们自己的数据格式
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
    console.error('获取天气数据错误:', error.message);
    throw new Error(`获取天气数据失败: ${error.message}`);
  }
};

// 获取天气预报
const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: FINAL_API_KEY,
        units: 'metric', // 使用摄氏度
        lang: 'en',      // 返回英语结果
        cnt: 8           // 只返回24小时的预报（每3小时，共8次）
      }
    });
    
    const data = response.data;
    
    // 转换为我们自己的数据格式
    const forecast = data.list.map(item => {
      const weatherCondition = item.weather[0].main;
      const mappedWeather = weatherMapping[weatherCondition] || { condition: weatherCondition, icon: '🌡️' };
      
      return {
        datetime: item.dt * 1000, // 转换为毫秒时间戳
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
    console.error('获取天气预报错误:', error.message);
    throw new Error(`获取天气预报失败: ${error.message}`);
  }
};

module.exports = {
  getLocationByIp,
  getCurrentWeather,
  getWeatherForecast,
  weatherMapping
}; 