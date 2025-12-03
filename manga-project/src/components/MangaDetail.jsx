import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// HAPUS IMPORT Header ←

const MangaDetail = ({ user, onLogout }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [manga, setManga] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMangaDetail()
  }, [id])

  const fetchMangaDetail = async () => {
    try {
      const response = await fetch('http://localhost/manga-app/api/manga.php', {
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch manga')
      }
      
      const mangaList = await response.json()
      const foundManga = mangaList.find(m => m.id === parseInt(id))
      
      if (foundManga) {
        setManga(foundManga)
      } else {
        setError('Manga not found')
      }
    } catch (error) {
      console.error('Error fetching manga detail:', error)
      setError('Failed to load manga details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      // HAPUS Header dari loading state
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="flex space-x-8">
            <div className="w-1/3 h-96 bg-gray-200 rounded"></div>
            <div className="w-2/3 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !manga) {
    return (
      // HAPUS Header dari error state
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error || 'Manga not found'}</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    // HAPUS wrapper div dengan bg-gray-50 dan Header
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link to="/" className="hover:text-blue-500">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">{manga.title}</li>
        </ol>
      </nav>

      {/* Manga Detail Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cover Image */}
            <div className="lg:w-1/3">
              <div className="sticky top-8">
                <img
                  src={manga.cover_image || 'https://via.placeholder.com/300x400?text=No+Cover'}
                  alt={manga.title}
                  className="w-full rounded-lg shadow-lg"
                />
                
                <div className="mt-6 space-y-4">
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                    <span>★</span>
                    Tambahkan ke Favorit
                  </button>
                  
                  {user.role === 'admin' && (
                    <div className="flex space-x-3">
                      <Link
                        to={`/edit-manga/${manga.id}`}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-center"
                      >
                        Edit Manga
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this manga?')) {
                            // Handle delete
                            navigate('/')
                          }
                        }}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Manga Info */}
            <div className="lg:w-2/3">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{manga.title}</h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="text-lg">by {manga.author}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    manga.status === 'ongoing' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {manga.status === 'ongooing' ? 'Ongoing' : 'Completed'}
                  </span>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ikhitsar</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                  {manga.description || 'No description available.'}
                </p>
              </div>

              {/* Additional Info (mock data) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Published</h3>
                  <p className="text-gray-600">{new Date(manga.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-2">Last Updated</h3>
                  <p className="text-gray-600">{new Date(manga.updated_at).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>

              {/* Chapters (mock data) */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Chapters</h2>
                <div className="space-y-3">
                  {[1, 2, 3].map(chapter => (
                    <div key={chapter} className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
                      <div>
                        <span className="font-medium text-gray-900">Chapter {chapter}</span>
                        <p className="text-sm text-gray-600 mt-1">Released 2 days ago</p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-700 font-medium">
                        Read →
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-gray-600 hover:text-gray-900 font-medium">
                    View All Chapters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium"
        >
          ← Back to Manga List
        </button>
      </div>
    </div>
  )
}

export default MangaDetail