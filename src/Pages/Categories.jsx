import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [nameUz, setNameUz] = useState('')
  const [nameRu, setNameRu] = useState('')
  const [images, setImages] = useState(null)
  const [editId, setEditId] = useState(null)
  const token = localStorage.getItem('accessToken')

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditId(category.id)
      setNameUz(category.name_en)
      setNameRu(category.name_ru)
    } else {
      setEditId(null)
      setNameUz('')
      setNameRu('')
    }
    setOpenModal(!openModal)
  }

  const getCategory = () => {
    setLoading(true)
    axios.get('https://realauto.limsa.uz/api/categories')
      .then(res => setCategories(res.data.data))
      .finally(() => setLoading(false))
  }

  const addOrUpdateCategory = () => {
    const formData = new FormData()
    formData.append('name_en', nameUz)
    formData.append('name_ru', nameRu)
    if (images) formData.append('images', images)
    
    const requestConfig = {
      url: editId ? `https://realauto.limsa.uz/api/categories/${editId}` : 'https://realauto.limsa.uz/api/categories',
      method: editId ? 'PUT' : 'POST',
      data: formData,
      headers: { 'Authorization': `Bearer ${token}` }
    }
    
    axios(requestConfig).then(() => {
      toast.success(editId ? 'Category Updated' : 'Category Added')
      getCategory()
      setOpenModal(false)
    })
  }

  const deleteCategory = (id) => {
    axios.delete(`https://realauto.limsa.uz/api/categories/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(() => {
      toast.success('Category Deleted')
      getCategory()
    }).catch(error => {
      toast.error('Failed to delete category')
      console.error('Delete Error:', error);
    });
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <>
      <button onClick={() => handleOpenModal()} className='bg-blue-700 text-white px-4 py-2 rounded-md'>Add Category</button>
      {
        openModal && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category Name (EN)</label>
              <input className="shadow border rounded w-full py-2 px-3" type="text" value={nameUz} onChange={(e) => setNameUz(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Category Name (RU)</label>
              <input className="shadow border rounded w-full py-2 px-3" type="text" value={nameRu} onChange={(e) => setNameRu(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
              <input className="shadow border rounded w-full py-2 px-3" type="file" onChange={(e) => setImages(e.target.files[0])} />
            </div>
            <div className="flex justify-between">
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={addOrUpdateCategory}>{editId ? 'Update' : 'Add'}</button>
              <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
          </form>
        )
      }
      <div className='grid grid-cols-2 pt-5 gap-5'>
        {loading ? <div>Loading...</div> : categories.map(category => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-gray-400 rounded-[20px]' key={category.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{category.name_en}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`} alt={category.name_en} />
            <div className='flex justify-between'>
              <button className='bg-green-500 text-white px-4 py-2 rounded-md' onClick={() => handleOpenModal(category)}>Edit</button>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => deleteCategory(category.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Categories