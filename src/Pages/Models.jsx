import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Models() {
  const [models, setModels] = useState([])
 
  const getCategory = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/models',
      method: 'GET'
    }).then(res => {
      setModels(res.data.data)
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {
        models.map(category => (
          <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={category.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{category.name}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`} alt={category.name_en} />

          </div>
        ))
      }
    </div>
  )
}

export default Models