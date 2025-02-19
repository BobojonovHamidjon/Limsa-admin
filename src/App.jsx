import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Layout from "./Components/Layout";



function App() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[token])
  return  token? <Layout><Outlet/></Layout>:<Login/>
}

export default App;