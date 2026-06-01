import { useState, useEffect } from 'react';
import { Search, Clock, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';
import { TechLoginButton } from './TechLoginButton';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage: _currentPage, onPageChange }: HeaderProps) {
  void _currentPage;
  const { currentUser, searchQuery, setSearchQuery, darkMode, toggleDarkMode } = useStore();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileClick = () => {
    if (!currentUser) {
      onPageChange('login');
    } else {
      onPageChange('profile');
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date: Date) =>
    date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <header className="sticky top-0 z-40 border-b border-[#D1D9E6] dark:border-[#2D3548] bg-[#F2F5F8]/90 dark:bg-[#0B0C10]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">

          {/* Left: Logo + Clock */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            {/* Logo - Bigger, par with brand name */}
            <button
              onClick={() => onPageChange('home')}
              className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
            >
              <img
                src="/logo.png"
                alt="Igris Logo"
                className="h-14 w-14 sm:h-[68px] sm:w-[68px] object-contain drop-shadow-[0_0_8px_rgba(0,102,255,0.4)] dark:drop-shadow-[0_0_12px_rgba(102,252,241,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(0,102,255,0.6)] dark:group-hover:drop-shadow-[0_0_16px_rgba(102,252,241,0.6)] transition-all"
              />
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span
                  className="text-3xl font-bold tracking-tight text-[#1C2541] dark:text-[#C5C6C7]"
                  style={{ fontFamily: 'Space Grotesk' }}
                >
                  Igris
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-[#0066FF] dark:text-[#66FCF1] uppercase mt-0.5">
                  Tech Catalog
                </span>
              </div>
            </button>

            {/* Clock */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#E1E6EB]/60 dark:bg-[#1F2833] rounded-xl font-mono text-sm border border-[#D1D9E6] dark:border-[#2D3548]">
              <Clock size={16} className="text-[#0066FF] dark:text-[#66FCF1]" />
              <div className="flex flex-col items-start leading-tight">
                <span className="tabular-nums text-xs text-[#0066FF] dark:text-[#66FCF1]">{formatDate(time)}</span>
                <span className="tabular-nums font-semibold text-[#1C2541] dark:text-[#C5C6C7]">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search
                  size={18}
                  className="text-[#3D4A5C] dark:text-[#A0A5B0] group-focus-within:text-[#0066FF] dark:group-focus-within:text-[#66FCF1] transition-colors"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, services..."
                className="block w-full pl-10 pr-3 py-2 border border-[#D1D9E6] dark:border-[#2D3548] rounded-xl bg-[#FFFFFF]/60 dark:bg-[#1F2833] text-[#1C2541] dark:text-[#C5C6C7] placeholder-[#3D4A5C]/50 dark:placeholder-[#A0A5B0]/50 focus:bg-white dark:focus:bg-[#1F2833] focus:ring-2 focus:ring-[#0066FF]/30 dark:focus:ring-[#66FCF1]/30 focus:border-[#0066FF] dark:focus:border-[#66FCF1] transition-all outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Right: Theme toggle + Profile/Login */}
          <div className="flex-shrink-0 flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-[#E1E6EB] dark:bg-[#1F2833] border border-[#D1D9E6] dark:border-[#2D3548] text-[#0066FF] dark:text-[#66FCF1] hover:bg-[#D1D9E6] dark:hover:bg-[#2D3548] transition-all duration-300"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <Sun size={18} className={`absolute transition-all duration-500 ${darkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <Moon size={18} className={`absolute transition-all duration-500 ${darkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </button>

            {/* Profile/Login */}
            {currentUser ? (
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 px-3 py-2 bg-[#E1E6EB] dark:bg-[#1F2833] rounded-xl border border-[#D1D9E6] dark:border-[#2D3548] hover:bg-[#D1D9E6] dark:hover:bg-[#2D3548] transition-all"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0066FF] to-[#66FCF1] flex items-center justify-center text-white text-sm font-bold">
                  {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-tight">
                  <span className="text-sm font-semibold text-[#1C2541] dark:text-[#C5C6C7]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-[#3D4A5C] dark:text-[#A0A5B0]">{currentUser.email}</span>
                </div>
              </button>
            ) : (
              <TechLoginButton onClick={() => onPageChange('login')} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
