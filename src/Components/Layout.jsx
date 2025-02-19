import React from 'react';
import { FaCar, FaCity, FaCubes, FaLayerGroup, FaMapMarkerAlt, FaTags } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const LogOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div>
      <header className='text-right text-3xl font-bold p-4  bg-blue-800'>
        <button onClick={LogOut} className="bg-blue-900 text-white px-4 py-2 rounded-md">Log Out</button>
      </header>
      <div className='grid grid-cols-12 gap-4'>
      <nav className="flex flex-col gap-4   col-span-3 p-4 bg-blue-900 min-h-screen">
          <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md  text-white font-bold ${isActive ? 'bg-blue-600'   : 'hover:bg-blue-700'}`}>
          <FaLayerGroup />Categories
          </NavLink>
          <NavLink to="/brands" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaTags /> Brands
          </NavLink>
          <NavLink to="/cities" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md  text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaCity />Cities
          </NavLink>
          <NavLink to="/locations" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaMapMarkerAlt /> Locations
          </NavLink>
          <NavLink to="/cars" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
          <FaCar />Cars
          </NavLink>
          <NavLink to="/models" className={({ isActive }) => `flex items-center gap-2 p-2 rounded-md text-white font-bold ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
            <FaCubes/> Models
          </NavLink>
        </nav>
        <div className='col-span-9 p-4  overflow-y-scroll h-[94vh]  '><Outlet/></div>
       
      </div>
    </div>
  );
}

export default Layout;
