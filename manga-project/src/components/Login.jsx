import React, { useState } from 'react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      data.append('action', 'login')
      data.append('username', formData.username)
      data.append('password', formData.password)

      const response = await fetch('http://localhost/manga-app/api/auth.php', {
        method: 'POST',
        credentials: 'include',
        body: data
      })

      const result = await response.json()

      if (result.success) {
        onLogin(result.user)
      } else {
        setError(result.message || 'Login failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp5257135.jpg")'
      }}
    >
      {/* Overlay gelap untuk meningkatkan readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 max-w-md w-full space-y-8 px-4">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Welcome to MangaPWEB
          </h2>
          <p className="mt-2 text-lg text-gray-200">
            Your ultimate manga reading experience
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/90 text-white px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
            
            <div className="text-center">
              <div className="text-gray-300 text-sm mb-2">
                <p className="font-semibold text-white mb-1">Demo Accounts</p>
                <div className="space-y-1">
                  <p className="bg-black/30 p-2 rounded">
                    <span className="font-medium">Admin:</span> admin / admin123
                  </p>
                  <p className="bg-black/30 p-2 rounded">
                    <span className="font-medium">User:</span> user / user123
                  </p>
                </div>
              </div>
              
              <p className="text-gray-400 text-xs mt-4">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </form>
        </div>
        
        <div className="text-center">
          <p className="text-gray-300 text-sm">
            Don't have an account?{' '}
            <button className="text-blue-300 hover:text-blue-200 font-medium">
              Contact Administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login