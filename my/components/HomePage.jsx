import React from 'react';
import { useRouter } from 'next/router';
// Remove type imports, only keep actual functions or variables that might be needed
import {} from './ApiService';

// HomePageProps structure:
// loading: boolean
// error: string
// weather: weather data object or null
// location: location data object or null
// recommendations: recommended songs array
// chords: chord data array
// isLoggedIn: boolean
// openLoginModal: function
// openRegisterModal: function

const HomePage = ({
  error,
  weather,
  location,
  recommendations,
  chords,
  isLoggedIn,
  openLoginModal
}) => {
  const router = useRouter();
  
  const goToGamePage = () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    
    // Pass chord data to the game page
    router.push({
      pathname: '/game',
      query: { weather: weather?.condition }
    });
  };

  return (
    <>
      {error && (
        <div className="mb-8 p-4 bg-red-500/80 backdrop-blur-sm text-white rounded-lg shadow-lg animate-slideUp">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="glass-dark rounded-2xl p-8 shadow-xl card-hover animate-slideUp" style={{animationDelay: '0.1s'}}>
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Current Location & Weather
          </h2>
          {location && weather && (
            <>
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-xl mb-4 text-white font-medium flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  {location.city}, {location.country}
                </p>
                <div className="flex items-center">
                  <span className="text-6xl mr-6 animate-float">{weather.icon}</span>
                  <div>
                    <p className="text-4xl text-white font-bold">{weather.temperature}°C</p>
                    <p className="text-white/80 text-lg">{weather.condition}</p>
                    {weather.description && (
                      <p className="text-white/60 text-sm mt-1">{weather.description}</p>
                    )}
                  </div>
                </div>

                {/* Additional weather details */}
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  {weather.humidity !== undefined && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60 text-sm">Humidity</div>
                      <div className="text-white font-medium mt-1">{weather.humidity}%</div>
                    </div>
                  )}
                  
                  {weather.windSpeed !== undefined && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60 text-sm">Wind Speed</div>
                      <div className="text-white font-medium mt-1">{weather.windSpeed} m/s</div>
                    </div>
                  )}
                  
                  {weather.pressure !== undefined && (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="text-white/60 text-sm">Pressure</div>
                      <div className="text-white font-medium mt-1">{weather.pressure} hPa</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-white/70">Now</p>
                    <div className="text-2xl mt-1">{weather.icon}</div>
                    <p className="text-xl font-bold mt-1">{weather.temperature}°C</p>
                    <p className="text-sm text-white/80">{weather.condition}</p>
                  </div>
                  {weather.forecast.map((forecast, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm text-white/70">{forecast.hour}:00</p>
                      <div className="text-2xl mt-1">{forecast.icon}</div>
                      <p className="text-xl font-bold mt-1">{forecast.temperature}°C</p>
                      <p className="text-sm text-white/80">{forecast.condition}</p>
                      {forecast.description && (
                        <p className="text-xs text-white/60 mt-1">{forecast.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        <div className="glass-dark rounded-2xl p-8 shadow-xl card-hover animate-slideUp" style={{animationDelay: '0.2s'}}>
          <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            Recommended Music
          </h2>
          <div className="space-y-4 overflow-hidden">
            {recommendations.map((track, index) => (
              <div 
                key={track.id} 
                className="flex items-center bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group animate-slideUp" 
                style={{animationDelay: `${0.1 + index * 0.1}s`}}
              >
                <img 
                  src={track.albumArt} 
                  alt={track.name} 
                  className="w-16 h-16 object-cover rounded-lg mr-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white text-lg">{track.name}</h3>
                  <p className="text-sm text-white/70">{track.artists.join(', ')}</p>
                </div>
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="glass-dark rounded-2xl p-8 shadow-xl mb-12 card-hover animate-slideUp" style={{animationDelay: '0.3s'}}>
        <h2 className="text-2xl font-semibold mb-6 text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          Recommended Chords
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chords.map((chord, index) => (
            <div 
              key={index} 
              className="bg-white/10 p-6 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer animate-slideUp"
              style={{animationDelay: `${0.3 + index * 0.1}s`}}
            >
              <h3 className="text-2xl font-bold mb-3 text-white">{chord.name}</h3>
              <p className="text-sm text-white/80">Notes: {chord.notes.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mb-12 animate-slideUp" style={{animationDelay: '0.5s'}}>
        <button
          onClick={goToGamePage}
          className="px-8 py-4 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300 font-bold text-lg transform hover:translate-y-[-5px] hover:shadow-xl flex items-center mx-auto animate-pulse-slow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Enter Chord Game
        </button>
      </div>
      
      <footer className="text-center text-white/60 text-sm py-4 border-t border-white/10 animate-fadeIn" style={{animationDelay: '0.6s'}}>
        <p>© {new Date().getFullYear()} Music Weather | Weather-based music and chord recommendation system</p>
      </footer>
    </>
  );
};

export default HomePage; 