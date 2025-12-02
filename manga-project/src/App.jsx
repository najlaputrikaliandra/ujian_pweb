import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import MangaList from './components/MangaList'
import MangaForm from './components/MangaForm'
import Header from './components/Header'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Header user={user} onLogout={handleLogout} />}
        
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
        </Routes>
      </div>
    </Router>
  )
}

export default App