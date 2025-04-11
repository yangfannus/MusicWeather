import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getLocation, getWeather, getRecommendedTracks } from './ApiService';

const HomePage = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      setLocationError(null); // 重置错误状态

      // 首先获取位置信息
      const locationData = await getLocation();
      setLocation(locationData);
      
      // 根据位置获取天气
      const weatherData = await getWeather(locationData.lat, locationData.lon);
      setWeather(weatherData);
      
      // 获取音乐推荐
      const tracks = await getRecommendedTracks();
      setRecommendations(tracks);
    } catch (error) {
      console.error('位置服务错误:', error);
      setLocationError(
        error.code === 1 
          ? '请允许位置访问权限' 
          : '无法获取位置信息，使用默认位置'
      );
    } finally {
      setLoading(false);
    }
  };

  const refreshLocation = async () => {
    try {
      setLoading(true);
      await fetchData();
    } catch (error) {
      console.error('刷新位置失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* 位置和天气信息 */}
        <div className="glass animate-fadeIn mb-8 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Weather in {location?.city}, {location?.country}
            </h2>
            <button 
              onClick={refreshLocation}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              disabled={loading}
            >
              🔄
            </button>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-6xl">{weather?.icon}</span>
            <div>
              <p className="text-4xl font-bold">{weather?.temperature}°C</p>
              <p className="text-xl">{weather?.condition}</p>
              <p className="text-sm mt-2">
                {location?.lat.toFixed(4)}°N, {location?.lon.toFixed(4)}°E
              </p>
            </div>
          </div>
        </div>

        {/* 推荐音乐 */}
        <div className="glass animate-slideUp p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Recommended Music</h2>
          <div className="grid gap-4">
            {recommendations.map(track => (
              <div 
                key={track.id} 
                className="card-hover flex items-center bg-white/10 p-4 rounded-lg"
              >
                <img 
                  src={track.albumArt} 
                  alt={track.name} 
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <h3 className="font-bold">{track.name}</h3>
                  <p className="text-sm opacity-80">{track.artists.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enter Chord Game Button */}
      </div>
    </div>
  );
};

export default HomePage;