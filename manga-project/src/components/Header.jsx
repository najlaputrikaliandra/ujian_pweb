import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  const location = useLocation()
  
  // Cek apakah di halaman dashboard
  const isDashboard = location.pathname === '/'
  
  // Navigation items
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    ...(user.role === 'admin' 
      ? [{ name: 'Add Manga', path: '/add-manga', icon: '➕' }]
      : []
    )
  ]

  return (
    <header className={`sticky top-0 z-50 ${isDashboard ? 'bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-md' : 'bg-gray-900'} border-b border-gray-700/50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Manga<span className="text-blue-400">PWEB</span>
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Ultimate Manga Collection</p>
              </div>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex ml-10 space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-3 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  {user.username}
                </p>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${user.role === 'admin' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <p className="text-xs text-gray-400 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile User Info */}
            <div className="md:hidden flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="group flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-lg font-medium shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white ml-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-3 border-t border-gray-700/50">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header