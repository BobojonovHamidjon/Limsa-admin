import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const  Login = (e) =>{
    e.preventDefault();
    axios({
      method:'POST',
      url:'https://realauto.limsa.uz/api/auth/signin',

      data:{
        'phone_number':phone,
        'password':password
      }
    }).then(res=>{
      localStorage.setItem('accessToken', res?.data?.data?.tokens?.accessToken?.token);
      toast.success("Muvaffaqiyatli o'tdi" )
      navigate('/')
    
    }).catch (err=>{
      toast.error("Xatolik yuz berdi, iltimos qaytadan urinib ko'ring");
      console.log(err);
      
    })
  }

  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Telefon raqam
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="+998901234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Parol
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button" 
              onClick={Login}
            >
              Kirish
            </button>
          
          </div>  
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2024 RealAuto. Barcha huquqlar himoyalangan.</p>
      </div>
      
    </div>
  );
}

export default Login;
