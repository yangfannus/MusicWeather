import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import { getWeather, getLocation } from '../components/ApiService';

export default function MusicChordPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedInstrument, setSelectedInstrument] = useState('piano');
  const [selectedChords, setSelectedChords] = useState([]);
  const [weather, setWeather] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [generatedChordImages, setGeneratedChordImages] = useState([]);
  const [showChordGame, setShowChordGame] = useState(false);
  
  // Impersonate user login status
  const openLoginModal = () => {
    // This should open the login modal window
    setIsLoggedIn(true); // The simulated login is successful
  };
  
  const openRegisterModal = () => {
    // This should open the registration modal window
    setIsLoggedIn(true); // Simulated registration and login successfully
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Get weather data to set the background
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const locationData = await getLocation();
        const weatherData = await getWeather(locationData.lat, locationData.lon);
        setWeather(weatherData);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    };
    
    fetchWeatherData();
  }, []);
  
  // Generate background classes based on the weather
  const getBackgroundClass = () => {
    if (!weather) return 'bg-[url("/images/default.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
    
    switch (weather.condition) {
      case 'Sunny':
        return 'bg-[url("/images/sunny.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
      case 'Cloudy':
        return 'bg-[url("/images/cloudy.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
      case 'Rainy':
        return 'bg-[url("/images/rainy.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
      case 'Snowy':
        return 'bg-[url("/images/snowy.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
      default:
        return 'bg-[url("/images/default.png")] bg-cover bg-center bg-no-repeat bg-fixed backdrop-blur-sm bg-blend-overlay';
    }
  };

  // Instrument data
  const instruments = [
    {
      id: 'piano',
      name: 'Piano',
      icon: '🎹',
      chords: [
        { name: 'C Major', notes: ['C', 'E', 'G'] },
        { name: 'G Major', notes: ['G', 'B', 'D'] },
        { name: 'D Major', notes: ['D', 'F#', 'A'] },
        { name: 'A Major', notes: ['A', 'C#', 'E'] },
        { name: 'E Major', notes: ['E', 'G#', 'B'] },
        { name: 'F Major', notes: ['F', 'A', 'C'] },
        { name: 'Bb Major', notes: ['Bb', 'D', 'F'] },
        { name: 'Cm', notes: ['C', 'Eb', 'G'] },
        { name: 'Gm', notes: ['G', 'Bb', 'D'] },
        { name: 'Am', notes: ['A', 'C', 'E'] }
      ]
    },
    {
      id: 'guitar',
      name: 'Guitar',
      icon: '🎸',
      chords: [
        { name: 'C', notes: ['C', 'E', 'G'] },
        { name: 'G', notes: ['G', 'B', 'D'] },
        { name: 'D', notes: ['D', 'F#', 'A'] },
        { name: 'A', notes: ['A', 'C#', 'E'] },
        { name: 'E', notes: ['E', 'G#', 'B'] },
        { name: 'Am', notes: ['A', 'C', 'E'] },
        { name: 'Em', notes: ['E', 'G', 'B'] },
        { name: 'Dm', notes: ['D', 'F', 'A'] },
        { name: 'F', notes: ['F', 'A', 'C'] },
        { name: 'Cadd9', notes: ['C', 'E', 'G', 'D'] }
      ]
    },
    {
      id: 'bass',
      name: 'Bass',
      icon: '🎻',
      chords: [
        { name: 'C Bass', notes: ['C2', 'G2'] },
        { name: 'G Bass', notes: ['G1', 'D2'] },
        { name: 'D Bass', notes: ['D2', 'A2'] },
        { name: 'A Bass', notes: ['A1', 'E2'] },
        { name: 'E Bass', notes: ['E1', 'B1'] },
        { name: 'F Bass', notes: ['F1', 'C2'] },
        { name: 'C Walking Bass', notes: ['C2', 'E2', 'G2', 'A2'] },
        { name: 'G Walking Bass', notes: ['G1', 'B1', 'D2', 'E2'] }
      ]
    },
    {
      id: 'ukulele',
      name: 'Ukulele',
      icon: '🪕',
      chords: [
        { name: 'C', notes: ['C', 'E', 'G'] },
        { name: 'G', notes: ['G', 'B', 'D'] },
        { name: 'F', notes: ['F', 'A', 'C'] },
        { name: 'Am', notes: ['A', 'C', 'E'] },
        { name: 'Em', notes: ['E', 'G', 'B'] },
        { name: 'C7', notes: ['C', 'E', 'G', 'Bb'] },
        { name: 'G7', notes: ['G', 'B', 'D', 'F'] },
        { name: 'Dm', notes: ['D', 'F', 'A'] }
      ]
    }
  ];

  // Search for music
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API calls
    setTimeout(() => {
      // Simulate search result data
      const mockResults = [
        {
          id: '1',
          title: 'Sunny Day',
          artist: 'Jay Chou',
          albumCover: 'https://picsum.photos/id/1/100',
          previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
        },
        {
          id: '2',
          title: 'Jasmine',
          artist: 'Jay Chou',
          albumCover: 'https://picsum.photos/id/2/100',
          previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        },
        {
          id: '3',
          title: 'Dandelion\'s Promise',
          artist: 'Jay Chou',
          albumCover: 'https://picsum.photos/id/3/100',
          previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
        },
        {
          id: '4',
          title: 'Rice Field',
          artist: 'Jay Chou',
          albumCover: 'https://picsum.photos/id/4/100',
          previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
        },
        {
          id: '5',
          title: 'Nocturne',
          artist: 'Jay Chou',
          albumCover: 'https://picsum.photos/id/5/100',
          previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3'
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  // Add chords to the picklist
  const addChord = (chord) => {
    setSelectedChords([...selectedChords, chord]);
  };
  
  // Removes chords from the picklist
  const removeChord = (index) => {
    const newChords = [...selectedChords];
    newChords.splice(index, 1);
    setSelectedChords(newChords);
  };
  
  // Play a preview of the music
  const playAudio = (url) => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
    
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
    setIsPlaying(true);
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
  };
  
  // Pause the music preview
  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };
  
  // Create a chord picture
  const generateChordImages = () => {
    if (selectedChords.length === 0) return;
    
    // Simulate an API call to generate a chord image
    const images = selectedChords.map((chord, index) => ({
      id: `img-${index}`,
      url: `https://picsum.photos/id/${20 + index}/300/200`,
      instrument: instruments.find(i => i.id === selectedInstrument)?.name || '',
      chordName: chord.name
    }));
    
    setGeneratedChordImages(images);
    setShowChordGame(true);
  };

  // Create chords directly from search results
  const createChordsFromSearchResult = (result) => {
    // The simulation automatically selects the appropriate chord based on the song information
    const instrumentId = 'guitar'; // The guitar is used by default
    const instrument = instruments.find(i => i.id === instrumentId);
    
    if (instrument) {
      // 3-4 chords are randomly selected as examples
      const randomChords = [...instrument.chords]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3 + Math.floor(Math.random() * 2));
      
      setSelectedInstrument(instrumentId);
      setSelectedChords(randomChords);
      
      // Generate chord pictures
      setTimeout(() => {
        generateChordImages();
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()} text-white`}>
      <Head>
        <title>Music Chord | Create and Learn Chord Progressions</title>
        <meta name="description" content="Search for music and create chord progressions, learn chords for different instruments" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl animate-fadeIn">
        <Header 
          isLoggedIn={isLoggedIn} 
          openLoginModal={openLoginModal} 
          openRegisterModal={openRegisterModal} 
          handleLogout={handleLogout} 
        />
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-white to-blue-200 inline-block">Music Chord Creator</h1>
          <p className="text-white/80">Search for music and create your own chord progressions for multiple instruments</p>
        </div>
        
        {/* Music Search Panel */}
        <div className="glass-dark rounded-2xl p-8 shadow-xl animate-slideUp mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-white">Music Search</h2>
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for songs, artists or albums..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                onClick={handleSearch}
                disabled={isSearching}
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Results */}
          <div className="space-y-4">
            {searchResults.length === 0 && !isSearching && (
              <div className="text-center py-10 text-white/60">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p className="text-lg">Search for music to start creating chord progressions</p>
              </div>
            )}
            
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="flex items-center bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              >
                <img 
                  src={result.albumCover} 
                  alt={result.title} 
                  className="w-16 h-16 object-cover rounded-lg mr-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white text-lg">{result.title}</h3>
                  <p className="text-sm text-white/70">{result.artist}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300"
                    onClick={() => isPlaying ? pauseAudio() : playAudio(result.previewUrl)}
                  >
                    {isPlaying && currentAudio?.src === result.previewUrl ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                  <button 
                    className="p-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                    onClick={() => createChordsFromSearchResult(result)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chord Creation Panel - Separate Sections */}
        {!showChordGame && (
          <div className="animate-slideUp mb-8">
            <div className="glass-dark rounded-2xl p-6 shadow-xl mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-white">Chord Creator</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Instrument selection */}
                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-4 text-white">Select Instrument</h3>
                  <div className="space-y-2">
                    {instruments.map((instrument) => (
                      <button
                        key={instrument.id}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center transition-all duration-300 ${selectedInstrument === instrument.id ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                        onClick={() => setSelectedInstrument(instrument.id)}
                      >
                        <span className="text-2xl mr-3">{instrument.icon}</span>
                        <span>{instrument.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Middle: Chord Selection */}
                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {instruments.find(i => i.id === selectedInstrument)?.name} Chords
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {instruments.find(i => i.id === selectedInstrument)?.chords.map((chord, idx) => (
                      <button
                        key={idx}
                        className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 text-left"
                        onClick={() => addChord(chord)}
                      >
                        <h3 className="text-lg font-bold text-white">{chord.name}</h3>
                        <p className="text-sm text-white/70">{chord.notes.join(', ')}</p>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Right: Selected chord */}
                <div className="bg-white/5 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-4 text-white">Chord Progression</h3>
                  {selectedChords.length === 0 ? (
                    <div className="text-center py-8 text-white/60">
                      <p>Select chords from the left to add to your progression</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedChords.map((chord, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white/10 p-3 rounded-xl flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-bold text-white">{chord.name}</h3>
                            <p className="text-xs text-white/70">{chord.notes.join(', ')}</p>
                          </div>
                          <button 
                            className="p-1.5 rounded-full bg-red-500/60 hover:bg-red-500/80 transition-all duration-300"
                            onClick={() => removeChord(idx)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {selectedChords.length > 0 && (
                    <div className="mt-6">
                      <button 
                        className="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium"
                        onClick={generateChordImages}
                      >
                        Generate Chord Images
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Chord Picture Show & Game */}
        {showChordGame && (
          <div className="animate-slideUp space-y-8">
            {/* Chord Picture Show */}
            <div className="glass-dark rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Generated Chord Images</h2>
                <button 
                  className="text-white/70 hover:text-white transition-all duration-300"
                  onClick={() => setShowChordGame(false)}
                >
                  Back to Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedChordImages.map((img) => (
                  <div key={img.id} className="bg-white/10 rounded-xl overflow-hidden">
                    <img src={img.url} alt={img.chordName} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-white text-lg">{img.chordName}</h3>
                      <p className="text-sm text-white/70">{img.instrument}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chord Game */}
            <div className="glass-dark rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-white">Chord Recognition Game</h2>
              
              <div className="bg-white/10 p-6 rounded-xl">
                <div className="flex justify-center mb-4">
                  <div className="relative w-64 h-64 bg-indigo-900/30 rounded-xl flex items-center justify-center">
                    <img
                      src={generatedChordImages.length > 0 ? generatedChordImages[0].url : "https://picsum.photos/id/20/300/300"}
                      alt="Recognize chord"
                      className="w-full h-full object-cover rounded-xl opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                      <span className="text-5xl font-bold text-white">?</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-white text-center mb-4">What chord is this?</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {generatedChordImages.map((img) => (
                    <button
                      key={img.id}
                      className="bg-white/10 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300"
                    >
                      {img.chordName}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="bg-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300">
                    Next Question
                  </button>
                </div>
              </div>
            </div>
            
            {/* Chord Presentation */}
            <div className="glass-dark rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-white">Chord Progression Demo</h2>
              
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Your Chord Progression</h3>
                    <button className="bg-indigo-600 px-4 py-1.5 rounded-lg text-sm hover:bg-indigo-700 transition-all duration-300">
                      Play
                    </button>
                  </div>
                  
                  <div className="flex overflow-x-auto pb-2 space-x-3">
                    {selectedChords.map((chord, idx) => (
                      <div key={idx} className="bg-white/20 p-3 rounded-lg min-w-[100px] text-center">
                        <div className="font-bold">{chord.name}</div>
                        <div className="text-xs text-white/70">{chord.notes.join(', ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Popular Song Example</h3>
                    <div className="text-sm text-white/70">Jay Chou - Sunny Day</div>
                  </div>
                  
                  <div className="overflow-hidden relative h-4 rounded-full bg-white/20 mb-2">
                    <div className="bg-indigo-600 h-full w-1/3"></div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 