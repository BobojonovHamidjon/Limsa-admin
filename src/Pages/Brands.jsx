import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Brands() {
  const [brands, setBrands] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [image, setImage] = useState(null)
  const [editId, setEditId] = useState(null)
  const token = localStorage.getItem('accessToken')

  const getBrands = () => {
    axios.get('https://realauto.limsa.uz/api/brands')
      .then(res => setBrands(res.data.data))
  }

  const handleOpenModal = (brand = null) => {
    if (brand) {
      setEditId(brand.id)
      setTitle(brand.title)
    } else {
      setEditId(null)
      setTitle('')
    }
    setOpenModal(true)
  }

  const addOrUpdateBrand = () => {
    const formData = new FormData()
    formData.append('title', title)
    if (image) formData.append('image', image)

    const requestConfig = {
      url: editId ? `https://realauto.limsa.uz/api/brands/${editId}` : 'https://realauto.limsa.uz/api/brands',
      method: editId ? 'PUT' : 'POST',
      data: formData,
      headers: { 'Authorization': `Bearer ${token}` }
    }

    axios(requestConfig).then(() => {
      toast.success(editId ? 'Brand Updated' : 'Brand Added')
      getBrands()
      setOpenModal(false)
    })
  }

  const deleteBrand = (id) => {
    axios.delete(`https://realauto.limsa.uz/api/brands/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(() => {
      toast.success('Brand Deleted')
      getBrands()
    }).catch(error => {
      toast.error('Failed to delete brand')
      console.error('Delete Error:', error)
    })
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <>
      <button onClick={() => handleOpenModal()} className='bg-blue-700 text-white px-4 py-2 rounded-md'>Add Brand</button>

      {openModal && (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Brand Name</label>
            <input className="shadow border rounded w-full py-2 px-3" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input className="shadow border rounded w-full py-2 px-3" type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={addOrUpdateBrand}>{editId ? 'Update' : 'Add'}</button>
            <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setOpenModal(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className='grid grid-cols-2 pt-5 gap-5'>
        {brands.map(brand => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={brand.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{brand.title}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`https://realauto.limsa.uz/api/uploads/images/${brand.image_src}`} alt={brand.title} />
            <div className='flex justify-between'>
              <button className='bg-green-500 text-white px-4 py-2 rounded-md' onClick={() => handleOpenModal(brand)}>Edit</button>
              <button className='bg-red-500 text-white px-4 py-2 rounded-md' onClick={() => deleteBrand(brand.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Brands
