import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const MangaList = ({ user }) => {
  const [manga, setManga] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchManga()
  }, [])

  const fetchManga = async () => {
    try {
      const response = await fetch('http://localhost/manga-app/api/manga.php', {
        credentials: 'include'
      })
      const data = await response.json()
      setManga(data)
    } catch (error) {
      console.error('Error fetching manga:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!window.confirm('Are you sure you want to delete this manga?')) return

    try {
      const response = await fetch(`http://localhost/manga-app/api/manga.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      const result = await response.json()
      
      if (result.success) {
        setManga(manga.filter(m => m.id !== id))
      }
    } catch (error) {
      console.error('Error deleting manga:', error)
    }
  }

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://mrwallpaper.com/images/hd/manga-pages-get-absorbed-into-adventurous-stories-my8qqg4qrjxu5cj4.jpg")'
        }}
      >
        <div className="min-h-screen bg-black bg-opacity-70">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://mrwallpaper.com/images/hd/manga-pages-get-absorbed-into-adventurous-stories-my8qqg4qrjxu5cj4.jpg")'
      }}
    >
      {/* Overlay gelap untuk kontras */}
      <div className="min-h-screen bg-black bg-opacity-70">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Latest Manga Updates
              </h1>
              <p className="text-gray-300">
                Discover amazing manga stories from around the world
              </p>
            </div>
            {user.role === 'admin' && (
              <Link
                to="/add-manga"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                + Add New Manga
              </Link>
            )}
          </div>

          {manga.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-gray-900/90 rounded-2xl border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No manga found
                </h3>
                <p className="text-gray-300 mb-6">
                  Start by adding your first manga to the collection
                </p>
                {user.role === 'admin' && (
                  <Link
                    to="/add-manga"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg"
                  >
                    Add Your First Manga
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {manga.map((mangaItem) => (
                <Link 
                  key={mangaItem.id} 
                  to={`/manga/${mangaItem.id}`}
                  className="group bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={mangaItem.cover_image || 'https://via.placeholder.com/300x400?text=No+Cover'}
                      alt={mangaItem.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient untuk text di atas gambar */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Title dan author di atas gambar */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-xl text-white mb-1 line-clamp-2">
                        {mangaItem.title}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        by <span className="text-blue-400 font-medium">{mangaItem.author || 'Unknown'}</span>
                      </p>
                    </div>
                    
                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        mangaItem.status === 'ongoing' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-700 text-gray-200'
                      }`}>
                        {mangaItem.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="p-5 bg-gray-900">
                    <div className="mb-4 min-h-[60px]">
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {mangaItem.description || 'No description available.'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                      {/* Date info */}
                      <div className="flex items-center text-gray-400 text-xs">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{new Date(mangaItem.created_at).toLocaleDateString('id-ID')}</span>
                      </div>
                      
                      {/* Admin actions */}
                      {user.role === 'admin' && (
                        <div className="flex space-x-2" onClick={(e) => e.preventDefault()}>
                          <Link
                            to={`/edit-manga/${mangaItem.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => handleDelete(mangaItem.id, e)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {manga.length > 0 && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-4 text-gray-300 bg-gray-900/80 px-6 py-3 rounded-lg">
                <span className="text-sm font-medium">
                  Showing <span className="text-white font-bold">{manga.length}</span> manga
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MangaList