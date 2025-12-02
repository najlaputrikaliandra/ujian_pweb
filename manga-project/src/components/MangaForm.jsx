import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const MangaForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    cover_image: '',
    status: 'ongoing'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      fetchManga()
    }
  }, [id])

  const fetchManga = async () => {
    try {
      const response = await fetch('http://localhost/manga-app/api/manga.php', {
        credentials: 'include'
      })
      const mangaList = await response.json()
      const manga = mangaList.find(m => m.id === parseInt(id))
      if (manga) {
        setFormData(manga)
      }
    } catch (error) {
      console.error('Error fetching manga:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = isEdit 
        ? `http://localhost/manga-app/api/manga.php?id=${id}`
        : 'http://localhost/manga-app/api/manga.php'
      
      const method = isEdit ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        navigate('/')
      } else {
        alert('Failed to save manga')
      }
    } catch (error) {
      console.error('Error saving manga:', error)
      alert('Error saving manga')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEdit ? 'Edit Manga' : 'Add New Manga'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              required
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
            <input
              type="url"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default MangaForm