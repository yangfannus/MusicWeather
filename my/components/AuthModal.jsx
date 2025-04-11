import { useState } from 'react';
import { loginUser, registerUser } from './AuthService';
import { LoginCredentials, RegisterCredentials } from './AuthService';

// AuthModalProps structure:
// isOpen: boolean
// onClose: function
// initialMode: 'login' or 'register' (optional)
// onAuthSuccess: function (optional)

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      let userData;
      
      if (mode === 'login') {
        const loginData = {
          email,
          password,
        };
        userData = await loginUser(loginData);
      } else {
        const registerData = {
          username,
          email,
          password,
        };
        userData = await registerUser(registerData);
      }
      
      // Authentication success callback
      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }
      
      // Close modal and reset form
      onClose();
      setEmail('');
      setPassword('');
      setUsername('');
      setConfirmPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : (mode === 'login' ? 'Login failed' : 'Registration failed'));
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-white/10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          {mode === 'login' ? 'Welcome Back' : 'Create New Account'}
        </h2>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/80 text-white rounded-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/50"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-white/90 mb-2 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white/90 mb-2 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                minLength={mode === 'register' ? 6 : undefined}
                required
              />
            </div>
          </div>
          
          {mode === 'register' && (
            <div>
              <label className="block text-white/90 mb-2 text-sm font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-white/50"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  minLength={6}
                  required
                />
              </div>
            </div>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-4 rounded-lg transition duration-300 font-medium shadow-lg transform hover:translate-y-[-2px] ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-blue-600'}`}
          >
            {isLoading ? 'Processing...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-white/70">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button 
              onClick={toggleMode}
              className="text-indigo-300 hover:text-indigo-200 font-medium hover:underline transition-colors duration-300"
            >
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 