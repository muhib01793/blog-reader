import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Bookmark, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Compass, 
  Layers, 
  Info, 
  Sparkles,
  Command
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';

export default function Navbar() {
  const { 
    theme, 
    toggleTheme, 
    bookmarks, 
    setIsBookmarksOpen, 
    setIsSearchModalOpen,
    currentRoute,
    navigateTo 
  } = useBlog();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Feed', path: '/', icon: BookOpen },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'About', path: '/about', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/' && (currentRoute === '/' || currentRoute === '')) return true;
    if (path !== '/' && currentRoute.startsWith(path)) return true;
    return false;
  };

  const handleNavClick = (path) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Ink<span className="text-brand-600 dark:text-brand-400">Flow</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  Reader
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Curated Engineering & Tech Chronicles
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active 
                      ? 'bg-brand-50 text-brand-600 dark:bg-slate-800 dark:text-brand-400 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Search Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 transition-all"
              title="Search articles (Ctrl+K or /)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              title="Reading list / Saved bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-brand-600 rounded-full border-2 border-white dark:border-slate-900 animate-scale">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 animate-fadeIn">
            <div className="flex flex-col gap-1 pb-2">
              {navLinks.map(link => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-brand-50 text-brand-600 dark:bg-slate-800 dark:text-brand-400 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-75" />
                    {link.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
