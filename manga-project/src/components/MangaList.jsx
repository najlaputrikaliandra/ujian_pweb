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

  const handleDelete = async (id) => {
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
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Latest Manga Updates</h1>
        {user.role === 'admin' && (
          <Link
            to="/add-manga"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add New Manga
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {manga.map((mangaItem) => (
          <div key={mangaItem.id} className="manga-card bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={mangaItem.cover_image || 'https://via.placeholder.com/200x300?text=No+Cover'}
              alt={mangaItem.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{mangaItem.title}</h3>
              <p className="text-gray-600 text-sm mb-2">by {mangaItem.author}</p>
              <p className="text-gray-500 text-xs mb-3 line-clamp-3">{mangaItem.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  mangaItem.status === 'ongoing' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {mangaItem.status}
                </span>
                {user.role === 'admin' && (
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-manga/${mangaItem.id}`}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(mangaItem.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {manga.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No manga found.</p>
          {user.role === 'admin' && (
            <Link
              to="/add-manga"
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Add Your First Manga
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default MangaList