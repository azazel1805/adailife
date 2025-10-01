import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, users } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Reset error on new attempt
    const success = login(username, password);
    if (!success) {
      setError('Incorrect password. Please try again.');
    }
  };
  
  const handleSelectProfile = (profileName: string) => {
    setUsername(profileName);
    setError(''); // Clear error when a profile is selected
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 font-sans">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
            <div className="inline-block p-4 bg-slate-900 rounded-2xl shadow-lg">
                <svg width="60" height="60" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="20" fill="black"/>
                    <g transform="translate(25 23)">
                        <path d="M34.3,47.1H15.7L0,0h11.2l9.4,31.4L30,0h11.2L34.3,47.1z M49.9,47.1V0H58v47.1H49.9z" fill="url(#g)"/>
                    </g>
                    <defs>
                        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                            <stop stopColor="#a78bfa"/>
                            <stop offset="1" stopColor="#7c3aed"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mt-4">Welcome to ADAI</h1>
            <p className="text-slate-500 dark:text-slate-400">Your AI-Powered Language Assistant</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border-2 border-slate-200 dark:border-slate-800">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-adai-primary focus:outline-none text-slate-800 dark:text-slate-200 text-center transition-colors"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="mt-4 w-full p-3 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-adai-primary focus:outline-none text-slate-800 dark:text-slate-200 text-center transition-colors"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full bg-adai-primary hover:bg-adai-secondary text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:bg-slate-400 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            disabled={!username.trim() || !password.trim()}
          >
            Continue
          </button>
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </form>

        {users.length > 0 && (
          <div className="mt-8">
            <h2 className="text-slate-500 dark:text-slate-400 mb-4">Or select an existing profile:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {users.map(userProfile => (
                <button
                  key={userProfile}
                  onClick={() => handleSelectProfile(userProfile)}
                  className="px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg transition-colors duration-200 border-2 border-slate-200 dark:border-slate-700"
                >
                  {userProfile}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;