import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading,setLoading] = useState(false)
  const [openModal,setopenModal] = useState(false)
  const [nameUz,setNameUz] = useState('')
  const  [nameRu, setNameRu] = useState('')
  const [images,setImages] = useState(null);
  const token = localStorage.getItem('accessToken');
const handleOpenModal = () =>{
  setopenModal(!openModal);
}


  const getCategory = () => {
    setLoading(true);
    axios({
      url: 'https://realauto.limsa.uz/api/categories',
      method: 'GET'
    }).then(res => {
      setCategories(res.data.data)
    }).finally(()=>{
      setLoading(false)
    })
  };
  const addCategories = ()=>{
    const formdata =  new FormData();
    formdata.append("name_en",nameUz);
    formdata.append("name_ru",nameRu);
    if (images){
      formdata.append("images",images)
    }
    axios({
      url:"https://realauto.limsa.uz/api/categories",
      method:'POST',
      data:formdata,
      headers:{
        "Authorization":`Bearer ${token}`,
      }

    }).then(res=>{
      toast.success("Add Catigories")
      getCategory();
      setopenModal(false);
    })
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
    <button  onClick={handleOpenModal}  className='bg-blue-700 text-white px-4 py-2 rounded-md'>Add catigories</button>
    {
      !openModal ? ( 
      ""
       )  :(  
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
         Catigories
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="add"
    
          onChange={(e) => setNameUz(e.target.value)} 
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Name
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="text"
          placeholder=""
          
          onChange={(e) => setNameRu(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Image
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="file"
          placeholder=""
          
          onChange={(e) => setImages(e.target.files[0])}
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="button" 
         onClick={addCategories}
        >
          Add
        </button>
      
      </div>  
    </form>
    )}
     <div className='grid grid-cols-2 pt-5 gap-5'>
      {
       loading ? < div>Loading...</div>: categories.map(category => (
        <div className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={category.id}>
          <div className='flex justify-between'>
            <h1 className='text-white text-[24px]'>Name:</h1>
            <p className='text-white text-[24px]'>{category.name_en}</p>
          </div>
          <img className='w-[450px] h-[300px]' src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`} alt={category.name_en} />

        </div>
      ))
      }
    </div>
   
    </>
   
  )
}

export default Categories