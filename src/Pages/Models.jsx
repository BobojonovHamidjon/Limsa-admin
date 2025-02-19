import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Models() {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getModels = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://realauto.limsa.uz/api/models');
      setModels(res.data.data);
    } catch (err) {
      setError("Ma'lumotlarni olishda xatolik yuz berdi!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <div className='absolute top-[50px] left-[350px] w-[calc(100%-350px)] p-8'>
      <h2 className='text-3xl font-semibold mb-8'>Mashina Modellari</h2>

      {/* Loading holati */}
      {loading && (
        <div className="text-gray-600 text-lg">Ma'lumotlar yuklanmoqda...</div>
      )}

      {/* Xatolik ko'rsatish */}
      {error && (
        <div className="text-red-500 text-lg">{error}</div>
      )}

      {/* Ma'lumotlar muvaffaqiyatli yuklansa */}
      {!loading && !error && (
        <div className="grid grid-cols-3 gap-6">
          {models.length > 0 ? (
            models.map((model) => (
              <div key={model.id} className="bg-white rounded-lg shadow-lg p-4">
                <img src={model.image_src} alt={model.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{model.title}</h3>
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-lg">Hech qanday model topilmadi.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Models;
