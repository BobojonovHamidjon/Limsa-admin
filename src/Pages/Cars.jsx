import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://realauto.limsa.uz/api/cars');
      setCars(res.data.data);
    } catch (err) {
      setError("Ma'lumotlarni olishda xatolik yuz berdi!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className='absolute top-[50px] left-[350px] w-[calc(100%-350px)] p-8'>
      <h2 className='text-3xl font-semibold mb-8'>Avtomobillar</h2>

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
        <div className="grid grid-cols-3 gap-6 justify-end">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="bg-white rounded-lg shadow-lg p-4">
                <img src={car.image_src} alt={car.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">{car.title}</h3>
              </div>
            ))
          ) : (
            <div className="text-gray-600 text-lg">Hech qanday avtomobil topilmadi.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cars;
