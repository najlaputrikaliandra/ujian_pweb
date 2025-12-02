import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900">
              MangaPlus
            </Link>
            <nav className="ml-6 flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                Home
              </Link>
              {user.role === 'admin' && (
                <Link to="/add-manga" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                  Add Manga
                </Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Welcome, {user.username} ({user.role})
            </span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header