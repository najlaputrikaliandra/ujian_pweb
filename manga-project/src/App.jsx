import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import MangaList from './components/MangaList'
import MangaForm from './components/MangaForm'
import MangaDetail from './components/MangaDetail'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true) // ← DEFAULT DARK MODE

  useEffect(() => {
    checkAuth()
    // Set dark mode class on body
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const checkAuth = async () => {
    try {
      const formData = new FormData()
      formData.append('action', 'check')
      
      const response = await fetch('http://localhost/manga-app/api/auth.php', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
      const data = await response.json()
      
      if (data.loggedIn) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = async () => {
    try {
      const formData = new FormData()
      formData.append('action', 'logout')
      
      await fetch('http://localhost/manga-app/api/auth.php', {
        method: 'POST',
        credentials: 'include',
        body: formData
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-primary-dark text-gray-100">
        {user && (
          <Header 
            user={user} 
            onLogout={handleLogout} 
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={
              !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/" 
            element={
              user ? <MangaList user={user} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/add-manga" 
            element={
              user && user.role === 'admin' ? <MangaForm /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/edit-manga/:id" 
            element={
              user && user.role === 'admin' ? <MangaForm /> : <Navigate to="/" />
            } 
          />
          <Route 
            path="/manga/:id" 
            element={
              user ? <MangaDetail user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App